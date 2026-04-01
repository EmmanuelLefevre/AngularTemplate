import { IEnvironment } from '@core/_models/environment/environment.interface';

export const ENVIRONMENT: IEnvironment = {
  production: false,
  useMocks: true,
  apiUrl: 'http://localhost:3000/api',
  logLevel: 'debug',
  mockAdminPassword: '1234',
  application: {
    name: 'AngularTemplate',
    author: 'Emmanuel Lefevre',
    themeColor: '#ff6b6b',
    defaultShareImage: 'https://angulartemplate.emmanuellefevre.com/assets/logos/logo.png'
  },
  supabase: {
    url: PROCESS.env['NG_APP_SUPABASE_URL'] || '',
    anonKey: PROCESS.env['NG_APP_SUPABASE_ANON_KEY'] || ''
  }
};
