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
- [PRETTIER](#prettier)
- [ESLINT](#eslint)
- [HTMLHINT](#htmlhint)
- [STYLELINT](#stylelint)
- [HUSKY](#husky)
- [GIT LEAKS](#git-leaks)
- [TS CONFIG](#ts-config)
- [TESTS](#tests)
- [CI/CD](#ci-cd)
  - [Protection des branches](#protection-des-branches)
  - [Stratégie de qualité](#strategie-de-qualite)
  - [Rimraf](#rimraf)
  - [Sonar Cloud](#sonar-cloud)
  - [Snyk](#snyk)
  - [CodeQL](#codeql)
  - [GitLeaks](#gitleaks)
- [DEPENDENCIES](#dependencies)
- [STYLES](#styles)
- [SCHEMATICS](#schematics)
- [CONFIGURATION DE BUILD](#configuration-de-build)
- [MULTI LANGUES](#multi-langues)
- [TOOLING DOCUMENTATIONS](#tooling-documentations)
  - [Prettier Rules](#prettier-rules)
  - [ESLint Rules](#eslint-rules)
  - [HTMLHint Rules](#htmlhint-rules)
  - [StyleLint Rules](#stylelint-rules)
  - [TS Config Rules](#ts-config-rules)
  - [Schematics Rules](#schematics-rules)
- [ERREURS FREQUENTES](#erreurs-frequentes)

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
📄.gitleaks.toml
📄.npmrc
📄.stylelintrc.json
📄eslint-security.config.js
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

Pour garantir la stabilité du projet et éviter les différences entre les environnements (`local`, `CI`, `DEV`, `PROD`), nous utiliserons un fichier `.npmrc` à la racine.  

1. **Garantir l'intégrité du Lockfile** (`frozen-lockfile`)

Le `pnpm-lock.yaml` est la source de vérité absolue de toutes les dépendances (y compris les dépendances de nos dépendances).  
Si le `package.json` et le lockfile ne correspondent pas, l'installation échoue au lieu de mettre à jour le fichier lockfile.  

En résumé cette option interdit à **PNPM** la modification silencieuse du `pnpm-lock.yaml` lors de l'installation.  

```shell
frozen-lockfile=true
```

2. **Fixer les versions à l'installation** (`save-exact`)

Par défaut, **PNPM** ajoute un prefixe (ex: ^7.8.0) qui autorise les mises à jour mineures automatiques.  

Pour éviter d'avoir à retirer manuellement les "^" à chaque installation d'une nouvelle librairie, il est possible de configurer le projet pour qu'il sauvegarde toujours la version exacte de la librairie installée.  

```shell
save-exact=true
```

Désormais, si on lance `pnpm add rxjs`, il installera **`"rxjs"`: `"7.8.0"`** au lieu de **`"^7.8.0"`**.

<h2 id="prettier">
  <img
    alt="Prettier"
    title="Prettier"
    width="30px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/prettier.png"
  />
  PRETTIER
</h2>

Pour un projet **Angular** moderne, la combinaison standard de l'industrie est **ESLint** (pour la qualité du code et les erreurs) et **Prettier** (pour le style et le formatage).  

### Introduction :

**Prettier** est un formateur de code qui garantit des styles de code cohérents dans un projet.  
En l'intégrant, les développeurs peuvent automatiser le formatage des fichiers **JavaScript**, **TypeScript**, **HTML** et autres, ce qui uniformise le style du code au sein de l'équipe.  
L'utilisation de **Prettier** permet d'améliorer la lisibilité et la maintenabilité du code, tout en minimisant les erreurs de syntaxe liées aux différents styles de codage. Cette approche assure que tout le code du projet respecte le même format.  

Un hook de `pre-commit` via **Husky** étant implémenté et utilisant `lint-staged` dans le `package.json`, **Prettier** ne formattera que les fichiers nécessaires lors d’un commit et ce de manière automatique et transparente pour le développeur.  

Cela garantit que tous les fichiers commits respectent les normes de formatage définies par l'équipe. Cette automatisation rend le workflow de développement plus fluide et aide à maintenir un code uniforme sans nécessiter d'interventions manuelles.  

1. Installer **Prettier**  

Bien qu'il y ait une configuration dans `package.json`, il est préférable (Best Practice) d'avoir un fichier de configuration dédié `.prettierrc`.

```shell
pnpm add -D prettier
```

2. Créer un fichier `.prettierrc.js` à la racine et y coller la configuration présente dans le template.  

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

3. Nettoyage : Supprimer le bloc "prettier": { ... } du fichier `package.json` pour éviter les doublons et y inclure les scripts =>  

```JSON
"scripts": {
  "format": "prettier --write .",
  "format:check": "prettier --check .",
}
```

4. Créer un fichier `.prettierignore` pour éviter de formater des fichiers inutiles et y coller la configuration présente dans le template.  

<h2 id="eslint">
  <img
    alt="ESLint"
    title="ESLint"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg"
  />
  ESLINT
</h2>

### Introduction :

**ESLint** est un outil de linting pour **JavaScript** et **TypeScript** qui permet d'analyser le code afin d'identifier et de signaler des schémas de code potentiellement problématiques.  
Son principal objectif est d'améliorer la qualité du code et de garantir des pratiques de codage cohérentes au sein d'une équipe de développement. Grâce à un large éventail de règles configurables **ESLint permet**, avant même l'exécution du code, aux développeurs de =>  

- définir des normes spécifiques à un projet
- définir des règles de nommage
- détecter les erreurs syntaxiques
- détecter les problèmes de style

En plus de ces fonctionnalités, **ESLint** permet des vérifications automatiques en temps réel dans l'environnement de développement, fournissant un retour immédiat lors de la rédaction de code.  

```powershell
ng lint
```

**ESLint** a aussi une fonctionnalité de correction automatique des erreurs détectées.  
Lors de l'exécution de cette commande, **ESLint** analyse le code source à la recherche de problèmes qui peuvent être corrigés automatiquement.  

```powershell
ng lint --fix
```

Pour finir, **ESLint** s'intègre parfaitement dans les pipelines d'intégration continue (**CI**). En exécutant les règles de linting lors des builds, la pipeline s'assure que tout le code soumis respecte les normes définies, empêchant ainsi le déploiement de code non conforme.  

### Extension VSCode :

[ESLint VSCode Extension](https://marketplace.visualstudio.com/items/?itemName=dbaeumer.vscode-eslint)  

⚠️ Pensez à recharger le server ESLint dans votre VSCode !!!  

`CTRL + SHIFT + P`

```powershell
Restart ESLint Server
```

**Etape 1 :** Installer **ESLint**  

La méthode officielle et la plus sûre pour **Angular** est d'utiliser les "Schematics". Cela va générer la configuration adaptée à la version 21.  
Pour être sûr à 100%, on peut même ajouter un "flag" pour forcer le gestionnaire.

```shell
ng add @angular-eslint/schematics --package-manager=pnpm
```

**\* Note :** Si on demande quel gestionnaire utiliser, confirmer celui déjà choisi (**PNPM**, **Yarn**...). Ici **PNPM**. Cette commande va ajouter les dépendances eslint et créer un fichier de configuration (`eslint.config.js` pour les versions modernes utilisant le "Flat Config").

**Etape 2 :** Empêcher les conflits (**ESLint** vs **Prettier**)  

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

Créer un fichier `eslint-security.config.js` et y coller la configuration présente dans le template.  
Cette configuration de sécurité a été séparée dans un autre fichier afin de l'éxécuter dans le job 🛡️ Security Scans.  

5. Configurer **ESLint**  

Ouvrir le fichier `eslint.config.js` (qui vient d'être créé à la racine).  

Voici à quoi cela devrait ressembler (simplifié) :  

**\* Note :** Prettier ne sera pas ajouté automatiquement il faut le faire manuellement comme indiqué ci dessous.  
Coller la configuration présente dans le template.  

**Etape 3 :** Overrides

Dans la nouvelle Flat Config d'**ESLint**, la propriété overrides (telle qu'elle existait dans l'ancien format `.eslintrc`) n'existe plus.  

Le concept est maintenant le suivant : **TOUT** est "override". Pour créer des exceptions, il suffit d'ajouter un nouvel objet à la fin du tableau `defineConfig`. Comme **ESLint** lit la configuration de haut en bas, les règles définies à la fin écrasent celles du début pour les fichiers correspondants.  

```js
export default defineConfig([
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@angular-eslint/no-empty-lifecycle-method': 'off'
    }
  }
]);
```

Cette section `overrides` de la configuration **ESLint**> permet de désactiver certaines règles pour des fichiers spécifiques où l'on ne souhaite pas appliquer certaines règles.  
Cela est particulièrement utile pour les fichiers de directives, pipes ou d'environnements qui peuvent avoir des conventions ainsi que des besoins différents par rapport au reste du code.  

**Etape 4 :** Ajouter les scripts pratiques  

Mettre à jour la section "scripts" du `package.json` pour faciliter l'utilisation en collant la configuration présente dans le template.  

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

[En savoir plus sur l'accessibilité](https://github.com/EmmanuelLefevre/Documentations/blob/main/Learnings/accessibilite.md)

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

Il faut créer le fichier `.htmlhintrc` à la racine du projet et y coller la configuration présente dans le template.  

Pour finir ouvrir le fichier `package.json` et ajouter la commande suivante dans la partie `scripts` =>  

```JSON
"scripts": {
  "lint:html": "htmlhint \"src/**/*.html\""
}
```

**Etape 3 :** Tester la commande  

Lancer le lint sur nos fichiers **HTML** =>

```shell
pnpm lint:html
```

Si le script n'est pas défini dans le `package.json` =>

```shell
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
pnpm add -D stylelint stylelint-scss postcss-scss
```

Il faut ensuite créer le fichier `.stylelintrc.json` à la racine et y coller la configuration présente dans le template.  

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

<h2 id="git-leaks">
  <img
    alt="GitLeaks"
    title="GitLeaks"
    width="100px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/git_leaks.png"
  />
  GIT LEAKS
</h2>

**Gitleaks** est un outil de sécurité conçu pour détecter et prévenir l'introduction de secrets (mots de passe, clés API, jetons AWS, certificats) dans notre historique **Git**.  

**Son rôle**  
Il scanne chaque commit et chaque ligne de code pour identifier des signatures spécifiques (comme une **clé privée SSH**) ou des motifs suspects (comme une chaîne de caractères nommée `SECRET_KEY`).  

**Pourquoi c'est top**  
Une fois qu'un secret est "poussé" sur un dépôt (même privé), il est considéré comme compromis. Même si on supprime la ligne plus tard, le secret reste présent dans l'historique des commits. **Gitleaks** bloque l'action avant que le secret ne soit définitivement ancré dans l'historique et garantit que nos fichiers de configuration restent propres ainsi que nos secrets restent dans les coffres-forts prévus à cet effet (comme les **GitHub Secrets** ou **HashiCorp Vault**)..  

```shell
pnpm add -D gitleaks
```

```JSON
"lint-staged": {
  "*": [
    "gitleaks protect --staged --verbose"
  ],
  "src/**/*.html": []
}
```
Créer le fichier `.gitleaks.toml` et y coller la configuration présente dans le template.  

<h2 id="husky">
  <img
    alt="Husky"
    title="Husky"
    width="30px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/husky.png"
  />
  HUSKY
</h2>

### Introduction :

Imaginez un gardien de la qualité automatique à l'entrée de votre code base. Son travail est de s'assurer que chaque nouvelle contribution respecte les règles de style et de qualité établies par l'équipe, sans que personne n'ait à y penser.  
C'est pourquoi nous allons utiliser **Husky** couplé à `pre-commit` et `lint-staged`. Ensemble, ils créent une chaîne d'automatisation puissante qui s'exécute avant chaque commit. Décortiquons ensemble les rôles de chaque acteur...  

#### 1. Le Hook de pre-commit (le déclencheur) :

Au coeur du système se trouve une fonctionnalité native de **Git** : les hooks. Un hook est simplement un script que **Git** exécute automatiquement à des moments clés de son cycle de vie. Le hook de `pre-commit` se déclenche juste après que l'on ait tapé `git commit` et avant même que l'éditeur de message de commit ne s'ouvre.  

C'est le point de départ de notre processus de vérification. Il nous donne une opportunité parfaite pour analyser le code et, si nécessaire, bloquer le commit s'il n'est pas conforme.  

#### 2. Husky (le gestionnaire de hooks) :

Gérer les hooks **Git** manuellement peut être complexe, car ils doivent être placés dans le dossier `.git/hooks`, qui n'est pas versionné avec le reste du projet. Il est donc difficile de les partager au sein d'une équipe.  

**Husky** résout ce problème avec brio. C'est un outil qui permet de configurer les hooks **Git** très simplement, directement dans notre fichier `package.json`. **Husky** agit comme un "manager" : il s'assure que nos scripts personnalisés (comme le formatage du code) sont bien exécutés lorsque le hook de `pre-commit` est déclenché par **Git**.  

#### 3. Lint-Staged (l'optimiseur intelligent) :

Pourquoi `lint-staged` ? Lancer `npm run lint` sur un gros projet prend du temps (10s... 30s... 1min). Si l'on doit attendre 1 minute à chaque commit, nous allons finir par désactiver **Husky**.  

C'est là que `lint-staged` entre en jeu. C'est un outil intelligent qui exécute des commandes uniquement sur les fichiers qui sont "staged". Au lieu de formater les 5000 fichiers du projet, il ne formatera que les 3 que vous venez de modifier et l'opération devient quasiment instantanée.  

### Configuration :

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
    "htmlhint",
    "eslint --fix --max-warnings=50",
    "prettier --write"
  ],
  "src/**/*.ts": [
    "eslint --fix --max-warnings=50",
    "prettier --write"
  ],
  "**/*.{css,scss,json,md}": [
    "prettier --write"
  ],
  "*.scss": [
    "stylelint --fix"
  ],
  "*.{js,cjs,mjs}": [
    "eslint --fix --max-warnings=50",
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

**Etape 5 :** Ajouter la commande au `package.json` si ça n'a pas été fait automatiquement...  

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

Copier/coller la configuration présente dans le template.  

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

8. Créer le fichier `vitest.config.ts` et y coller la configuration présente dans le template.  

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

<h3 id="protection-des-branches">
  PROTECTION DES BRANCHES
</h3>

Pour garantir que la qualité et la sécurité du code ne soient jamais compromises, des règles de protection strictes ont été appliquées sur les branches vitales du projet.  

🔒 **Configuration pour `main` et `develop`**  

Voici les règles implémentées dans ce dépôt (Settings > Branches > Add rule) :  

- **Require a pull request before merging :** interdiction totale de pousser directement du code sur ces branches. Tout changement doit passer par une **PR**.
- **Require status checks to pass before merging :** une **PR** ne peut être fusionnée que si les jobs suivants sont au vert :  
🛡️ Security Scans  
✨ Quality & Tests  
- **Require conversation resolution before merging :** toutes les remarques des relecteurs lors de la **PR** doivent être traitées.
- **Restrict deletions & force pushes :** empêcher quiconque d'effacer l'historique ou de réécrire les branches stables.

L'option **"Include administrators"** est également activée...  

<h3 id="strategie-de-qualite">
  STRATEGIE DE QUALITE
</h3>

Pour maintenir une base de code saine sans ralentir le développement quotidien, une stratégie de validation stricte mais pragmatique est appliquée : **"Souple en local, Intransigeant en CI"** !!!  

1. **En Local (Commit) :** Tolérance Partielle 🚧

Lors des commits, **Husky** et **lint-staged** analysent uniquement les fichiers modifiés.  

**Philosophie**  

Le développement est un processus itératif. Il est acceptable d'avoir quelques imperfections mineures (warnings) pendant que l'on travaille sur une fonctionnalité.  

**Seuil de tolérance : Max 50 warnings**

- Si erreurs (errors), le commit est bloqué.
- Si moins de 50 warnings, le commit passe.
- Si plus de 50 warnings, le commit est bloqué.

Commande exécutée : `eslint --fix --max-warnings=50`

2. **En CI/CD (Pull Request) :** Tolérance Zéro ⛔

Lorsqu'une Pull Request est ouverte vers `develop` ou `main`, le pipeline **GitHub Actions** analyse l'intégralité du projet.  

**Philosophie**  

Le code qui entre dans les branches principales doit être irréprochable. La dette technique ne doit pas s'accumuler silencieusement via des warnings ignorés.  

**Seuil de tolérance : Max 0 warnings**

Conséquence : Si le moindre warning subsiste (**HTML**, **TS** ou encore **SCSS**), le job ✨ Quality & Tests échoue et le merge est bloqué par **GitHub**.  

Commande exécutée : `pnpm lint:ci` (ng lint --max-warnings=0).  

<h3 id="rimraf">
  RIMRAF
</h3>

L'utilisation de **rimraf** permet de supprimer des dossiers de manière fiable que l'on soit sous **Windows**, **macOS** ou **Linux**. C'est essentiel pour éviter que d'anciens rapports de couverture ne viennent fausser les nouvelles analyses.  

```shell
pnpm add -D rimraf
```

Dans `package.json` ajouter les scripts `clean` et `test:coverage`  

```JSON
"scripts": {
  "clean": "rimraf coverage .angular",
  "test:coverage": "ng test --coverage --watch=false",
}
```

<h3 id="sonar-cloud">
  <img
    alt="SonarCloud"
    title="SonarCloud"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/sonar_cloud.png"
  />
  SONAR CLOUD
</h3>

**SonarCloud** est l'inspecteur de santé de ce projet. C'est l'outil de référence pour le **"Clean Code"**.  

**Son rôle**  
Il analyse la qualité globale. Il traque :  

- **Bugs :** code qui va probablement planter.
- **"Code Smells" :** code mal écrit, difficile à maintenir (dette technique).
- **Couverture de test :** s'assure que tu as bien testé ce que tu as écrit.
- **Hotspots de sécurité :** zones du code qui demandent une révision manuelle.

**Pourquoi c'est top**  

Son concept de **Quality Gate** (Porte de Qualité) est génial : si du nouveau code ne respecte pas les standards (ex : **moins** de **80%** de tests), il bloque la fusion de la **PR**.  

Configurer son compte **SonarCloud** et son secret `SONAR_TOKEN`.  

Créer le fichier `sonar-project.properties` à la racine et y coller la configuration présente dans le template...  

<h3 id="snyk">
  <img
    alt="Snyk"
    title="Snyk"
    width="88px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/snyk.png"
  />
  SNYK
</h3>

**Snyk** est le spécialiste des dépendances externes. Dans un projet moderne, **80%** du code provient de bibliothèques tierces (via **npm** ou **pnpm**). **Snyk** s'assure que ces bibliothèques que nous importons ne sont pas empoisonnées.  

**Son rôle**  
Il parcourt le fichier `package.json` et le `pnpm-lock.yaml` pour les comparer à une base de données géante de vulnérabilités connues (**CVE**).  

**Pourquoi c'est top**  
Il ne se contente pas de dire "c'est cassé", il propose souvent la version précise à laquelle l'on doit mettre à jour pour corriger la faille.  

**Seuil**  
Seules les vulnérabilités de niveau high bloquent le pipeline, évitant ainsi de stopper le projet pour des failles mineures ou sans correctif disponible.  

<h3 id="codeql">
  <img
    alt="CodeQL"
    title="CodeQL"
    width="60px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/codeql.png"
  />
  CODEQL
</h3>

**CodeQL** est le moteur d'analyse sémantique de **GitHub**. Contrairement à un linter classique qui regarde la forme, **CodeQL** traite le code comme une base de données.  

**Son rôle**  
Il exécute des requêtes complexes pour voir comment les données circulent dans l'application. Il peut détecter si une entrée utilisateur non sécurisée finit par être exécutée par une fonction sensible (prévenant ainsi les injections).  

**Pourquoi c'est top**  
C'est un outil de "chasseur de failles". Il est capable de trouver des erreurs de logique ou des vulnérabilités critiques que personne n'a encore répertoriées ailleurs.  

<h3 id="gitleaks">
  <img
    alt="GitLeaks"
    title="GitLeaks"
    width="100px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/git_leaks.png"
  />
  GIT LEAKS
</h3>

Bien que nous utilisions **Gitleaks** en local, son intégration dans la pipeline **CI/CD** est cruciale pour garantir une étanchéité totale du projet.  

**Pourquoi l'avoir aussi dans la CI ?**  

- **Contournement des Hooks :** un développeur peut (volontairement ou non) bypasser les protections locales avec la commande `git commit --no-verify`. La **CI**, elle, ne peut pas être ignorée.
- **Historique complet :** alors que le scan local se concentre sur les fichiers modifiés (`--staged`), la version **CI** peut être configurée pour scanner l'intégralité de l'historique de la branche pour s'assurer qu'aucun secret n'a été "glissé" dans un commit passé.
- **Auditabilité :** elle génère un rapport officiel dans l'onglet **Security** de **GitHub**, permettant de garder une trace des tentatives d'introduction de données sensibles.

Si **Gitleaks** trouve une faille, le job **Security** échoue immédiatement, bloquant ainsi toute tentative de fusion ou de déploiement.  

### CONFIGURATION DE LA PIPELINE

Créer l'arborescence' `.github > workflows > pipeline.yml` et y coller la configuration présente dans le template.  

### MAINTENANCE : NETTOYAGE DES WORKFLOWS

Ce workflow utilitaire `cleanup.yml` est conçu pour maintenir la propreté de l'onglet **GitHub Actions** en supprimant automatiquement les anciennes éxécutions inutiles.  

#### 🕒 Déclenchement

**Automatique :** tous les jours à 05h00 UTC.  
**Manuel :** peut être lancé à la demande via l'onglet **Actions**.  

#### ⚙️ Fonctionnement

Le script utilise la **GitHub CLI** (gh) pour effectuer deux types de nettoyage :  

1. **Suppression des échecs et annulations :**

- Il scanne tous les workflows du projet.
- Il identifie les 100 dernières exécutions ayant le statut failure (échec) ou cancelled (annulé).
- Il les supprime une par une.

Objectif : ne garder que l'historique des builds réussis pour une meilleure lisibilité.  

2. **Auto-nettoyage (Self-Cleanup) :**

- Il cible spécifiquement l'historique du fichier `cleanup.yml`.
- Il supprime les anciennes exécutions réussies (completed) de ce workflow de nettoyage.

Note : Il exclut l'exécution en cours ($GITHUB_RUN_ID).

**Eviter que l'historique ne soit pollué par des centaines de logs inutiles.**

⚠️ **Important !!!**  
Si vous renommez le fichier `cleanup.yml`, mettre impérativement à jour la variable `WORKFLOW_FILE="cleanup.yml"` du script, sinon l'auto-nettoyage ne fonctionnera plus !  

<h2 id="dependencies">
  📦 DEPENDENCIES
</h2>

1. **Angular Material**  

**Angular Material** est la bibliothèque de composants officielle basée sur les principes du **Material Design**. Elle offre une collection de composants UI testés, accessibles et performants.  

```shell
pnpm add @angular/material @angular/cdk
```

2. **Font Awesome**  

Pour l'iconographie, **Font Awesome** est le standard de l'industrie. Plutôt que d'utiliser des polices de caractères, l'intégration via les composants **Angular** sera privilégiée, cela permet une gestion optimale des **SVG** et du **Tree-shaking** (seules les icônes utilisées sont incluses dans le build final).  

- **Scalabilité :** les icônes vectorielles garantissent une netteté parfaite sur tous les écrans.
- **Modularité :** possibilité d'importer uniquement les packs nécessaires (Solid, Regular, Brands).

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

### Introduction :

Les schematics d'**Angular** sont un puissant outil qui facilite le développement en automatisant la génération et la modification de code. Cela permet de personnaliser et d'étendre les fonctionnalités de la **CLI**.  
La section de configuration des **schematics** définit les paramètres par défaut de la commande `ng generate` de l'interface de la **CLI** d'****Angular**.  

Ils permettent aux développeurs de créer des composants, des services, des modules et d'autres éléments de manière standardisée (tout en réduisant les tâches répétitives et en minimisant les erreurs) grâce à la ligne de commande.  

Les **schematics** utilisent des règles pour définir comment le code doit être généré. De plus cela garantit la cohérence et le respect des bonnes pratiques architecturales dans l'ensemble du projet lors de la création de nouveaux fichiers (composants, services, gardes...).  

La configuration se trouve dans le fichier `angular.json`.  

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

Pour offrir une expérience utilisateur de premier plan, l'internationalisation (**i18n**) est une étape incontournable. Elle permet non seulement de toucher un public mondial, mais aussi de séparer proprement le contenu textuel de la logique métier.  

Installer les librairies suivantes =>  

```shell
pnpm add @ngx-translate/core @ngx-translate/http-loader
```

**Internationalisation avec NGX-Translate**  

L'implémentation choisie repose sur **NGX-Translate**, la bibliothèque de référence pour **Angular**. Elle permet de charger des fichiers de traduction de manière asynchrone et de basculer d'une langue à l'autre dynamiquement, sans recharger l'application.  

**Pourquoi cette solution ?**

- **Flexibilité :** les traductions sont stockées dans des fichiers **JSON** simples (`fr.json`, `en.json`).
- **Performance :** chargement à la demande (**Lazy Loading**) des fichiers de langue via **HTTP**.
- **Simplicité :** utilisation de `pipes (| translate)` ou de directives dans les templates **HTML**.

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
| **`declaration`** | `false` | Ne pas générer de fichiers de déclaration TypeScript (`.d.ts`). N'est généralement pas nécessaire pour les applications, mais l'est pour les bibliothèques. |
| **`esModuleInterop`** | `true` | Améliore la compatibilité entre les modules CommonJS (Node/Legacy) et les modules ES (Modern JS) pour les imports |
| **`experimentalDecorators`** | `true` | Active le support de la syntaxe des décorateurs, massivement utilisée par Angular (`@Component`, `@Injectable`) |
| **`forceConsistentCasing...`** | `true` | Interdire les références de fichiers avec une casse incohérente (éviter bugs entre Windows / Linux/Mac) |
| **`importHelpers`** | `true` | Importer les fonctions utilitaires depuis `tslib` au lieu de générer du code dupliqué dans chaque fichier |
| **`isolatedModules`** | `true` | Garantit que chaque fichier peut être transpilé individuellement, ce qui est requis pour les outils ultra-rapides comme Vite ou Esbuild |
| **`lib`** | `[Array]` | **1. `"ES2022"`** : inclure les types de JavaScript moderne au navigateur<br><br>**2. `"DOM"`** : inclure les types spécifiques au navigateur.<br><br> |
| **`module`** | `"preserve"` | Laisser les instructions d'import/export intactes. Permet au bundler (Vite/Webpack) de gérer le chargement des modules le plus efficacement possible |
| **`moduleResolution`** | `"bundler"` | Indique à TypeScript d'utiliser une stratégie de résolution optimisée pour les bundlers modernes (Vite, Esbuild). Ceci est requis par Angular 17+ pour le support correct des exports conditionnels (customConditions) et garantit un build rapide et correct |
| **`noImplicitOverride`** | `true` | Forcer l'utilisation du mot-clé `override` lorsqu'une méthode écrase celle d'une classe parente et sécurise l'héritage |
| **`noImplicitReturns`** | `true` | Vérifier que tous les chemins d'exécution d'une fonction retournent bien une valeur |
| **`noFallthroughCasesInSwitch`** | `true` | Empêche de passer accidentellement d'un `case` à un autre dans un `switch` (oubli du `break`) |
| **`resolveJsonModule...`** | `true` | Permettre d'importer directement des fichiers `.json` comme des modules TypeScript (`import data from './data.json'`) |
| **`skipLibCheck`** | `true` | Ignorer la vérification des types à l'intérieur de `node_modules` pour accélérer considérablement la compilation |
| **`sourceMap`** | `false` | Indiquer au compilateur de ne pas générer de fichiers `.map` pour le débogage (souvent géré par les outils de build dans les fichiers spécifiques comme `tsconfig.app.json`) |
| **`strict`** | `true` | Activer toutes les options de vérification de type strictes (pas de `any` implicite, gestion stricte du `null`, etc.) |
| **`target`** | `"ES2022"` | Compiler le code vers ECMAScript 2022 moderne, permettant l'usage natif de `async/await` et des fonctionnalités de classes récentes |
| **`useDefineForClassFields`** | `false` | Maintenir le comportement historique d'initialisation des champs de classe pour assurer une compatibilité totale avec les décorateurs Angular |

### 2. Options du Compilateur Angular (`angularCompilerOptions`)

Ces paramètres contrôlent le compilateur AOT (Ahead-of-Time) d'Angular, spécifiquement pour la vérification des types dans les templates HTML.  

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`enableI18nLegacy...`** | `false` | Indiquer au compilateur Angular de ne pas utiliser le format d'identifiant de message hérité (legacy) pour l'internationalisation |
| **`strictInjectionParameters`** | `true` | Signaler une erreur si un paramètre injecté n'est pas compatible avec le type d'injection attendu |
| **`strictInputAccessModifiers`** | `true` | Respecter les modificateurs d'accès (`private`, `protected`) lors de l'accès aux propriétés depuis les templates HTML |
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
| **`inlineStyle/inlineTemplate`** | `false` | Force la séparation des fichiers `.html` et `.scss` |
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
| **`skipTests`** | `true` | Générer un fichier de test unitaire (`.spec.ts`) |
| **`standalone`** | `true` | Utiliser le STANDALONE pour les pipes |
| **`typeSeparator`** | `.` | Définir le séparateur `pipe` (`date.pipe.ts`) |

#### 11. @schematics/angular:resolver (`Resolvers`)

Configuration pour la gestion globale des resolvers (`ng g r`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`) |
| **`type`** | `"service"` | Ajouter le type à la classe et au fichier (`api.service.ts`) |

#### 12. @schematics/angular:service (`Services`)

Configuration pour la gestion globale des services (`ng g s`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`) |
| **`type`** | `"service"` | Ajouter le type à la classe et au fichier (`api.service.ts`) |

<h2 id="erreurs-frequentes">
  ⚠️ ERREURS FREQUENTES
</h2>

### 1. 🛑 Ma **PR** est bloquée alors que mon commit est passé ?

C'est normal si vous aviez laissé des warnings. Votre commit est passé localement car il respectait la limite des 50, mais la CI exige la perfection.  

Pour corriger :  

- Regardez les logs de l'action GitHub pour voir les fichiers incriminés.
- Lancez la vérification stricte en local pour les reproduire :

```Bash
pnpm lint:ci
pnpm lint:html:ci
pnpm lint:scss:ci
```

Corrigez les warnings restants, commitez et pushez.  

### 2. 🛑 Que faire si Gitleaks lève une alerte ?

Pas de panique ! Cela arrive aux meilleurs. Si un commit est bloqué en local ou si la **CI** échoue avec un message de **Gitleaks**, suivre ces étapes dans l'ordre :  

1. **Identifier la nature de l'alerte**  

Consulter le log de **Gitleaks**. Il indiquera le fichier, la ligne et le type de secret détecté (ex: Generic API Key).  

2. **Cas A : C'est un "Vrai" Secret (Clé réelle, MDP...)**  

Si un secret valide traîne réellement :  

- **Révoquer le secret immédiatement :** changer le mot de passe ou désactiver la clé API sur la plateforme concernée (**AWS**, **Stripe**...). Une clé poussée sur **Git** doit être considérée comme compromise !!!
- **Nettoyer le code :** remplacer le secret par une variable d'environnement ou une référence à un coffre-fort (**Secret Manager**).
- **Supprimer le secret de l'historique :** si le commit est uniquement local : faire un `git commit --amend` ou un `git rebase`.

Si le commit est déjà sur le serveur : il faudra utiliser un outil comme **BFG Repo-Cleaner** ou **git filter-repo**.  

[Procédure Git Filter Repo](https://github.com/EmmanuelLefevre/Documentations/blob/main/Tutorials/github_tricks.md)

3. **Cas B : C'est un "Faux Positif"**  

Si **Gitleaks** s'est trompé (ex: il a pris un ID de test pour une clé API) :  

- **Utiliser l'empreinte (Fingerprint) :** une empreinte unique pour cette détection est donnée par **Gitleaks**.
- **Ajouter l'empreinte à l'allowlist :** copier cette empreinte dans le fichier `.gitleaks.toml` sous la section `[allowlist]`.

**Gitleaks** ignorera cette valeur précise à l'avenir.  

💡 **Rappel : La règle d'or**  

Ne jamais utiliser `--no-verify` pour forcer un commit bloqué par **Gitleaks**. Si l'outil aboie, c'est qu'il y a une raison !!!  
Prendre 2 minutes pour vérifier, cela peut éviter des heures de gestion de crise plus tard...  

### 3. 🛑 ERR_PNPM_OUTDATED_LOCKFILE !

Le fichier `pnpm-lock.yaml` n'est pas synchronisé avec le `package.json`. Cela arrive typiquement quand :  

- Vous avez modifié une version manuellement dans `package.json`.
- Vous avez résolu un conflit de fusion (merge conflict) dans `package.json` sans mettre à jour le lockfile.
- Vous avez oublié de commit le lockfile après une installation.

La **CI** est configurée en mode **STRICT** (`frozen-lockfile`) : elle refuse d'installer des dépendances si le "contrat" (lockfile) n'est pas clair, afin d'éviter d'installer des versions non testées en production.  

Pour corriger :  

```Bash
pnpm install
```

Push again 😜

### 4. 🛑 Warning lors du premier push !

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

### 5. 🛑  Option 'baseUrl' is deprecated

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
