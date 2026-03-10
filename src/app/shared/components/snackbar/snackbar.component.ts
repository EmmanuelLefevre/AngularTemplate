import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { SnackbarData } from '@core/_models/snackbar/snackbar.model';

@Component({
  selector: 'snackbar',
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class SnackbarComponent {

  public readonly faXmark = faXmark;

  public data: SnackbarData = inject(MAT_SNACK_BAR_DATA);
  public snackBarRef = inject(MatSnackBarRef<SnackbarComponent>);
}
