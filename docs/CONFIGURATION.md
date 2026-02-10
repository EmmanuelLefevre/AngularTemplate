<h1 align="center">⚙️ CONFIGURATION ⚙️</h1>

<br>
<br>

## SOMMAIRE

- [TYPESCRIPT CONFIGURATION](#ts-config)
  - [Configuration de base](#base-config)
  - [Alias & Chemins)](#paths-aliases)
  - [Configuration applicative](#app-config)
- [SERVER CONFIG (APACHE)](#apache-config)
- [SCHEMATICS](#schematics)

<h2 id="ts-config">
  <img
    alt="TSCONFIG"
    title="TSCONFIG"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/ts_config.png"
  />
  TYPESCRIPT CONFIGURATION
</h2>

La configuration **TypeScript** est divisée en plusieurs fichiers pour séparer les règles globales, celles de l'application et celles des tests.  

<h3 id="base-config">Configuration de Base</h3>

**`tsconfig.json`**  

Ce fichier contient les paramètres fondamentaux du compilateur **TypeScript** (`compilerOptions`) et du compilateur **Angular** (`angularCompilerOptions`) qui sont hérités par tous les autres fichiers de configuration de l'espace de travail.  

Il définit le niveau de rigueur du typage (**Strict Mode**) et la compatibilité du code généré.  

💡 Une documentation complète est disponible dans le fichier `tsconfig.json` et ici =>  
> [👀 TypeScript Base Config Rules](./RULES-REFERENCES.md#ts-base-config-rules)  

📄 [Consulter la configuration](./tsconfig.json)  

<h3 id="paths-aliases">Alias & Chemins</h3>

Pour éviter les imports relatifs illisibles comme `../../../../core/services/auth.service`, nous utilisons des **Alias**.  
Ces raccourcis sont définis dans `compilerOptions.paths` du `tsconfig.json`.  

💡 Une documentation complète est disponible dans le fichier `tsconfig.app.json` et ici... =>  
> [👀 TypeScript Alias Config Rules](./RULES-REFERENCES.md#ts-alias-config-rules)  

<h3 id="app-config">Configuration applicative</h3>

**`tsconfig.app.json`**  

💡 Une documentation complète est disponible dans le fichier `tsconfig.app.json` et ici... =>  
> [👀 TypeScript App Config Rules](./RULES-REFERENCES.md#ts-app-config-rules)  

<h2 id="apache-config">
  <img
    alt="Apache"
    title="Apache"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/apache.png"
  />
  SERVER CONFIG (Apache)
</h2>

### A propos d'Apache HTTP Server ::

**Apache** est le serveur web qui héberge notre application en production.  
Contrairement à un serveur d'application (comme **NodeJS*** ou **Java**), son rôle ici est de servir des fichiers statiques (**HTML**, **SCSS**, **JS**, **Images**) au navigateur de l'utilisateur.  

### Le défi des "Single Page Applications" (SPA)

**Angular** est une **SPA** : il n'y a qu'un seul fichier réel (`index.html`). La navigation (ex: `/dashboard`, `/profile`) est virtuelle et gérée par **JavaScript** dans le navigateur.  

**Le problème :**  

Si un utilisateur rafraîchit la page sur `https://monsite.com/dashboard`, le serveur **Apache** cherche un fichier `dashboard.html` qui n'existe pas et renvoie une **Erreur 404**.  

**La solution (.htaccess) :**  

Nous utilisons un fichier de configuration distribué (`.htaccess`) pour intercepter toutes les requêtes entrantes et dire au serveur :  
> *"Si tu ne trouves pas le fichier demandé, renvoie `index.html` et laisse Angular gérer l'affichage."*  

### Le fichier `.htaccess`

Ce fichier est situé dans le dossier des assets publics et est automatiquement copié à la racine du build lors de la compilation.  

**Emplacement build :** `dist/AngularTemplate/browser/.htaccess`  

### Fonctionnalités activées :

Le fichier assure trois rôles critiques pour la sécurité et la navigation :  

| Catégorie | Description |
| :--- | :--- |
| **🔀 URL Rewriting** | **SPA Fallback** : Rediriger toutes les requêtes inconnues vers `index.html` pour que le **Router Angular** prenne le relais (évite les erreurs 404 au rechargement) |
| **🔒 Force HTTPS** | Rediriger automatiquement tout le trafic **HTTP** (Port 80) vers **HTTPS** (Port 443) pour chiffrer les échanges |
| **🛡️ Security Headers** | Injecter des en-têtes **HTTP** stricts pour protéger l'application contre les attaques courantes <br> - `Strict-Transport-Security` (**HSTS**) <br> - `Content-Security-Policy` (**XSS**) <br> - `X-Frame-Options` (**Clickjacking**) |
| **🛂 Permissions-Policy** | **Contrôle des API Navigateur.** <br> Permet de désactiver complètement l'accès aux fonctionnalités sensibles du matériel (Caméra, Micro, Géolocalisation, USB, Paiement) pour renforcer la vie privée de l'utilisateur |

> [🔗 Security Headers Scan](https://securityheaders.com/)  

![Security Headers Scan Result](https://github.com/EmmanuelLefevre/MarkdownImg/blob/main/snyk_security_headers.png)  

<h2 id="schematics">
  <img
    alt="Schematics"
    title="Schematics"
    width="60px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/schematics.png"
  />
  Schematics Rules
</h2>

### Introduction :

Les schematics d'**Angular** sont un puissant outil qui facilite le développement en automatisant la génération et la modification de code. Cela permet de personnaliser et d'étendre les fonctionnalités de la **CLI**.  
La section de configuration des **schematics** définit les paramètres par défaut de la commande `ng generate` de l'interface de la **CLI** d'\***\*Angular**.  

Ils permettent aux développeurs de créer des composants, des services, des modules et d'autres éléments de manière standardisée (tout en réduisant les tâches répétitives et en minimisant les erreurs) grâce à la ligne de commande.  

Les **schematics** utilisent des règles pour définir comment le code doit être généré. De plus cela garantit la cohérence et le respect des bonnes pratiques architecturales dans l'ensemble du projet lors de la création de nouveaux fichiers (composants, services, gardes...).  

La configuration se trouve dans le fichier `angular.json`.  

💡 Une documentation complète est disponible ici... =>  
> [👀 Schematics Rules](./RULES-REFERENCES.md#schematics-rules)  
