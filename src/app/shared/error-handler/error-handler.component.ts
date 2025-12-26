import { Component, OnInit, inject, signal, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'error-handler',
  imports: [
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
          case URL.includes('server-error'):
            codeValue = '500';
            break;
          default:
            codeValue = '';
            break;
        }
      }

      this.code.set(codeValue);
      this.cdr.markForCheck();

      const CURRENT_URL = this.router.url;
      const ERROR_PAGES = [
        'unauthorized-error',
        'unfound-error',
        'server-error',
        'generic-error',
        'unknown-error'
      ];

      if (ERROR_PAGES.some(page => CURRENT_URL.includes(page))) {
        return;
      }

      const RAW_VALUE = this.code();
      let destination: string;

      switch (true) {
        case RAW_VALUE === '401':
          destination = 'unauthorized-error';
          break;
        case RAW_VALUE === '404':
          destination = 'unfound-error';
          break;
        case RAW_VALUE === '500':
          destination = 'server-error';
          break;
        case /^[1-5]\d{2}$/.test(RAW_VALUE):
          destination = 'generic-error';
          break;
        default:
          destination = 'unknown-error';
          break;
      }

      this.router.navigate([destination], {
        relativeTo: this.route,
        queryParams: RAW_VALUE ? { code: RAW_VALUE } : undefined,
        replaceUrl: true
      });
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
