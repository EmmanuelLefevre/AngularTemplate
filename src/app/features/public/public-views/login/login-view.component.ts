import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { DynamicFormRawValue, FormFieldConfig } from '@core/_models/forms/form.model';
import { LoginCredentials } from '@core/_models/auth/auth.model';

import { AuthService } from '@core/_services/auth/auth.service';

import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MainButtonComponent } from '@shared/components/button/main-button.component';

@Component({
  selector: 'app-login-view',
  imports: [
    TranslateModule,
    DynamicFormComponent,
    MainButtonComponent
  ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginViewComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isRegisterMode = signal(false);
  readonly isLoading = signal(false);

  readonly loginFields: FormFieldConfig[] = [
    {
      name: 'email',
      label: 'UI_COMPONENTS.FORM.EMAIL.LABEL',
      type: 'email',
      placeholder: 'UI_COMPONENTS.FORM.EMAIL.PLACEHOLDER',
      behaviors: { autofocus: true }
    },
    {
      name: 'password',
      label: 'UI_COMPONENTS.FORM.PASSWORD.LABEL',
      type: 'password',
      placeholder: 'UI_COMPONENTS.FORM.PASSWORD.PLACEHOLDER',
      behaviors: { hasPasswordToggle: true }
    },
    {
      name: 'confirmPassword',
      label: 'UI_COMPONENTS.FORM.CONFIRM_PASSWORD.LABEL',
      type: 'password',
      placeholder: 'UI_COMPONENTS.FORM.CONFIRM_PASSWORD.PLACEHOLDER',
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
    this.router.navigate(['/home']);
  }
}
