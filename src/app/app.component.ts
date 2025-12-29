import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
  private readonly translate = inject(TranslateService);

  constructor() {
    const BROWSER_LANG = this.translate.getBrowserLang();
    this.translate.use(BROWSER_LANG?.match(/en|fr/) ? BROWSER_LANG : 'fr');
  }
}
