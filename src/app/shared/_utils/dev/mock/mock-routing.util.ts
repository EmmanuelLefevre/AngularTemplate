import { inject, Signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

const URL_PATH_INDEX = 0;

export function injectIsHomeRoute(): Signal<boolean> {
  const router = inject(Router);

  const checkIfHome = (url: string): boolean => {
    const path = url.split('?')[URL_PATH_INDEX];
    return path === '/' || path === '/home';
  };

  return toSignal(
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => checkIfHome(router.url))
    ),
    { initialValue: checkIfHome(router.url) }
  );
}
