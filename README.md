<div align="right">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=EmmanuelLefevre.AngularTemplate" />
  <img src="https://img.shields.io/github/last-commit/EmmanuelLefevre/AngularTemplate" />
  <img src="https://github.com/EmmanuelLefevre/AngularTemplate/actions/workflows/main.yaml/badge.svg" />
</div>

<br>

# ANGULAR TEMPLATE

## SOMMAIRE

- [ARCHITECTURE](#-architecture)
- [PNPM](#pnpm)
- [ANGULAR](#angular)
- [ESLINT / PRETTIER](#eslint--prettier)
- [HUSKY](#husky)
- [SCHEMATICS](#schematics)
- [WARNING](#-warning)
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

## PNPM

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

## ANGULAR

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

## NPMRC

Pour éviter d'avoir à retirer manuellement les "^" à chaque installation d'une nouvelle librairie, il est possible de configurer le projet pour qu'il sauvegarde toujours la version exacte de la librairie installée.  
Créer un fichier nommé `.npmrc` à la racine du projet et ajouter cette ligne :  

```shell
save-exact=true
```

Désormais, si on lance `pnpm add rxjs`, il installera **`"rxjs"`: `"7.8.0"`** au lieu de **`"^7.8.0"`**.

## ESLINT / PRETTIER

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

```shell
# .prettierignore
node_modules
dist
coverage
.angular
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
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "ng test",
  "lint": "ng lint",
  "lint:ci": "ng lint --max-warnings=0",
  "format": "prettier --write \"src/**/*.{ts,html,css,scss,json}\""
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

## HUSKY

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

## SCHEMATICS


## ⚠️ WARNING

⚠️ Attention si vous recevez ce warning lors du premier push !  

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

```text
arrowParens: "always"
  Forcer les parenthèses autour des arguments des fonctions fléchées.

bracketSameLine: true
  Placer la balise de fermeture de l'élément HTML multi-lignes (>) sur la même ligne que le dernier attribut.

bracketSpacing: true
  Ajouter des espaces entre les accolades des objets. ({ foo: bar } au lieu de {foo: bar}).

embeddedLanguageFormatting: "auto"
  Prettier formate automatiquement le code intégré (ex: CSS dans JS) s'il le reconnaît.

endOfLine: "lf"
  Line Feed (LF). C'est le standard Unix. Il garantit la cohérence des fins de ligne même sous Windows,
  prévenant des modifications inutiles dans Git.

experimentalTernaries: false
  Conserver le formatage classique des ternaires (condition ? true : false).

htmlWhitespaceSensitivity: "css"
  Respecter la propriété CSS display par défaut pour la gestion des espaces dans le HTML,
  évitant de casser la mise en page des éléments inline.

importOrder
  Définit la hiérarchie verticale des imports. Le plugin lit cette liste de haut en bas pour organiser
  les imports en groupes.

  Rules details (Regex) :
  1. "^@angular/(.*)$"
    Capturer tous les packages Angular officiels (core, common, router, forms...).
    Convention : Le framework passe toujours en premier !

  2. "^rxjs"
    Capturer les importations RxJS (Observable, Subject...).
    Positionné en haut car il s'agit du moteur asynchrone fondamental d'Angular.

  3. "<THIRD_PARTY_MODULES>"
    Il ne s'agit pas d'une expression régulière, mais d'un mot-clé magique provenant du plugin.
    Capturer TOUT ce qui provient de 'node_modules' et qui n'a pas été intercepté par les règles 1 et 2.

  4. "^@core/(.*)$"
    Capture vos alias TypeScript définis dans tsconfig.json pour le dossier « core ».
    (services, guards, interceptors...)

  5. "^@shared/(.*)$"
    Capture vos alias pour le dossier « partagé »
    (composants d'interface utilisateur réutilisables, pipes, directives...)

  6. "^[./]"
    Capture toutes les importations pertinentes (commençant par . ou ..).
    Ce sont des fichiers « locaux » proches du fichier actuel.
    Elles sont toujours placées à la fin pour séparer les dépendances externes du code interne.

importOrderParserPlugins:
  Liste des plugins transmis à l'analyseur Babel utilisé par le plugin de tri.
  IMPORTANT POUR ANGULAR : Sans « decorators-legacy », le plugin ne peut pas analyser
  les fichiers contenant des décorateurs (comme @Component) et générera une erreur de syntaxe.
  Activer également « typescript » pour une gestion correcte de la syntaxe TypeScript lors du tri.

importOrderSeparation: true
  Ligne vide entre les groupes.

importOrderSortSpecifiers: true
  Trier également {b, a} en {a, b}.

insertPragma: false
  N'ajouter pas de commentaire @format en haut des fichiers.

overrides (Angular Special)
  Indispensable pour analyser correctement la syntaxe Angular (*ngIf, [prop], (event))
  dans les fichiers .html sans rien casser.

plugins: ["@trivago/prettier-plugin-sort-imports"]
  Indique à Prettier de charger ce plugin externe.
  Sans cette ligne, toutes les options commençant par « importOrder » seront ignorées
  et vos importations ne seront pas triées.

printWidth: 120
  Couper les lignes après 120 caractères (80 par défaut, souvent trop court).

proseWrap: "preserve"
  Ne pas reformater pas les blocs de texte en Markdown (évite les différences Git inutiles).

quoteProps: "as-needed"
  N'utiliser des guillemets autour des clés d’objet que si la syntaxe l’exige.

requirePragma: false
  Formater tous les fichiers, et pas seulement ceux comportant la balise @format.

semi: true
  Ne jamais oublier d'ajouter un point-virgule à la fin des instructions.

singleAttributePerLine: true
  Force un attribut par ligne en HTML si la balise est longue.
  Rendre les modèles Angular très lisibles verticalement.

singleQuote: true
  Use single quotes in JS/TS ('text') to reduce visual noise.

tabWidth: 2
  One indentation corresponds to 2 spaces.

trailingComma: "all"
  Ajouter des virgules à la fin des listes (objects, arrays, functions).
  Permet de rendre les modifications de code plus propres dans Git.

useTabs: false
  Utiliser des espaces pour l'indentation, pas des tabulations.
```

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
| **`standalone`** | `true` | Génèrer la structure initiale en STANDALONE (sans `NgModules`) |
| **`strict`** | `true` | Permet des contrôles de type plus stricts |
| **`style`** | `"scss"` | Définir SCSS par défaut |
| **`zoneless`** | `false` | Maintenir `zone.js` activé pour la détection des changements |

#### 2. `@schematics/angular:component` (Components)

Configuration pour la génération des composants (`ng g c`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`changeDetection`** | `"OnPush"` | Définir la stratégie de détection des changements sur `OnPush` |
| **`displayBlock`** | `true` | Ajoute automatiquement `:host { display: block; }` au SCSS du composant |
| **`inlineStyle/inlineTemplate`**| `false` | Force la séparation des fichiers `.html` et `.scss` |
| **`prefix`** | `""` | Le préfixe du sélecteur est explicitement vide |
| **`skipTests`** | `false` | Génèrer un fichier de test unitaire (`.spec.ts`) |
| **`standalone`** | `true` | Utiliser le STANDALONE pour les composants |
| **`style`** | `"scss"` | Définir SCSS par défaut |
| **`type`** | `"component"` | Ajouter le type à la classe et au fichier (`my-feature.component.ts`) |

#### 3. `@schematics/angular:directive` (Directives)

Configuration pour la génération des directives (`ng g d`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`prefix`** | `""` | Le préfixe du sélecteur est explicitement vide |
| **`skipTests`** | `false` | Génèrer un fichier de test unitaire (`.spec.ts`) |
| **`standalone`** | `true` | Utiliser le STANDALONE pour les directives |
| **`type`** | `"directive"` | Ajouter le type à la classe et au fichier (`my-highlight.directive.ts`) |

#### 4. `@schematics/angular:guard` (Route Guards)

Configuration pour le routage des éléments de protection et de sécurité.

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`functional`** | `false` | Génèrer une Guard basée sur une classe (au lieu d'une simple fonction) |
| **`implements`** | `[...]` | Génèrer le Guard implémentant les quatre interfaces de routage |
| **`skipTests`** | `true` | Ne pas générer de fichiers de tests unitaires |
| **`typeSeparator`** | `.` | Définir le séparateur `guard` (`auth.guard.ts`) |

#### 5. `@schematics/angular:interceptor` (HTTP Interceptors)

Configuration pour la gestion globale des requêtes/réponses HTTP.

| Option | Valeur | Description |
| :--- | :--- | :--- | :--- |
| **`skipTests`** | `true` | Ne pas générer de fichiers de tests unitaires |
| **`typeSeparator`** | `.` | Définir le séparateur `interceptor` (`auth.interceptor.ts`) |

#### 6. `@schematics/angular:service` (Services)

Configuration pour la logique métier principale et les fournisseurs de données.

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `false` | Génèrer un fichier de test unitaire (`.spec.ts`). |
| **`type`** | `"service"` | Ajouter le type à la classe et au fichier (`api.service.ts`) |

#### 7. Autres éléments (Enums, Interfaces, Pipes...)

| Schematic | Option | Valeur | Description |
| :--- | :--- | :--- |
| **`@schematics/angular:class`** | `skipTests` | `true` | Les classes (souvent des DTO ou des wrappers utilitaires) n'ont généralement pas besoin de tests |
| **`@schematics/angular:enum`** | `type` | `"enum"` | Ajouter le type à la classe et au fichier `.enum.ts` |
| **`@schematics/angular:interface`** | `type` | `"model"` | Ajouter le type à la classe et au fichier `.model.ts` |
| **`@schematics/angular:pipe`** | `skipTests` | `false` | Les Pipes contiennent une logique de transformation et doivent être testés par défaut |
| | `standalone` | `true` | Utiliser le Standalone pour les pipes |
| **`@schematics/angular:resolver`**| `skipTests` | `true` | Les résolveurs sont étroitement liés au routage et sont généralement testés via E2E |
| | `typeSeparator` | `.` | Définit le séparateur (`data.resolver.ts`) |
| **`@schematics/angular:module`** | `typeSeparator` | `.` | Définit le séparateur `module` (uniquement si STANDALONE est désactivé) |
