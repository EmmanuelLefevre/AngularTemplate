<h1 align="center">📘 DOCUMENTATION 📘</h1>

<br>
<br>

## SOMMAIRE

- [COMPODOC](#compodoc)
- [SCRIPT PERSONALISÉ](#script)
- [CICD](#cicd)
- [GITHUB PAGES](#github-pages)
- [CONFIGURATION DU DEPOT](#depot)

<h2 id="compodoc">
  <img
    alt="COMPODOC"
    title="COMPODOC"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/compodoc.svg"
  />
  COMPODOC
</h2>

### INTRODUCTION

**Compodoc** est un outil de génération de documentation pour les applications **Angular**. **Compodoc** est le moteur utilisé pour analyser le code **TypeScript** (`Modules`, `Components`, `Injectables`, `Routes`, `Interfaces`...) et générer un site web statique complet avec des graphiques de dépendances et une navigation fluide.  

> [🔗 Compodoc Documentation](https://compodoc.app/)  

Dans ce projet, nous avons poussé l'intégration plus loin pour permettre une double navigation fluide :  

- Via les fichiers **Markdown** sur **GitHub**.  
- Via le site généré **Compodoc**.  

> [🔗 Lien vers la documentation GitHub Pages](https://emmanuellefevre.github.io/AngularTemplate/)  

### CONFIGURATION

3 fichiers sont essentiels au bon fonctionnement :  

- `tsconfig.doc.json`  
- `.compodocrc.json`  
- `docs/summary.json`  

**Etape 1 :** Installer **Compodoc**  

```shell
pnpm add -D @compodoc/compodoc
```

**Etape 2 :**  

1. Créer `tsconfig.doc.json` (à la racine), afin que **Compodoc** exclu les fichiers de tests (`.spec.ts`) de la documentation....  

2. Créer le fichier `.compodocrc.json` =>  

C'est la configuration principale de **Compodoc** (dossier de sortie, port, thème...)  

💡 Une documentation complète est disponible ici... =>  
> [👀 Compodoc Rules](.RULES-REFERENCES.md#compodoc)  

3. Créer le fichier `summary.json` dans un dossier `docs` à la racine =>  

Celui-ci sert à définir la structure du menu latéral pour la documentation additionnelle (fichiers **Markdown**).  

**Etape 3 :** Ajouter les scripts au `package.json`  

```JSON
{
  "scripts": {
    "doc": "node docs/_manage-doc.js serve",
    "doc:build": "node docs/_manage-doc.js build",
    "doc:ci": "node docs/_manage-doc.js build --keep",
  }
}
```

`pnpm doc:build` ne génère simplement que des fichiers statiques, ce script n'est utile que pour vérifier le build en local...Il n'est pas utilisé dans le déploiement !  

**Etape 4 :** Lancer le serveur **Compodoc** en local =>  

```shell
pnpm doc
```

<h2 id="script">
  🛠️ SCRIPT PERSONALISÉ
</h2>

Pour résoudre le problème des liens relatifs qui diffèrent entre **GitHub** (`./docs/file.md`) et **Compodoc** (`additional-documentation/file.html`), un script de pré-traitement intelligent a été implémenté : ``docs/_manage-doc.j``.  

Ce script effectue les actions suivantes à chaque lancement :  

- **Backup :**  
Sauvegarder le `README.md` original.  

- **Transformation :**  
Remplacer les liens **Markdown** par des liens **HTML** compatibles **Compodoc**.  

- **Verrouillage Git :**  
Utiliser git `update-index --assume-unchanged` pour empêcher de commiter le fichier modifié par erreur.  

- **Exécution :**  
Lancer **Compodoc** avec les arguments appropriés.  

- **Nettoyage :**  
Restaurer le `README.md` original et nettoie le dossier de sortie (sauf en **CI**).  

- **Sécurité :**  
Utiliser des descripteurs de fichiers (`fs.openSync`) pour éviter les failles de type **Race Condition**.  

💡 **CodeQL** signalerait une "Time-of-check to time-of-use (**TOCTOU**) race condition". En gros, il dirait : "Tu as vérifié que le fichier existait au début du script, mais entre ce moment-là et le moment où tu écris dedans (`writeFileSync`), un attaquant pourrait remplacer ce fichier par un lien symbolique malveillant."  
C'est un risque très théorique pour un script de build local/CI...  

<h2 id="cicd">
  <img
    alt="CICD"
    title="CICD"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg"
  />
  CICD
</h2>

Le déploiement est géré par un **Job** dédié (`documentation`) dans le fichier `.github/workflows/pipeline.yml`.  

### Conditions d'exécution :

Le déploiement ne se lance que sur la branche `main`. Il nécessite que les jobs `security` et `quality` soient passés avec succès.  

### Fonctionnement du Job :

1. Checkout du code.  

2. Installation des dépendances.  

3. Génération de la documentation via `pnpm doc:ci` avec injection dynamique du `--base-href` (nom du repo).  

4. Upload du dossier `.documentation-output` vers la branche orpheline `gh-pages` via l'action `peaceiris/actions-gh-pages`.  

<h2 id="github-pages">
  <img
    alt="GITHUB PAGES"
    title="GITHUB PAGES"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/github_pages.svg"
  />
  GITHUB PAGES
</h2>

La documentation est hébergée gratuitement via **GitHub Pages**. Elle est automatiquement mise à jour à chaque modification sur la branche main.  

> [🔗 Lien vers la documentation GitHub Pages](https://EmmanuelLefevre.github.io/AngularTemplate/)  

<h2 id="depot">
  <img
    alt="DEPOT"
    title="DEPOT"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/github.png"
  />
  CONFIGURATION DU DEPOT
</h2>

Pour que le site soit accessible, la configuration suivante a été appliquée dans les paramètres du dépôt **GitHub** :  

- **Settings > Pages**
- **Source :** Deploy from a branch
- **Branch :** gh-pages / (root)

> [🔗 Lien vers la configuration GitHub Pages](https://github.com/EmmanuelLefevre/AngularTemplate/settings/pages)  
