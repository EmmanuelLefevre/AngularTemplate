import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'scroll-to-top',
  imports: [],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent {

}
