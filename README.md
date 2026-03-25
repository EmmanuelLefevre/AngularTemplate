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

<br>
<br>

## SOMMAIRE

- [PRÉSENTATION](#-présentation)
- [DOCUMENTATION](#-documentation)
- [QUICK START](#-quick-start)
  - [Requirements](#requirements)
  - [Installation & Démarrage](#installation--démarrage)

## 🚀 PRÉSENTATION

> **"L'excellence industrielle dès le premier commit !"**

Ce projet n'est pas simplement un squelette d'application, c'est un **accélérateur de développement Angular 21** conçu pour les équipes exigeantes.  

Il incarne une philosophie **"Zéro Config - Maximum Quality"**.  

Tout a été pré-configuré avec certains des outils les plus stricts du marché afin de se concentrer uniquement sur la valeur métier sans se soucier de la dette technique.  

### 🔥 Pourquoi ce template ?

✨ **Qualité :**  
Une config **ESLint** (flat-config) & **Prettier** stricte (mais aussi **HTMLHint**, **StyleLint**, **SecretLint**), couplée à **SonarCloud** pour un code propre, uniforme et maintenable.  

🛡️ **Sécurité :**  
Scans automatiques de vulnérabilités (**Snyk**), détection de secrets (**GitLeaks**) et analyse statique avancée (**CodeQL**).  

⚡ **Haute Performance :**  
Build ultra-rapide (**Esbuild**), serveur de développement quasi instantané (**Vite**) et gestionnaire de paquets optimisé et reproductible via (**PNPM**).  

🧪 **Tests Next-Gen :**  
Stratégie de tests unitaires modernisée propulsée par **Vitest** offrant une exécution instantanée et une compatibilité native avec l'écosystème **Vite**.  

🚧 **Gatekeeping Local :**  
Finis les commits cassés. **Husky** et **lint-staged** interceptent chaque commit pour formater, linter et vérifier les secrets sur les fichiers modifiés uniquement. La qualité est forcée à la source avant même d'arriver sur la CI.  

🤖 **CI/CD Ready :**  
Pipelines **GitHub Actions** complètes incluant tests, linting, documentations, audits de sécurité et déploiement.  

🏷️ **Packaging & Release Automatisés :**  
Fini la gestion manuelle des versions. Le template intègre **Semantic Release** pour calculer automatiquement le **SemVer**, générer le **Changelog**, créer la **Release GitHub** et publier les artefacts sur **GitHub Packages**.  

🛠️ **DX & Corepack :**  
Onboarding immédiat. Grâce à **Corepack**, le projet installe et utilise automatiquement la version stricte de **PNPM** définie dans le `package.json`. Fini les conflits de versions entre développeurs ou les installations globales.  

♿ **Accessibilité Native :**  
Conformité **RGAA / WCAG** intégrée dès le départ. Structure sémantique stricte, navigation au clavier et gestion du focus testées pour une inclusion totale.  

📈 **SEO & PWA Ready :**  
Maximisez votre visibilité. Un **Service Meta** dynamique gère vos balises `<head>` en temps réel selon les routes. Le tout est épaulé par une configuration native des fichiers **`sitemap.xml`**, **`robots.txt`** et **`manifest.json`** pour une indexation parfaite et une compatibilité mobile.  

🗣️ **Multi-langues :**  
**I18n** intégré par défaut via **NGX-Translate** permettant de gérer facilement les traductions et de séparer le contenu de la logique métier.  
<!-- L'intégrité des traductions est garantie par un outillage automatisé :  

- 🕵️‍♂️ **Extraction automatique :** `pnpm i18n:extract` => scanne le code pour générer et mettre à jour les fichiers **JSON** sans effort manuel.
- 👮 **Validation stricte :** `pnpm i18n:lint` un garde-fou **CI/CD** qui bloque le déploiement si une clé est manquante ou inutilisée. -->

🎨 **Design System & Mobile-First :**  
Conception intégralement pensée pour le mobile. Le **Design System** est entièrement variabilisé (mixins, couleurs, polices, espacements...) pour une personnalisation sans douleur.  

🧩 **Smart UI Kit :**  
Une bibliothèque de composants internes (Custom Form, Generic Input, Button, Link, ScrollToTop...) et des layouts (Public, Admin, Header, Footer, Nav...) prêts à l'emploi. **Tous couverts à 100% par des tests.**  

🧠 **Architecture :**  
Des **Interceptors** robustes, des **Guards** d'authentification, une partie de l'application **Public** et **Private** ainsi qu'un **Dashboard Admin** fonctionnel sont déjà configurés. **Tous couverts à 100% par des tests.**  

📢 **Résilience & Gestion des Erreurs :**  
Un **Error Handler** global intercepte et redirige intelligemment vers des vues dédiées pour chaque scénario (**401**, **404**, **500**, **Generic**, **Timeout 504 408**, **Unknown**...). Une gestion du code **HHTP 503** est implémentée à double niveau : si l'**API** est indisponible, **Angular** affiche sa vue de maintenance. Si c'est l'application elle-même qui est en mise à jour (**Front-End** down), un mécanisme serveur (`.htaccess` via trigger **CI/CD**) prend instantanément le relais avec une page pur **HTML**/**CSS** statique. Le **SEO** est maintenu !

🛠️ **Pipes & Directives :**  
Des outils essentiels comme des **Directives** (`input-focus`, `input-trim`, `input-uppercase`...) et des **Pipes** (`date-format`...) sont inclus. **Tous couverts à 100% par des tests.**  

📘 **Documentation :**  
Architecture documentée en temps réel. **Compodoc** génère une documentation technique complète, automatiquement déployée et hébergée sur **GitHub Pages** à chaque merge sur le code stable (branche `main`). Cette **Compodoc** est évidemment aussi disponible en environnement local !  

🚦 **Toggle Maintenance :**  
Besoin de geler l'application en production pour une maintenance ? Un workflow **GitHub Actions** dédié agit comme un interrupteur (`toggle-maintenance.yml`). Depuis l'onglet `Actions` de **GitHub**, un simple clic permet d'activer ou de désactiver la page de maintenance statique (**Erreur 503**). Pour cela le script se connecte en **SSH** pour piloter le fichier `maintenance.enable` intercepté par le `.htaccess`.  
Un script ping le serveur et recharge automatiquement la page de l'utilisateur dès lors que le site revient en ligne (sans qu'ils n'aient besoin de rafraîchir manuellement !). ✨✨✨  

![Toggle Maintenance Mode](https://github.com/EmmanuelLefevre/MarkdownImg/blob/main/toggle_maintenance_mode.png)  

## 📚 DOCUMENTATION

La documentation détaillée est disponible ici :  

- 🏗 [Architecture](./docs/ARCHITECTURE.md)
- 🚀 [Setup](./docs/SETUP.md)
- 💎 [Qualité](./docs/QUALITE.md)
- 🧪 [Tests](./docs/TESTS.md)
- ⚙️ [Configuration](./docs/CONFIGURATION.md)
- 🏷️ [Build & Packaging](./docs/BUILD-&-PACKAGING.md)
- 🤖 [CICD](./docs/CICD.md)
- 🎨 [Styles](./docs/STYLES.md)
- 🗣️ [Multi Langues](./docs/MULTI-LANGUES.md)
- ♿ [Accessibilité](./docs/ACCESSIBILITE.md)
- 📈 [SEO](./docs/SEO.md)
- 📘 [Documentation](./docs/DOCUMENTATION.md)
- 🔧 [Rules Reference](./docs/RULES-REFERENCES.md)
- 💡 [FAQ & Erreurs](./docs/FAQ-&-ERREURS.md)

<br>

> [🔗 Lien vers la documentation GitHub Pages](https://emmanuellefevre.github.io/AngularTemplate/)  

## ⚡ QUICK START

### Requirements

|   Angular  |                  Node.js                  |         TypeScript       |           RxJS         |
| :--------- | :---------------------------------------- | :----------------------- | :--------------------- |
|  `21.0.x`  | `^20.19.0` \|\| `^22.21.1` \|\| `^24.0.0` | `>=5.9.0` \|\| `<=6.0.0` | `^6.5.3` \|\| `^7.4.0` |

**Etape 1 :** Node.js  

- Ce projet nécessite une version précise de **NodeJS**. Utilisez **NVM**.  

```shell
nvm install 22.21.1
nvm use 22.21.1
```

> [🔗 NVM Cheatsheets](https://github.com/EmmanuelLefevre/Documentations/blob/main/Personnal%20Cheatsheets/nvm_cheatsheets.md)  

**Etape 2 :** Gestionnaire de paquets : **PNPM** & **Corepack**  

Ce projet utilise **Corepack** (inclus dans **NodeJS**) pour garantir que tous les développeurs utilisent exactement la même version de **PNPM** (définie dans le `package.json`).  

⚠️ Vous pouvez toutefois installer **PNPM** en global.  

> [👀 Setup](./docs/SETUP.md#pnpm)

### Installation & Démarrage

- Via Clone **SSH**  

```bash
git clone git@github.com:EmmanuelLefevre/AngularTemplate.git
cd AngularTemplate
corepack enable
pnpm install --frozen-lockfile
pnpm start/ng serve
```

- Via Package  

```bash

```

### Installation de la CLI Angular en global

```bash
pnpm add -g @angular/cli@21.2.1
```

### Installer une librairie

- En DEV  

```bash
pnpm add -DE <MA_LIBRAIRIE>@latest
```

- En PROD  

```bash
pnpm add <MA_LIBRAIRIE>@latest
```

Supprimer le `node_modules`, le `pnpm-lock.yaml` et clean le cache de **PNPM** =>

````bash
pnpm store prune
```

Push 🤜🤜🤜
