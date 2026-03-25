<h1 align="center">🎨 STYLES 🎨</h1>

<br>
<br>

## SOMMAIRE

- [STYLES](#styles)
- [SASS](#sass)
- [ARCHITECTURE SCSS](#-architecture-scss)
- [BEM](#bem)
- [ANGULAR MATERIAL](#angular-material)
- [FONTAWESOME](#fontawesome)

<h2 id="styles">
  🎨 STYLES
</h2>

L'architecture **SCSS** du projet repose sur une adaptation du **7-1 Pattern**. Cette structure modulaire garantit la maintenabilité, la scalabilité et la séparation des préoccupations : les outils d'un côté, le rendu visuel de l'autre.  
De plus il y est combiné la puissance du préprocesseur **Sass** avec la rigueur de la méthodologie **BEM**.  

Cela implifie la gestion des imports **Sass** en définissant `src/styles` comme racine de résolution.  

Cela permet d'importer le **Barrel File** abstracts (ou autre fichier global) depuis n'importe quel composant via un chemin absolu et propre (ex: `@use 'abstracts'`), éliminant définitivement les chemins relatifs complexes et fragiles (ex: `../../../../styles/abstracts`)."  

Dans `angular.json` ajouter la propriété `stylePreprocessorOptions` dans `@architect.build.options`.  

```JSON
"stylePreprocessorOptions": {
  "includePaths": [
    "src",
    "src/styles"
  ]
}
```

<h2 id="sass">
  <img
    alt="SASS"
    title="SASS"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg"
  />
  SASS
</h2>

> [🔗 SASS Documentation](https://sass-lang.com/documentation/)  

**SASS** (Syntactically Awesome Style Sheets)  

Nous utilisons **SCSS** (**Sassy CSS**), la syntaxe la plus populaire de **SASS**. C'est un préprocesseur qui étend les capacités du **CSS** standard.  

**Pourquoi ce choix ?**  

- **Modularité :** découpage du code en petits fichiers partiels (`_partial.scss`) faciles à gérer/maintenir.
- **Variables & Logique :** utilisation de variables pour les couleurs/fonts, de boucles et de conditions pour générer du code complexe.
- **Mixins & Fonctions :** création de bouts de code réutilisables (ex: gestion des breakpoints responsive).
- **Nesting (Imbrication) :** permet d'écrire du **CSS** qui reflète la hiérarchie **HTML**.

**Note :** nous utilisons le système de modules moderne de **SASS** (`@use` et `@forward`) au lieu de l'ancien système d'imports globaux (`@import`) désormais déprécié pour des raisons de performance et de conflits de noms.  

<h2 id="-architecture-scss">
  🏗️ ARCHITECTURE SCSS
</h2>

```plaintext
📂src
 ┗ 🎨styles
   ┣ 📂abstracts
   ┃ ┣ 🎨_functions.scss            # Fonctions de calcul (ex: conversion px vers rem)
   ┃ ┣ 🎨_mixins.scss               # Media queries
   ┃ ┗ 🎨_index.scss                # Point d'entrée pour le forwarding (@forward)
   ┣ 📂base
   ┃ ┣ 🎨_animations.scss           # Keyframes globaux
   ┃ ┣ 🎨_fonts.scss                # Importation des polices
   ┃ ┣ 🎨_globals.scss              # Styles globaux des balises sémantiques
   ┃ ┣ 🎨_reset.scss                # Normalisation CSS
   ┃ ┣ 🎨_typography.scss           # Police (sur balisage sémantiques)
   ┃ ┗ 🎨_utilities.scss            # Classes utilitaires
   ┣ 📂layout
   ┃ ┣ 🎨_admin-layout.scss
   ┃ ┗ 🎨_main-layout.scss
   ┗ 📂themes
     ┣ 🎨_light-theme.scss          # Palette de couleurs claire
     ┣ 🎨_material-overrides.scss   # Customisation des composants Angular Material
     ┗ 🎨_theme-variables.scss      # Définition des tokens de design (variabilisation des couleurs, polices)
```

### Détails des dossiers

- **abstracts/** (The Tools)  

Ce dossier contient uniquement des helpers **SASS**. Ces fichiers ne génèrent aucune ligne de **CSS** lorsqu'ils sont compilés.  

Ils doivent être importés (@use) dans les composants qui en ont besoin.  

Le fichier `_index.scss` sert de "**Barrel File**" pour exposer tous les abstracts en une seule ligne.  

- **base/** (The Boilerplate)  

Ce dossier définit le socle de l'application. Il cible principalement les sélecteurs de balises **HTML** brutes (sans classes).  

C'est ici que l'on définit la typographie par défaut, le reset **CSS** et les comportements globaux.  

- **layout/** (The Skeleton)  

Contient les styles des structures majeures qui enveloppent l'application (Header, Footer, Sidebar, Grilles principales).  

- **themes/** (The Skin)  

Gère l'aspect visuel et le branding.  

C'est ici que l'on surcharge les composants **Angular Material** pour qu'ils correspondent à la charte graphique.  

Permet la gestion facile des thèmes (Dark/Light mode).  

<h2 id="bem">
  <img
    alt="BEM"
    title="BEM"
    width="54px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/bem.png"
  />
  BEM
</h2>

> [🔗 BEM Documentation](https://en.bem.info/methodology/)  

**Méthodologie BEM** (Block Element Modifier)  

Pour garantir des classes **CSS** compréhensibles et éviter les conflits de spécificité nous appliquons la convention de nommage **BEM**.  

- L'un des avantages majeurs de **BEM** :  
Il permet de garder une spécificité faible (`low specificity`) et d'éviter ce qu'on appelle "l'enfer de l'imbrication" (**Nesting Hell**).  

Une erreur classique avec les préprocesseurs comme **SASS** est d'abuser de l'imbrication, ce qui crée des sélecteurs **CSS** à rallonge, très lourds et difficiles à surcharger.  

**BEM** résout ce problème en aplatissant la structure. Même si nous indentons visuellement dans le fichier `.scss` pour la lisibilité, le **CSS** compilé ne doit pas être imbriqué.  

**Le concept :**  

- **Block** (`.card`) : l'entité autonome qui a du sens par elle-même.
- **Element** (`.card__title`) : une partie du bloc qui n'a pas de sens seule. Séparé par deux underscores `__`.
- **Modifier** (`.card--featured`) : une variante ou un état du bloc. Séparé par deux tirets `--`.

Exemple d'implémentation en **SCSS** : L'imbrication de **SASS** rend l'écriture du **BEM** extrêmement rapide et lisible grâce au sélecteur parent `&`.  

```SCSS
/* 📄 card.component.scss */

.card {
  background: #fff;
  padding: 20px;

  /* 🟢 Element : .card__header */
  &__header {
    border-bottom: 1px solid #eee;
  }

  /* 🟢 Element : .card__title */
  &__title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  /* 🟠 Modifier : .card--featured */
  &--featured {
    border: 2px solid gold;
    background: #fffbe6;
  }
}
```

💡 **La règle d'or :**  
En **SCSS** avec **BEM**, évitez d'imbriquer plus de 1 niveau de profondeur (le **Bloc** qui contient l'**Element**). Si vous vous retrouvez à faire `.bloc { &__elem { &__sub-elem { ... } } }`, c'est que vous devez probablement créer un nouveau **Bloc**.  

<h2 id="angular-material">
  <img
    alt="ANGULAR MATERIAL"
    title="ANGULAR MATERIAL"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/angular_material.png"
  />
  ANGULAR MATERIAL
</h2>

> [🔗 Angular Material Documentation](https://material.angular.dev/components/categories)

**Angular Material** est la bibliothèque de composants officielle basée sur les principes du **Material Design**. Elle offre une collection de composants UI testés, accessibles et performants.  

```shell
pnpm add @angular/material@latest @angular/cdk@latest
```

⚠️ Les surcharges de **Angular Material** (`_material-overrides.scss`) sont globales et doivent être importées une seule fois dans le fichier `styles.scss` principal dans `src/styles` et non dans chaque composant.  

<h2 id="fontawesome">
  <img
    alt="FONTAWESOME"
    title="FONTAWESOME"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/fontawesome.png"
  />
  FONTAWESOME
</h2>

> [🔗 Fontawesome Documentation](https://docs.fontawesome.com/)

Pour l'iconographie, **Font Awesome** est le standard de l'industrie. Plutôt que d'utiliser des polices de caractères, l'intégration via les composants **Angular** sera privilégiée, cela permet une gestion optimale des **SVG** et du **Tree-shaking** (seules les icônes utilisées sont incluses dans le build final).  

- **Scalabilité :** les icônes vectorielles garantissent une netteté parfaite sur tous les écrans.
- **Modularité :** possibilité d'importer uniquement les packs nécessaires (Solid, Regular, Brands).

```shell
pnpm add @fortawesome/fontawesome-svg-core@latest @fortawesome/angular-fontawesome@latest
```

Puis ajouter les différentes variantes d'icônes...  

```shell
pnpm add @fortawesome/free-solid-svg-icons@latest @fortawesome/free-brands-svg-icons@latest @fortawesome/free-regular-svg-icons@latest
```
