<div align="center">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=EmmanuelLefevre.AngularTemplate" alt="Visitors"/>
  &nbsp;&nbsp;<img src="https://img.shields.io/github/last-commit/EmmanuelLefevre/AngularTemplate" alt="Last Commit"/>&nbsp;&nbsp;
  <img src="https://img.shields.io/github/license/EmmanuelLefevre/AngularTemplate" alt="License MIT"/>
</div>

<br>

<div align="center"><a href="https://github.com/EmmanuelLefevre/AngularTemplate/actions"><img src="https://github.com/EmmanuelLefevre/AngularTemplate/actions/workflows/pipeline.yml/badge.svg" alt="CI/CD Pipeline"/></a>&nbsp;&nbsp;<a href="https://sonarcloud.io/api/dashboard?id=emmanuel-lefevre_angular-template"><img src="https://sonarcloud.io/api/project_badges/measure?project=emmanuel-lefevre_angular-template&metric=security_rating" alt="Security Rating"/></a>&nbsp;&nbsp;<a href="https://sonarcloud.io/dashboard?id=emmanuel-lefevre_angular-template"><img src="https://sonarcloud.io/api/project_badges/measure?project=emmanuel-lefevre_angular-template&metric=alert_status" alt="Quality Gate"/></a>&nbsp;&nbsp;<a href="https://sonarcloud.io/dashboard?id=emmanuel-lefevre_angular-template"><img src="https://sonarcloud.io/api/project_badges/measure?project=emmanuel-lefevre_angular-template&metric=coverage" alt="Coverage"/></a></div>

<br>

<br>

<br>

<h1 id="angular-template" align="center">
  <img
    alt="Angular"
    title="Angular"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg"
  />
  ANGULAR TEMPLATE
  <img
    alt="Angular"
    title="Angular"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg"
  />
</h1>

## SOMMAIRE

