<div align="right">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=EmmanuelLefevre.AngularTemplate" />
  <img src="https://img.shields.io/github/last-commit/EmmanuelLefevre/AngularTemplate" />
  <img src="https://github.com/EmmanuelLefevre/AngularTemplate/actions/workflows/main.yaml/badge.svg" />
</div>

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
- [HUSKY](#husky)
- [TSCONFIG](#ts-config)
- [SCHEMATICS](#schematics)
- [ERREURS FREQUENTES](#erreurs-frequentes)
- [TOOLINGCONFIGURATION](#tooling-configuration)
  - [Prettier Rules](#prettier-rules)
  - [EsLint Rules](#eslint-rules)
  - [Tsconfig Rules](#tsconfig-rules)
  - [Schematics Rules](#schematics-rules)

## 🏗 ARCHITECTURE

```text
├── public/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── shared/
│   │   │   │   ├── components/
│   │   │   │   │   ├── header/
│   │   │   │   │   ├── footer/
│   │   │   │   ├── directives/
│   │   │   │   ├── pipes/
│   │   │   │   ├── styles/
│   │   ├── features/
│   │   │   ├── site/
│   │   │   │   ├── home/
│   │   │   │   ├── contact/
│   │   │   │   ├── site.route.ts
│   │   │   │   ├── site.layout.ts
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── settings/
│   │   │   │   ├── users/
│   │   │   │   ├── admin.route.ts
│   │   │   │   ├── admin.layout.ts
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss
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

Installer PNPM.

1. Via le script d'installation (recommandé)  

Cette méthode est recommandée car elle permet d'installer pnpm sans dépendre d'une installation spécifique de Node.js ce qui facilite les mises à jour.

- Pour Windows (PowerShell) :

```shell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

- Pour macOS et Linux :

```shell
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

2. Via npm (méthode classique)  

Si Node.js est déjà installé, c'est souvent la méthode la plus simple et la plus rapide.  
Exécuter simplement cette commande dans un terminal :  

```shell
npm install -g pnpm
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

1. Vérifier les versions de la CLI

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
pnpm view @angular/cli dist-tags
```

3. Mettre à jour la CLI Angular globalement  

```shell
pnpm add -g @angular/cli@21
```

4. Créer le projet  

Lancer la commande suivante. L'option `--package-manager=pnpm` est importante, elle configure directement le projet pour utiliser pnpm au lieu de npm par défaut.

```shell
ng new mon-projet-angular --style=scss --ssr=false --package-manager=pnpm
```

5. Tableau de compatibilité  

| Angular | Node.js | TypeScript | RxJS |
| :--- | :--- | :--- | :--- |
| **21.0.x** | `^20.19.0` \|\| `^22.12.0` \|\| `^24.0.0` | `>=5.9.0 <6.0.0` | `^6.5.3` \|\| `^7.4.0` |

6. Fixer les dépendances des librairies sauf les correctifs de bugs d'Angular  

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

Pour un projet Angular moderne, la combinaison standard de l'industrie est ESLint (pour la qualité du code et les erreurs) et Prettier (pour le style et le formatage).  

**Etape 1 :** Externaliser et installer Prettier  
Bien qu'il y ait une configuration dans `package.json`, il est préférable (Best Practice) d'avoir un fichier de configuration dédié `.prettierrc`.

1. Installer Prettier  

```shell
pnpm add -D prettier
```

2. Créer un fichier `.prettierrc.js` à la racine et coller cette config  

```js
module.exports ={
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  experimentalTernaries: false,
  htmlWhitespaceSensitivity: 'css',
  importOrder: [
    '^@angular/(.*)$',
    '^rxjs',
    '<THIRD_PARTY_MODULES>',
    '^@core/(.*)$',
    '^@shared/(.*)$',
    '^[./]'
  ],
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
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false
}
```

💡 A full documentation have been added in `.prettierrc.js` and here too... [Prettier Rules](#prettier-rules)  

Installer l'extension Trivago pour le tri des imports.  

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
.angular
.git
coverage
dist
package-lock.json
pnpm-lock.yaml
yarn.lock
```

**Etape 2 :** Installer ESLint  

La méthode officielle et la plus sûre pour Angular est d'utiliser les "Schematics". Cela va générer la configuration adaptée à la version 21.  
Pour être sûr à 100%, on peut même ajouter un "flag" pour forcer le gestionnaire.

```shell
ng add @angular-eslint/schematics --package-manager=pnpm
```

**\* Note :** Si on demande quel gestionnaire utiliser, confirmer celui déjà choisi (PNPM, yarn...). Ici PNPM. Cette commande va ajouter les dépendances eslint et créer un fichier de configuration (`eslint.config.js` pour les versions modernes utilisant le "Flat Config").

**Etape 3 :** Empêcher les conflits (ESLint vs Prettier)  

ESLint a aussi des règles de formatage qui peuvent contredire Prettier. Il faut désactiver ces règles côté ESLint.

1. Installer la config de compatibilité  

```shell
pnpm add -D eslint-config-prettier
```

2. Configurer ESLint  

Ouvrir le fichier `eslint.config.js` (qui vient d'être créé à la racine).  

Voici à quoi cela devrait ressembler (simplifié) :  

**\* Note :** Prettier ne sera pas ajouté automatiquement il faut le faire manuellement comme indiqué ci dessous.  

```js
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettier = require("eslint-config-prettier");

module.exports = tseslint.config(
  // TypeScript
  {
    files: ["**/*.ts"],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettier, // ALWAYS LAST ONE
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Angular selectors configuration
      "@angular-eslint/directive-selector": [
        "error",
        { "type": "attribute", "prefix": "app", "style": "camelCase" }
      ],
      "@angular-eslint/component-selector": [
        "error",
        { "type": "element", "prefix": "app", "style": "kebab-case" }
      ],
    },
  },
  // HTML
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      prettier, // ALWAYS LAST ONE
    ],
    rules: {}
  }
);
```

**Etape 4 :** Ajouter les scripts pratiques  

Mettre à jour la section "scripts" du `package.json` pour faciliter l'utilisation :

```JSON
"scripts": {
  "ng": "ng",
  "build": "ng build",
  "format": "prettier --write \"src/**/*.{ts,html,css,scss,json}\"",
  "format:check": "prettier --check \"**/*.{ts,js,html,scss,css,json,md}\"",
  "lint": "ng lint",
  "lint:ci": "ng lint --max-warnings=0",
  "prepare": "husky",
  "start": "ng serve",
  "test": "ng test",
  "watch": "ng build --watch --configuration development"
}
```

**Etape 5 :** Tester la commande  

```shell
ng lint
```

Vous devriez voir s'afficher =>

<br>

![Terminal Screen](https://github.com/EmmanuelLefevre/MarkdownImg/blob/main/template_angular_lint_command.png)

<br>

<h2 id="husky">
  <img
    alt="Husky"
    title="Husky"
    width="30px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/husky.png"
  />
  HUSKY
</h2>

Nous allons utiliser Husky couplé à Lint-staged.  
Pourquoi Lint-staged ? Lancer `ng lint` sur tout le projet prend du temps (10s... 30s... 1min). Si l'on doit attendre 1 minute à chaque commit, nous allons finir par désactiver Husky.  
Lint-staged permet de lancer l'analyse uniquement sur les fichiers que nous sommes en train de modifier. C'est instantané.  

**Etape 1 :** Installer Husky et Lint-staged  

```shell
pnpm add -D husky lint-staged
```

**Etape 2 :** Initialiser Husky  

Cette commande va créer le dossier `.husky` et configurer le script prepare dans notre `package.json`.

```shell
pnpm exec husky init
```

**Etape 3 :** Configurer Lint-staged  
Ouvrir le fichier `package.json`. Ajouter la configuration tout à la fin du fichier (après devDependencies).  

```JSON
"lint-staged": {
  "src/**/*.{ts,html}": [
    "eslint --max-warnings=0",
    "prettier --check"
  ],
  "src/**/*.{css,scss,json,md}": [
    "prettier --check"
  ],
  "*.{js,cjs,mjs}": [
    "eslint --max-warnings=0",
    "prettier --check"
  ],
  "*.{yaml,yml}": [
    "prettier --check"
  ]
}
```

**Etape 4 :** Dire à Husky d'utiliser Lint-staged  
Aller dans le dossier `.husky` qui a été créé à la racine du projet. Trouver le fichier nommé `pre-commit`.

```shell
pnpm exec lint-staged
```

**Etape 5 :** Ajouter la commande au `package.json` si ça n'a pas été fait automatiquement  

```JSON
"scripts": {
  "ng": "ng",
  "build": "ng build",
  "format": "prettier --write \"src/**/*.{ts,html,css,scss,json}\"",
  "format:check": "prettier --check \"**/*.{ts,js,html,scss,css,json,md}\"",
  "lint": "ng lint",
  "lint:ci": "ng lint --max-warnings=0",
  "prepare": "husky",
  "start": "ng serve",
  "test": "ng test",
  "watch": "ng build --watch --configuration development"
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

```JSON

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
    "standalone": true
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

<h2 id="erreurs-frequentes">
  ⚠️ ERREURS FREQUENTES
</h2>

Attention si vous recevez ce warning lors du premier push !  

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

Puis "renormaliser" la config Git en lançant ces commandes dans le projet :  

```shell
git add --renormalize .
git commit -m "chore: enforce LF line endings" --no-verify
```

Publier la branche et écraser le contenu sur Github avec la version locale :

```shell
git push --force origin main
```

## TOOLING CONFIGURATION

[Prettier Documentation](https://prettier.io/docs/options)

### Prettier Rules

| Option | Valeur | Description / Justification |
| :--- | :--- | :--- |
| **`arrowParens`** | `"always"` | Forcer les parenthèses autour des arguments des fonctions fléchées |
| **`bracketSameLine`** | `true` | Placer la balise de fermeture de l'élément HTML multi-lignes (`>`) sur la même ligne que le dernier attribut |
| **`bracketSpacing`** | `true` | Ajouter des espaces entre les accolades des objets<br>(`{ foo: bar }` au lieu de `{foo: bar}`) |
| **`embeddedLanguageFormatting`** | `"auto"` | Prettier formate automatiquement le code intégré (ex: CSS dans JS) s'il le reconnaît |
| **`endOfLine`** | `"lf"` | Line Feed (LF). Standard Unix. Garantit la cohérence des fins de ligne (même sous Windows) et évite des modifications inutiles dans Git |
| **`experimentalTernaries`** | `false` | Conserver le formatage classique des ternaires<br>(`condition ? true : false`) |
| **`htmlWhitespaceSensitivity`** | `"css"` | Respecter la propriété CSS `display` par défaut pour la gestion des espaces dans le HTML (évite de casser la mise en page inline) |
| **`importOrder`** | `[Array]` | Définit la hiérarchie verticale des imports (nécessite `@trivago/prettier-plugin-sort-imports`).<br><br>**1. `^@angular/(.*)$`** : Packages Angular officiels (Core, Common...) en premier.<br><br>**2. `^rxjs`** : RxJS, moteur asynchrone fondamental.<br><br>**3. `<THIRD_PARTY_MODULES>`** : Tout ce qui vient de `node_modules` (non intercepté avant).<br><br>**4. `^@core/(.*)$`** : Alias TypeScript pour le dossier « core » (services, guards...).<br><br>**5. `^@shared/(.*)$`** : Alias pour le dossier « partagé » (composants UI, pipes...).<br><br>**6. `^[./]`** : Importations locales (fichiers proches), placées à la fin. |
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

### Eslint Rules

```text

```

### Tsconfig Rules

[Tsconfig Documentation](https://www.typescriptlang.org/tsconfig/)

```text

```

### Schematics Rules

[Angular Documentation](https://github.com/angular/angular-cli/tree/main/packages/schematics/angular)

#### 1. `@schematics/angular:application` (Project Initialization)

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

#### 2. `@schematics/angular:class` (Class)

Configuration pour la génération des classes (`ng g cl`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `true` | Les classes (souvent des DTO ou des wrappers utilitaires) n'ont généralement pas besoin de tests |

#### 3. `@schematics/angular:component` (Components)

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

#### 4. `@schematics/angular:directive` (Directives)

Configuration pour la génération des directives (`ng g d`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`prefix`** | `""` | Le préfixe du sélecteur est explicitement vide |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`) |
| **`standalone`** | `true` | Utiliser le STANDALONE pour les directives |
| **`type`** | `"directive"` | Ajouter le type à la classe et au fichier (`my-highlight.directive.ts`) |

#### 5. `@schematics/angular:enum` (Enum)

Configuration pour la génération des enums (`ng g e`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`type`** | `"enum"` | Ajouter le type à la classe et au fichier `.enum.ts` |

#### 6. `@schematics/angular:guard` (Guards)

Configuration pour le routage des guards (`ng g guard`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`functional`** | `false` | Générer une Guard basée sur une classe (au lieu d'une simple fonction) |
| **`implements`** | `[...]` | Générer le Guard implémentant les quatre interfaces de routage |
| **`skipTests`** | `true` | Ne pas générer de fichiers de tests unitaires |
| **`typeSeparator`** | `.` | Définir le séparateur `guard` (`auth.guard.ts`) |

#### 7. `@schematics/angular:interceptor` (HTTP Interceptors)

Configuration pour la gestion des interceptors (`ng g interceptor`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`type`** | `"model"` | Ajouter le type à la classe et au fichier `.model.ts` |

#### 8. `@schematics/angular:interface` (Interfaces)

Configuration pour la gestion globale des interfaces (`ng g i`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `true` | Ne pas générer de fichiers de tests unitaires |
| **`typeSeparator`** | `.` | Définir le séparateur `interceptor` (`auth.interceptor.ts`) |

#### 9. `@schematics/angular:module` (Modules)

Configuration pour la gestion globale des modules (`ng g m`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`typeSeparator`** | `.` | Définit le séparateur `module` (uniquement si STANDALONE est désactivé) |

#### 10. `@schematics/angular:pipe` (Pipes)

Configuration pour la gestion globale des pipes (`ng g p`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `false` | Les résolveurs sont étroitement liés au routage et sont généralement testés via E2E |
| **`standalone`** | `true` | Utiliser le STANDALONE pour les pipes |

#### 11. `@schematics/angular:resolver` (Resolvers)

Configuration pour la gestion globale des resolvers (`ng g r`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`). |
| **`type`** | `"service"` | Ajouter le type à la classe et au fichier (`api.service.ts`) |

#### 12. `@schematics/angular:service` (Services)

Configuration pour la gestion globale des services (`ng g s`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`). |
| **`type`** | `"service"` | Ajouter le type à la classe et au fichier (`api.service.ts`) |
