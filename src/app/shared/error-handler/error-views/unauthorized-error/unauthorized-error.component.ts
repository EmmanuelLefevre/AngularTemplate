import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'unauthorized-error',
  imports: [],
  templateUrl: './unauthorized-error.component.html',
  styleUrl: './unauthorized-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedErrorComponent {}
