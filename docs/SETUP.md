<h1 align="center">🚀 SETUP 🚀</h1>

<br>
<br>

## SOMMAIRE

- [COREPACK](#corepack)
- [PNPM](#pnpm)
- [ANGULAR](#angular)
- [NPMRC](#npmrc)

<h2 id="corepack">COREPACK</h2>

Plutôt que de gérer manuellement les versions de **PNPM** ("On a la v8 ou la v9 ?"), nous utilisons le champ "`packageManager`" du `package.json`.  

Lorsque l'on lance `pnpm install`, **Corepack** intercepte la commande et utilise la version stricte (avec vérification de signature **SHA**) requise par le projet. Cela garantit une stabilité totale entre la **CI/CD** et son poste local.  

<h2 id="pnpm">
  <img
    alt="PNPM"
    title="PNPM"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pnpm/pnpm-original-wordmark.svg"
  />
  PNPM
</h2>

Installer **PNPM**  

1. Via le script d'installation (recommandé)

Cette méthode est recommandée car elle permet d'installer **PNPM** sans dépendre d'une installation spécifique de **Node.js** ce qui facilite les mises à jour.  

- **Windows** (**PowerShell**) :

```shell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

- **macOS** et **Linux** :

```shell
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

2. Via **NPM** (méthode classique)

Si **Node.js** est déjà installé, c'est souvent la méthode la plus simple et la plus rapide.  
Exécuter simplement cette commande dans un terminal :  

```shell
npm install -g pnpm
```

3. Audit de sécurité de **PNPM**

```shell
pnpm audit
```

```shell
pnpm audit --audit-level=high
```

<h2 id="angular">
  <img
    alt="Angular"
    title="Angular"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg"
  />
  ANGULAR
</h2>

1. Vérifier les versions de la **CLI**

**\* Global :** (se placer hors du projet)  

**\* Projet :** (se placer dans le projet)  

```shell
ng version
```

2. Afficher les versions disponibles

**\* Avec tags / versions stables :**  

```shell
pnpm view @angular/cli dist-tags
```

**\* Liste complète :**  

```shell
pnpm view @angular/cli versions
```

**\* Dernière version :**  

```shell
pnpm view @angular/cli version
```

3. Mettre à jour la **CLI Angular** globalement

```shell
pnpm add -g @angular/cli@21
```

4. Créer le projet

Lancer la commande suivante. L'option `--package-manager=pnpm` est importante, elle configure directement le projet pour utiliser **PNPM** au lieu de **NPM** par défaut.

```shell
ng new mon-projet-angular --style=scss --ssr=true --package-manager=pnpm
```

5. Fixer les dépendances des librairies sauf les correctifs de bugs d'**Angular**

```shell
pnpm list --depth 0
```

<br>

![Terminal Screen](https://github.com/EmmanuelLefevre/MarkdownImg/blob/main/template_angular_fix_dependencies.png)  

<br>

Ici on ferait =>  

```JSON
"dependencies": {
  "@angular/common": "~21.0.0",
  "@angular/compiler": "~21.0.0",
  "@angular/core": "~21.0.0",
  "@angular/forms": "~21.0.0",
  "@angular/platform-browser": "21.0.0",
  "@angular/router": "~21.0.0",
  "rxjs": "7.8.2",
  "tslib": "2.8.1"
},
"devDependencies": {
  "@angular/build": "~21.0.1",
  "@angular/cli": "~21.0.1",
  "@angular/compiler-cli": "~21.0.0",
  "jsdom": "27.3.0",
  "typescript": "5.9.3",
  "vitest": "4.0.15"
},
```

**\* Résumé**  

- `^21.0.0` (Caret) = Mises à jour mineures + Patchs (standard Angular).
- `~21.0.0` (Tilde) = Patchs (bugs) uniquement.
- `21.0.0` (Sans rien) = Version fixée sans mise à jour possible.

**\* Dernière étape**  

Une fois le `package.json` modifié avec les tildes (~), ne pas oublier d'enregistrer le fichier et de lancer la commande pour mettre à jour le fichier lock :  

```shell
pnpm install
```

<h2 id="npmrc">
  <img
    alt="NPMRC"
    title="NPMRC"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg"
  />
  NPMRC
</h2>

Pour garantir la stabilité du projet et éviter les différences entre les environnements (`local`, `CI`, `DEV`, `PROD`), nous utiliserons un fichier `.npmrc` à la racine.  

1. **Garantir l'intégrité du lockfile** (`frozen-lockfile`)

Le `pnpm-lock.yaml` est la source de vérité absolue de toutes les dépendances (y compris les dépendances de nos dépendances).  
Si le `package.json` et le lockfile ne correspondent pas, l'installation échoue au lieu de mettre à jour le fichier lockfile.  

En résumé cette option interdit à **PNPM** la modification silencieuse du `pnpm-lock.yaml` lors de l'installation.  

```shell
frozen-lockfile=true
```

2. **Fixer les versions à l'installation** (`save-exact`)

Par défaut, **PNPM** ajoute un prefixe (ex: ^7.8.0) qui autorise les mises à jour mineures automatiques.  

Pour éviter d'avoir à retirer manuellement les "^" à chaque installation d'une nouvelle librairie, il est possible de configurer le projet pour qu'il sauvegarde toujours la version exacte de la librairie installée.  

```shell
save-exact=true
```

Désormais, si on lance `pnpm add rxjs`, il installera **`"rxjs"`: `"7.8.0"`** au lieu de **`"^7.8.0"`**.  

3. **Restreindre les versions de l'environnement** (`engine-strict`)

Pour s'assurer que tous les développeurs utilisent les mêmes versions des outils de base (comme **Node.js** et **PNPM**) nous pouvons utiliser la propriété "engines" du `package.json`.  

Cependant, par défaut, si un développeur utilise une version non prise en charge, cela n'affiche qu'un simple avertissement. Cette option force **PNPM** à faire échouer l'installation de manière stricte si la version de **Node.js** ou de **PNPM** ne correspond pas à celle déclarée.  

```shell
engine-strict=true
```
