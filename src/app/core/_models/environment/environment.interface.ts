export interface IEnvironment {
  production: boolean;
  useMocks: boolean;
  apiUrl: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  mockAdminPassword?: string;
  application: {
    name: string;
    author: string;
    mainDescription: string;
    keywords: string;
    themeColor: string;
    defaultShareImage: string;
  };
}
