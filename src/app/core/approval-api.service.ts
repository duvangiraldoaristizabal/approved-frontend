import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import type { ApprovalRequest, CreateRequest, RequestStatus } from './models';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class ApprovalApiService {
  private readonly baseUrl = 'http://localhost:3000/api/v1';
  private readonly tokenByUser = new Map<string, string>();

  constructor(private readonly http: HttpClient, private readonly session: SessionService) {}

  login(username: string, password: string): Observable<{ token: string; user: string }> {
    return this.http.post<{ token: string; user: string }>(`${this.baseUrl}/auth/login`, { username, password }).pipe(
      map(({ token, user }) => {
        this.tokenByUser.set(user, token);
        this.session.login(user, token);
        return { token, user };
      }),
    );
  }

  list(filters: { approver?: string; status?: RequestStatus } = {}): Observable<ApprovalRequest[]> {
    return this.authorizedRequest((headers) => {
      let params = new HttpParams();
      Object.entries(filters).forEach(([key, value]) => { if (value) params = params.set(key, value); });
      return this.http.get<ApprovalRequest[]>(`${this.baseUrl}/requests`, { params, headers });
    });
  }

  get(id: string): Observable<ApprovalRequest> {
    return this.authorizedRequest((headers) => this.http.get<ApprovalRequest>(`${this.baseUrl}/requests/${id}`, { headers }));
  }

  create(body: CreateRequest): Observable<ApprovalRequest> {
    return this.authorizedRequest((headers) => this.http.post<ApprovalRequest>(`${this.baseUrl}/requests`, body, { headers }));
  }

  decide(id: string, body: { status: 'APPROVED' | 'REJECTED'; user: string; comment: string }): Observable<ApprovalRequest> {
    return this.authorizedRequest((headers) => this.http.patch<ApprovalRequest>(`${this.baseUrl}/requests/${id}/decision`, body, { headers }));
  }

  private authorizedRequest<T>(operation: (headers: HttpHeaders) => Observable<T>): Observable<T> {
    return this.ensureToken().pipe(switchMap((token) => operation(new HttpHeaders({ Authorization: `Bearer ${token}` }))));
  }

  private ensureToken(): Observable<string> {
    const user = this.session.user();
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const cachedToken = this.tokenByUser.get(user);
    if (cachedToken) return of(cachedToken);

    const token = this.session.token();
    if (token) return of(token);

    return this.login(user, user).pipe(map(({ token }) => token));
  }
}
