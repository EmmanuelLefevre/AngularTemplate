/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { SupabaseService } from '@core/_services/supabase/supabase.service';
import { User as AppUser } from '@core/_models/user/user.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {

  let router: Router;
  let service: AuthService;
  let supabaseServiceMock: any;

  const MOCK_USER: AppUser = { id: '123-uuid', username: 'TestUser', email: 'test@test.com', roles: [] };

  beforeEach(() => {

    const SUPABASE_AUTH_MOCK = {
      onAuthStateChange: vi.fn((callback) => {
        callback('INITIAL_SESSION', { session: null });
        return { data: { subscription: { unsubscribe: vi.fn() } } };
      }),
      getUser: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn()
    };

    supabaseServiceMock = {
      client: {
        auth: SUPABASE_AUTH_MOCK
      }
    };

    const ROUTER_MOCK = {
      navigate: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: SupabaseService, useValue: supabaseServiceMock },
        { provide: Router, useValue: ROUTER_MOCK }
      ]
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initialization & State Changes', () => {
    it('should initialize auth and set currentUser on success', () => {
      // --- ARRANGE ---
      supabaseServiceMock.client.auth.getUser.mockResolvedValue({
        data: { user: { id: '123-uuid', email: 'test@test.com', user_metadata: { username: 'TestUser' } } },
        error: null
      });

      // --- ACT ---
      service.initAuth().subscribe((user) => {
        // --- ASSERT ---
        expect(user).toEqual(MOCK_USER);
        expect(service.currentUser()).toEqual(MOCK_USER);
      });
    });

    it('should return null in initAuth if no user is found in data', () => {
      // --- ARRANGE ---
      supabaseServiceMock.client.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: null
      });

      // --- ACT & ASSERT ---
      service.initAuth().subscribe((user) => {
        expect(user).toBeNull();
        expect(service.currentUser()).toBeNull();
      });
    });

    it('should set currentUser to null if initAuth fails', () => {
      // --- ARRANGE ---
      supabaseServiceMock.client.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: new Error('Auth error')
      });

      // --- ACT ---
      service.initAuth().subscribe((result) => {
        // --- ASSERT ---
        expect(result).toBeNull();
        expect(service.currentUser()).toBeNull();
      });
    });

    it('should handle a fatal crash in initAuth', async() => {
      // --- ARRANGE ---
      supabaseServiceMock.client.auth.getUser.mockRejectedValue(new Error('Fatal crash'));

      // --- ACT ---
      const result = await firstValueFrom(service.initAuth());

      // --- ASSERT ---
      expect(result).toBeNull();
      expect(service.currentUser()).toBeNull();
    });

    it('should update currentUser when auth state changes to SIGNED_IN', () => {
      // --- ARRANGE ---
      const authCallback = supabaseServiceMock.client.auth.onAuthStateChange.mock.calls[0][0];
      const mockSession = { user: { id: '123-uuid', email: 'test@test.com', user_metadata: { username: 'NewName' } } };

      // --- ACT ---
      authCallback('SIGNED_IN', mockSession);

      // --- ASSERT ---
      expect(service.currentUser()?.username).toBe('NewName');
    });

    it('should set currentUser to null when auth state changes to SIGNED_OUT', () => {
      // --- ARRANGE ---
      const authCallback = supabaseServiceMock.client.auth.onAuthStateChange.mock.calls[0][0];
      service.currentUser.set(MOCK_USER);

      // --- ACT ---
      authCallback('SIGNED_OUT', null);

      // --- ASSERT ---
      expect(service.currentUser()).toBeNull();
    });
  });

  describe('Authentication Actions', () => {
    describe('Login', () => {
      it('should login with credentials and update signal', async() => {
        // --- ARRANGE ---
        const credentials = { email: 'test@test.com', password: 'password' };
        supabaseServiceMock.client.auth.signInWithPassword.mockResolvedValue({
          data: { user: { id: '123-uuid', email: 'test@test.com', user_metadata: { username: 'TestUser' } } },
          error: null
        });

        // --- ACT ---
        service.login(credentials).subscribe((user) => {
          // --- ASSERT ---
          expect(user).toEqual(MOCK_USER);
          expect(service.currentUser()).toEqual(MOCK_USER);
          expect(supabaseServiceMock.client.auth.signInWithPassword).toHaveBeenCalledWith({
            email: credentials.email,
            password: credentials.password
          });
        });
      });

      it('should throw an error in login if supabase returns an error', async() => {
        // --- ARRANGE ---
        const errorMock = { message: 'Invalid credentials' };
        const credentials = { email: 'wrong@test.com', password: '123' };

        supabaseServiceMock.client.auth.signInWithPassword.mockResolvedValue({
          data: { user: null },
          error: errorMock
        });

        // --- ACT & ASSERT ---
        await expect(firstValueFrom(service.login(credentials)))
          .rejects.toEqual(errorMock);

        expect(service.currentUser()).not.toEqual(MOCK_USER);
      });
    });

    describe('Register', () => {
      it('should call register and update signal', () => {
        // --- ARRANGE ---
        const regData = { email: 'test@test.com', password: 'password', username: 'TestUser' };
        supabaseServiceMock.client.auth.signUp.mockResolvedValue({
          data: { user: { id: '123-uuid', email: 'test@test.com', user_metadata: { username: 'TestUser' } } },
          error: null
        });

        // --- ACT ---
        service.register(regData).subscribe((user) => {
          // --- ASSERT ---
          expect(user).toEqual(MOCK_USER);
          expect(service.currentUser()).toEqual(MOCK_USER);
          expect(supabaseServiceMock.client.auth.signUp).toHaveBeenCalled();
        });
      });

      it('should throw an error in register if no user is returned', async() => {
        // --- ARRANGE ---
        supabaseServiceMock.client.auth.signUp.mockResolvedValue({
          data: { user: null },
          error: null
        });

        // --- ACT & ASSERT ---
        await expect(firstValueFrom(service.register({ email: 't@t.com', password: '1', username: 'u' })))
          .rejects.toThrow('No user returned');
      });

      it('should throw error in register if supabase returns an error', () => {
        // --- ARRANGE ---
        const errorMock = { message: 'Email already exists' };
        supabaseServiceMock.client.auth.signUp.mockResolvedValue({
          data: { user: null },
          error: errorMock
        });

        // --- ACT & ASSERT ---
        service.register({ email: 'err@test.com', password: '123', username: 'u' }).subscribe({
          error: (err) => {
            expect(err).toEqual(errorMock);
          }
        });
      });
    });
  });

  describe('Session Management', () => {
    it('should call Supabase logout, clear session and navigate', async() => {
      // --- ARRANGE ---
      service.currentUser.set(MOCK_USER);
      supabaseServiceMock.client.auth.signOut.mockResolvedValue({ error: null });

      // --- ACT ---
      service.logout();

      await new Promise(resolve => setTimeout(resolve, 0));

      // --- ASSERT ---
      expect(supabaseServiceMock.client.auth.signOut).toHaveBeenCalled();
      expect(service.currentUser()).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should clear session even if signOut fails (error branch)', async() => {
      // --- ARRANGE ---
      service.currentUser.set(MOCK_USER);
      supabaseServiceMock.client.auth.signOut.mockRejectedValue(new Error('Logout Error'));

      // --- ACT ---
      service.logout();
      await new Promise(resolve => setTimeout(resolve, 0));

      // --- ASSERT ---
      expect(service.currentUser()).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('User Mapping', () => {
    it('should fallback to email prefix if username metadata is missing', () => {
      // --- ARRANGE ---
      const userNoMetadata = {
        id: '123',
        email: 'grower@logic.com',
        user_metadata: {}
      };

      // --- ACT ---
      const mapped = (service as any).mapUser(userNoMetadata);

      // --- ASSERT ---
      expect(mapped.username).toBe('grower');
    });

    it('should fallback to Anonyme if email and metadata are missing', () => {
      // --- ARRANGE ---
      const ghostUser = {
        id: '123',
        email: null,
        user_metadata: {}
      };

      // --- ACT ---
      const mapped = (service as any).mapUser(ghostUser);

      // --- ASSERT ---
      expect(mapped.username).toBe('Anonyme');
    });

    it('should map roles from app_metadata or user_metadata', () => {
      // --- ARRANGE ---
      const userWithRoles = {
        id: '123',
        email: 'admin@logic.com',
        user_metadata: {},
        app_metadata: { roles: ['ADMIN', 'SUPER_ADMIN'] }
      };

      // --- ACT ---
      const mapped = (service as any).mapUser(userWithRoles);

      // --- ASSERT ---
      expect(mapped.roles).toEqual(['ADMIN', 'SUPER_ADMIN']);
    });
  });

  describe('Computed Signals: Core', () => {
    it('should correctly compute isAuthenticated', () => {
      // --- ARRANGE & ACT (Unauthenticated case) ---
      service.currentUser.set(null);

      // --- ASSERT ---
      expect(service.isAuthenticated()).toBe(false);

      // --- ARRANGE & ACT (Authenticated case) ---
      service.currentUser.set(MOCK_USER);

      // --- ASSERT ---
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should correctly compute isAuthLoaded', () => {
      // --- ARRANGE & ACT (Initial state: undefined) ---
      (service.currentUser as any).set(undefined);
      // --- ASSERT ---
      expect(service.isAuthLoaded()).toBe(false);

      // --- ARRANGE & ACT (Loaded but null) ---
      service.currentUser.set(null);
      // --- ASSERT ---
      expect(service.isAuthLoaded()).toBe(true);

      // --- ARRANGE & ACT (Loaded with user) ---
      service.currentUser.set(MOCK_USER);
      // --- ASSERT ---
      expect(service.isAuthLoaded()).toBe(true);
    });
  });

  describe('Computed Signals: Admin Roles', () => {
    it('should return false if no user is connected', () => {
      // --- ARRANGE ---
      service.currentUser.set(null);

      // --- ACT ---
      const IS_ADMIN = service.isAdmin();

      // --- ASSERT ---
      expect(IS_ADMIN).toBe(false);
    });

    it('should return false if user does not have ADMIN role', () => {
      // --- ARRANGE ---
      service.currentUser.set({ ...MOCK_USER, roles: ['USER'] });

      // --- ACT ---
      const IS_ADMIN = service.isAdmin();

      // --- ASSERT ---
      expect(IS_ADMIN).toBe(false);
    });

    it('should return true if user has ADMIN role', () => {
      // --- ARRANGE ---
      service.currentUser.set({ ...MOCK_USER, roles: ['ADMIN', 'USER'] });

      // --- ACT ---
      const IS_ADMIN = service.isAdmin();

      // --- ASSERT ---
      expect(IS_ADMIN).toBe(true);
    });
  });
});
