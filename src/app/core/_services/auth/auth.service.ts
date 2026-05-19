import { inject, Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User as SupabaseUser } from '@supabase/supabase-js';

import { SnackbarService } from '@core/_services/snackbar/snackbar.service';
import { SupabaseService } from '@core/_services/supabase/supabase.service';

import { User as AppUser } from '@core/_models/user/user.model';
import { LoginCredentials, RegisterCredentials } from '@core/_models/auth/auth.model';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private readonly router = inject(Router);
  private readonly snackbarService = inject(SnackbarService);
  private readonly supabase = inject(SupabaseService).client;

  public readonly currentUser = signal<AppUser | null | undefined>(undefined);
  public readonly isAdmin = computed(() => this.currentUser()?.roles?.includes('ADMIN') ?? false);
  public readonly isAuthenticated = computed(() => !!this.currentUser());
  public readonly isAuthLoaded = computed(() => this.currentUser() !== undefined);

  constructor() {
    this.supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        this.currentUser.set(this.mapUser(session.user));
      }
      else {
        this.currentUser.set(null);
      }
    });
  }

  initAuth(): Observable<AppUser | null> {
    return from(this.supabase.auth.getUser()).pipe(
      map(({ data, error }) => {
        if (error || !data.user) {
          return null;
        }

        return this.mapUser(data.user);
      }),
      tap((user) => this.currentUser.set(user)),
      catchError(() => {
        this.currentUser.set(null);
        return of(null);
      })
    );
  }

  login(credentials: LoginCredentials): Observable<AppUser> {
    return from(
      this.supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }

        return this.mapUser(data.user!);
      }),
      tap((user) => this.currentUser.set(user))
    );
  }

  logout(): void {
    const USERNAME = this.currentUser()?.username || '';

    from(this.supabase.auth.signOut()).subscribe({
      next: () => {
        this.clearSession();

        this.snackbarService.showNotification(
          'UI.SNACKBAR.AUTH.LOGOUT.SUCCESS',
          'logIn-logOut',
          { username: USERNAME }
        );
      },
      error: () => {
        this.clearSession();

        this.snackbarService.showNotification(
          'UI.SNACKBAR.AUTH.LOGOUT.SUCCESS',
          'logIn-logOut',
          { username: USERNAME }
        );
      },
    });
  }

  register(credentials: RegisterCredentials): Observable<AppUser> {
    return from(
      this.supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            username: credentials.username,
            display_name: credentials.username,
          },
        },
      })
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }

        if (!data.user) {
          throw new Error('No user returned');
        }

        return this.mapUser(data.user);
      }),
      tap((user) => this.currentUser.set(user))
    );
  }

  private clearSession(): void {
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  private mapUser(sbUser: SupabaseUser): AppUser {
    return {
      id: sbUser.id,
      email: sbUser.email ?? '',
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      username: sbUser.user_metadata['username'] ?? sbUser.email?.split('@')[0] ?? 'Anonyme',
      roles: sbUser.app_metadata?.['roles'] ?? sbUser.user_metadata?.['roles'] ?? []
    } as AppUser;
  }
}
