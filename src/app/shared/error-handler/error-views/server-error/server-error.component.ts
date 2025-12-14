import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'server-error',
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerErrorComponent {}
