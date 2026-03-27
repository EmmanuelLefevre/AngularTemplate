import { ChangeDetectionStrategy, Component, OnInit, inject, signal, DestroyRef, ChangeDetectorRef, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MainButtonComponent } from '@shared';

const SPECIFIC_ERROR_CODES = ['401', '404', '408', '500', '503', '504'];

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

export class ErrorHandlerComponent implements OnInit {

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public readonly code = signal<string>('');
  public readonly translate = inject(TranslateService);

  protected readonly specificCodes = SPECIFIC_ERROR_CODES;

  public readonly titleKey = computed(() => {
    const currentCode = this.code();
    const isGenericCode = /^[1-5]\d{2}$/.test(currentCode);

    if (!SPECIFIC_ERROR_CODES.includes(currentCode) && !isGenericCode) {
      return 'PAGES.ERROR.TITLE.UNKNOWN';
    }

    return 'PAGES.ERROR.TITLE.COMMON';
  });

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {

      let codeValue = params['code'] ? String(params['code']) : '';

      if (!codeValue) {
        const URL = this.router.url;

        switch (true) {
          case URL.includes('unfound-error'):
            codeValue = '404';
            break;
          case URL.includes('unauthorized-error'):
            codeValue = '401';
            break;
          case URL.includes('timeout-error'):
            codeValue = '408';
            break;
          case URL.includes('server-error'):
            codeValue = '500';
            break;
          case URL.includes('maintenance-error'):
            codeValue = '503';
            break;
          case URL.includes('generic-error'):
            codeValue = '502';
            break;
          default:
            codeValue = '';
            break;
        }
      }

      this.code.set(codeValue);
      this.cdr.markForCheck();

      const RAW_VALUE = this.code();
      let destination: string;

      switch (true) {
        case RAW_VALUE === '401':
          destination = 'unauthorized-error';
          break;
        case RAW_VALUE === '404':
          destination = 'unfound-error';
          break;
        case RAW_VALUE === '408':
        case RAW_VALUE === '504':
          destination = 'timeout-error';
          break;
        case RAW_VALUE === '500':
          destination = 'server-error';
          break;
        case RAW_VALUE === '503':
          destination = 'maintenance-error';
          break;
        case /^[1-5]\d{2}$/.test(RAW_VALUE):
          destination = 'generic-error';
          break;
        default:
          destination = 'unknown-error';
          break;
      }

      // Check if we're not ALREADY on the correct child route
      if (this.router.url.includes(destination)) {
        return;
      }

      this.router.navigate([destination], {
        relativeTo: this.route,
        queryParams: RAW_VALUE ? { code: RAW_VALUE } : undefined,
        replaceUrl: true
      });
    });
  }

  navigateAction(path: string): void {
    this.router.navigate([path]);
  }
}
