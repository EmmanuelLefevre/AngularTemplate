import { Component, inject, OnInit, signal } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ResolveStart,
  ResolveEnd
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { faLeaf } from '@fortawesome/free-solid-svg-icons';

const ANTI_FLICKER_DELAY_MS = 500;

@Component({
  selector: 'loader',
  imports: [
    FaIconComponent,
    TranslateModule
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})

export class LoaderComponent implements OnInit {

  private readonly router = inject(Router);

  protected readonly icon = faLeaf;
  protected readonly isLoading = signal(false);

  ngOnInit(): void {
    this.setupRoutingLoader();
  }

  private setupRoutingLoader(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      // LAUNCH
      if (event instanceof NavigationStart || event instanceof ResolveStart) {
        this.isLoading.set(true);
      }

      // STOP
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError ||
        event instanceof ResolveEnd
      ) {
        setTimeout(() => {
          this.isLoading.set(false);
        }, ANTI_FLICKER_DELAY_MS);
      }
    });
  }
}
