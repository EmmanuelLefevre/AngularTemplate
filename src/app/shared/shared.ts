// ========== EXPORTS ==========
// --- Errors Management
export * from './error-handler/error-handler.component';
export * from './error-handler/error-views/generic-error/generic-error.component';
export * from './error-handler/error-views/server-error/server-error.component';
export * from './error-handler/error-views/unauthorized-error/unauthorized-error.component';
export * from './error-handler/error-views/unfound-error/unfound-error.component';
export * from './error-handler/error-views/unknown-error/unknown-error.component';

// --- Layout Components
export * from './components/footer/main-footer.component';
export * from './components/header/header-nav.component';

// --- UI
export * from './components/language-toggle/language-toggle.component';

// --- Directives
export * from './_directives/input-focus/input-focus.directive';
export * from './_directives/input-trim/input-trim.directive';
export * from './_directives/input-uppercase/input-uppercase.directive';

// --- Pipes
export * from './_pipes/alert/alert.pipe';
export * from './_pipes/date/date-format.pipe';
export * from './_pipes/yes-no/yes-no.pipe';

// ========== IMPORTS ==========
// --- Errors Management
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { GenericErrorComponent } from './error-handler/error-views/generic-error/generic-error.component';
import { ServerErrorComponent } from './error-handler/error-views/server-error/server-error.component';
import { UnauthorizedErrorComponent } from './error-handler/error-views/unauthorized-error/unauthorized-error.component';
import { UnfoundErrorComponent } from './error-handler/error-views/unfound-error/unfound-error.component';
import { UnknownErrorComponent } from './error-handler/error-views/unknown-error/unknown-error.component';

// --- Layout Components
import { HeaderNavComponent } from './components/header/header-nav.component';
import { MainFooterComponent } from './components/footer/main-footer.component';

// --- UI
import { LanguageToggleComponent } from './components/language-toggle/language-toggle.component';

// --- Directives
import { InputFocusDirective } from './_directives/input-focus/input-focus.directive';
import { InputTrimDirective } from './_directives/input-trim/input-trim.directive';
import { InputUppercaseDirective } from './_directives/input-uppercase/input-uppercase.directive';

// --- Pipes
import { AlertPipe } from './_pipes/alert/alert.pipe';
import { DateFormatPipe } from './_pipes/date/date-format.pipe';
import { YesNoPipe } from './_pipes/yes-no/yes-no.pipe';

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
  // MyUtils
] as const;
