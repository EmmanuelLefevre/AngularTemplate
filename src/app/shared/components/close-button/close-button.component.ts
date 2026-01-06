import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'close-button',
  imports: [
    FontAwesomeModule,
    MatTooltipModule,
    TranslateModule
  ],
  templateUrl: './close-button.component.html',
  styleUrl: './close-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CloseButtonComponent {

  faCircleXmark = faCircleXmark;

  private readonly router = inject(Router);
  private readonly location = inject(Location);

  goBack(): void {
    const CURRENT_URL: string = this.router.url;
    if (CURRENT_URL === '/login') {
      this.router.navigate(['/']);
    }
    else {
      this.location.back();
    }
  }
}
