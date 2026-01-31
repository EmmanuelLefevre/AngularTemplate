var ROUTES_INDEX = {
  name: '<root>',
  kind: 'module',
  children: [
    { name: 'home', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'login', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'contact', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'private', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'admin', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'dashboard', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'error', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'unauthorized-error', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'unfound-error', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'server-error', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'generic-error', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'unknown-error', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: '**', kind: 'route-path', filename: 'src/app/app.routes.ts' },
    { name: 'home', kind: 'route-redirect', filename: 'src/app/app.routes.ts' },
    { name: '/error/unfound-error', kind: 'route-redirect', filename: 'src/app/app.routes.ts' }
  ]
};
