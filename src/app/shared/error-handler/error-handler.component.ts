import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'error-handler',
  imports: [],
  templateUrl: './error-handler.component.html',
  styleUrl: './error-handler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorHandlerComponent {}
