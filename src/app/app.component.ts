import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessionService } from './core/session.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly users = ['juan.lead', 'maria.dev', 'ana.dev', 'luis.lead'];
  constructor(readonly session: SessionService) {}

  changeUser(event: Event): void {
    this.session.user.set((event.target as HTMLSelectElement).value);
  }
}
