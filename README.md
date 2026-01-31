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

- [PRÉSENTATION](#-présentation)
- [DOCUMENTATION COMPLÈTE](#-documentation-complète)
- [QUICK START](#-quick-start)
  - [Requirements](#requirements)
  - [Installation](#installation)

## 🚀 PRÉSENTATION

> **L'excellence industrielle dès le premier commit !**

Ce projet n'est pas simplement un squelette d'application, c'est un **accélérateur de développement Angular 21** conçu pour les équipes exigeantes.  

Il incarne une philosophie **"Zéro Config, Maximum Quality"** : cloné le matin, prêt pour la production l'après-midi. Tout a été pré-configuré avec certains des outils les plus stricts du marché afin de se concentrer uniquement sur la valeur métier sans vous soucier de la dette technique.  

### 🔥 Pourquoi ce template ?

* ✨ **Qualité :** Une config **ESLint** & **Prettier** stricte (mais aussi **HTMLHint**, **StyleLint**), couplée à **SonarCloud** pour un code propre, uniforme et maintenable.
* 🛡️ **Sécurité :** Scans automatiques de vulnérabilités (**Snyk**), détection de secrets (**GitLeaks**) et analyse statique avancée (**CodeQL**).
* ⚡ **Haute Performance :** Build ultra-rapide (**Esbuild**), serveur de développement quasi instantané (**Vite**) et gestionnaire de paquets optimisé et reproductible via (**PNPM**).
* 🧪 **Tests Next-Gen :** Stratégie de tests unitaires modernisée propulsée par **Vitest**, offrant une exécution instantanée et une compatibilité native avec l'écosystème Vite.
* 🚧 **Gatekeeping Local :** Finis les commits cassés. **Husky** et **lint-staged** interceptent chaque commit pour formater, linter et vérifier les secrets sur les fichiers modifiés uniquement. La qualité est forcée à la source, avant même d'arriver sur la CI.
* 🤖 **CI/CD Ready :** Pipelines **GitHub Actions** complets incluant tests, linting, documentations audits de sécurité et déploiement.
* 🏷️ **Packaging & Release Automatisés :** Fini la gestion manuelle des versions. Le template intègre **Semantic Release** pour calculer automatiquement le **SemVer**, générer le **Changelog**, créer la Release GitHub et publier les artefacts sur **GitHub Packages**.
* 🛠️ **DX & Corepack :** Onboarding immédiat. Grâce à **Corepack**, le projet installe et utilise automatiquement la version stricte de **PNPM** définie dans le `package.json`. Fini les conflits de versions entre développeurs ou les installations globales.
* ♿ **Accessibilité Native :** Conformité **RGAA / WCAG** intégrée dès le départ. Structure sémantique stricte, navigation au clavier et gestion du focus testées pour une inclusion totale.
* 🗣️ **Multi-langues :** **I18n** intégré par défaut via **NGX-Translate**, permettant de gérer facilement les traductions et de séparer le contenu de la logique métier.
* 🎨 **Design System & Mobile-First :** Conception intégralement pensée pour le mobile. Le Design System est entièrement variabilisé (mixins, couleurs, polices, espacements...) pour une personnalisation sans douleur.
* 🧩 **Smart UI Kit :** Une bibliothèque de composants internes (Custom Form, Generic Input, Button, Link, ScrollToTop) et des layouts (Public, Admin, Header, Footer, Nav...) prêts à l'emploi. **Tous couverts à 100% par des tests.**
* 🧠 **Architecture :** Le socle technique est posé. **Error Handler** global, **Interceptors**, **Guards** d'authentification et un **Dashboard Admin** fonctionnel sont déjà configurés.
* 🛠️ **Pipes & Directives :** Ne réinventez pas la roue. Des outils essentiels comme des directives (`input-focus`, `input-trim`, `input-uppercase`...) et des **Pipes** (`date-format`...) sont inclus et **testés à 100%**.
* 📘 **Documentation :** Architecture documentée en temps réel. **Compodoc** génère une documentation technique complète, automatiquement déployée et hébergée sur **GitHub Pages** à chaque merge.

## 📚 DOCUMENTATION COMPLÈTE

La documentation détaillée est disponible ici :  

- 🏗 [Architecture](./docs/ARCHITECTURE.md)
- 🚀 [Setup](./docs/SETUP.md)
- 💎 [Quality](./docs/QUALITY.md)
- 🧪 [Testing](./docs/TESTING.md)
- ⚙️ [Configuration](./docs/CONFIGURATION.md)
- 🏷️ [Packaging](./docs/PACKAGING.md)
- 🤖 [CICD](./docs/CICD.md)
- 🎨 [Styles](./docs/STYLES.md)
- 🗣️ [Multi Langues](./docs/MULTI_LANGUAGES.md)
- 📦 [Other Dependencies](./docs/DEPENDENCIES.md)
- ♿ [Accessibilité](./docs/ACCESSIBILITY.md)
- 📘 [Documentation](./docs/DOCUMENTATION.md)
- 🔧 [Rules Reference](./docs/RULES_REFERENCE.md)
- 💡 [FAQ](./docs/FAQ.md)

> Voir la [Documentation GitHub Pages](https://gg.com)  

</br>

> Voir la [Documentation Compodoc locale](https://EmmanuelLefevre.github.io/AngularTemplate/)  

## ⚡ QUICK START

### Requirements

| Angular    | Node.js                                   | TypeScript        | RxJS                   |
| :--------- | :---------------------------------------- | :---------------- | :--------------------- |
| **21.0.x** | `^20.19.0` \|\| `^22.12.0` \|\| `^24.0.0` | `>=5.9.0 <=6.0.0` | `^6.5.3` \|\| `^7.4.0` |

- Installer ou changer la version de **NodeJs**  

> Via **NVM**

```shell

```

- **PNPM**  

### Installation

- Clone  

```bash
git clone [https://github.com/EmmanuelLefevre/AngularTemplate.git](https://github.com/EmmanuelLefevre/AngularTemplate.git)
cd AngularTemplate
pnpm install
```

- Package  

```bash

```
