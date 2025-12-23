export interface NavLink {
  path: string;
  label: string;
  cssClass?: string;
}

export const HEADER_NAV_LINKS: NavLink[] = [
  { path: '/home', label: 'HEADER.WELCOME' },
  { path: '/contact', label: 'HEADER.CONTACT' },
  { path: '/admin', label: 'HEADER.DASHBOARD', cssClass: 'header__item--admin' }
];
