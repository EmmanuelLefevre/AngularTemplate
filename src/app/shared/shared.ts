import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { GenericErrorComponent } from './error-handler/error-views/generic-error/generic-error.component';
import { HeaderNavComponent } from './components/header/header-nav.component';
import { MainFooterComponent } from './components/footer/main-footer.component';
import { ServerErrorComponent } from './error-handler/error-views/server-error/server-error.component';
import { UnauthorizedErrorComponent } from './error-handler/error-views/unauthorized-error/unauthorized-error.component';
import { UnfoundErrorComponent } from './error-handler/error-views/unfound-error/unfound-error.component';
import { UnknownErrorComponent } from './error-handler/error-views/unknown-error/unknown-error.component';

import { InputFocusDirective } from './_directives/input-focus/input-focus.directive';
import { InputTrimDirective } from './_directives/input-trim/input-trim.directive';

import { AlertPipe } from './_pipes/alert/alert.pipe';

export * from './error-handler/error-handler.component';
export * from './error-handler/error-views/generic-error/generic-error.component';
export * from './components/header/header-nav.component';
export * from './components/footer/main-footer.component';
export * from './error-handler/error-views/generic-error/generic-error.component';
export * from './error-handler/error-views/server-error/server-error.component';
export * from './error-handler/error-views/unauthorized-error/unauthorized-error.component';
export * from './error-handler/error-views/unfound-error/unfound-error.component';
export * from './error-handler/error-views/unknown-error/unknown-error.component';

export * from './_directives/input-focus/input-focus.directive';
export * from './_directives/input-trim/input-trim.directive';

export * from './_pipes/alert/alert.pipe';

export const SHARED_COMPONENTS = [
  ErrorHandlerComponent,
  GenericErrorComponent,
  HeaderNavComponent,
  MainFooterComponent,
  ServerErrorComponent,
  UnauthorizedErrorComponent,
  UnfoundErrorComponent,
  UnknownErrorComponent
] as const;

export const SHARED_DIRECTIVES = [
  InputFocusDirective,
  InputTrimDirective
] as const;

export const SHARED_PIPES = [
  AlertPipe
] as const;

export const SHARED_UTILS = [
  // MyUtils
] as const;


export const SHARED_ALL = [
  ...SHARED_COMPONENTS,
  ...SHARED_DIRECTIVES,
  ...SHARED_PIPES,
  ...SHARED_UTILS
] as const;

