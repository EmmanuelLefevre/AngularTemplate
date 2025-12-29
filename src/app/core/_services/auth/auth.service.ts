import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ENVIRONMENT } from '@env/environment';

import { User } from '@core/_models/user/user.model';
import { AuthResponse, LoginCredentials } from '@core/_models/auth/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${ENVIRONMENT.apiUrl}/auth`;
  private readonly router = inject(Router);

  currentUser = signal<User | null | undefined>(undefined);
  token = signal<string | null>(localStorage.getItem('token'));

  isAuthenticated = computed(() => !!this.currentUser());
  isAdmin = computed(() => this.currentUser()?.roles.includes('ADMIN') ?? false);

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res && res.user && res.token) {
          this.saveSession(res.token, res.user);
        }
      })
    );
  }

  initAuth(): void {
    const TOKEN = this.token();
    if (TOKEN) {
      this.refreshUser()?.subscribe({
        error: () => this.logout()
      });
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.token.set(null);
    this.router.navigate(['/']);
  }

  refreshUser(): Observable<User> | null {
    if (!this.token()) return null;

    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap((user) => this.currentUser.set(user))
    );
  }

  private saveSession(token: string, user: User): void {
    this.token.set(token);
    this.currentUser.set(user);
    localStorage.setItem('token', token);
  }
}
