<h1 align="center">📘 DOCUMENTATION 📘</h1>

<br>
<br>

## SOMMAIRE

- [COMPODOC](#compodoc)
- [GITHUB PAGES](#github-pages)

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

### CONFIGURATION

**Etape 1 :** Installer **Compodoc**  

```shell
pnpm add -D @compodoc/compodoc
```

**Etape 2 :** Créer `tsconfig.doc.json` (à la racine), afin d'éviter que **Compodoc** n'analyse les fichiers de tests on crée une config dédiée...  

> [Consulter la configuration](./tsconfig.doc.json)  

On crée aussi le fichier `.compodocrc.json` =>  

> [Consulter la configuration](./.compodocrc.json)  

**Etape 3 :** Ajouter les scripts au `package.json`  

```JSON
{
  "scripts": {
    "doc": "compodoc -s -w",
    "doc:build": "compodoc",
  }
}
```

> [Consulter les scripts](./package.json)  

**Etape 4 :** Lancer le serveur **Compodoc** en  local =>  

```shell
pnpm doc
```

<h2 id="github-pages">
  <img
    alt="GITHUB PAGES"
    title="GITHUB PAGES"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/github_pages.svg"
  />
  GITHUB PAGES
</h2>

> [Lien vers la documentation GitHub Pages](https://EmmanuelLefevre.github.io/AngularTemplate/)  
