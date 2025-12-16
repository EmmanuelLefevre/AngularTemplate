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
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  code!: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'] ? String(params['code']) : '';

      let destination: string | null = null;
      let queryParams: Params = {};

      if (this.code === '404') {
        destination = 'unfound-error';
      } else if (this.code === '401') {
        destination = 'unauthorized';
      } else if (this.code === '500') {
        destination = 'server-error';
      } else if (/^[1-5][0-9]{2}$/.test(this.code)) {
        destination = 'generic-error';
        queryParams = { code: this.code };
      } else {
        destination = 'unknown-error';
      }

      if (destination) {
        this.router.navigate([destination], { queryParams: queryParams });
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
