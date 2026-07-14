import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApprovalApiService } from './core/approval-api.service';
import { SessionService } from './core/session.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly users = [
    'juan.lead@bancobogota.com',
    'maria.dev@bancobogota.com',
    'ana.dev@bancobogota.com',
    'luis.lead@bancobogota.com',
  ];
  readonly username = signal(this.users[0]);
  readonly password = signal('juan.lead');
  readonly loginError = signal('');
  readonly loggingIn = signal(false);

  constructor(readonly session: SessionService, private readonly api: ApprovalApiService) {}

  changeUser(event: Event): void {
    const nextUser = (event.target as HTMLSelectElement).value;
    this.username.set(nextUser);
    this.password.set(nextUser.split('@')[0]);
  }

  login(): void {
    this.loggingIn.set(true);
    this.loginError.set('');
    this.api.login(this.username(), this.password()).subscribe({
      next: () => this.loggingIn.set(false),
      error: () => {
        this.loginError.set('Credenciales invalidas');
        this.loggingIn.set(false);
      },
    });
  }

  logout(): void {
    this.session.logout();
    this.loginError.set('');
  }
}
