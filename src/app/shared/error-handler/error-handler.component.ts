import { ChangeDetectionStrategy, Component, inject, computed, effect } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MainButtonComponent } from '@shared';

const SPECIFIC_ERROR_CODES = ['401', '403', '404', '408', '500', '503', '504'];

@Component({
  selector: 'error-handler',
  imports: [
    MainButtonComponent,
    RouterOutlet,
    TranslateModule
  ],
  templateUrl: './error-handler.component.html',
  styleUrl: './error-handler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErrorHandlerComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public readonly specificCodes = SPECIFIC_ERROR_CODES;
  public readonly translate = inject(TranslateService);

  private readonly queryParamsSignal = toSignal(this.route.queryParams, { initialValue: {} as Params });

  public readonly code = computed<string>(() => {
    const params = this.queryParamsSignal();

    if (params['code']) {
      return String(params['code']);
    }

    const url = this.router.url;
    switch (true) {
      case url.includes('unauthorized-error'): return '401';
      case url.includes('forbidden-error'): return '403';
      case url.includes('unfound-error'): return '404';
      case url.includes('timeout-error'): return '408';
      case url.includes('server-error'): return '500';
      case url.includes('generic-error'): return '502';
      case url.includes('maintenance-error'): return '503';
      default: return '';
    }
  });

  public readonly titleKey = computed(() => {
    const currentCode = this.code();
    const isGenericCode = /^[1-5]\d{2}$/.test(currentCode);

    if (!SPECIFIC_ERROR_CODES.includes(currentCode) && !isGenericCode) {
      return 'PAGES.ERROR.TITLE.UNKNOWN';
    }

    return 'PAGES.ERROR.TITLE.COMMON';
  });

  public readonly isAuthError = computed(() => this.code() === '401');

  constructor() {
    effect(() => {
      const rawCode = this.code();
      if (!rawCode) return;

      let destination = 'unknown-error';

      switch (true) {
        case rawCode === '401':
          destination = 'unauthorized-error';
          break;
        case rawCode === '403':
          destination = 'forbidden-error';
          break;
        case rawCode === '404':
          destination = 'unfound-error';
          break;
        case rawCode === '408':
        case rawCode === '504':
          destination = 'timeout-error';
          break;
        case rawCode === '500':
          destination = 'server-error';
          break;
        case rawCode === '503':
          destination = 'maintenance-error';
          break;
        case /^[1-5]\d{2}$/.test(rawCode):
          destination = 'generic-error';
          break;
      }

      if (!this.router.url.includes(destination)) {
        this.router.navigate([destination], {
          relativeTo: this.route,
          queryParams: { code: rawCode },
          // Replaces URL in history to not break browser's back button
          replaceUrl: true
        });
      }
    });
  }

  navigateAction(path: string): void {
    this.router.navigate([path]);
  }
}
