import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
      this.code = params['code'];
      if (this.code === '404') {
        this.router.navigate(['unfound']);
      }
      if (this.code === '401') {
        this.router.navigate(['unauthorized']);
      }
      if (this.code === '500') {
        this.router.navigate(['server-error']);
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
