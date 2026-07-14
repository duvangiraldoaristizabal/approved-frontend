import { DatePipe } from '@angular/common';
import { Component, effect, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApprovalApiService } from '../../core/approval-api.service';
import { statusLabel, typeLabel } from '../../core/display-labels';
import type { ApprovalRequest, RequestStatus } from '../../core/models';
import { SessionService } from '../../core/session.service';
@Component({ standalone: true, imports: [RouterLink, DatePipe], templateUrl: './request-list.component.html', styleUrl: './request-list.component.css' })
export class RequestListComponent implements OnDestroy {
  readonly statusLabel = statusLabel;
  readonly typeLabel = typeLabel;
  readonly requests = signal<ApprovalRequest[]>([]); readonly loading = signal(true); readonly error = signal(''); readonly status = signal<RequestStatus | ''>('PENDING');
  private readonly refreshTimer: ReturnType<typeof setInterval>;
  constructor(private readonly api: ApprovalApiService, readonly session: SessionService) {
    effect(() => { this.session.user(); this.status(); this.load(); });
    this.refreshTimer = setInterval(() => this.load(false), 10_000);
  }
  ngOnDestroy(): void { clearInterval(this.refreshTimer); }
  setStatusValue(status: RequestStatus | ''): void { this.status.set(status); }
  refresh(): void { this.load(); }
  private load(showLoading = true): void {
    const user = this.session.user();
    if (!this.session.authenticated() || !user) {
      this.requests.set([]);
      this.loading.set(false);
      this.error.set('');
      return;
    }

    if (showLoading) this.loading.set(true);
    this.error.set('');
    this.api.list({ approver: user, status: this.status() || undefined }).subscribe({
      next: data => { this.requests.set(data); this.loading.set(false); },
      error: () => { this.error.set('No fue posible cargar las solicitudes.'); this.loading.set(false); },
    });
  }
}
