import { RouterOutlet } from '@angular/router';

import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  /* v8 ignore start */
  protected readonly title = signal('AngularTemplate');
  /* v8 ignore stop */
}
