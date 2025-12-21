import { Component, OnInit, inject, signal, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'error-handler',
  imports: [RouterOutlet],
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
        const url = this.router.url;

        switch (true) {
          case url.includes('unfound-error'):
            codeValue = '404';
            break;
          case url.includes('unauthorized-error'):
            codeValue = '401';
            break;
          case url.includes('server-error'):
            codeValue = '500';
            break;
          default:
            codeValue = '';
            break;
        }
      }

      this.code.set(codeValue);
      this.cdr.markForCheck();

      const currentUrl = this.router.url;
      const errorPages = [
        'unauthorized-error',
        'unfound-error',
        'server-error',
        'generic-error',
        'unknown-error'
      ];

      if (errorPages.some(page => currentUrl.includes(page))) {
        return;
      }

      const rawValue = this.code();

      let destination = 'unknown-error';

      if (rawValue === '401') {
        destination = 'unauthorized-error';
      }
      else if (rawValue === '404') {
        destination = 'unfound-error';
      }
      else if (rawValue === '500') {
        destination = 'server-error';
      }
      else if (/^[1-5]\d{2}$/.test(rawValue)) {
        destination = 'generic-error';
      }

      this.router.navigate([destination], {
        relativeTo: this.route,
        queryParams: rawValue ? { code: rawValue } : undefined,
        replaceUrl: true
      });
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
