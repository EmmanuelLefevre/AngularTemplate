import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import '@lottiefiles/dotlottie-wc';

@Component({
  selector: 'unknown-error',
  imports: [
    TranslateModule,
  ],
  templateUrl: './unknown-error.component.html',
  styleUrl: './unknown-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UnknownErrorComponent {}
