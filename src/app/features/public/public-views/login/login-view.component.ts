import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { DynamicFormRawValue, FormFieldConfig } from '@core/_models/forms/form.model';
import { LoginCredentials } from '@core/_models/auth/auth.model';

import { AuthService } from '@core/_services/auth/auth.service';

import { CloseButtonComponent } from '@shared/components/close-button/close-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MainLinkComponent } from '@shared/components/link/main-link.component';

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

export class LoginViewComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly dynamicForm = viewChild(DynamicFormComponent);

  readonly isRegisterMode = signal(false);
  readonly isLoading = signal(false);

  readonly loginFields: FormFieldConfig[] = [
    {
      name: 'email',
      label: 'UI.FORMS.LABELS.EMAIL',
      type: 'email',
      placeholder: 'UI.FORMS.PLACEHOLDERS.EMAIL'
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

  toggleMode(): void {
    this.isRegisterMode.update(v => !v);
  }

  onFormSubmit(data: DynamicFormRawValue): void {
    this.isLoading.set(true);

    const { email: EMAIL, password: PASSWORD } = data;

    if (typeof EMAIL === 'string' && typeof PASSWORD === 'string') {
      const CREDENTIALS: LoginCredentials = { email: EMAIL, password: PASSWORD };

      this.authService.login(CREDENTIALS).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/private']);
        },
        error: () => this.isLoading.set(false)
      });
    }
  }

  onCancel(): void {
    this.dynamicForm()?.resetForm();
  }
}
