import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SHARED_ALL } from '@shared';

@Component({
  selector: 'public-layout',
  imports: [
    RouterOutlet,
    ...SHARED_ALL
  ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PublicLayoutComponent {}
