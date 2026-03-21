<h1 align="center">🧪 TESTS 🧪</h1>

<br>
<br>

<h2>
  <img
    alt="VITEST"
    title="VITEST"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/vitest.png"
  />
  VITEST
</h2>

Activer le nouveau système de tests unitaires natif d'**Angular**. Ce builder moderne remplace l'ancienne stack (basée sur **Karma**) pour offrir une exécution nettement plus rapide et légère, tout en s'alignant sur l'architecture de build actuelle (`esbuild`). Il isole la compilation des tests via le fichier `tsconfig.spec.json`.  

**Etape 1 :** Installer les librairies requises  

```shell
pnpm add -D vitest jsdom
pnpm add -D @angular/platform-browser-dynamic
pnpm add -D @analogjs/vite-plugin-angular
pnpm add -D @analogjs/vitest-angular
pnpm add -D @types/node
pnpm add -D vite-tsconfig-paths
```

**Etape 2 :** Dans `tsconfig.spec.json` remplacer la configuration présente par celle-ci dans la propriété `@compilerOptions`.  

```JSON
"compilerOptions": {
  "outDir": "./out-tsc/spec",
  "rootDir": "./src",
  "module": "ESNext",
  "moduleResolution": "Bundler",
  "types": [
    "vitest",
    "vitest/globals",
    "vitest/importMeta",
    "vite/client",
    "node"
  ]
}
```

**Etape 3 :** Dans `angular.json` ajouter la propriété `test` dans `@architect`.  

```JSON
"test": {
  "builder": "@analogjs/vitest-angular:test",
  "options": {
    "configFile": "vitest.config.ts"
  }
},
```

**Etape 4 (Optionnel) :** Installer l'interface graphique de **Vitest**.  

**Vitest** possède une interface web agréable pour visualiser les tests, voir le code et les logs. C'est bien plus pratique que le terminal.

```shell
pnpm add -D @vitest/ui
```

![Vitest UI](https://github.com/EmmanuelLefevre/MarkdownImg/blob/main/vitest_ui.png.png)  

**Etape 5 :** Installer le package de coverage `@vitest/coverage-v8`

```shell
pnpm add -D @vitest/coverage-v8
```

**Etape 6 :** Créer le fichier `test-setup.ts` dans `src`

```typescript
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { beforeEach } from 'vitest';

getTestBed().resetTestEnvironment();

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()]
  });
});
```

> 📄 Consulter le barrel file des tests : `./src/test-setup.ts`  

**Etape 7 :** Créer le fichier `vitest.config.ts` et y coller la configuration présente dans le template.

Dans `angular.json` ajouter la propriété `coverage` à l'objet `test`.  

```JSON
"test": {
  "builder": "@angular/build:unit-test",
  "options": {
    "coverage": true
  }
},
```

**Etape 8 :** Ajouter les scripts dans `package.json`  

```JSON
{
  "scripts": {
    "test": "ng test",
    "test:coverage": "ng test --coverage --watch=false",
    "test:ui": "vitest --ui",
    "test:watch": "vitest",
  }
}
```

**Etape 9 :** Lancer les tests

- **Via console** SANS coverage  

```shell
pnpm test
```

- **Via console** AVEC coverage  

```shell
pnpm test:coverage
```

- **Via UI** dans le navigateur  

```shell
pnpm test:ui
```

- **Mode Watch**  

```shell
pnpm test:watch
```
