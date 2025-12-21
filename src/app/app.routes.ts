import { Routes } from '@angular/router';

export const routes: Routes = [
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
          .then(m => m.HomeViewComponent)
      },
      // Add 'contact', 'about'
    ]
  },

  // --- PRIVATE AREA ---
  {
    path: 'admin',
    loadComponent: () => import(
      '@features/admin/admin-layout.component').
      then(m => m.AdminLayoutComponent),
    children: [
      /* Admin routes */
    ]
  },

  // --- ERROR MANAGEMENT ---
  {
    path: 'error',
    loadComponent: () => import(
      '@shared/error-handler/error-handler.component')
      .then(m => m.ErrorHandlerComponent),
    children: [
      { path: 'unauthorized-error', loadComponent: () => import(
        '@shared/error-handler/error-views/unauthorized-error/unauthorized-error.component')
        .then(m => m.UnauthorizedErrorComponent)
      },
      { path: 'unfound-error', loadComponent: () => import(
        '@shared/error-handler/error-views/unfound-error/unfound-error.component')
        .then(m => m.UnfoundErrorComponent)
      },
      { path: 'server-error', loadComponent: () => import(
        '@shared/error-handler/error-views/server-error/server-error.component')
        .then(m => m.ServerErrorComponent)
      },
      { path: 'generic-error', loadComponent: () => import(
        '@shared/error-handler/error-views/generic-error/generic-error.component')
        .then(m => m.GenericErrorComponent)
      },
      { path: 'unknown-error', loadComponent: () => import(
        '@shared/error-handler/error-views/unknown-error/unknown-error.component')
        .then(m => m.UnknownErrorComponent)
      }
    ]
  },

  // --- WILDCARD ROUTE ---
  {
    path: '**',
    redirectTo: () => {
    // Could add logic here...
      return 'error/unfound-error';
    }
  }
];
