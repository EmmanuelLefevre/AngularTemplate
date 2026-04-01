import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { DynamicFormRawValue, FormFieldConfig } from '@core/_models/forms/form.model';
import { LoginCredentials, RegisterCredentials } from '@core/_models/auth/auth.model';
import { User as AppUser } from '@core/_models/user/user.model';

import { AuthService } from '@core/_services/auth/auth.service';
import { SnackbarService } from '@core/_services/snackbar/snackbar.service';

import { CloseButtonComponent } from '@shared/components/close-button/close-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MainLinkComponent } from '@shared/components/link/main-link.component';

const FLIP_ANIMATION_DURATION_MS = 800;
const FLIP_ANIMATION_MIDPOINT_RATIO = 0.5;
const FLIP_ANIMATION_MIDPOINT_MS = FLIP_ANIMATION_DURATION_MS * FLIP_ANIMATION_MIDPOINT_RATIO;

const NEXT_TICK_MS = 0;

@Component({
  selector: 'login-view',
  imports: [
    CloseButtonComponent,
    DynamicFormComponent,
    MainLinkComponent,
    TranslateModule
  ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginViewComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackbarService = inject(SnackbarService);

  private readonly dynamicForm = viewChild(DynamicFormComponent);

  readonly isRegisterMode = signal(false);
  readonly isLoading = signal(false);
  readonly isFlipping = signal(false);

  readonly loginFields: FormFieldConfig[] = [
    {
      name: 'email',
      label: 'UI.FORMS.LABELS.EMAIL',
      type: 'email',
      placeholder: 'UI.FORMS.PLACEHOLDERS.EMAIL',
      initialValue: ''
    },
    {
      name: 'username',
      label: 'UI.FORMS.LABELS.USERNAME',
      type: 'text',
      placeholder: 'UI.FORMS.PLACEHOLDERS.USERNAME'
    },
    {
      name: 'password',
      label: 'UI.FORMS.LABELS.PASSWORD',
      type: 'password',
      placeholder: 'UI.FORMS.PLACEHOLDERS.PASSWORD',
      behaviors: { hasPasswordToggle: true }
    },
    {
      name: 'confirmPassword',
      label: 'UI.FORMS.LABELS.CONFIRM_PASSWORD',
      type: 'password',
      placeholder: 'UI.FORMS.PLACEHOLDERS.CONFIRM_PASSWORD',
      behaviors: { hasPasswordToggle: true }
    }
  ];

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const EMAIL_PARAM = params['email'];

      if (EMAIL_PARAM) {
        setTimeout(() => {
          if (this.isRegisterMode()) {
            this.toggleMode(EMAIL_PARAM);
          }
          else {
            this.dynamicForm()?.patchEmail(EMAIL_PARAM);
          }
        }, NEXT_TICK_MS);
      }
    });
  }

  toggleMode(emailToPatch?: string): void {
    if (this.isFlipping()) return;

    this.isFlipping.set(true);

    setTimeout(() => {
      this.isRegisterMode.update(v => !v);

      this.dynamicForm()?.resetForm();

      if (emailToPatch) {
        this.dynamicForm()?.patchEmail(emailToPatch);
      }
    }, FLIP_ANIMATION_MIDPOINT_MS);

    setTimeout(() => {
      this.isFlipping.set(false);
    }, FLIP_ANIMATION_DURATION_MS);
  }

  onFormSubmit(data: DynamicFormRawValue): void {
    this.isLoading.set(true);

    const {
      email: EMAIL,
      password: PASSWORD,
      username: USERNAME
    } = data;

    if (typeof EMAIL !== 'string' || typeof PASSWORD !== 'string') {
      this.isLoading.set(false);
      return;
    }

    if (this.isRegisterMode()) {
      // --- REGISTER ---
      const REGISTER_DATA: RegisterCredentials = {
        email: EMAIL,
        password: PASSWORD,
        username: (USERNAME as string) || ''
      };

      this.authService.register(REGISTER_DATA).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/login'], { queryParams: { email: EMAIL } });

          this.snackbarService.showNotification('UI.SNACKBAR.AUTH.REGISTER.SUCCESS', 'register');
        },
        error: () => {
          this.isLoading.set(false);

          this.snackbarService.showNotification('UI.SNACKBAR.AUTH.REGISTER.ERROR', 'red-alert');
        }
      });

    }
    else {
      // --- LOGIN ---
      const LOGIN_DATA: LoginCredentials = {
        email: EMAIL,
        password: PASSWORD
      };

      this.authService.login(LOGIN_DATA).subscribe({
        next: (user: AppUser) => {
          this.isLoading.set(false);
          this.router.navigate(['/private']);

          this.snackbarService.showNotification(
            'UI.SNACKBAR.AUTH.LOGIN.SUCCESS',
            'logIn-logOut',
            { username: user.username }
          );
        },
        error: (err) => {
          this.isLoading.set(false);

          const MSG = err.message?.toLowerCase().includes('confirm')
            ? 'UI.SNACKBAR.AUTH.LOGIN.CONFIRM_EMAIL_NEEDED'
            : 'UI.SNACKBAR.AUTH.LOGIN.ERROR';
          this.snackbarService.showNotification(MSG, 'red-alert');
        }
      });
    }
  }

  onCancel(): void {
    this.dynamicForm()?.resetForm();
  }
}
