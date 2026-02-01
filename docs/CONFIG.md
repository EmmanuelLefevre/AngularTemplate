<h1 align="center">⚙️ CONFIGURATION ⚙️</h1>

<br>
<br>

## SOMMAIRE

- [TYPESCRIPT CONFIGURATION](#ts-config)
  - [Configuration de base](#base-config)
  - [Alias & Chemins)](#paths-aliases)
  - [Configuration applicative](#app-config)
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

💡 Une documentation complète est disponible dans le fichier `tsconfig.json` et ici... [TypeScript Base Config Rules](./docs/RULES_REFERENCE.md#ts-base-config-rules)  

> [Consulter la configuration](./tsconfig.json)  

<h3 id="paths-aliases">Alias & Chemins</h3>

Pour éviter les imports relatifs illisibles comme `../../../../core/services/auth.service`, nous utilisons des **Alias**.  
Ces raccourcis sont définis dans `compilerOptions.paths` du `tsconfig.json`.  

💡 Une documentation complète est disponible dans le fichier `tsconfig.app.json` et ici... [TypeScript Alias Config Rules](./docs/RULES_REFERENCE.md#ts-alias-config-rules)  

<h3 id="app-config">Configuration applicative</h3>

**`tsconfig.app.json`**  

💡 Une documentation complète est disponible dans le fichier `tsconfig.app.json` et ici... [TypeScript App Config Rules](./docs/RULES_REFERENCE.md#ts-app-config-rules)  

> [Consulter la configuration](./tsconfig.app.json)  

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

> [Consulter la configuration](./angular.json)  

💡 Une documentation complète est disponible ici... [Schematics Rules](./docs/RULES_REFERENCE.md#schematics-rules)  
