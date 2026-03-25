<h1 align="center">💎 QUALITÉ 💎</h1>

<br>
<br>

## SOMMAIRE

- [ESLINT](#eslint)
- [PRETTIER](#prettier)
- [HTMLHINT](#htmlhint)
- [STYLELINT](#stylelint)
- [SECRETLINT](#secretlint)
- [NGX TRANSLATE](#translate)
  - [NGX TRANSLATE LINT](#translate-lint)
  - [NGX TRANSLATE EXTRACT](#translate-extract)
- [HUSKY](#husky)

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

> [🔗 ESLint VSCode Extension](https://marketplace.visualstudio.com/items/?itemName=dbaeumer.vscode-eslint)

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
pnpm add -DE eslint-config-prettier@latest
```

2. Installer **ESLint** et **Angular ESLint**

```shell
pnpm add -DE eslint angular-eslint@latest
```

3. Installer les `stylistics`

```shell
pnpm add -DE @stylistic/eslint-plugin@latest
```

4. Installer le plugin `security`

```shell
pnpm add -DE eslint-plugin-security@latest
```

Créer un fichier `eslint-security.config.js` et y coller la configuration présente dans le template.  
Cette configuration de sécurité a été séparée dans un autre fichier afin de l'éxécuter dans le job 🛡️ Security Scans.  

5. Configurer **ESLint**

Ouvrir le fichier `eslint.config.js` (qui vient d'être créé à la racine).  

💡 Une documentation complète est disponible ici... =>  
> [👀 ESLint Rules](./RULES-REFERENCES.md#eslint-rules)  

**\* Note :** Prettier ne sera pas ajouté automatiquement il faut le faire manuellement.  

**Etape 3 :** Global ignores  

Cette section **GLOBAL IGNORES** de la configuration **ESLint** permet de spécifier des motifs de fichiers ou de dossiers à ignorer par l’outil de linting de manière globale. Autrement dit **ESLint** n’appliquera pas ses règles à tous les fichiers qui correspondent à ces motifs et ce quel que soit le fichier dans le projet. Cela est utile pour exclure des répertoires ou des fichiers qui ne doivent pas être lintés.  

```js
// GLOBAL IGNORES ----------
export default defineConfig([
  {
    ignores: [
      '.angular/',
      'dist/',
      'node_modules/'
    ]
  }
]);
```

**Etape 4 :** Overrides  

Cette section **OVERRIDES** de la configuration **ESLint** permet de désactiver certaines règles pour des fichiers spécifiques où l'on ne souhaite pas appliquer certaines règles.  
Cela est particulièrement utile pour les fichiers de **Directives**, **Pipes** ou d'environnements qui peuvent avoir des conventions ainsi que des besoins différents par rapport au reste du code.  

Dans la nouvelle **Flat Config** d'**ESLint**, la propriété `overrides` (telle qu'elle existait dans l'ancien format `.eslintrc`) n'existe plus.  

Le concept est maintenant le suivant : **TOUT** est "override". Pour créer des exceptions, il suffit d'ajouter un nouvel objet à la fin du tableau `defineConfig`. Comme **ESLint** lit la configuration de haut en bas, les règles définies à la fin écrasent celles du début pour les fichiers correspondants.  

```js
export default defineConfig([
  // OVERRIDES ----------
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@angular-eslint/no-empty-lifecycle-method': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-magic-numbers': 'off'
    }
  },
  {
    files: ["src/environments/*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": ["off"],
      "capitalized-comments": ["off"]
    }
  }
]);
```

**Etape 5 :** Ajouter les scripts pratiques  

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

**Etape 6 :** Tester la commande  

```shell
pnpm lint
```

Vous devriez voir s'afficher =>  

<br>

![Terminal Screen](https://github.com/EmmanuelLefevre/MarkdownImg/blob/main/template_angular_lint_command.png)

<br>

**Etape 7 :** Ajouter les autres packages **ESLint**  

```shell
pnpm add -DE @angular-eslint/builder@latest @eslint/js@latest typescript-eslint@latest
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

**Note :** les fichiers `*.ts` ont été ajoutés au fichier `.prettierignore`. Cette modification permet d'éviter les conflits de formatage entre **Prettier** et certaines des règles **ESLint Stylistic** mises en place...  

Un hook de `pre-commit` via **Husky** étant implémenté et utilisant `lint-staged` dans le `package.json`, **Prettier** ne formattera que les fichiers nécessaires lors d’un commit et ce de manière automatique et transparente pour le développeur.  

Cela garantit que tous les fichiers commits respectent les normes de formatage définies par l'équipe. Cette automatisation rend le workflow de développement plus fluide et aide à maintenir un code uniforme sans nécessiter d'interventions manuelles.  

**Etape 1 :** Installer **Prettier**

Bien qu'il y ait une configuration dans `package.json`, il est préférable (Best Practice) d'avoir un fichier de configuration dédié `.prettierrc`.

```shell
pnpm add -DE prettier@latest
```

**Etape 2 :** Créer un fichier `.prettierrc.js` à la racine et y coller la configuration présente dans le template.  

💡 Une documentation complète est disponible dans le fichier `.prettierrc.js` et ici... =>  
> [👀 Prettier Rules](./RULES-REFERENCES.md#prettier-rules)  

Installer l'extension **Trivago** pour le tri des imports.  

```shell
pnpm add -DE @trivago/prettier-plugin-sort-imports@latest
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

**Etape 4 :** Créer un fichier `.prettierignore` pour éviter de formater des fichiers inutiles et y coller la configuration présente dans le template.

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

> [👀 En savoir plus sur l'accessibilité](./ACCESSIBILITY.md)

**Etape 1 :** Ajouter le package **HTMLLint**  

```shell
pnpm add -DE htmlhint@latest
```

**Etape 2 :** Ajouter l'extension **VSCode** :  

> [🔗 HTMLHint VSCode Extension](https://marketplace.visualstudio.com/items/?itemName=HTMLHint.vscode-htmlhint)

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

**Etape 3 :** Configuration :  

Il faut créer le fichier `.htmlhintrc` à la racine du projet et y coller la configuration présente dans le template.  

💡 Une documentation complète est disponible ici... =>  
> [👀 HTMLLint Rules](./RULES-REFERENCES.md#htmlhint-rules)  

Pour finir ouvrir le fichier `package.json` et ajouter la commande suivante dans la partie `scripts` =>  

```JSON
{
  "scripts": {
    "lint:html": "htmlhint \"src/**/*.html\"",
    "lint:html:ci": "htmlhint \"src/**/*.html\"",
  }
}
```

**Etape 4 :** Tester la commande  

Lancer le lint sur nos fichiers **HTML** =>  

```shell
pnpm lint:html
```

Si le script n'est pas défini dans le `package.json` =>  

```shell
npx htmlhint "**/*.html"
```

💡 Une documentation complète est disponible ici... =>  
> [👀 HTMLHint Rules](./RULES-REFERENCES.md#htmlhint-rules)  

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
pnpm add -DE stylelint@latest stylelint-scss@latest postcss-scss@latest
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
{
  "scripts": {
    "lint:scss": "stylelint \"src/**/*.scss\"",
    "lint:scss:ci": "stylelint \"src/**/*.scss\" --max-warnings=0",
  }
}
```

💡 Une documentation complète est disponible ici... =>  
> [👀 StyleLint Rules](./RULES-REFERENCES.md#stylelint-rules)  

<h2 id="translate">
  <img
    alt="NGX TRANSLATE"
    title="NGX TRANSLATE"
    width="30px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/ngx_translate.png"
  />
  NGX TRANSLATE
</h2>

<h3 id="translate-lint">NGX TRANSLATE LINTER</h3>

### Introduction :

> [👀 Consulter la documentation du projet](./MULTI-LANGUES.md#ngx-translate-linter)  

### Configuration :

**Etape 1 :** Installer **Ngx Translate Lint**  

```shell
pnpm add -DE ngx-translate-lint@latest
```

**Etape 2 :** Configurer le script dans `package.json` pour la **CI**  

```JSON
{
  "scripts": {
    "i18n:lint": "ngx-translate-lint -c ./.ngx-translate-lint.json",
  }
}
```

**Etape 3 :** Créer le fichier `.ngx-translate-lint.json`

💡 Une documentation complète est disponible ici... =>  
> [👀 Ngx Translate Linter Rules](./RULES-REFERENCES.md#i18n-lint-rules)  

**Etape 4 :** Configurer `lint-staged`  

Toujours dans le fichier `package.json`.  

```JSON
{
  "lint-staged": {
    "src/**/*.{ts,html}": [
      "pnpm i18n:lint"
    ]
  }
}
```

**Etape 5 :** Vérifier le fonctionnement  

```shell
pnpm i18n:lint
```

<h3 id="translate-extract">NGX TRANSLATE EXTRACT</h3>

### Introduction :

> [👀 Consulter la documentation du projet](./MULTI-LANGUES.md#ngx-translate-extract)  

### Configuration :

**Etape 1 :** Installer **Ngx Translate Extract**  

```shell
pnpm add -DE @bartholomej/ngx-translate-extract@latest
```

**Etape 2 :** Configurer le script dans `package.json`  

```JSON
{
  "scripts": {
    "i18n:extract": "ngx-translate-extract --input ./src --output ./src/assets/i18n/en.json ./src/assets/i18n/fr.json --sort --format namespaced-json",
  }
}
```

**Etape 3 :** Configurer `lint-staged`  

Toujours dans le fichier `package.json`.  

```JSON
{
  "lint-staged": {
    "src/**/*.{ts,html}": [
      "pnpm i18n:extract",
      "git add src/assets/i18n/*.json"
    ]
  }
}
```

**Etape 4 :** Vérifier le fonctionnement  

```shell
pnpm i18n:extract
```

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

Pourquoi `lint-staged` ? Lancer `pnpm lint` sur un gros projet prend du temps (10s... 30s... 1min). Si l'on doit attendre 1 minute à chaque commit, nous allons finir par désactiver **Husky**.  

C'est là que `lint-staged` entre en jeu. C'est un outil intelligent qui exécute des commandes uniquement sur les fichiers qui sont "staged". Au lieu de formater les 5000 fichiers du projet, il ne formatera que les 3 que vous venez de modifier et l'opération devient quasiment instantanée.  

### Configuration :

**Etape 1 :** Installer **Husky** et `lint-staged`  

```shell
pnpm add -DE husky lint-staged@latest
```

**Etape 2 :** Initialiser **Husky**  

Cette commande va créer le dossier `.husky` et configurer le script prepare dans notre `package.json`.  

```shell
pnpm exec husky init
```

**Etape 3 :** Configurer `lint-staged`  

Ouvrir le fichier `package.json`. Ajouter la configuration tout à la fin du fichier (après devDependencies).  

```JSON
{
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

<h2 id="secretlint">
  <img
    alt="SECRETLINT"
    title="SECRETLINT"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/secretlint.png"
  />
  SECRETLINT
</h2>

**Secretlint** est un outil d'analyse statique enfichable ("pluggable") conçu pour empêcher l'inclusion accidentelle de secrets et d'informations sensibles dans le code source.  

**Son rôle**  
Il analyse les fichiers modifiés en temps réel pour détecter des informations d'identification (**clé privée SSH**, **clé API**, **tokens AWS**, clés privées, **mdp** ou des motifs suspects = chaîne de caractères nommée `SECRET_KEY`) avant même qu'elles ne soient ajoutées à l'index **Git**.  

Contrairement à d'autres outils qui scannent l'historique, **Secretlint** se concentre sur la prévention immédiate via des hooks `pre-commit`.  

**Pourquoi c'est top**  
Une fois qu'un secret est "poussé" sur un dépôt (même privé), il est considéré comme compromis. Même si on supprime la ligne plus tard, le secret reste présent dans l'historique des commits.  

Il évite la pollution de l'historique **Git**. Une fois qu'un secret est commité, il est techniquement compromis et difficile à effacer totalement. **Secretlint** bloque le processus dès la détection, forçant le développeur à placer ses secrets dans des variables d'environnement (`.env`) ou des gestionnaires de secrets sécurisés (comme les **GitHub Secrets** ou **HashiCorp Vault**) garantissant ainsi que le code partagé reste sain.  

```shell
pnpm add -DE secretlint@latest @secretlint/secretlint-rule-preset-recommend@latest
```

De plus il est nécessaire d'ajouter dans le fichier `package.json` l'exécution de **Secretlint** sur les fichiers en `pre-commit` via `lint-staged`.  

```JSON
{
  "lint-staged": {
    "*": [
      "secretlint --maskSecrets"
    ]
  }
}
```

Ainsi que le script suivant dans le `package.json` =>

```JSON
{
  "scripts": {
    "lint:secrets": "secretlint \"**/*\""
  }
}
```

Créer le fichier `.secretlintrc.json` (via la commande `npx secretlint --init` ou manuellement) et y coller la configuration présente dans le template.  
