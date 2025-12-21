import { HeaderNavComponent } from './components/header/header-nav.component';
import { MainFooterComponent } from './components/footer/main-footer.component';

import { InputFocusDirective } from './_directives/input-focus/input-focus.directive';
import { InputTrimDirective } from './_directives/input-trim/input-trim.directive';

import { AlertPipe } from './_pipes/alert/alert.pipe';

export * from './components/header/header-nav.component';
export * from './components/footer/main-footer.component';
export * from './_directives/input-focus/input-focus.directive';
export * from './_directives/input-trim/input-trim.directive';
export * from './_pipes/alert/alert.pipe';

export const SHARED_COMPONENTS = [
  HeaderNavComponent,
  MainFooterComponent
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

