<div align="right">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=EmmanuelLefevre.AngularTemplate" />
  <img src="https://img.shields.io/github/last-commit/EmmanuelLefevre/AngularTemplate" />
  <img src="https://github.com/EmmanuelLefevre/AngularTemplate/actions/workflows/main.yaml/badge.svg" />
</div>

<br>

# ANGULAR TEMPLATE

## SOMMAIRE

- [PNPM](#pnpm)
- [ANGULAR](#angular)
- [ESLINT / PRETTIER](#eslint--prettier)
- [HUSKY](#husky)
- [WARNING](#warning)

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
npm view @angular/cli dist-tags
```

**\* Liste complète :**

```shell
npm view @angular/cli dist-tags
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

2. Créer un fichier `.prettierrc` à la racine et coller cette config  

```shell
{
  "printWidth": 100,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
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
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "ng test",
  "lint": "ng lint",
  "lint:ci": "ng lint --max-warnings=0",
  "format": "prettier --write \"src/**/*.{ts,html,css,scss,json}\"",
  "prepare": "husky"
}
```

## WARNING

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
git commit -m "chore: enforce LF line endings"
```
