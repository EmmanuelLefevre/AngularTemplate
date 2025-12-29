import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '@core/_services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  /* v8 ignore start */
  protected readonly title = signal('AngularTemplate');
  /* v8 ignore stop */
  private readonly translate = inject(TranslateService);

  private readonly authService = inject(AuthService);

  constructor() {
    const BROWSER_LANG = this.translate.getBrowserLang();
    this.translate.use(BROWSER_LANG?.match(/en|fr/) ? BROWSER_LANG : 'fr');
  }

  ngOnInit(): void {
    this.authService.initAuth();
  }
}
