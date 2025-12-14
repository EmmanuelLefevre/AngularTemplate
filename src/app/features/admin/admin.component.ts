import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {}
