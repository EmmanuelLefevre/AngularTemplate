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

  readonly appNameKey = signal('META.DEFAULT.APP_NAME');

  readonly resources = [
    {
      titleKey: 'PAGES.HOME.LINKS.EXPLORE',
      link: 'https://angular.dev'
    },
    {
      titleKey: 'PAGES.HOME.LINKS.LEARN',
      link: 'https://angular.dev/tutorials'
    },
    {
      titleKey: 'PAGES.HOME.LINKS.CLI',
      link: 'https://angular.dev/tools/cli'
    }
  ];
}
