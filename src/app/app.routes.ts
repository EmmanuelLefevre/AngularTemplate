import { Routes } from '@angular/router';

import { adminGuard } from '@core/guard/admin/admin.guard';
import { authGuard } from '@core/guard/auth/auth.guard';

export const ROUTES: Routes = [
  // --- PUBLIC AREA ---
  {
    path: '',
    // Public Layout
    loadComponent: () => import(
      '@features/public/public-layout.component')
      .then(m => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import(
          '@features/public/public-views/home/home-view.component')
          .then(m => m.HomeViewComponent),
        data: {
          seo: { titleKey: 'META.PAGES.HOME.TITLE', descriptionKey: 'META.PAGES.HOME.DESCRIPTION' }
        }
      },
      {
        path: 'login',
        loadComponent: () => import(
          '@features/public/public-views/login/login-view.component')
          .then(m => m.LoginViewComponent),
        data: {
          seo: { titleKey: 'META.PAGES.LOGIN.TITLE', descriptionKey: 'META.PAGES.LOGIN.DESCRIPTION' }
        }
      },
      {
        path: 'contact',
        loadComponent: () => import(
          '@features/public/public-views/contact/contact-view.component')
          .then(m => m.ContactViewComponent),
        data: {
          seo: { titleKey: 'META.PAGES.CONTACT.TITLE', descriptionKey: 'META.PAGES.CONTACT.DESCRIPTION' }
        }
      },
      {
        path: 'private',
        loadComponent: () => import(
          './features/private/private.component')
          .then(m => m.PrivateComponent),
        canActivate: [authGuard],
      },
      // Add 'about', 'other views'...

      // --- ERROR MANAGEMENT ---
      {
        path: 'error',
        loadComponent: () => import(
          '@shared/error-handler/error-handler.component')
          .then(m => m.ErrorHandlerComponent),
        data: {
          seo: {
            robots: 'noindex, nofollow'
          }
        },
        children: [
          { path: 'unauthorized-error',
            loadComponent: () => import(
              '@shared/error-handler/error-views/unauthorized-error/unauthorized-error.component')
              .then(m => m.UnauthorizedErrorComponent),
            data: {
              seo: {
                titleKey: 'META.PAGES.ERROR.401.TITLE',
                descriptionKey: 'META.PAGES.ERROR.401.DESCRIPTION',
                robots: 'noindex, nofollow'
              }
            }
          },
          { path: 'unfound-error',
            loadComponent: () => import(
              '@shared/error-handler/error-views/unfound-error/unfound-error.component')
              .then(m => m.UnfoundErrorComponent),
            data: {
              seo: {
                titleKey: 'META.PAGES.ERROR.404.TITLE',
                descriptionKey: 'META.PAGES.ERROR.404.DESCRIPTION',
                robots: 'noindex, nofollow'
              }
            }
          },
          { path: 'server-error',
            loadComponent: () => import(
              '@shared/error-handler/error-views/server-error/server-error.component')
              .then(m => m.ServerErrorComponent),
            data: {
              seo: {
                titleKey: 'META.PAGES.ERROR.500.TITLE',
                descriptionKey: 'META.PAGES.ERROR.500.DESCRIPTION',
                robots: 'noindex, nofollow'
              }
            }
          },
          { path: 'generic-error',
            loadComponent: () => import(
              '@shared/error-handler/error-views/generic-error/generic-error.component')
              .then(m => m.GenericErrorComponent),
            data: {
              seo: {
                titleKey: 'META.PAGES.ERROR.GENERIC.TITLE',
                descriptionKey: 'META.PAGES.ERROR.GENERIC.DESCRIPTION',
                robots: 'noindex, nofollow'
              }
            }
          },
          { path: 'unknown-error',
            loadComponent: () => import(
              '@shared/error-handler/error-views/unknown-error/unknown-error.component')
              .then(m => m.UnknownErrorComponent),
            data: {
              seo: {
                titleKey: 'META.PAGES.ERROR.UNKNOWN.TITLE',
                descriptionKey: 'META.PAGES.ERROR.UNKNOWN.DESCRIPTION',
                robots: 'noindex, nofollow'
              }
            }
          },
          { path: 'timeout-error',
            loadComponent: () => import(
              '@shared/error-handler/error-views/timeout-error/timeout-error.component')
              .then(m => m.TimeoutErrorComponent),
            data: {
              seo: {
                titleKey: 'META.PAGES.ERROR.408.TITLE',
                descriptionKey: 'META.PAGES.ERROR.408.DESCRIPTION',
                robots: 'noindex, nofollow'
              }
            }
          },
          { path: 'maintenance-error',
            loadComponent: () => import(
              '@shared/error-handler/error-views/maintenance-error/maintenance-error.component')
              .then(m => m.MaintenanceErrorComponent),
            data: {
              seo: {
                titleKey: 'META.PAGES.ERROR.503.TITLE',
                descriptionKey: 'META.PAGES.ERROR.503.DESCRIPTION',
                robots: 'noindex, nofollow'
              }
            }
          }
        ]
      },
    ]
  },

  // --- PRIVATE AREA ---
  {
    path: 'admin',
    loadComponent: () => import(
      '@features/admin/admin-layout.component')
      .then(m => m.AdminLayoutComponent),
    canActivate: [adminGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import(
          '@features/admin/components/dashboard/dashboard.component').
          then(m => m.DashboardComponent)
      },
      // {
      //   path: 'users',
      //   loadComponent: () => import('@features/admin/components/users/users.component').then(m => m.UsersComponent)
      // }
    ]
  },

  // --- WILDCARD ROUTE ---
  {
    path: '**',
    redirectTo: '/error/unfound-error'
  }
];
