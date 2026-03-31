import { HttpClient, HttpContext } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { ENVIRONMENT } from '@env/environment';

import { User } from '@core/_models/user/user.model';
import { LoginCredentials } from '@core/_models/auth/auth.model';
import { BYPASS_GLOBAL_ERROR } from '@core/interceptors/error/error.interceptor';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${ENVIRONMENT.apiUrl}/auth`;
  private readonly router = inject(Router);

  public readonly currentUser = signal<User | null | undefined>(undefined);
  public readonly isAdmin = computed(() => this.currentUser()?.roles.includes('ADMIN') ?? false);
  public readonly isAuthenticated = computed(() => !!this.currentUser());
  public readonly isAuthLoaded = computed(() => this.currentUser() !== undefined);

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((user) => this.currentUser.set(user))
    );
  }

  initAuth(): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/me`, {
      withCredentials: true,
      context: new HttpContext().set(BYPASS_GLOBAL_ERROR, true)
    }).pipe(
      tap((user) => this.currentUser.set(user)),
      catchError(() => {
        this.currentUser.set(null);
        return of(null);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession()
    });
  }

  private clearSession(): void {
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }
}
