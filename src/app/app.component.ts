import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  /* v8 ignore start */
  protected readonly title = signal('AngularTemplate');
  /* v8 ignore stop */
  private translate = inject(TranslateService);

  constructor() {
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|fr/) ? browserLang : 'fr');
  }
}
