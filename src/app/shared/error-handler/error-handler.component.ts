import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'error-handler',
  imports: [],
  templateUrl: './error-handler.component.html',
  styleUrl: './error-handler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorHandlerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  code!: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe((currentParams) => {
      this.code = currentParams['code'] ? String(currentParams['code']) : '';

      let destination: string | null = null;
      let nextParams: Params | undefined = undefined;

      switch (this.code) {
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
          if (/^[1-5][0-9]{2}$/.test(this.code)) {
            destination = 'generic-error';
            nextParams = { code: this.code };
          } else {
            destination = 'unknown-error';
          }
          break;
      }

      this.router.navigate([destination], { queryParams: nextParams });
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
