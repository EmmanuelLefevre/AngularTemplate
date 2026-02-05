<h1 align="center">📈 SEO 📈</h1>

<br>
<br>

## SOMMAIRE

- [CUSTOM SERVICE](#custom-service)
- [ROUTING & INJECTION DYNAMIQUE](#routing)
- [ORCHESTRATION](#orchestration)
- [SITEMAP](#sitemap)
- [ROBOTS](#robots)
- [SÉMANTIQUE](#sémantique)

<h2 id="custom-service">
  CUSTOM SERVICE
</h2>

Le **Custom SEO Service** est le moteur central de la gestion des métadonnées dans l'application **Angular**. Il permet de manipuler dynamiquement le contenu de la balise `<head>` du document **HTML** en fonction de la navigation de l'utilisateur.  

- **Injection Dynamique & I18n :**  
Mettre à jour le `<title>` et la `<meta name="description">` de manière asynchrone en récupérant les traductions via **ngx-translate** (clés `titleKey` et `descriptionKey`).  

- **Open Graph :**  
Génèrer automatiquement les balises `og:title`, `og:description` et `og:image` pour assurer un référencement optimal lors de la navigation de l'utilisateur.  

- **Configuration Globale :**  
Appliquer systématiquement les balises techniques définies dans l'environnement (`robots`, `author`, `keywords`, `theme-color`, `lang`).  

> 📄 Consulter le SEO service : `./src/app/core/_services/seo/seo.service.ts`  

<h2 id="routing">
  ROUTING & INJECTION DYNAMIQUE
</h2>

L'application utilise le système de **Route Data** d'**Angular** pour définir les règles **SEO** spécifiques à chaque page sans toucher à la logique des composants.  

### Configuration via `app.routes.ts`

Chaque route peut posséder un objet `data.seo`. C'est cet objet qui est lu lors de la navigation pour paramétrer le **SeoService**.  

1. **Pages Publiques** (Indexables)  

Pour les pages standard (`Home`, `Login`, `Contact`), nous passons des clés de traduction (`keys`). Le service se charge de traduire ces clés avant de les injecter dans le DOM.

```typescript
{
  path: 'home',
  // ...
  data: {
    seo: {
      titleKey: 'SEO.HOME_TITLE',             // Clé i18n pour <title> et og:title
      descriptionKey: 'SEO.HOME_DESCRIPTION'  // Clé i18n pour meta description
    }
  }
}
```

2. **Pages Techniques & Erreurs** (Non-Indexables)  

Pour les pages d'erreur ou les zones privées non sécurisées par un login, nous forçons les robots à ne pas indexer la page pour protéger le "Crawl Budget" et éviter de référencer du contenu inutile.  

```typescript
{
  path: 'unfound-error', // 404
  // ...
  data: {
    seo: {
      robots: 'noindex, nofollow' // Bloque l'indexation Google/Bing
    }
  }
}
```

### Le Flux de Données (Workflow)

Le processus d'injection est automatique à chaque changement d'**URL**. Voici comment les données transitent du routeur vers le **HTML** :

- **Navigation :**  
L'utilisateur change de page (ex: va sur `/contact`).  

- **Router Event :**  
L'application détecte la fin de la navigation (**NavigationEnd**).  

- **Extraction :**  
L'application lit les propriétés `data.seo` de la route active.  

- **Injection :**  
Le **SeoService** reçoit ces données, traduit les textes si nécessaire et met à jour les balises `<head>`.  

> 📄 Consulter le routing : `./src/app/app.route.ts`  

<h2 id="orchestration">
  ORCHESTRATION
</h2>

L'initialisation du **SEO** se fait dans le composant racine `AppComponent`. C'est ici que l'on connecte le **Router Angular** au **SeoService**.  

L'implémentation repose sur trois mécanismes clés pour garantir que les métadonnées sont toujours synchronisées :  

1. **Ecoute de la Navigation** (`initSeoListener`)  

À chaque événement **NavigationEnd** (fin de chargement d'une page), l'application :  

- Récupère les données de la route active via `getLatestRouteData`.  
- Appelle `seoService.updateMetaTags(data)` pour rafraîchir le `<head>`.  

2. **Support du Multilingue** (`onLangChange`)  

Si l'utilisateur change de langue (via **ngx-translate**) sans changer de page, les métadonnées doivent être traduites immédiatement.  

L'abonnement à `this.translate.onLangChange` relance la mise à jour des tags avec les nouvelles traductions.  

3. **Traversée de l'Arbre de Routage** (`getLatestRouteData`)  

Les données **SEO** sont souvent définies sur les routes "enfants" (ex: `HomeViewComponent`) et non sur la route racine.  

Cette fonction récursive descend jusqu'à la dernière route active (la "feuille" de l'arbre) pour récupérer l'objet `data.seo` le plus spécifique.  

4. **Expérience Utilisateur & Core Web Vitals** (`initScrollTopListener`)  

Bien que ce ne soit pas strictement des "`meta tags`", le reset du scroll (`window.scrollTo(0, 0)`) améliore l'expérience utilisateur (**UX**).  

**Google** prenant en compte les signaux **UX** (**Core Web Vitals**) pour le référencement, cette fonction contribue indirectement à un meilleur score **SEO**.  

> 📄 Consulter l'entry point : `./src/app/app.component.ts`  

<h2 id="sitemap">
  <img
    alt="SITEMAP"
    title="SITEMAP"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/sitemap.png"
  />
  SITEMAP
</h2>

Le **Sitemap XML** est un fichier essentiel pour l'indexation. Il agit comme une carte routière pour les moteurs de recherche (Google, Bing...).  

**Rôle :** lister toutes les URLs de notre site que l'on souhaite voir indexées.  

**Utilité :** aider les robots à découvrir des pages profondes qui pourraient ne pas avoir de liens internes évidents et à comprendre la hiérarchie du site.  

**Contenu type :** **URL** de la page, la date de dernière modification (`lastmod`) et la fréquence de changement (`changefreq`).  

> 📄 Consulter le sitemap.xml : `./public/sitemap.xml`  

<h2 id="robots">
  <img
    alt="ROBOTS"
    title="ROBOTS"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/robots.png"
  />
  ROBOTS
</h2>

Le fichier `robots.txt` est la première ressource consultée par les robots d'exploration (`crawlers`) lorsqu'ils arrivent sur notre site.  

**Rôle :** donner des directives d'accès ("`Autorisé`" ou "`Interdit`").  

**Fonctionnement :** permettre d'empêcher l'indexation de parties privées ou techniques du site (ex: `/admin`, `/api`) pour économiser le "budget de crawl".  

**Lien avec le Sitemap :** il est recommandé d'inclure l'**URL** de notre **Sitemap** à la fin du fichier `robots.txt`.  

> 📄 Consulter le robots.txt : `./public/robots.txt`  

<h2 id="sémantique">
  <img
    alt="SÉMANTIQUE"
    title="SÉMANTIQUE"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
  />
  SÉMANTIQUE
</h2>

La **Sémantique HTML** est le squelette de notre référencement naturel (**SEO on-page**). Elle permet aux algorithmes de comprendre la structure et l'importance relative de chaque contenu sur une page.  

Pour garantir un bon référencement, l'application doit respecter ces règles :  

- **Structure HTML5 :**  
Utilisation correcte des balises de sectionnement (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`).

- **Hiérarchie des Titres :**  
`<H1>` : unique par page, il décrit le sujet principal.  
`<H2>` - `<H6>` : utilisés pour structurer les sous-sections de manière logique.  

- **Accessibilité & SEO :**  
Attributs `alt` descriptifs sur toutes les images.  
Attributs `title` et `aria-label` sur les liens et boutons pour donner du contexte.  

Une bonne sémantique améliore non seulement le **SEO** mais aussi l'accessibilité pour les lecteurs d'écran.  
