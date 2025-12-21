import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';

@Component({
  selector: 'error-handler',
  imports: [RouterOutlet],
  templateUrl: './error-handler.component.html',
  styleUrl: './error-handler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErrorHandlerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public readonly code = signal<string>('');

  ngOnInit(): void {
    this.route.queryParams.subscribe((currentParams) => {
      const codeValue = currentParams['code'] ? String(currentParams['code']) : '';
      this.code.set(codeValue);

      const rawValue = this.code();

      let destination: string | null = null;
      let nextParams: Params | undefined = undefined;

      switch (rawValue) {
        case '401':
          destination = 'unauthorized-error';
          break;
        case '404':
          destination = 'unfound-error';
          break;
        case '500':
          destination = 'server-error';
          break;

        default:
          if (/^[1-5]\d{2}$/.test(rawValue)) {
            destination = 'generic-error';
            nextParams = { code: rawValue };
          }
          else {
            destination = 'unknown-error';
          }
          break;
      }

      this.router.navigate([destination], {
        relativeTo: this.route,
        queryParams: nextParams
      });
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
