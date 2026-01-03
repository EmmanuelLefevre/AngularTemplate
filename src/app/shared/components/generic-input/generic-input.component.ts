import { Component, input, signal, computed } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-generic-input',
  imports: [
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './generic-input.component.html',
  styleUrl: './generic-input.component.scss'
})

export class GenericInputComponent {

  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly control = input.required<FormControl>();
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly className = input<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly behaviors = input<any>();

  protected showPassword = signal(false);
  protected isPassword = computed(() => this.type() === 'password');
  protected inputType = computed(() =>
    (this.isPassword() && this.showPassword()) ? 'text' : this.type()
  );

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
}
