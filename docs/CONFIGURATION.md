<h1 align="center">⚙️ CONFIGURATION ⚙️</h1>

<br>
<br>

## SOMMAIRE

- [TS CONFIG](#ts-config)
- [SCHEMATICS](#schematics)

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

💡 Une documentation complète est disponible dans le fichier `tsconfig.json` et ici... [TS Config Rules](./docs/RULES_REFERENCE.md#ts-config-rules)  

> [Consulter la configuration](./tsconfig.json)  

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
