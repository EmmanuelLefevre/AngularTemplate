// --- Errors Management
export { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
export { GenericErrorComponent } from './error-handler/error-views/generic-error/generic-error.component';
import { GenericErrorComponent } from './error-handler/error-views/generic-error/generic-error.component';
export { ServerErrorComponent } from './error-handler/error-views/server-error/server-error.component';
import { ServerErrorComponent } from './error-handler/error-views/server-error/server-error.component';
export { UnauthorizedErrorComponent } from './error-handler/error-views/unauthorized-error/unauthorized-error.component';
import { UnauthorizedErrorComponent } from './error-handler/error-views/unauthorized-error/unauthorized-error.component';
export { UnfoundErrorComponent } from './error-handler/error-views/unfound-error/unfound-error.component';
import { UnfoundErrorComponent } from './error-handler/error-views/unfound-error/unfound-error.component';
export { UnknownErrorComponent } from './error-handler/error-views/unknown-error/unknown-error.component';
import { UnknownErrorComponent } from './error-handler/error-views/unknown-error/unknown-error.component';

// --- Layout Components
export { HeaderNavComponent } from './components/header/header-nav.component';
import { HeaderNavComponent } from './components/header/header-nav.component';
export { MainFooterComponent } from './components/footer/main-footer.component';
import { MainFooterComponent } from './components/footer/main-footer.component';

// --- UI
export { LanguageToggleComponent } from './components/language-toggle/language-toggle.component';
import { LanguageToggleComponent } from './components/language-toggle/language-toggle.component';
export { MainButtonComponent } from './components/button/main-button.component';
import { MainButtonComponent } from './components/button/main-button.component';

// --- DEV
export { MockAdminLoginButtonComponent } from './components/dev/mock-admin-login-button/mock-admin-login-button.component';
import { MockAdminLoginButtonComponent } from './components/dev/mock-admin-login-button/mock-admin-login-button.component';

// --- Directives
export { InputFocusDirective } from './_directives/input-focus/input-focus.directive';
import { InputFocusDirective } from './_directives/input-focus/input-focus.directive';
export { InputTrimDirective } from './_directives/input-trim/input-trim.directive';
import { InputTrimDirective } from './_directives/input-trim/input-trim.directive';
export { InputUppercaseDirective } from './_directives/input-uppercase/input-uppercase.directive';
import { InputUppercaseDirective } from './_directives/input-uppercase/input-uppercase.directive';

// --- Pipes
export { AlertPipe } from './_pipes/alert/alert.pipe';
import { AlertPipe } from './_pipes/alert/alert.pipe';
export { DateFormatPipe } from './_pipes/date/date-format.pipe';
import { DateFormatPipe } from './_pipes/date/date-format.pipe';
export { YesNoPipe } from './_pipes/yes-no/yes-no.pipe';
import { YesNoPipe } from './_pipes/yes-no/yes-no.pipe';

// --- Utils

export const SHARED_ERRORS_COMPONENTS = [
  ErrorHandlerComponent,
  GenericErrorComponent,
  ServerErrorComponent,
  UnauthorizedErrorComponent,
  UnfoundErrorComponent,
  UnknownErrorComponent
] as const;

export const SHARED_LAYOUT_COMPONENTS = [
  HeaderNavComponent,
  MainFooterComponent,
] as const;

export const SHARED_UI_COMPONENTS = [
  LanguageToggleComponent,
  MainButtonComponent,
] as const;

export const SHARED_DEV_COMPONENTS = [
  MockAdminLoginButtonComponent,
] as const;

export const SHARED_DIRECTIVES = [
  InputFocusDirective,
  InputTrimDirective,
  InputUppercaseDirective
] as const;

export const SHARED_PIPES = [
  AlertPipe,
  DateFormatPipe,
  YesNoPipe
] as const;

export const SHARED_UTILS = [
  // My utils...
] as const;
