import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'public',
  imports: [],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicComponent {}
