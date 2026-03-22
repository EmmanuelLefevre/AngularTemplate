import { IEnvironment } from '@core/_models/environment/environment.interface';

export const ENVIRONMENT: IEnvironment = {
  production: true,
  useMocks: false,
  apiUrl: 'https://api.your-domain.com/api',
  logLevel: 'error',
  application: {
    name: 'AngularTemplate',
    author: 'Emmanuel Lefevre',
    keywords: 'angular, template, seo, i18n, vitest, pnpm',
    themeColor: '#ff6b6b',
    defaultShareImage: 'https://angulartemplate.emmanuellefevre.com/assets/logos/logo.png'
  }
};
