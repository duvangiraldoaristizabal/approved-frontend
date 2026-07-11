import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService { readonly user = signal('juan.lead'); }
