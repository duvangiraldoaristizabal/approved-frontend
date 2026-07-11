import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type { ApprovalRequest, CreateRequest, RequestStatus } from './models';

@Injectable({ providedIn: 'root' })
export class ApprovalApiService {
  private readonly baseUrl = 'http://localhost:3000/api/v1';
  constructor(private readonly http: HttpClient) {}
  list(filters: { approver?: string; status?: RequestStatus } = {}): Observable<ApprovalRequest[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => { if (value) params = params.set(key, value); });
    return this.http.get<ApprovalRequest[]>(`${this.baseUrl}/requests`, { params });
  }
  get(id: string) { return this.http.get<ApprovalRequest>(`${this.baseUrl}/requests/${id}`); }
  create(body: CreateRequest) { return this.http.post<ApprovalRequest>(`${this.baseUrl}/requests`, body); }
  decide(id: string, body: { status: 'APPROVED' | 'REJECTED'; user: string; comment: string }) {
    return this.http.patch<ApprovalRequest>(`${this.baseUrl}/requests/${id}/decision`, body);
  }
}
