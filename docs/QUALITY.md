<h1 align="center">💎 QUALITY 💎</h1>

<br>
<br>

## SOMMAIRE

- [ESLINT](#eslint)
- [PRETTIER](#prettier)
- [HTMLHINT](#htmlhint)
- [STYLELINT](#stylelint)
- [HUSKY](#husky)
- [GIT LEAKS](#git-leaks)

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

```shell
ng lint
```

**ESLint** a aussi une fonctionnalité de correction automatique des erreurs détectées.  
Lors de l'exécution de cette commande, **ESLint** analyse le code source à la recherche de problèmes qui peuvent être corrigés automatiquement.

```shell
ng lint --fix
```

Pour finir, **ESLint** s'intègre parfaitement dans les pipelines d'intégration continue (**CI**). En exécutant les règles de linting lors des builds, la pipeline s'assure que tout le code soumis respecte les normes définies, empêchant ainsi le déploiement de code non conforme.  

### Extension VSCode :

> [ESLint VSCode Extension](https://marketplace.visualstudio.com/items/?itemName=dbaeumer.vscode-eslint)

⚠️ Pensez à recharger le server ESLint dans votre VSCode !!!  

`CTRL + SHIFT + P`  

```shell
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

```shell
pnpm add -D @stylistic/eslint-plugin
```

4. Installer le plugin `security`

```shell
pnpm add -D eslint-plugin-security
```

Créer un fichier `eslint-security.config.js` et y coller la configuration présente dans le template.  
Cette configuration de sécurité a été séparée dans un autre fichier afin de l'éxécuter dans le job 🛡️ Security Scans.  

> [Consulter la configuration](./eslint-security.config.js)  

5. Configurer **ESLint**

Ouvrir le fichier `eslint.config.js` (qui vient d'être créé à la racine).  

💡 Une documentation complète est disponible ici... [ESLint Rules](./docs/RULES_REFERENCE.md#eslint-rules)  

**\* Note :** Prettier ne sera pas ajouté automatiquement il faut le faire manuellement.  

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

> [Consulter la configuration d'override](./eslint.config.js)  

Cette section `overrides` de la configuration **ESLint**> permet de désactiver certaines règles pour des fichiers spécifiques où l'on ne souhaite pas appliquer certaines règles.  
Cela est particulièrement utile pour les fichiers de directives, pipes ou d'environnements qui peuvent avoir des conventions ainsi que des besoins différents par rapport au reste du code.  

**Etape 4 :** Ajouter les scripts pratiques  

Mettre à jour la section "scripts" du `package.json` pour faciliter l'utilisation en créant ces commandes =>  

```JSON
{
  "scripts": {
    "lint": "ng lint",
    "lint:ci": "ng lint --max-warnings=0",
    "lint:security:ci": "eslint \"src/**/*.{ts,js}\" --config eslint-security.config.js",
  }
}
```

> [Consulter les scripts](./package.json)  

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

**Etape 1 :** Installer **Prettier**

Bien qu'il y ait une configuration dans `package.json`, il est préférable (Best Practice) d'avoir un fichier de configuration dédié `.prettierrc`.

```shell
pnpm add -D prettier
```

**Etape 2 :** Créer un fichier `.prettierrc.js` à la racine et y coller la configuration présente dans le template.  

> [Consulter la configuration](./.prettierrc.js)  

💡 Une documentation complète est disponible dans le fichier `.prettierrc.js` et ici... [Prettier Rules](./docs/RULES_REFERENCE.md#prettier-rules)  

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

**Etape 3 :** Nettoyage : Supprimer le bloc "prettier": { ... } du fichier `package.json` pour éviter les doublons et y inclure les scripts =>

```JSON
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
  }
}
```

> [Consulter les scripts](./package.json)  

**Etape 4 :** Créer un fichier `.prettierignore` pour éviter de formater des fichiers inutiles et y coller la configuration présente dans le template.

> [Consulter le fichier](./.prettierignore)  

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

> [En savoir plus sur l'accessibilité](./docs/ACCESSIBILITY.md)

**Etape 1 :** Ajouter le package **HTMLLint**  

```shell
pnpm add -D htmlhint
```

**Etape 2 :** Ajouter l'extension **VSCode** :  

> [HTMLHint VSCode Extension](https://marketplace.visualstudio.com/items/?itemName=HTMLHint.vscode-htmlhint)

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

> [Consulter la configuration](./.htmlhintrc)  

**Etape 3 :** Configuration :  

Il faut créer le fichier `.htmlhintrc` à la racine du projet et y coller la configuration présente dans le template.  

💡 Une documentation complète est disponible ici... [HTMLLint Rules](./docs/RULES_REFERENCE.md#htmlhint-rules)  

Pour finir ouvrir le fichier `package.json` et ajouter la commande suivante dans la partie `scripts` =>  

```JSON
{
  "scripts": {
    "lint:html": "htmlhint \"src/**/*.html\"",
    "lint:html:ci": "htmlhint \"src/**/*.html\"",
  }
}
```

> [Consulter les scripts](./package.json)  

**Etape 4 :** Tester la commande  

Lancer le lint sur nos fichiers **HTML** =>  

```shell
pnpm lint:html
```

Si le script n'est pas défini dans le `package.json` =>  

```shell
npx htmlhint "**/*.html"
```

💡 Une documentation complète est disponible ici... [HTMLHint Rules](./docs/RULES_REFERENCE.md#htmlhint-rules)  

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

> [Consulter la configuration](./.stylelintrc.json)  

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
{
  "scripts": {
    "lint:scss": "stylelint \"src/**/*.scss\"",
    "lint:scss:ci": "stylelint \"src/**/*.scss\" --max-warnings=0",
  }
}
```

> [Consulter les scripts](./package.json)  

💡 Une documentation complète est disponible ici... [StyleLint Rules](./docs/RULES_REFERENCE.md#stylelint-rules)  

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
Une fois qu'un secret est "poussé" sur un dépôt (même privé), il est considéré comme compromis. Même si on supprime la ligne plus tard, le secret reste présent dans l'historique des commits.  
**Gitleaks** bloque l'action avant que le secret ne soit définitivement ancré dans l'historique et garantit que nos fichiers de configuration restent propres ainsi que nos secrets restent dans les coffres-forts prévus à cet effet (comme les **GitHub Secrets** ou **HashiCorp Vault**)..  

```shell
pnpm add -D gitleaks
```

De plus il est nécessaire d'ajouter dans le fichier `package.json` le check de **Gitleaks** sur toute les fichiers de l'application.  

```JSON
{
  "lint-staged": {
    "*": [
      "gitleaks protect --staged --verbose"
    ]
  }
}
```

Créer le fichier `.gitleaks.toml` et y coller la configuration présente dans le template.  

> [Consulter la configuration](./.gitleaks.toml)  

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

> [Consulter le lint-staged](./package.json)  

**Etape 4 :** Dire à **Husky** d'utiliser `lint-staged`  

Aller dans le dossier `.husky` qui a été créé à la racine du projet. Trouver le fichier nommé `pre-commit`.  

- Simple linting

```shell
pnpm exec lint-staged
```

> [Consulter la configuration](./husky/pre-commit)  

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

> [Consulter les scripts](./package.json)  