- [ARCHITECTURE](#-architecture)
- [PNPM](#pnpm)
- [ANGULAR](#angular)
- [NPMRC](#npmrc)
- [ESLINT / PRETTIER](#eslint-prettier)
- [HTMLHINT](#htmlhint)
- [STYLELINT](#stylelint)
- [HUSKY](#husky)
- [TS CONFIG](#ts-config)
- [TESTS](#tests)
- [CI/CD](#ci-cd)
- [DEPENDENCIES](#dependencies)
- [STYLES](#styles)
- [SCHEMATICS](#schematics)
- [CONFIGURATION DE BUILD](#configuration-de-build)
- [MULTI LANGUES](#multi-langues)
- [ERREURS FREQUENTES](#erreurs-frequentes)
- [TOOLING DOCUMENTATIONS](#tooling-documentations)
  - [Prettier Rules](#prettier-rules)
  - [ESLint Rules](#eslint-rules)
  - [HTMLHint Rules](#htmlhint-rules)
  - [StyleLint Rules](#stylelint-rules)
  - [TS Config Rules](#ts-config-rules)
  - [Schematics Rules](#schematics-rules)

## 🏗 ARCHITECTURE

```plaintext
🏗️.github
 ┗ 🤖workflows
   ┗ pipeline.yml
🐶.husky
💻.vscode
🌍public
 ┣ 🛠️manifest.json
 ┣ 🤖robots.txt
 ┣ 🗺️sitemap.xml
📂src
 ┣ 🔄_environments
 ┃ ┣ 🔑environment.prod.sample.ts
 ┃ ┗ 🔑environment.ts
 ┣ 🈸app
 ┃ ┣ 🧠core
 ┃ ┃ ┣ ⚙️_config
 ┃ ┃ ┃ ┣ host-links.constant.ts
 ┃ ┃ ┃ ┣ nav-links.constant.ts
 ┃ ┃ ┃ ┗ social-links.constant.ts
 ┃ ┃ ┣ 🧱_models
 ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📂links
 ┃ ┃ ┃ ┣ 📂seo
 ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┣ 💉_services
 ┃ ┃ ┃ ┣ 🔐auth
 ┃ ┃ ┃ ┃ ┗ 📄auth.service.ts
 ┃ ┃ ┃ ┗ 📈seo
 ┃ ┃ ┃   ┗ 📄seo.service.ts
 ┃ ┃ ┣ 📂guard
 ┃ ┃ ┃ ┗ 📄admin.guard.ts
 ┃ ┃ ┗ 📂interceptor
 ┃ ┃   ┗ 📂auth
 ┃ ┃     ┗ 📄auth.interceptor.ts
 ┃ ┣ 🧩features
 ┃ ┃ ┣ 👔admin
 ┃ ┃ ┃ ┣ ⚙️_config
 ┃ ┃ ┃ ┣ 🧱_models
 ┃ ┃ ┃ ┣ 💉_services
 ┃ ┃ ┃ ┣ 🗃️components
 ┃ ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┃ ┃ ┣ 📄dashboard.component.html
 ┃ ┃ ┃ ┃ ┗ 📄dashboard.component.ts
 ┃ ┃ ┃ ┣ 👁️admin-views
 ┃ ┃ ┃ ┣ 📂settings
 ┃ ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┣ 📄admin-layout.component.html
 ┃ ┃ ┃ ┗ 📄admin-layout.component.ts
 ┃ ┃ ┣ 🔓private
 ┃ ┃ ┃ ┣ ⚙️_config
 ┃ ┃ ┃ ┣ 🧱_models
 ┃ ┃ ┃ ┣ 💉_services
 ┃ ┃ ┃ ┣ 🗃️components
 ┃ ┃ ┃ ┣ 👁️private-views
 ┃ ┃ ┃ ┣ 📄private.component.html
 ┃ ┃ ┃ ┣ 📄private.component.ts
 ┃ ┃ ┃ ┣ 📄private.config.ts
 ┃ ┃ ┃ ┗ 📄private.route.ts
 ┃ ┃ ┗ 😺public
 ┃ ┃   ┣ ⚙️_config
 ┃ ┃   ┣ 🧱_models
 ┃ ┃   ┣ 💉_services
 ┃ ┃   ┣ 🗃️components
 ┃ ┃   ┣ 👁️public-views
 ┃ ┃   ┃ ┣ ✉️contact
 ┃ ┃   ┃ ┗ 🏠home
 ┃ ┃   ┣ 📄public.component.html
 ┃ ┃   ┣ 📄public.component.ts
 ┃ ┃   ┣ 📄public.config.ts
 ┃ ┃   ┗ 📄public.route.ts
 ┃ ┣ ♻️shared
 ┃ ┃ ┣ 🎛️_directives
 ┃ ┃ ┣ ⚗️_pipes
 ┃ ┃ ┣ 🧰_utils
 ┃ ┃ ┣ 🗃️components
 ┃ ┃ ┃ ┣ 📂footer
 ┃ ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ❌error-handler
 ┃ ┃ ┃ ┣ 👁️error-views
 ┃ ┃ ┃ ┃ ┣ 📂server-error
 ┃ ┃ ┃ ┃ ┣ 📂unauthorized-error
 ┃ ┃ ┃ ┃ ┣ 📂unconnected-error
 ┃ ┃ ┃ ┃ ┗ 📂unfound-error
 ┃ ┃ ┃ ┣ 📄error-handler.component.html
 ┃ ┃ ┃ ┗ 📄error-handler.component.ts
 ┃ ┃ ┗ 📄shared.ts
 ┃ ┣ 📄app.component.html
 ┃ ┣ 📄app.component.ts
 ┃ ┣ 📄app.config.ts
 ┃ ┗ 📄app.routes.ts
 ┣ 🖼️assets
 ┃ ┣ ⚙️_config
 ┃ ┣ 💾_data
 ┃ ┣ 🗣️_i18n
 ┃ ┣ 🔡fonts
 ┃ ┣ ✨icons
 ┃ ┣ 📷img
 ┃ ┗ 🏢logos
 ┣ 🎨styles
 ┃ ┣ 📂abstracts
 ┃ ┃ ┣ 🎨_functions.scss
 ┃ ┃ ┣ 🎨_mixins.scss
 ┃ ┃ ┗ 🎨_index.scss
 ┃ ┣ 📂base
 ┃ ┃ ┣ 🎨_animations.scss
 ┃ ┃ ┣ 🎨_fonts.scss
 ┃ ┃ ┣ 🎨_globals.scss
 ┃ ┃ ┣ 🎨_reset.scss
 ┃ ┃ ┣ 🎨_typography.scss
 ┃ ┃ ┗ 🎨_utilities.scss
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 🎨_admin-layout.scss
 ┃ ┃ ┗ 🎨_main-layout.scss
 ┃ ┗ 📂themes
 ┃   ┣ 🎨_light-theme.scss
 ┃   ┣ 🎨_material-overrides.scss
 ┃   ┗ 🎨_theme-variables.scss
 ┣ 📄index.html
 ┣ 📄main.ts
 ┣ 🎨styles.scss
 ┗ 🧪test-setup.ts
📄.....
📄.gitignore
📄.npmrc
📄.stylelintrc.json
📄eslint.config.js
📄LICENSE
📄package.json
📄pnpm-lock.yaml
📄README.md
🛡️sonar-project.properties
🧪.vitest.config.ts
📄.....
```

<h2 id="pnpm">
  <img
    alt="PNPM"
    title="PNPM"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pnpm/pnpm-original-wordmark.svg"
  />
  PNPM
</h2>

Installer **PNPM**.

1. Via le script d'installation (recommandé)  

Cette méthode est recommandée car elle permet d'installer **pnpm** sans dépendre d'une installation spécifique de **Node.js** ce qui facilite les mises à jour.

- Pour **Windows** (**PowerShell**) :

```shell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

- Pour **macOS** et **Linux** :

```shell
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

2. Via **NPM** (méthode classique)  

Si **Node.js** est déjà installé, c'est souvent la méthode la plus simple et la plus rapide.  
Exécuter simplement cette commande dans un terminal :  

```shell
npm install -g pnpm
```

3. Audit de sécurité de **PNPM**

```shell
pnpm audit
```

```shell
pnpm audit --audit-level=high
```

Si problème avec un package, ajouter sa version patchée dans `package.json` =>  

```JSON
"pnpm": {
  "overrides": {
    "qs": ">=6.14.1"
  }
}
```

<h2 id="angular">
  <img
    alt="Angular"
    title="Angular"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg"
  />
  ANGULAR
</h2>

1. Vérifier les versions de la **CLI**

**\* Global :**  (se placer hors projet)

**\* Projet :**  (se placer dans le projet)

```shell
ng version
```

2. Afficher les versions disponibles

**\* Avec tags / versions stables :**

```shell
pnpm view @angular/cli dist-tags
```

**\* Liste complète :**

```shell
pnpm view @angular/cli versions
```

**\* Dernière version :**

```shell
pnpm view @angular/cli version
```

3. Mettre à jour la **CLI Angular** globalement  

```shell
pnpm add -g @angular/cli@21
```

4. Créer le projet  

Lancer la commande suivante. L'option `--package-manager=pnpm` est importante, elle configure directement le projet pour utiliser **pnpm** au lieu de **npm** par défaut.

```shell
ng new mon-projet-angular --style=scss --ssr=true --package-manager=pnpm
```

5. Tableau de compatibilité  

| Angular | Node.js | TypeScript | RxJS |
| :--- | :--- | :--- | :--- |
| **21.0.x** | `^20.19.0` \|\| `^22.12.0` \|\| `^24.0.0` | `>=5.9.0 <6.0.0` | `^6.5.3` \|\| `^7.4.0` |

6. Fixer les dépendances des librairies sauf les correctifs de bugs d'**Angular**  

```shell
pnpm list --depth 0
```

<br>

![Terminal Screen](https://github.com/EmmanuelLefevre/MarkdownImg/blob/main/template_angular_fix_dependencies.png)

<br>

Ici on ferait =>

```JSON
"dependencies": {
  "@angular/common": "~21.0.0",
  "@angular/compiler": "~21.0.0",
  "@angular/core": "~21.0.0",
  "@angular/forms": "~21.0.0",
  "@angular/platform-browser": "21.0.0",
  "@angular/router": "~21.0.0",
  "rxjs": "7.8.2",
  "tslib": "2.8.1"
},
"devDependencies": {
  "@angular/build": "~21.0.1",
  "@angular/cli": "~21.0.1",
  "@angular/compiler-cli": "~21.0.0",
  "jsdom": "27.3.0",
  "typescript": "5.9.3",
  "vitest": "4.0.15"
},
```

**\* Résumé**  

- `^21.0.0` (Caret) = Mises à jour mineures + Patchs (standard Angular).  
- `~21.0.0` (Tilde) = Patchs (bugs) uniquement.  
- `21.0.0` (Sans rien) = Version fixée sans mise à jour possible.  

**\* Dernière étape**  

Une fois le `package.json` modifié avec les tildes (~), ne pas oublier d'enregistrer le fichier et de lancer la commande pour mettre à jour le fichier lock :

```shell
pnpm install
```

<h2 id="npmrc">
  <img
    alt="NPMRC"
    title="NPMRC"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg"
  />
  NPMRC
</h2>

Pour éviter d'avoir à retirer manuellement les "^" à chaque installation d'une nouvelle librairie, il est possible de configurer le projet pour qu'il sauvegarde toujours la version exacte de la librairie installée.  
Créer un fichier nommé `.npmrc` à la racine du projet et ajouter cette ligne :  

```shell
save-exact=true
```

Désormais, si on lance `pnpm add rxjs`, il installera **`"rxjs"`: `"7.8.0"`** au lieu de **`"^7.8.0"`**.

<h2 id="eslint-prettier">
  <img
    alt="ESLint"
    title="ESLint"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg"
  />
    ESLINT / PRETTIER
  <img
    alt="Prettier"
    title="Prettier"
    width="30px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/prettier.png"
  />
</h2>

Pour un projet **Angular** moderne, la combinaison standard de l'industrie est **ESLint** (pour la qualité du code et les erreurs) et **Prettier** (pour le style et le formatage).  

**Etape 1 :** Externaliser et installer **Prettier**  
Bien qu'il y ait une configuration dans `package.json`, il est préférable (Best Practice) d'avoir un fichier de configuration dédié `.prettierrc`.

1. Installer **Prettier**  

```shell
pnpm add -D prettier
```

2. Créer un fichier `.prettierrc.js` à la racine et coller cette config  

```js
export default {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  experimentalTernaries: false,
  htmlWhitespaceSensitivity: 'css',
  importOrder: ['^@angular/(.*)$', '^rxjs', '<THIRD_PARTY_MODULES>', '^@core/(.*)$', '^@shared/(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript', 'classProperties', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  insertPragma: false,
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'angular'
      }
    },
    {
      files: ['*.ts', '**/*.ts'],
      options: {
        parser: 'typescript'
      }
    }
  ],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false
};
```

💡 Une documentation complète est disponible dans le fichier `.prettierrc.js` et ici... [Prettier Rules](#prettier-rules)  

Installer l'extension **Trivago** pour le tri des imports.  

```shell
pnpm add -D @trivago/prettier-plugin-sort-imports
```

Formater le code :  

```shell
pnpm format
```

Formater un fichier précis :  

```shell
pnpm exec prettier --write .prettierrc.js
```

3. Nettoyage : Supprimer le bloc "prettier": { ... } du fichier `package.json` pour éviter les doublons  

4. Créer un fichier `.prettierignore` pour éviter de formater des fichiers inutiles  

```text
**/.git
**/node_modules
*.ts
.angular
.git
.htmlhintrc
angular.json
coverage/
dist/
eslint.config.js
package-lock.json
pnpm-lock.yaml
public/manifest.json
README.md
tsconfig.json
tsconfig.spec.json
yarn.lock
```

**Etape 2 :** Installer **ESLint**  

La méthode officielle et la plus sûre pour **Angular** est d'utiliser les "Schematics". Cela va générer la configuration adaptée à la version 21.  
Pour être sûr à 100%, on peut même ajouter un "flag" pour forcer le gestionnaire.

```shell
ng add @angular-eslint/schematics --package-manager=pnpm
```

**\* Note :** Si on demande quel gestionnaire utiliser, confirmer celui déjà choisi (**PNPM**, **Yarn**...). Ici **PNPM**. Cette commande va ajouter les dépendances eslint et créer un fichier de configuration (`eslint.config.js` pour les versions modernes utilisant le "Flat Config").

**Etape 3 :** Empêcher les conflits (**ESLint** vs **Prettier**)  

**ESLint** a aussi des règles de formatage qui peuvent contredire **Prettier**. Il faut désactiver ces règles côté **ESLint**.

1. Installer la config de compatibilité  

```shell
pnpm add -D eslint-config-prettier
```

2. Installer **ESLint** et **Angular ESLint**  

```shell
pnpm add -D eslint angular-eslint
```

3. Installer les `stylistics`  

[Stylistics Documentation Rules](https://eslint.style/rules/brace-style)  

```shell
pnpm add -D @stylistic/eslint-plugin
```

4. Installer le plugin `security`  

```shell
pnpm add -D eslint-plugin-security
```

5. Configurer **ESLint**  

Ouvrir le fichier `eslint.config.js` (qui vient d'être créé à la racine).  

Voici à quoi cela devrait ressembler (simplifié) :  

**\* Note :** Prettier ne sera pas ajouté automatiquement il faut le faire manuellement comme indiqué ci dessous.  

```js
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'eslint/config';

import angular from 'angular-eslint';
import eslint from '@eslint/js';
// @ts-expect-error
import securityPlugin from 'eslint-plugin-security';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
    // GLOBAL IGNORES ----------
  {
    ignores: [
      '.angular/',
      'dist/',
      'node_modules/'
    ]
  },
  // TS ----------
  {
    files: ['**/*.ts'],
    plugins: {
      '@stylistic': stylistic,
      security: securityPlugin
    },
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['vitest.config.ts', 'eslint.config.js']
        },
        tsconfigRootDir: __dirname
      }
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      securityPlugin.configs.recommended
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Security
      'security/detect-object-injection': 'error',

      // Angular
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: '',
          type: 'element',
          style: 'kebab-case'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: '',
          type: 'attribute',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/prefer-standalone': 'error',

      // Stylistic
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'class'
        }
      ],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],

      // TypeScript
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase']
        },
        {
          selector: 'variable',
          modifiers: ['const', 'global'],
          format: ['UPPER_CASE']
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE']
        },
        {
          selector: 'method',
          format: ['camelCase']
        },
        {
          selector: 'class',
          format: ['PascalCase']
        }
      ],
    }
  },
  // HTML ----------
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility
    ],
    rules: {
      '@angular-eslint/template/component-selector': 'off',
      '@angular-eslint/template/directive-selector': 'off'
    }
  }
]);
```

💡 Une documentation complète est disponible ici... [ESLint Rules](#eslint-rules)  

**Etape 4 :** Ajouter les scripts pratiques  

Mettre à jour la section "scripts" du `package.json` pour faciliter l'utilisation :

```JSON
"scripts": {
  "ng": "ng",
  "clean": "rimraf coverage .angular",
  "build": "pnpm clean && ng build",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "lint": "ng lint",
  "lint:ci": "ng lint --max-warnings=0",
  "lint:scss": "stylelint \"src/**/*.scss\"",
  "prepare": "husky",
  "start": "ng serve",
  "test": "ng test",
  "test:ui": "ng test --ui",
  "test:coverage": "ng test --coverage --watch=false",
  "watch": "ng build --watch --configuration development"
}
```

**Etape 5 :** Tester la commande  

```shell
pnpm lint
```

Vous devriez voir s'afficher =>

<br>

![Terminal Screen](https://github.com/EmmanuelLefevre/MarkdownImg/blob/main/template_angular_lint_command.png)

<br>

**Etape 6 :** Ajouter les autres packages **ESLint**  

```shell
pnpm add -D @angular-eslint/builder @eslint/js typescript-eslint
```

<h2 id="htmlhint">
  <img
    alt="HTMLHint"
    title="HTMLHint"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/htmlhint.png"
  />
  HTMLHINT
</h2>

### Introduction :

Assurer la qualité et la cohérence des templates **HTML** au sein d'un projet **Angular** est essentiel pour la maintenabilité et la robustesse d'une application.  
C'est précisément le rôle de **HTMLHint**, un analyseur de code statique (ou linter) dédié au **HTML**.  
En l'intégrant dans notre chaîne d'outils de développement, nous pouvons automatiser l'inspection de nos fichiers `.html` afin de détecter les erreurs courantes, les mauvaises pratiques et les incohérences de style.  
Grâce à un ensemble de règles configurables via un fichier `.htmlhintrc`, **HTMLHint** nous aide à renforcer les standards de code de notre équipe, prévenir des bugs liés aux balises et **PAR-DESSUS TOUT** améliorer l'accessibilité de nos applications (**A11y**) !!!

[En savoir plus sur l'accessibilité](#accessibilite)

**Etape 1 :** Ajouter le package **HTMLLint**  

```shell
pnpm add -D htmlhint
```

**Etape 2 :** Ajouter l'extension **VSCode** :

[HTMLHint VSCode Extension](https://marketplace.visualstudio.com/items/?itemName=HTMLHint.vscode-htmlhint)  

Si vous n'avez pas l'extension **VSCode** il faut ajouter cette configuration dans son `settings.json`, sinon le fichier de configuration ne sera pas reconnu par celui-ci.  
De plus cela activera l'autocomplétion et la validation du fichier `.htmlhintrc`.  

```JSON
{
  "json.schemas": [
    {
      "fileMatch": ["/.htmlhintrc"],
      "url": "https://json.schemastore.org/htmlhint.json"
    }
  ]
}
```

**Etape 2 :**  Configuration :

Ouvrir le fichier `package.json`. Ajouter la commande suivante dans la partie `scripts`.

```JSON
"scripts": {
  "lint:html": "htmlhint \"src/**/*.html\""
}
```

**Etape 3 :** Tester la commande  

Lancer le lint sur nos fichiers **HTML** =>

```powershell
pnpm lint:html
```

Si le script n'est pas défini dans le `package.json` =>

```powershell
npx htmlhint "**/*.html"
```

💡 Une documentation complète est disponible ici... [HTMLHint Rules](#htmlhint-rules)  

<h2 id="stylelint">
  <img
    alt="StyleLint"
    title="StyleLint"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/stylelint.png"
  />
  STYLELINT
</h2>

Pour la configuration des règles **SCSS** il faut ajouter **StyleLint**.  

### Introduction :

**Stylelint** est un linter **CSS** moderne et puissant, il vérifie votre code source pour y déceler des erreurs, des fautes de style ou encore des codes hexa incorrectes, sans avoir à l'exécuter.  
Concrètement, **Stylelint** analyse vos fichiers de style et nous signale tout ce qui ne respecte pas un ensemble de règles que nous avons définies au préalable.  

### Configuration :

```shell
npm install -D stylelint stylelint-scss postcss-scss
```

Il faut ensuite créer le fichier `.stylelintrc.json` à la racine du projet  

```JSON
{
  "plugins": ["stylelint-scss"],
  "customSyntax": "postcss-scss",
  "rules": {
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "scss/at-extend-no-missing-placeholder": true,
    "scss/at-if-no-null": true,
    "max-nesting-depth": [
      3,
      {
        "ignore": ["blockless-at-rules"]
      }
    ],
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "comment-no-empty": null,
    "scss/comment-no-empty": true
  }
}
```

De plus il est nécessaire d'ajouter dans le fichier `package.json` le fix des fichiers dans le `lint-staged`.

```JSON
{
  "*.scss": [
      "stylelint --fix"
    ],
}
```

ainsi que le script =>  

```JSON
"lint:scss": "stylelint \"src/**/*.scss\"",
```

💡 Une documentation complète est disponible ici... [StyleLint Rules](#stylelint-rules)  

<h2 id="husky">
  <img
    alt="Husky"
    title="Husky"
    width="30px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/husky.png"
  />
  HUSKY
</h2>

Nous allons utiliser **Husky** couplé à `lint-staged`.  
Pourquoi `lint-staged` ? Lancer `pnpm lint` sur tout le projet prend du temps (10s... 30s... 1min). Si l'on doit attendre 1 minute à chaque commit, nous allons finir par désactiver **Husky**.  
`lint-staged` permet de lancer l'analyse uniquement sur les fichiers que nous sommes en train de modifier. C'est instantané.  

**Etape 1 :** Installer **Husky** et `lint-staged`  

```shell
pnpm add -D husky lint-staged
```

**Etape 2 :** Initialiser **Husky**  

Cette commande va créer le dossier `.husky` et configurer le script prepare dans notre `package.json`.

```shell
pnpm exec husky init
```

**Etape 3 :** Configurer `lint-staged`  
Ouvrir le fichier `package.json`. Ajouter la configuration tout à la fin du fichier (après devDependencies).  

```JSON
"lint-staged": {
  "src/**/*.html": [
    "eslint --fix --max-warnings=0",
    "prettier --write"
  ],
  "src/**/*.ts": [
    "eslint --fix --max-warnings=0",
    "prettier --write"
  ],
  "src/**/*.{css,scss,json,md}": [
    "prettier --write"
  ],
  "*.scss": [
    "stylelint --fix"
  ],
  "*.{js,cjs,mjs}": [
    "eslint --fix --max-warnings=0",
    "prettier --write"
  ],
  "*.{yaml,yml}": [
    "prettier --write"
  ]
}
```

**Etape 4 :** Dire à **Husky** d'utiliser `lint-staged`  
Aller dans le dossier `.husky` qui a été créé à la racine du projet. Trouver le fichier nommé `pre-commit`.

- Simple linting  

```shell
pnpm exec lint-staged
```

- Tests + linting  

```shell
pnpm test -- --run
pnpm exec lint-staged
```

**Etape 5 :** Ajouter la commande au `package.json` si ça n'a pas été fait automatiquement  

```JSON
"scripts": {
  "prepare": "husky",
}
```

<h2 id="ts-config">
  <img
    alt="TSCONFIG"
    title="TSCONFIG"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/ts_config.png"
  />
  TS CONFIG
</h2>

**`tsconfig.json`**

Ce fichier contient les paramètres fondamentaux du compilateur **TypeScript** (`compilerOptions`) et du compilateur **Angular** (`angularCompilerOptions`) qui sont hérités par tous les autres fichiers de configuration de l'espace de travail.

```JSON
{
  "compileOnSave": false,
  "compilerOptions": {
    "paths": {
      "@app/*": ["./src/app/*"],
      "@assets/*": ["./src/assets/*"],
      "@core/*": ["./src/app/core/*"],
      "@env/*": ["./src/_environments/*"],
      "@features/*": ["./src/app/features/*"],
      "@shared": ["./src/app/shared/shared.ts"],
      "@shared/*": ["./src/app/shared/*"],
      "@styles/*": ["./src/styles/*"]
    },
    "declaration": false,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "importHelpers": true,
    "isolatedModules": true,
    "lib": [
      "ES2022",
      "DOM"
    ],
    "module": "preserve",
    "moduleResolution": "bundler",
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noPropertyAccessFromIndexSignature": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": false,
    "strict": true,
    "target": "ES2022",
    "useDefineForClassFields": false
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictStandalone": true,
    "strictTemplates": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
```

💡 Une documentation complète est disponible dans le fichier `tsconfig.json` et ici... [TS Config Rules](#ts-config-rules)  

**`tsconfig.app.json`**

Configuration des alias  

```JSON
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": ["vite/client"],
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.spec.ts"]
}
```

<h2 id="tests">
  🧪 TESTS
</h2>

Activer le nouveau système de tests unitaires natif d'**Angular**. Ce builder moderne remplace l'ancienne stack (basée sur **Karma**) pour offrir une exécution nettement plus rapide et légère, tout en s'alignant sur l'architecture de build actuelle (`esbuild`). Il isole la compilation des tests via le fichier `tsconfig.spec.json`.  

1. Installer les librairies requises  

```shell
pnpm add -D vitest jsdom
```

```shell
pnpm add -D @angular/platform-browser-dynamic
```

```shell
pnpm add -D @analogjs/vite-plugin-angular
```

```shell
pnpm add -D @types/node
```

```shell
pnpm add -D vite-tsconfig-paths
```

2. Dans `tsconfig.spec.json` remplacer par ces propriétés dans `@compilerOptions`.  

```JSON
"compilerOptions": {
  "outDir": "./out-tsc/spec",
  "rootDir": "./src",
  "module": "ESNext",
  "moduleResolution": "Bundler",
  "types": [
    "vitest/globals",
    "vitest/importMeta",
    "vite/client",
    "node"
  ]
}
```

3. Dans `angular.json` ajouter la propriété `test` dans `@architect`.  

```JSON
"test": {
  "builder": "@angular/build:unit-test",
  "options": {
    "runnerConfig": "vitest.config.ts",
    "tsConfig": "tsconfig.spec.json"
  }
},
```

4. Optionnel : installer l'interface graphique de **Vitest**.  
**Vitest** possède une interface web agréable pour visualiser les tests, voir le code et les logs. C'est bien plus pratique que le terminal.  

```shell
pnpm add -D @vitest/ui
```

5. Lancer les tests  

- **Via console**

```shell
pnpm test
```

- **Via UI**

```shell
pnpm test:ui
```

6. Installer le package de coverage `@vitest/coverage-v8`  

```shell
pnpm add -D @vitest/coverage-v8
```

7. Créer le fichier `test-setup.ts` dans `src`

```typescript
import '@angular/compiler';
import { getTestBed } from '@angular/core/testing';

import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);
```

8. Créer le fichier `vitest.config.ts`  

```typescript
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    angular(),
    tsconfigPaths({
      projects: [resolve(__dirname, 'tsconfig.json')]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/styles/abstracts/_index.scss" as *;'
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [resolve(__dirname, 'src/test-setup.ts')],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        '**/index.ts',
        '.angular/**',
        'coverage/**',
        'dist/**',
        'eslint.config.js',
        'src/_environments/environment.prod.sample.ts',
        'src/_environments/environment.ts',
        'src/app/app.config.ts',
        'src/main.ts',
      ],
      clean: true
    },
  }
});
```

Dans `angular.json` ajouter la propriété `coverage` à l'objet `test`  

```JSON
"test": {
  "builder": "@angular/build:unit-test",
  "options": {
    "coverage": true
  }
},
```

9. Lancer les tests avec le coverage dans le terminal  

```shell
pnpm test:coverage
```

<h2 id="ci-cd">
  🤖 CI/CD
</h2>

1. L'utilisation de **rimraf** permet de supprimer des dossiers de manière fiable que l'on soit sous **Windows**, **macOS** ou **Linux**. C'est essentiel pour éviter que d'anciens rapports de couverture ne viennent fausser les nouvelles analyses.  

```shell
pnpm add -D rimraf
```

2. Dans `package.json` ajouter les scripts `clean` et `test:coverage`  

```JSON
"scripts": {
  "clean": "rimraf coverage .angular",
  "test:coverage": "ng test --coverage --watch=false",
}
```

3. Configurer son compte **SonarCloud** et son secret `SONAR_TOKEN`

4. Créer fichier `sonar-project.properties` à la racine

```shell
sonar.host.url=https://sonarcloud.io
sonar.projectKey=emmanuel-lefevre_angular-template
sonar.organization=emmanuel-lefevre
sonar.projectName=AngularTemplate
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=src/test-setup.ts, src/main.ts
```

5. Créer `.github > workflows > pipeline.yml`

```yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop, 'feature/**']
  pull_request:
    branches: [main, develop]

jobs:
  security:
    name: 🛡️ Security Scan
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      contents: read
    steps:
      - name: 📂 Get Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: 🏗️ Initialize CodeQL
        uses: github/codeql-action/init@v4
        with:
          languages: javascript-typescript

      - name: 🔍 Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v4

  quality:
    name: ✨ Quality & Tests
    runs-on: ubuntu-latest
    steps:
      - name: 📂 Get Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: 📦 Install PNPM
        uses: pnpm/action-setup@v2
        with:
          version: latest

      - name: 🏗️ Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: ⚙️ Install Dependencies
        run: pnpm install

      - name: 🧪 Run Tests & Coverage
        run: pnpm test:coverage

      - name: 🚀 SonarQube Scan
        uses: SonarSource/sonarqube-scan-action@v6
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

      - name: 📊 SonarQube Quality Gate
        uses: SonarSource/sonarqube-quality-gate-action@v1
        timeout-minutes: 5
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  deploy:
    name: 🎯 Deploy to Production
    needs: [security, quality]
    # 🚩 Temporarily disabled (will never launch)
    if: false
    runs-on: ubuntu-latest
    steps:
      - name: 📂 Get Code
        uses: actions/checkout@v4

      - name: 📦 Install PNPM
        uses: pnpm/action-setup@v2
        with:
          version: latest

      - name: 🏗️ Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: ⚙️ Install Dependencies
        run: pnpm install

      - name: 🧱 Build Project (Production)
        run: pnpm build --configuration=production

      - name: 🚀 Sync Files to Server
        uses: easingthemes/ssh-deploy@main
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          ARGS: '-rlgoDzvc -i --delete'
          # ⚠️ Double-check folder name in /dist directory after build (pnpm build).
          SOURCE: 'dist/AngularTemplate/browser/'
          REMOTE_HOST: ${{ secrets.SSH_HOST }}
          REMOTE_USER: ${{ secrets.SSH_USER }}
          TARGET: ${{ secrets.SSH_TARGET }}
          EXCLUDE: '/node_modules/'

      - name: 📡 Post-Deployment Commands
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            echo "Restarting Nginx or clearing the cache..."
            # sudo systemctl reload nginx

      - name: 🚩 Deployment Task
        run: echo "Deployment is underway following security and quality validation."
```

<h2 id="dependencies">
  📦 DEPENDENCIES
</h2>

1. Ajouter **Angular Material**  

```shell
pnpm add @angular/material @angular/cdk
```

2. Ajouter **Font Awesome**  

```shell
pnpm add @fortawesome/fontawesome-svg-core @fortawesome/angular-fontawesome
```

Puis ajouter les différentes variantes d'icônes...  
```shell
pnpm add @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons
```

<h2 id="styles">
  🎨 STYLES
</h2>

Simplifie la gestion des imports **Sass** en définissant `src/styles` comme racine de résolution. Cela permet d'importer le Barrel File abstracts (ou autre fichier global) depuis n'importe quel composant via un chemin absolu et propre (ex: `@use 'abstracts'`), éliminant définitivement les chemins relatifs complexes et fragiles (ex: `../../../../styles/abstracts`)."  

Dans `angular.json` ajouter la propriété `stylePreprocessorOptions` dans `@architect.build.options`.  

```JSON
"stylePreprocessorOptions": {
  "includePaths": [
    "src",
    "src/styles"
  ]
}
```

<h2 id="schematics">
  <img
    alt="Angular Schematics"
    title="Angular Schematics"
    width="60px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/schematics.png"
  />
  SCHEMATICS
</h2>

La section de configuration des **schematics** définit les paramètres par défaut de la commande `ng generate` de l'interface de la **CLI d'Angular**.  

Ceci garantit la cohérence et le respect des bonnes pratiques architecturales dans l'ensemble du projet lors de la création de nouveaux fichiers (composants, services, gardes...).  

**`angular.json`**

```JSON
"schematics": {
  "@schematics/angular:application": {
    "fileNameStyleGuide": "2016",
    "inlineStyle": false,
    "inlineTemplate": false,
    "routing": true,
    "skipTests": true,
    "ssr": true,
    "standalone": true,
    "strict": true,
    "style": "scss",
    "zoneless": false
  },
  "@schematics/angular:class": {
    "skipTests": true
  },
  "@schematics/angular:component": {
    "changeDetection": "OnPush",
    "displayBlock": true,
    "inlineStyle": false,
    "inlineTemplate": false,
    "prefix": "",
    "skipTests": false,
    "standalone": true,
    "style": "scss",
    "type": "component"
  },
  "@schematics/angular:directive": {
    "prefix": "",
    "skipTests": false,
    "standalone": true,
    "type": "directive"
  },
  "@schematics/angular:enum": {
    "type": "enum"
  },
  "@schematics/angular:guard": {
    "functional": false,
    "implements": [
      "CanActivate",
      "CanActivateChild",
      "CanDeactivate",
      "CanMatch"
    ],
    "skipTests": true,
    "typeSeparator": "."
  },
  "@schematics/angular:interceptor": {
    "skipTests": true,
    "typeSeparator": "."
  },
  "@schematics/angular:interface": {
    "type": "model"
  },
  "@schematics/angular:module": {
    "typeSeparator": "."
  },
  "@schematics/angular:pipe": {
    "skipTests": false,
    "standalone": true,
    "typeSeparator": "."
  },
  "@schematics/angular:resolver": {
    "skipTests": true,
    "typeSeparator": "."
  },
  "@schematics/angular:service": {
    "skipTests": false,
    "type": "service"
  }
},
```

💡 Une documentation complète est disponible dans le fichier `angular.json` et ici... [Schematics Rules](#schematics-rules)  

<h2 id="configuration-de-build">
  <img
    alt="Angular JSON"
    title="Angular JSON"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg"
  />
  CONFIGURATION DE BUILD
</h2>

**`angular.json`**

Cette section (`architect.build.configurations.production`) définit les paramètres spécifiques qui sont appliqués lorsque vous exécutez la commande `ng build --configuration=production` (souvent abrégée en `ng build --prod` ou `ng build`).  

L'option `fileReplacements` est cruciale pour gérer les configurations spécifiques à l'environnement de production. L'option `budgets` est quand à elle un mécanisme essentiel pour basculer les variables d'environnement (API endpoints, clés) vers leurs valeurs de production sans nécessiter de modification manuelle du code source.  

Renseigner le chemin des fichiers d'environnement et définir des budgets de performance pour garantir que la taille de l'application reste sous contrôle.  

De plus il faut ajouter le favicon, les scripts, le browser et l'index dans l'objet `options`  

```JSON
"architect": {
  "build": {
    "builder": "@angular/build:application",
    "options": {
      "index": "src/index.html",
      "browser": "src/main.ts",
      "tsConfig": "tsconfig.app.json",
      "inlineStyleLanguage": "scss",
      "scripts": [],
      "assets": [
        {
          "glob": "**/*",
          "input": "public"
        },
        "src/favicon.ico",
        {
          "glob": "**/*",
          "input": "src/assets",
          "output": "/assets/"
        }
      ],
      "styles": [
        "src/styles.scss"
      ],
      "stylePreprocessorOptions": {
        "includePaths": [
          "src",
          "src/styles"
        ]
      }
    },
    "configurations": {
      "production": {
        "optimization": {
          "scripts": true,
          "styles": {
            "minify": true,
            "inlineCritical": false
          },
          "fonts": true
        },
        "fileReplacements": [
          {
            "replace": "src/_environments/environment.ts",
            "with": "src/_environments/environment.prod.ts"
          }
        ],
        "budgets": [
          {
            "type": "initial",
            "maximumWarning": "500kB",
            "maximumError": "2MB"
          },
          {
            "type": "anyComponentStyle",
            "maximumWarning": "4kB",
            "maximumError": "8kB"
          }
        ],
        "outputHashing": "all"
      },
      "development": {
        "optimization": false,
        "extractLicenses": false,
        "sourceMap": true,
        "budgets": [
          {
            "type": "initial",
            "maximumWarning": "1.5MB",
            "maximumError": "2MB"
          },
          {
            "type": "anyComponentStyle",
            "maximumWarning": "6kB",
            "maximumError": "10kB"
          }
        ]
      }
    },
    "defaultConfiguration": "production"
  },
  "serve": {
    "builder": "@angular/build:dev-server",
    "configurations": {
      "production": {
        "buildTarget": "AngularTemplate:build:production"
      },
      "development": {
        "buildTarget": "AngularTemplate:build:development"
      }
    },
    "defaultConfiguration": "development"
  },
  "test": {
    "builder": "@angular/build:unit-test",
    "options": {
      "runnerConfig": "vitest.config.ts",
      "tsConfig": "tsconfig.spec.json",
      "coverage": true
    }
  },
  "lint": {
    "builder": "@angular-eslint/builder:lint",
    "options": {
      "lintFilePatterns": [
        "src/**/*.ts",
        "src/**/*.html"
      ]
    }
  }
}
```

<h2 id="multi-langues">
  🗣️ MULTI LANGUES
</h2>

Installer les librairies suivantes =>  

```shell
pnpm add @ngx-translate/core @ngx-translate/http-loader
```

<h2 id="erreurs-frequentes">
  ⚠️ ERREURS FREQUENTES
</h2>

### 1. Warning lors du premier push !  

<br>

![Terminal Screen](https://github.com/EmmanuelLefevre/MarkdownImg/blob/main/template_angular_git_warning.png)

<br>

Créer le fichier `.gitattributes` à la racine du projet et coller ceci :  

```shell
# Force line endings to LV for everyone (Mac/Linux/Windows)
* text=auto eol=lf

# Except for Windows batch files (if you have any)
*.cmd text eol=crlf
*.ps1 text eol=crlf
```

Puis "renormaliser" la config **Git** en lançant ces commandes dans le projet :  

```shell
git add --renormalize .
git commit -m "chore: enforce LF line endings" --no-verify
```

Publier la branche et écraser le contenu sur **Github** avec la version locale :

```shell
git push --force origin main
```

### 2. Option 'baseUrl' is deprecated

L'auteur "Andrew Branch" est membre de l'équipe **TypeScript** chez **Microsoft**, ce qui garantit la fiabilité et la pertinence de l'outil.  

[andrewbranch/ts5to6 – Outil de migration TypeScript 5 vers 6](https://github.com/andrewbranch/ts5to6)

- **BaseUrl**

Pour le fichier de configuration de base du projet  

```shell
npx @andrewbranch/ts5to6 --fixBaseUrl ./tsconfig.json
```

Pour le fichier de configuration de l'application (où se trouvent les paths)  

```shell
npx @andrewbranch/ts5to6 --fixBaseUrl ./tsconfig.app.json
```

- **RootDir**

Pour le fichier de configuration de base du projet  

```shell
npx @andrewbranch/ts5to6 --fixRootDir ./tsconfig.json
```

Pour le fichier de configuration de l'application  

```shell
npx @andrewbranch/ts5to6 --fixRootDir ./tsconfig.app.json
```

<h2 id="tooling-documentations">
  🔧 TOOLING DOCUMENTATIONS
</h2>

<h3 id="prettier-rules">
  <img
    alt="Prettier"
    title="Prettier"
    width="30px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/prettier.png"
  />
  Prettier Rules
</h3>

[Prettier Documentation](https://prettier.io/docs/options)

| Option | Valeur | Description / Justification |
| :--- | :--- | :--- |
| **`arrowParens`** | `"always"` | Forcer les parenthèses autour des arguments des fonctions fléchées |
| **`bracketSameLine`** | `true` | Placer la balise de fermeture de l'élément HTML multi-lignes (`>`) sur la même ligne que le dernier attribut |
| **`bracketSpacing`** | `true` | Ajouter des espaces entre les accolades des objets<br>(`{ foo: bar }` au lieu de `{foo: bar}`) |
| **`embeddedLanguageFormatting`** | `"auto"` | Prettier formate automatiquement le code intégré (ex: CSS dans JS) s'il le reconnaît |
| **`endOfLine`** | `"lf"` | Line Feed (LF). Standard Unix. Garantit la cohérence des fins de ligne (même sous Windows) et évite des modifications inutiles dans Git |
| **`experimentalTernaries`** | `false` | Conserver le formatage classique des ternaires<br>(`condition ? true : false`) |
| **`htmlWhitespaceSensitivity`** | `"css"` | Respecter la propriété CSS `display` par défaut pour la gestion des espaces dans le HTML (évite de casser la mise en page inline) |
| **`importOrder`** | `[Array]` | Définit la hiérarchie verticale des imports (nécessite `@trivago/prettier-plugin-sort-imports`)<br><br>**1. `^@angular/(.*)$`** : Packages Angular officiels (Core, Common...) en premier<br><br>**2. `^rxjs`** : RxJS, moteur asynchrone fondamental<br><br>**3. `<THIRD_PARTY_MODULES>`** : Tout ce qui vient de `node_modules` (non intercepté avant)<br><br>**4. `^@core/(.*)$`** : Alias TypeScript pour le dossier « core » (services, guards...)<br><br>**5. `^@shared/(.*)$`** : Alias pour le dossier « partagé » (composants UI, pipes...)<br><br>**6. `^[./]`** : Importations locales (fichiers proches), placées à la fin |
| **`importOrderParserPlugins`** | `[Array]` | Plugins pour l'analyseur Babel<br>**Important :** Inclure `"decorators-legacy"` pour qu'Angular (`@Component`) ne génère pas d'erreur et `"typescript"` pour la syntaxe TS |
| **`importOrderSeparation`** | `true` | Ajoute une ligne vide entre les groupes d'imports |
| **`importOrderSortSpecifiers`** | `true` | Trie également les imports nommés entre accolades<br>(ex: `{b, a}` devient `{a, b}`) |
| **`insertPragma`** | `false` | N'ajoute pas de commentaire `@format` en haut des fichiers |
| **`overrides`** | `[Object]` | Configuration spécifique (notamment pour Angular) pour analyser correctement la syntaxe (`*ngIf`, `[prop]`, `(event)`) dans les fichiers HTML |
| **`plugins`** | `["@trivago..."]` | Indique à Prettier de charger le plugin `@trivago/prettier-plugin-sort-imports`. Sans cela, les options de tri sont ignorées |
| **`printWidth`** | `120` | Coupe les lignes après 120 caractères (plus confortable que le défaut de 80) |
| **`proseWrap`** | `"preserve"` | Ne reformate pas les blocs de texte en Markdown (évite des différences Git inutiles) |
| **`quoteProps`** | `"as-needed"` | N'utilise des guillemets autour des clés d’objet que si la syntaxe l’exige |
| **`requirePragma`** | `false` | Formate tous les fichiers, pas seulement ceux comportant la balise `@format` |
| **`semi`** | `true` | Ajoute systématiquement un point-virgule à la fin des instructions |
| **`singleAttributePerLine`** | `true` | Force un attribut par ligne en HTML si la balise est longue (rend les templates Angular plus lisibles) |
| **`singleQuote`** | `true` | Utilise des guillemets simples (`'text'`) en JS/TS pour réduire le bruit visuel |
| **`tabWidth`** | `2` | Une indentation correspond à 2 espaces |
| **`trailingComma`** | `"all"` | Ajoute des virgules à la fin des listes (objets, tableaux, fonctions). Rend les diffs Git plus propres |
| **`useTabs`** | `false` | Utilise des espaces pour l'indentation, pas des tabulations |

<h3 id="eslint-rules">
  <img
    alt="ESLint"
    title="ESLint"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg"
  />
  ESLint Rules
</h3>

[ESLint Documentation](https://eslint.org/docs/latest/use/getting-started)  

[ESLint Security Documentation](https://www.npmjs.com/package/eslint-plugin-security)  

[ESLint Angular Documentation](https://www.npmjs.com/package/@angular-eslint/eslint-plugin)  

[ESLint Angular Template Documentation](https://www.npmjs.com/package/@angular-eslint/eslint-plugin-template)  

[ESLint TypeScript Documentation](https://typescript-eslint.io/rules/)  

[ESLint Stylistics Documentation](https://eslint.style/rules)  

[ESLint Recommanded Documentation](https://eslint.org/docs/latest/rules/)  

Pour la configuration des règles RXJS il faut ajouter ces deux librairies:  

[ESLint RXJS Documentation](https://github.com/cartant/eslint-plugin-rxjs)  

```shell
pnpm add -D @typescript-eslint/parser eslint-plugin-rxjs
```

<h3 id="htmlhint-rules">
  <img
    alt="HTMLHint"
    title="HTMLHint"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/htmlhint.png"
  />
  HTMLHint Rules
</h3>

[HTMLHint Documentation](https://htmlhint.com/rules/)  

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`alt-require`** | `true` | Impose que toutes les balises `<img>` possèdent un attribut `alt`, ce qui est crucial pour l'accessibilité web |
| **`attr-lowercase`** | `ARRAY` | Applique l'utilisation de minuscules pour tous les noms d'attributs HTML pour la cohérence du code<br><br>**Exception :** Il est possible de fournir un tableau pour ignorer certains attributs, notamment ceux en `camelCase` issus de Angular (`["(ngSubmit)"], "[formControl]", "[ngClass]"], "[routerLink]"`...) |
| **`attr-no-duplication`** | `true` | Interdit la duplication d'attributs sur un même élément (`<div class="a" class="b">`) |
| **`attr-no-unnecessary-whitespace`** | `true` | Aucun espace entre les noms et les valeurs des attributs |
| **`attr-sorted`** | `true` | Les attributs doivent être triés dans l'ordre suivant :<br><br>**1. `class`**<br><br>**2. `id`**<br><br>**3. `name`**<br><br>**4. `src`**<br><br>**5. `for`**<br><br>**6. `type`**<br><br>**7. `href`**<br><br>**8. `value`**<br><br>**9. `title`**<br><br>**10. `alt`**<br><br>**11. `role`** |
| **`attr-value-double-quotes`** | `true` | Force l'utilisation des guillemets doubles pour toutes les valeurs d'attributs |
| **`attr-value-no-duplication`** | `true`| Vérifie que les valeurs au sein d'un même attribut (`class`) ne sont pas dupliquées |
| **`attr-whitespace`** | `true` | Aucun espace en début ou en fin de valeur d'attribut |
| **`button-type-require`** | `true` | Exige que chaque balise `<button>` ait un attribut `type` (`button`, `submit`, `reset`) pour éviter les soumissions de formulaire inattendues |
| **`doctype-first`** | `false` | S'assure que le document commence par une déclaration `<!DOCTYPE>` |
| **`doctype-html5`** | `false` | Vérifie que le Doctype est bien celui de HTML5 (`<!DOCTYPE html>`) |
| **`frame-title-require`** | `true` | Requiert un attribut `title` sur les `<iframe>` et `<frame>` pour l'accessibilité |
| **`h1-require`** | `false` | Ne pas imposer la présence d'au moins une balise `<h1>` pour la structure sémantique et le SEO |
| **`html-lang-require`** | `true` | Exige que la balise `<html>` possède un attribut `lang` pour spécifier la langue du document (accessibilité et SEO) |
| **`id-class-value`** | `dash` | Aucunes règles imposées |
| **`id-unique`** | `true` | Garantit que tous les attributs `id` sur la page sont uniques |
| **`input-requires-label`** | `false` | Ne pas vérifier que chaque `<input>` est associé à une balise `<label>` pour l'accessibilité |
| **`inline-script-disabled`** | `true` | L'utilisation des inline scripts est impossible |
| **`inline-style`** | `true` | L'utilisation du inline style est impossible |
| **`main-require`** | `false` |  Ne pas imposer la présence d'une balise `<main>` pour identifier le contenu principal du document |
| **`meta-charset-require`** | `true` | Requiert la déclaration de l'encodage des caractères via `<meta charset="...">` |
| **`meta-description-require`** | `false` | Ne pas exiger la présence d'une balise `<meta name="description" ...>` pour le SEO |
| **`meta-viewport-require`** | `true` | Impose la présence de la balise `<meta name="viewport" ...>` pour un affichage correct sur les mobiles |
| **`spec-char-escape`** | `true` | Vérifie que les caractères spéciaux HTML (`<`, `>`, `&`) sont correctement échappés |
| **`src-not-empty`** | `true` | Interdit les attributs `src` vides sur les scripts et les images pour éviter des requêtes inutiles |
| **`tag-no-obsolete`** | `true` | Interdit l'utilisation de balises HTML obsolètes (`<font>`, `<center>`) |
| **`tag-pair`** | `true` | S'assure que toutes les balises sont correctement ouvertes et fermées, une règle fondamentale pour un HTML valide |
| **`tag-self-close`** | `true` | Les balises auto-fermantes, également appelées éléments vides, sont des éléments HTML qui ne nécessitent pas de balise de fermeture distincte (ceinture/bretelle avec notre ESlint) |
| **`tagname-lowercase`** | `true` | Impose que tous les noms de balises soient en minuscules |
| **`title-require`** | `true` | Requiert la présence d'une balise `<title>` dans l'en-tête `<head>` de la page |

<h3 id="stylelint-rules">
  <img
    alt="StyleLint"
    title="StyleLint"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/stylelint.png"
  />
  StyleLint Rules
</h3>

[StyleLint SCSS Documentation](https://stylelint.io/user-guide/rules)  

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`plugins`** | `["stylelint-scss"]` | Charge le plugin nécessaire pour supporter les règles spécifiques au SCSS |
| **`customSyntax`** | `"postcss-scss"` | Définit l'analyseur syntaxique (parser) approprié pour les fichiers SCSS |
| **`block-no-empty`** | `true` | Interdit les blocs de déclaration vides (ex: `a { }`) pour garder le code propre |
| **`color-no-invalid-hex`** | `true` | Signale les codes couleurs hexadécimaux invalides (ex: `#12345z`) |
| **`scss/at-extend-no-missing-placeholder`** | `true` | Impose que l'instruction `@extend` ne cible que des placeholders (sélecteurs `%`), ce qui évite de gonfler la taille du CSS final inutilement |
| **`scss/at-if-no-null`** | `true` | Interdit la comparaison explicite avec `null` dans les boucles `@if` (car en Sass, `null` est déjà évalué comme faux) |
| **`max-nesting-depth`** | `ARRAY` | Contrôle la complexité du CSS en limitant l'imbrication :<br><br>**Limite :** 3 niveaux de profondeur maximum<br><br>**Exception :** Les "at-rules" sans bloc (comme les `@import` ou `@include` simples) sont ignorées via `["blockless-at-rules"]` |
| **`scss/at-rule-no-unknown`** | `true` | Remplace la règle standard `at-rule-no-unknown` (qui est mise à `null`)<br><br>Vérifie la validité des directives (`@`), tout en autorisant celles spécifiques au SCSS comme `@mixin`, `@include` ou `@content` |
| **`scss/comment-no-empty`** | `true` | Remplace la règle standard `comment-no-empty` (qui est mise à `null`)<br><br>Interdit les commentaires vides, tout en supportant la syntaxe de commentaire double slash `//` du SCSS |

<h3 id="ts-config-rules">
  <img
    alt="TS Config"
    title="TS Config"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/ts_config.png"
  />
  TS Config Rules
</h3>

[TS Config Documentation](https://www.typescriptlang.org/tsconfig/)  

Cette configuration (`tsconfig.json`) sert de **base stricte** pour l'ensemble de l'espace de travail. Elle utilise l'approche **"Solution Style"**, déléguant la compilation effective aux fichiers `tsconfig.app.json` (pour l'application) et `tsconfig.spec.json` (pour les tests).  

### 1. Options du Compilateur (`compilerOptions`)

| Option | Valeur | Description & Justification |
| :--- | :--- | :--- |
| **`declaration`**| `false` | Ne pas générer de fichiers de déclaration TypeScript (`.d.ts`). N'est généralement pas nécessaire pour les applications, mais l'est pour les bibliothèques. |
| **`esModuleInterop`**| `true` | Améliore la compatibilité entre les modules CommonJS (Node/Legacy) et les modules ES (Modern JS) pour les imports |
| **`experimentalDecorators`** | `true` | Active le support de la syntaxe des décorateurs, massivement utilisée par Angular (`@Component`, `@Injectable`) |
| **`forceConsistentCasing...`** | `true` | Interdire les références de fichiers avec une casse incohérente (éviter bugs entre Windows / Linux/Mac) |
| **`importHelpers`** | `true` | Importer les fonctions utilitaires depuis `tslib` au lieu de générer du code dupliqué dans chaque fichier |
| **`isolatedModules`** | `true` | Garantit que chaque fichier peut être transpilé individuellement, ce qui est requis pour les outils ultra-rapides comme Vite ou Esbuild |
| **`lib`**| `[Array]` | **1. `"ES2022"`** : inclure les types de JavaScript moderne au navigateur<br><br>**2. `"DOM"`** : inclure les types spécifiques au navigateur.<br><br> |
| **`module`** | `"preserve"` | Laisser les instructions d'import/export intactes. Permet au bundler (Vite/Webpack) de gérer le chargement des modules le plus efficacement possible |
| **`moduleResolution`**| `"bundler"` | Indique à TypeScript d'utiliser une stratégie de résolution optimisée pour les bundlers modernes (Vite, Esbuild). Ceci est requis par Angular 17+ pour le support correct des exports conditionnels (customConditions) et garantit un build rapide et correct |
| **`noImplicitOverride`** | `true` | Forcer l'utilisation du mot-clé `override` lorsqu'une méthode écrase celle d'une classe parente et sécurise l'héritage |
| **`noImplicitReturns`** | `true` | Vérifier que tous les chemins d'exécution d'une fonction retournent bien une valeur |
| **`noFallthroughCasesInSwitch`**| `true` | Empêche de passer accidentellement d'un `case` à un autre dans un `switch` (oubli du `break`) |
| **`resolveJsonModule...`**| `true` | Permettre d'importer directement des fichiers `.json` comme des modules TypeScript (`import data from './data.json'`) |
| **`skipLibCheck`** | `true` | Ignorer la vérification des types à l'intérieur de `node_modules` pour accélérer considérablement la compilation |
| **`sourceMap`**| `false` | Indiquer au compilateur de ne pas générer de fichiers `.map` pour le débogage (souvent géré par les outils de build dans les fichiers spécifiques comme `tsconfig.app.json`) |
| **`strict`** | `true` | Activer toutes les options de vérification de type strictes (pas de `any` implicite, gestion stricte du `null`, etc.) |
| **`target`** | `"ES2022"` | Compiler le code vers ECMAScript 2022 moderne, permettant l'usage natif de `async/await` et des fonctionnalités de classes récentes |
| **`useDefineForClassFields`** | `false` | Maintenir le comportement historique d'initialisation des champs de classe pour assurer une compatibilité totale avec les décorateurs Angular |

### 2. Options du Compilateur Angular (`angularCompilerOptions`)

Ces paramètres contrôlent le compilateur AOT (Ahead-of-Time) d'Angular, spécifiquement pour la vérification des types dans les templates HTML.  

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`enableI18nLegacy...`** | `false` | Indiquer au compilateur Angular de ne pas utiliser le format d'identifiant de message hérité (legacy) pour l'internationalisation |
| **`strictInjectionParameters`** | `true` | Signaler une erreur si un paramètre injecté n'est pas compatible avec le type d'injection attendu |
| **`strictInputAccessModifiers`**| `true` | Respecter les modificateurs d'accès (`private`, `protected`) lors de l'accès aux propriétés depuis les templates HTML |
| **`strictStandalone`** | `true` | Appliquer des règles de validation plus strictes pour les composants, directives et pipes Standalone |
| **`strictTemplates`** | `true` | Activer la vérification stricte des types dans les templates Angular (`.html`). Détecte les erreurs de liaison de données à la compilation |

<h3 id="schematics-rules">
  <img
    alt="Schematics"
    title="Schematics"
    width="60px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/schematics.png"
  />
  Schematics Rules
</h3>

[Angular Documentation](https://github.com/angular/angular-cli/tree/main/packages/schematics/angular)

#### 1. @schematics/angular:application (`Project Initialization`)

Définit les caractéristiques fondamentales de l'application, principalement utilisées lors de la création du projet.

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`fileNameStyleGuide`** | `"2016"` | Utiliser l'ancienne convention de nommage (`app.component.ts`) |
| **`inlineStyle`** | `false` | Les styles sont générés dans un fichier `.scss` séparé |
| **`inlineTemplate`** | `false` | Le template est généré dans un fichier `.html` séparé |
| **`routing`** | `true` | Configurer automatiquement le fichier `app.routes.ts` pour la navigation |
| **`skipTests`** | `true` | Ne pas générer de fichiers de tests unitaires pour les composants initiaux (`app.component`) |
| **`ssr`** | `true` | Configurer l'application pour le SSR |
| **`standalone`** | `true` | Générer la structure initiale en STANDALONE (sans `NgModules`) |
| **`strict`** | `true` | Permet des contrôles de type plus stricts |
| **`style`** | `"scss"` | Définir SCSS par défaut |
| **`zoneless`** | `false` | Maintenir `zone.js` activé pour la détection des changements |

#### 2. @schematics/angular:class (`Class`)

Configuration pour la génération des classes (`ng g cl`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `true` | Les classes (souvent des DTO ou des wrappers utilitaires) n'ont généralement pas besoin de tests |

#### 3. @schematics/angular:component (`Components`)

Configuration pour la génération des composants (`ng g c`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`changeDetection`** | `"OnPush"` | Définir la stratégie de détection des changements sur `OnPush` |
| **`displayBlock`** | `true` | Ajoute automatiquement `:host { display: block; }` au SCSS du composant |
| **`inlineStyle/inlineTemplate`**| `false` | Force la séparation des fichiers `.html` et `.scss` |
| **`prefix`** | `""` | Le préfixe du sélecteur est explicitement vide |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`) |
| **`standalone`** | `true` | Utiliser le STANDALONE pour les composants |
| **`style`** | `"scss"` | Définir SCSS par défaut |
| **`type`** | `"component"` | Ajouter le type à la classe et au fichier (`my-feature.component.ts`) |

#### 4. @schematics/angular:directive (`Directives`)

Configuration pour la génération des directives (`ng g d`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`prefix`** | `""` | Le préfixe du sélecteur est explicitement vide |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`) |
| **`standalone`** | `true` | Utiliser le STANDALONE pour les directives |
| **`type`** | `"directive"` | Ajouter le type à la classe et au fichier (`my-highlight.directive.ts`) |

#### 5. @schematics/angular:enum (`Enum`)

Configuration pour la génération des enums (`ng g e`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`type`** | `"enum"` | Ajouter le type à la classe et au fichier `.enum.ts` |

#### 6. @schematics/angular:guard (`Guards`)

Configuration pour le routage des guards (`ng g guard`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`functional`** | `false` | Générer une Guard basée sur une classe (au lieu d'une simple fonction) |
| **`implements`** | `[Array]` | Générer le Guard implémentant les quatre interfaces de routage |
| **`skipTests`** | `true` | Ne pas générer de fichiers de tests unitaires |
| **`typeSeparator`** | `.` | Définir le séparateur `guard` (`auth.guard.ts`) |

#### 7. @schematics/angular:interceptor (`HTTP Interceptors`)

Configuration pour la gestion des interceptors (`ng g interceptor`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `true` | Ne pas générer de fichiers de tests unitaires |
| **`typeSeparator`** | `.` | Définir le séparateur `interceptor` (`auth.interceptor.ts`) |

#### 8. @schematics/angular:interface (`Interfaces`)

Configuration pour la gestion globale des interfaces (`ng g i`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`type`** | `"model"` | Ajouter le type à la classe et au fichier `.model.ts` |

#### 9. @schematics/angular:module (`Modules`)

Configuration pour la gestion globale des modules (`ng g m`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`typeSeparator`** | `.` | Définit le séparateur `module` (uniquement si STANDALONE est désactivé) |

#### 10. @schematics/angular:pipe (`Pipes`)

Configuration pour la gestion globale des pipes (`ng g p`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `false` | Les résolveurs sont étroitement liés au routage et sont généralement testés via E2E |
| **`standalone`** | `true` | Utiliser le STANDALONE pour les pipes |
| **`typeSeparator`** | `.` | Définir le séparateur `pipe` (`date.pipe.ts`) |

#### 11. @schematics/angular:resolver (`Resolvers`)

Configuration pour la gestion globale des resolvers (`ng g r`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`). |
| **`type`** | `"service"` | Ajouter le type à la classe et au fichier (`api.service.ts`) |

#### 12. @schematics/angular:service (`Services`)

Configuration pour la gestion globale des services (`ng g s`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`). |
| **`type`** | `"service"` | Ajouter le type à la classe et au fichier (`api.service.ts`) |
