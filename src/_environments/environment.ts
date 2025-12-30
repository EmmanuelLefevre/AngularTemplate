export const ENVIRONMENT = {
  production: false,
  useMocks: true,
  apiUrl: 'http://localhost:3000/api',
  logLevel: 'debug',
  mockAdminPassword: import.meta.env['VITE_MOCK_ADMIN_PWD'] || 'default_if_missing'
};
