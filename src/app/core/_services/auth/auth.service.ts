import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ENVIRONMENT } from '@env/environment';

import { User } from '@core/_models/user/user.model';
import { AuthResponse, LoginCredentials } from '@core/_models/auth/auth.model';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${ENVIRONMENT.apiUrl}/auth`;

  currentUser = signal<User | null>(null);
  token = signal<string | null>(localStorage.getItem('token'));

  isAuthenticated = computed(() => !!this.currentUser());
  isAdmin = computed(() => this.currentUser()?.roles.includes('ADMIN') ?? false);

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        this.currentUser.set(response.user);
        this.token.set(response.token);
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): void {
    this.currentUser.set(null);
    this.token.set(null);
    localStorage.removeItem('token');
  }

  refreshUser(): Observable<User> | null {
    const CURRENT_TOKEN = this.token();

    if (!CURRENT_TOKEN) return null;

    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap((user) => this.currentUser.set(user))
    );
  }
}
