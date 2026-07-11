import { DatePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApprovalApiService } from '../../core/approval-api.service';
import type { ApprovalRequest, RequestStatus } from '../../core/models';
import { SessionService } from '../../core/session.service';
@Component({ standalone: true, imports: [RouterLink, DatePipe], templateUrl: './request-list.component.html', styleUrl: './request-list.component.css' })
export class RequestListComponent {
  readonly requests = signal<ApprovalRequest[]>([]); readonly loading = signal(true); readonly error = signal(''); readonly status = signal<RequestStatus | ''>('PENDING');
  constructor(private readonly api: ApprovalApiService, readonly session: SessionService) { effect(() => { this.session.user(); this.status(); this.load(); }); }
  setStatus(event: Event): void { this.status.set((event.target as HTMLSelectElement).value as RequestStatus | ''); }
  private load(): void { this.loading.set(true); this.error.set(''); this.api.list({ approver: this.session.user(), status: this.status() || undefined }).subscribe({ next: data => { this.requests.set(data); this.loading.set(false); }, error: () => { this.error.set('No fue posible cargar las solicitudes.'); this.loading.set(false); } }); }
}
