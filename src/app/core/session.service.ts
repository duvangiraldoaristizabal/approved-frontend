import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  readonly user = signal('');
  readonly token = signal('');
  readonly authenticated = signal(false);

  login(user: string, token: string): void {
    this.user.set(user);
    this.token.set(token);
    this.authenticated.set(true);
  }

  logout(): void {
    this.user.set('');
    this.token.set('');
    this.authenticated.set(false);
  }
}
