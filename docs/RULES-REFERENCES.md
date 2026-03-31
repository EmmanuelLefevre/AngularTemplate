<h1 align="center">🔧 RULES REFERENCES 🔧</h1>

<br>
<br>

## SOMMAIRE

- [ESLint Rules](#eslint-rules)
  - [Angular](#angular)
  - [TypeScript](#typescript)
  - [Angular Template](#angular-template)
  - [Stylistics](#stylistics)
  - [Security](#security)
- [Prettier Rules](#prettier-rules)
- [HTMLHint Rules](#htmlhint-rules)
- [StyleLint Rules](#stylelint-rules)
- [I18n Rules](#i18n-lint-rules)
- [TypeScript Config Rules](#ts-config-rules)
  - [TypeScript Base Config Rules](#ts-base-config-rules)
  - [TypeScript Alias Config Rules](#ts-alias-config-rules)
  - [TypeScript App Config Rules](#ts-app-config-rules)
- [Compodoc Rules](#compodoc)
- [Schematics Rules](#schematics-rules)
- [VSCode Rules](#vscode-rules)
  - [Files Association](#files-association)
  - [I18n Ally](#i18n-ally)

## RULES

<h2 id="eslint-rules">
  <img
    alt="ESLint"
    title="ESLint"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg"
  />
  ESLint Rules
</h2>

> [🔗 ESLint Documentation](https://eslint.org/docs/latest/use/getting-started)
> [🔗 ESLint Recommanded Documentation](https://eslint.org/docs/latest/rules/)

<details>

  <summary>👁️ Tout voir</summary>

&nbsp;

<h3 id="angular">Angular</h3>

> [🔗 ESLint Angular Documentation](https://www.npmjs.com/package/@angular-eslint/eslint-plugin)

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

Cette section regroupe les règles spécifiques au framework **Angular**. Elles visent à faire respecter les bonnes pratiques architecturales, les conventions de nommage propres à l'écosystème (comme le `kebab-case` pour les sélecteurs de composants) et à prévenir des erreurs courantes impactant les performances (comme les **Pipes** impurs).

| Option | Valeur | Description  |
| :--- | :--- | :--- |
| **`component-selector`** | `[Object]` | **1. `type: 'element'`** : Forcer l'utilisation des composants comme éléments **HTML** (ex: `<app-home>`)<br><br>**2. `style: 'kebab-case'`** : Imposer le nommage en minuscules séparées par des tirets |
| **`directive-selector`** | `[Object]` | **1. `type: 'attribute'`** : Forcer l'utilisation des **Directives** comme attributs (ex: `<div myDir>`)<br><br>**2. `style: 'camelCase'`** : Imposer le nommage en `camelCase` |
| **`no-empty-lifecycle-method`** | `'error'` | Interdire les méthodes de cycle de vie vides (`ngOnInit`) qui polluent le code inutilement |
| **`no-pipe-impure`** | `'error'` | Interdire les **Pipes** impurs qui sont recalculés à chaque cycle de détection, causant de graves problèmes de performance |
| **`prefer-output-readonly`** | `'error'` | Garantir que les `Output` (`EventEmitter`) ne sont pas écrasés après leur initialisation |
| **`pipe-prefix`** | `'error'` | Imposer un préfixe cohérent pour tous les **Pipes** de l'application |
| **`prefer-standalone`** | `'error'` | Pousser vers l'architecture moderne **Angular** en forçant les composants `standalone` |
| **`sort-keys-in-type-decorator`** | `'error'` | Trier les propriétés dans les **Décorateurs** (`@Component`) par ordre alphabétique pour la lisibilité |
| **`sort-lifecycle-methods`** | `'error'` | Imposer un ordre strict des méthodes de cycle de vie (`ngOnChanges` -> `ngOnInit` -> `ngOnDestroy`) |

</details>

<h3 id="typescript">TypeScript</h3>

> [🔗 ESLint TypeScript Documentation](https://typescript-eslint.io/rules/)

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

Ces règles étendent les capacités d'**ESLint** pour comprendre la syntaxe **TypeScript**. Elles se concentrent sur la sûreté du typage (`type safety`), la lisibilité et la prévention de bugs subtils liés à la gestion des types (comme l'usage de `any` ou les `magic numbers`).

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`explicit-function-return-type`** | `'error'` | Obliger à typer le retour de chaque fonction pour rendre le code autodocumenté et éviter les retours accidentels |
| **`naming-convention`** | `[Array]` | **1. Variables** : `camelCase` (standard) ou `UPPER_CASE` (constantes globales)<br><br>**2. Méthodes** : `camelCase`<br><br>**3. Classes** : `PascalCase` |
| **`no-empty-function`** | `'error'` | Signaler les fonctions sans corps, souvent signe d'un code oublié ou inachevé |
| **`no-empty-interface`** | `'error'` | Une interface vide est inutile. Utiliser un **Type** si c'est un simple `alias` |
| **`no-magic-numbers`** | `'error'` | Interdire l'usage de nombres bruts sans contexte. Il faut utiliser des constantes nommées |
| **`no-shadow`** | `'error'` | Empêcher de nommer une variable locale comme une variable de portée supérieure (risque de confusion) |
| **`no-unsafe-return`** | `'error'` | Interdire de retourner `any` dans une fonction qui attend un **Type** précis |
| **`no-unused-vars`** | `'error'` | Nettoier le code en signalant les variables déclarées mais jamais utilisées |
| **`prefer-readonly`** | `'error'` | Marquer automatiquement comme `readonly` les propriétés privées qui ne sont jamais modifiées après le constructeur |

</details>

<h3 id="angular-template">Angular Template</h3>

> [🔗 ESLint Angular Template Documentation](https://www.npmjs.com/package/@angular-eslint/eslint-plugin-template)

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

Ce linter analyse spécifiquement les fichiers **HTML** (`.html`). Il est crucial pour garantir l'accessibilité (**A11y**) de l'application, éviter des erreurs de syntaxe **Angular** complexes et limiter la complexité logique directement dans les vues.

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`alt-text`** | `'error'` | Obliger, pour l'accessibilité, les images à avoir un texte alternatif |
| **`banana-in-box`** | `'error'` | Vérifier la syntaxe `[(ngModel)]` et alerte si on écrit l'inverse `([ngModel])` |
| **`button-has-type`** | `'error'` | Tout bouton doit avoir un `type` explicite (`submit`, `button`, `reset`) pour éviter les soumissions involontaires |
| **`click-events-have-key-events`** | `'error'` | Accessibilité : un élément cliquable doit aussi être utilisable au clavier |
| **`conditional-complexity`** | `5` | Limiter la complexité logique dans le **HTML**. Si trop complexe, déplacer la logique dans le **TS** |
| **`cyclomatic-complexity`** | `15` | Alerter si un template contient trop de boucles/conditions imbriquées (indigeste) |
| **`eqeqeq`** | `'error'` | Forcer l'égalité stricte `===` dans les templates |
| **`interactive-supports-focus`** | `'error'` | Les éléments interactifs doivent être "focusables" (`tabindex`) pour la navigation clavier |
| **`no-any`** | `'error'` | Interdire `$any(...)` dans le **HTML** qui désactive le typage fort |
| **`no-distracting-elements`** | `'error'` | Bannir les balises obsolètes (`<marquee>`, `<blink>`). |
| **`no-inline-styles`** | `'error'` | Le **SCSS** doit être dans les fichiers de style, pas dans l'attribut `style="..."` |
| **`prefer-built-in-pipes`** | `'error'` | Préférer les **Pipes**** natifs (`DatePipe`, `AsyncPipe`) aux solutions manuelles |
| **`prefer-self-closing-tags`** | `'error'` | Nettoyer le code : `<app-comp />` au lieu de `<app-comp></app-comp>` si vide |

</details>

<h3 id="stylistics">Stylistics</h3>

> [🔗 ESLint Stylistics Documentation](https://eslint.style/rules)

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

Depuis la dépréciation des règles de formatage dans **ESLint core**, ce plugin (`@stylistic`) prend le relais. Il assure une uniformité visuelle stricte (espaces, virgules, points-virgules) qui n'impacte pas la logique mais rend le code agréable à lire et évite les `Git diff` inutiles.

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`arrow-spacing`** | `true` | Espace avant et après la flèche `=>` des fonctions fléchées |
| **`block-spacing`** | `'always'` | Espace à l'intérieur des accolades `{ code }` |
| **`brace-style`** | `'stroustrup'` | Le `else` doit être sur sa propre ligne |
| **`comma-spacing`** | `[Object]` | Espace après la virgule, jamais avant |
| **`indent`** | `2` | Indentation standard de 2 espaces |
| **`max-len`** | `120` | Limiter la longueur des lignes de code (500 pour les commentaires) |
| **`member-delimiter-style`** | `'semi'` | Utilisation de points-virgules dans les interfaces/types |
| **`no-multiple-empty-lines`** | `2` | Maximum 2 lignes vides consécutives pour aérer sans trop espacer |
| **`padding-line-between-statements`** | `[Object]` | Force une ligne vide avant toute déclaration de `class` |
| **`quotes`** | `'single'` | Utilisation exclusive des guillemets simples `'` (sauf échappement) |
| **`semi`** | `'always'` | Point-virgule obligatoire à la fin des instructions |
| **`spaced-comment`** | `'always'` | Espace obligatoire au début d'un commentaire `// Texte` |

</details>

<h3 id="security">Security</h3>

> [🔗 ESLint Security Documentation](https://www.npmjs.com/package/eslint-plugin-security)

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

Le plugin (**eslint-plugin-security**) ajoute une couche de sécurité statique. Il scanne le code pour détecter des modèles susceptibles de créer des vulnérabilités, comme les attaques par déni de service via **RegEx** (`ReDoS`) ou l'injection d'objets non sécurisés. Nous utilisons ici la configuration recommended standard.

</details>

</details>

<h2 id="prettier-rules">
  <img
    alt="Prettier"
    title="Prettier"
    width="30px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/prettier.png"
  />
  Prettier Rules
</h2>

> [🔗 Prettier Documentation](https://prettier.io/docs/options)

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

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

</details>

<h2 id="htmlhint-rules">
  <img
    alt="HTMLHint"
    title="HTMLHint"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/htmlhint.png"
  />
  HTMLHint Rules
</h2>

> [🔗 HTMLHint Documentation](https://htmlhint.com/rules/)

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

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

</details>

<h2 id="stylelint-rules">
  <img
    alt="StyleLint"
    title="StyleLint"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/stylelint.png"
  />
  StyleLint Rules
</h2>

> [🔗 StyleLint SCSS Documentation](https://stylelint.io/user-guide/rules)

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

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

</details>

<h2 id="i18n-lint-rules">
  <img
    alt="I18NLINT"
    title="I18NLINT"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/i18n.svg"
  />
  I18n Ally Rules
</h2>

<h3 id="ts-base-config-rules">I18n Ally Rules</h3>

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

> [🔗 I18n Ally](https://github.com/lokalise/i18n-ally/wiki/Configurations)

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`i18n-ally.displayLanguage`** | `"fr"` | Langue affichée dans les annotations (tooltips) de l'**IDE** pour visualiser les traductions |
| **`i18n-ally.extract.autoDetect`** | `false` | Désactiver la détection automatique des textes en dur pour éviter les suggestions intrusives |
| **`i18n-ally.keepFulfilled`** | `false` | Définit s'il faut conserver les clés déjà traduites lors des opérations de nettoyage |
| **`i18n-ally.keystyle`** | `"nested"` | Utiliser une structure d'objets imbriqués pour l'organisation des fichiers **JSON** |
| **`i18n-ally.localesPaths`** | `"src/assets/i18n"` | Chemin vers le répertoire contenant les fichiers de traduction (`fr.json`...) |
| **`i18n-ally.readonly`** | `true` | Activer le mode lecture seule pour empêcher la modification accidentelle via l'interface de l'extension |
| **`i18n-ally.sourceLanguage`** | `"fr"` | Définir le français comme langue de référence (source de vérité) pour le projet |

</details>

<h2 id="ts-config-rules">
  <img
    alt="TS Config"
    title="TS Config"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/ts_config.png"
  />
  TypeScript Config Rules
</h2>

> [🔗 TypeScript Config Documentation](https://www.typescriptlang.org/tsconfig/)

<details>

  <summary>👁️ Tout voir</summary>

<h3 id="ts-base-config-rules">TypeScript Base Config Rules</h3>

<details>

  <summary>👁️ Tout voir</summary>

&nbsp;

Cette configuration (`tsconfig.json`) sert de **base stricte** pour l'ensemble de l'espace de travail. Elle utilise l'approche **"Solution Style"**, déléguant la compilation effective aux fichiers `tsconfig.app.json` (pour l'application) et `tsconfig.spec.json` (pour les tests).

#### 1. Options du Compilateur (`compilerOptions`)

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

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

</details>

#### 2. Options du Compilateur Angular (`angularCompilerOptions`)

Ces paramètres contrôlent le compilateur AOT (Ahead-of-Time) d'Angular, spécifiquement pour la vérification des types dans les templates HTML.

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`enableI18nLegacy...`** | `false` | Indiquer au compilateur Angular de ne pas utiliser le format d'identifiant de message hérité (legacy) pour l'internationalisation |
| **`strictInjectionParameters`** | `true` | Signaler une erreur si un paramètre injecté n'est pas compatible avec le type d'injection attendu |
| **`strictInputAccessModifiers`** | `true` | Respecter les modificateurs d'accès (`private`, `protected`) lors de l'accès aux propriétés depuis les templates HTML |
| **`strictStandalone`** | `true` | Appliquer des règles de validation plus strictes pour les composants, directives et pipes Standalone |
| **`strictTemplates`** | `true` | Activer la vérification stricte des types dans les templates Angular (`.html`). Détecte les erreurs de liaison de données à la compilation |

</details>

</details>

<h3 id="ts-alias-config-rules">TypeScript Alias Config Rules</h3>

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Alias | Cible | Usage |
| :--- | :--- | :--- |
| **`@app/*`** | `./src/app/*` | Racine du code applicatif |
| **`@core/*`** | `./src/app/core/*` | **Singletons**, **Services globaux**, **Guards**, **Interceptors** |
| **`@features/*`** | `./src/app/features/*` | Modules fonctionnels (**Lazy loaded**) |
| **`@shared`** | `./src/app/shared/shared.ts` | **Barrel File**. Permet d'importer tout le `shared` d'un coup |
| **`@shared/*`** | `./src/app/shared/*` | Accès direct à un composant partagé spécifique |
| **`@env/*`** | `./src/_environments/*` | Fichiers de configuration d'environnement (`dev`/`prod`) |
| **`@assets/*`** | `./src/assets/*` | Images, polices, fichiers statiques |
| **`@styles/*`** | `./src/styles/*` | Variables **SCSS**, mixins  |

</details>


<h3 id="ts-app-config-rules">TypeScript App Config Rules</h3>


<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`extends`** | `"./tsconfig.json"` | Hériter de toutes les règles de compilation et options de typage strict du fichier de base |
| **`compilerOptions.outDir`** | `"./out-tsc/app"` | Répertoire de sortie où le code **JavaScript** compilé sera placé |
| **`compilerOptions.rootDir`** | `"./src"` | Définir le répertoire racine pour la résolution du code source |
| **`compilerOptions.types`** | `["vite/client"]` | Désactiver l'inclusion automatique de tous les types de `node_modules`. Seuls les types listés ici (**Vite**) sont inclus |
| **`include`** | `["src/**/*.ts"]` | Inclure tous les fichiers **TypeScript** situés dans le dossier `src` pour la compilation |
| **`exclude`** | `["src/**/*.spec.ts"]` | Exclure explicitement les fichiers de tests unitaires (`.spec.ts`) de la compilation principale de l'application |

</details>

</details>

<h2 id="compodoc">
  <img
    alt="Compodoc"
    title="Compodoc"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/compodoc.svg"
  />
  Compodoc Rules
</h2>

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`assetsFolder`** | `"public"` | Définir le dossier source des images/assets statiques à copier |
| **`disableCoverage`** | `true` | Masquer le rapport de couverture de la documentation dans le menu |
| **`disableGraph`** | `false` | Afficher le graphique de dépendances des modules (Graphviz) |
| **`disableInternal`** | `true` | Masquer les éléments marqués comme `@internal` |
| **`disablePrivate`** | `true` | Masquer les propriétés et méthodes privées des classes |
| **`hideGenerator`** | `true` | Masquer le lien "Documentation generated by Compodoc" en bas de page |
| **`includes`** | `"./docs"` | Dossier contenant les fichiers Markdown additionnels (menu latéral) |
| **`open`** | `true` | Ouvrir automatiquement le navigateur après le lancement du serveur |
| **`output`** | `".documentation-output"` | Dossier de destination où le site statique est généré |
| **`port`** | `8080` | Port utilisé pour le serveur local (`pnpm doc`) |
| **`title`** | `"AngularTemplate Documentation"` | Titre affiché dans l'en-tête et l'onglet du navigateur |
| **`tsconfig`** | `"tsconfig.doc.json"` | Fichier TypeScript spécifique utilisé pour l'analyse |

</details>

<h2 id="schematics-rules">
  <img
    alt="Schematics"
    title="Schematics"
    width="60px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/schematics.png"
  />
  Schematics Rules
</h2>

> [🔗 Angular Documentation](https://github.com/angular/angular-cli/tree/main/packages/schematics/angular)

<details>

  <summary>👁️ Tout voir</summary>

&nbsp;

#### 1. @schematics/angular:application (`Project Initialization`)

Définit les caractéristiques fondamentales de l'application, principalement utilisées lors de la création du projet.

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

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

</details>

#### 2. @schematics/angular:class (`Class`)

Configuration pour la génération des classes (`ng g cl`).

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `true` | Les classes (souvent des DTO ou des wrappers utilitaires) n'ont généralement pas besoin de tests |

</details>

#### 3. @schematics/angular:component (`Components`)

Configuration pour la génération des composants (`ng g c`).

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

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

</details>

#### 4. @schematics/angular:directive (`Directives`)

Configuration pour la génération des directives (`ng g d`).

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`prefix`** | `""` | Le préfixe du sélecteur est explicitement vide |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`) |
| **`standalone`** | `true` | Utiliser le STANDALONE pour les directives |
| **`type`** | `"directive"` | Ajouter le type à la classe et au fichier (`my-highlight.directive.ts`) |

</details>

#### 5. @schematics/angular:enum (`Enum`)

Configuration pour la génération des enums (`ng g e`).

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`type`** | `"enum"` | Ajouter le type à la classe et au fichier `.enum.ts` |

</details>

#### 6. @schematics/angular:guard (`Guards`)

Configuration pour le routage des guards (`ng g guard`).

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`functional`** | `false` | Générer une Guard basée sur une classe (au lieu d'une simple fonction) |
| **`implements`** | `[Array]` | Générer le Guard implémentant les quatre interfaces de routage |
| **`skipTests`** | `true` | Ne pas générer de fichiers de tests unitaires |
| **`typeSeparator`** | `.` | Définir le séparateur `guard` (`auth.guard.ts`) |

</details>

#### 7. @schematics/angular:interceptor (`HTTP Interceptors`)

Configuration pour la gestion des interceptors (`ng g interceptor`).

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `true` | Ne pas générer de fichiers de tests unitaires |
| **`typeSeparator`** | `.` | Définir le séparateur `interceptor` (`auth.interceptor.ts`) |

</details>

#### 8. @schematics/angular:interface (`Interfaces`)

Configuration pour la gestion globale des interfaces (`ng g i`).

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`type`** | `"model"` | Ajouter le type à la classe et au fichier `.model.ts` |

</details>

#### 9. @schematics/angular:module (`Modules`)

Configuration pour la gestion globale des modules (`ng g m`).

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`typeSeparator`** | `.` | Définit le séparateur `module` (uniquement si STANDALONE est désactivé) |

</details>

#### 10. @schematics/angular:pipe (`Pipes`)

Configuration pour la gestion globale des pipes (`ng g p`).

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `true` | Générer un fichier de test unitaire (`.spec.ts`) |
| **`standalone`** | `true` | Utiliser le STANDALONE pour les pipes |
| **`typeSeparator`** | `.` | Définir le séparateur `pipe` (`date.pipe.ts`) |

</details>

#### 11. @schematics/angular:resolver (`Resolvers`)

Configuration pour la gestion globale des resolvers (`ng g r`).

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`) |
| **`type`** | `"service"` | Ajouter le type à la classe et au fichier (`api.service.ts`) |

</details>

#### 12. @schematics/angular:service (`Services`)

Configuration pour la gestion globale des services (`ng g s`).

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |
| **`skipTests`** | `false` | Générer un fichier de test unitaire (`.spec.ts`) |
| **`type`** | `"service"` | Ajouter le type à la classe et au fichier (`api.service.ts`) |

</details>

</details>

<h2 id="vscode-rules">
  <img
    alt="VSCODE"
    title="VSCODE"
    width="30px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
  />
  VSCode Rules
</h2>

<details>

  <summary>👁️ Tout voir</summary>

<h3 id="files-association">Files Association</h3>

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |

</details>

<h3 id="i18n-ally">I18n Ally</h3>

<details>

  <summary>🧐 Consulter la configuration détaillée</summary>

&nbsp;

| Option | Valeur | Description |
| :--- | :--- | :--- |

</details>

</details>
