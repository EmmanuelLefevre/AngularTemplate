import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'unconnected-error',
  imports: [],
  templateUrl: './unconnected-error.component.html',
  styleUrl: './unconnected-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnconnectedErrorComponent {}
