import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'generic-error',
  imports: [],
  templateUrl: './generic-error.component.html',
  styleUrl: './generic-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericErrorComponent {}
