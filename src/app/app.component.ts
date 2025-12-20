import { RouterOutlet } from '@angular/router';

import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  protected readonly title = signal('AngularTemplate');
}
