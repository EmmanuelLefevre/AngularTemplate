import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, Params } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'link',
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LinkComponent {

  readonly clicked = output<MouseEvent>();

  label = input.required<string>();

  routerLink = input<string | unknown[] | null>(null);
  queryParams = input<Params | null>(null);

  icon = input<string | null>(null);
  ariaLabel = input<string | null>(null);
  customClass = input<string>('');


  onHandleClick(event: MouseEvent): void {
    // If there is no navigation link, the page is prevented from reloading
    if (!this.routerLink()) {
      event.preventDefault();
    }

    this.clicked.emit(event);
  }
}
