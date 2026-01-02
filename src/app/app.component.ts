import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';

import { AuthService } from '@core/_services/auth/auth.service';
import { SeoService } from '@core/_services/seo/seo.service';
import { SeoData } from '@core/_models/seo/seo.model';

const NULL = 0;

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);

  constructor() {
    const BROWSER_LANG = this.translate.getBrowserLang();
    this.translate.use(BROWSER_LANG?.match(/en|fr/) ? BROWSER_LANG : 'fr');
  }

  ngOnInit(): void {
    this.authService.initAuth();
    this.initSeoListener();
    this.initScrollTopListener();
  }

  private initSeoListener(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.getLatestRouteData(this.activatedRoute))
    ).subscribe((data: Data) => {
      const SEO_DATA = data['seo'] as SeoData | undefined;
      this.seoService.updateMetaTags(SEO_DATA);
    });

    this.translate.onLangChange.subscribe(() => {
      const DATA = this.getLatestRouteData(this.activatedRoute);
      this.seoService.updateMetaTags(DATA['seo'] as SeoData);
    });
  }

  private getLatestRouteData(route: ActivatedRoute): Data {
    let child = route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }
    return child?.snapshot.data || {};
  }

  private initScrollTopListener(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(NULL, NULL);
    });
  }
}
