import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

const DEFAULT_LOGO_WIDTH = 120;
const DEFAULT_LOGO_HEIGHT = 'auto';

@Component({
  selector: 'logo',
  imports: [
    RouterLink,
    NgTemplateOutlet
  ],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.logo--clickable]': 'isLink()',
    '[style.--logo-width]': 'formattedWidth()',
    '[style.--logo-height]': 'formattedHeight()',
  }
})

export class LogoComponent {
  src = input.required<string>();
  alt = input.required<string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link = input<string | any[] | null>(null);
  isLink = computed(() => !!this.link());

  width = input<string | number>(DEFAULT_LOGO_WIDTH);
  height = input<string | number>(DEFAULT_LOGO_HEIGHT);

  priority = input<boolean>(false);

  formattedWidth = computed(() =>
    typeof this.width() === 'number' ? `${this.width()}px` : this.width()
  );

  formattedHeight = computed(() =>
    typeof this.height() === 'number' ? `${this.height()}px` : this.height()
  );
}
