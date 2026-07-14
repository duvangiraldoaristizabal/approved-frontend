import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApprovalApiService } from '../../core/approval-api.service';
import { statusLabel, typeLabel } from '../../core/display-labels';
import type { ApprovalRequest } from '../../core/models';
import { SessionService } from '../../core/session.service';
@Component({ standalone: true, imports: [DatePipe, ReactiveFormsModule, RouterLink], templateUrl: './request-detail.component.html', styleUrl: './request-detail.component.css' })
export class RequestDetailComponent {
  readonly statusLabel = statusLabel;
  readonly typeLabel = typeLabel;
  readonly request = signal<ApprovalRequest | null>(null); readonly loading = signal(true); readonly error = signal(''); readonly saving = signal(false);
  readonly comment = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(1000)] }); private readonly id: string;
  constructor(route: ActivatedRoute, private readonly api: ApprovalApiService, readonly session: SessionService) { this.id = route.snapshot.paramMap.get('id')!; this.load(); }
  decide(status: 'APPROVED' | 'REJECTED'): void {
    this.comment.markAsTouched();
    if (this.comment.invalid) return;
    const user = this.session.user();
    if (!user) return;
    this.saving.set(true);
    this.api.decide(this.id, { status, user, comment: this.comment.value }).subscribe({
      next: value => { this.request.set(value); this.saving.set(false); },
      error: error => { this.error.set(error.error?.message ?? 'No fue posible registrar la decisión.'); this.saving.set(false); },
    });
  }
  private load(): void { this.api.get(this.id).subscribe({ next: value => { this.request.set(value); this.loading.set(false); }, error: () => { this.error.set('Solicitud no encontrada.'); this.loading.set(false); } }); }
}
