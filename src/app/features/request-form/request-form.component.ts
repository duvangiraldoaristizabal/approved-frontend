import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApprovalApiService } from '../../core/approval-api.service';
import type { RequestType } from '../../core/models';
import { SessionService } from '../../core/session.service';
@Component({ standalone: true, imports: [ReactiveFormsModule, RouterLink], templateUrl: './request-form.component.html', styleUrl: './request-form.component.css' })
export class RequestFormComponent {
  readonly saving = signal(false); readonly error = signal(''); readonly form;
  constructor(fb: FormBuilder, private readonly api: ApprovalApiService, private readonly router: Router, session: SessionService) { this.form = fb.nonNullable.group({ title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]], description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]], requester: [session.user(), [Validators.required, Validators.minLength(3)]], approver: ['', [Validators.required, Validators.minLength(3)]], type: ['DEPLOYMENT' as RequestType, Validators.required] }); }
  submit(): void { this.form.markAllAsTouched(); if (this.form.invalid) return; this.saving.set(true); this.error.set(''); this.api.create(this.form.getRawValue()).subscribe({ next: created => this.router.navigate(['/requests', created.id]), error: () => { this.error.set('No fue posible crear la solicitud. Verifique los datos.'); this.saving.set(false); } }); }
}
