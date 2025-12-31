export const ENVIRONMENT = {
  production: false,
  useMocks: true,
  apiUrl: 'http://localhost:3000/api',
  logLevel: 'debug',
  mockAdminPassword: import.meta.env['VITE_MOCK_ADMIN_PWD'] || '1234',
  application: {
    name: 'AngularTemplate',
    author: 'Emmanuel Lefevre',
    mainDescription: 'Template Angular 21 avec CI/CD, SEO, i18n et plus',
    keywords: 'angular, template, seo, i18n, vitest, pnpm',
    themeColor: '#ff6b6b',
    defaultShareImage: 'https://angulartemplate.emmanuellefevre.com/assets/logos/logo.png'
  }
};
