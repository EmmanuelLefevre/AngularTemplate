import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'home-view',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeViewComponent {

  readonly title = signal('AngularTemplate');

  readonly resources = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    // ...
  ];
}
