<h1 align="center">🏷️ BUILD & PACKAGING 🏷️</h1>

<br>
<br>

## SOMMAIRE

- [CONFIGURATION DE BUILD](#configuration-de-build)
- [PACKAGING](#packaging)

<h2 id="configuration-de-build">
  <img
    alt="Angular"
    title="Angular"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg"
  />
  CONFIGURATION DE BUILD
</h2>

**`angular.json`**  

Cette section (`architect.build.configurations.production`) définit les paramètres spécifiques qui sont appliqués lorsque vous exécutez la commande `ng build --configuration=production` (souvent abrégée en `ng build --prod` ou `ng build`).  

L'option `fileReplacements` est cruciale pour gérer les configurations spécifiques à l'environnement de production. L'option `budgets` est quand à elle un mécanisme essentiel pour basculer les variables d'environnement (API endpoints, clés) vers leurs valeurs de production sans nécessiter de modification manuelle du code source.  

Renseigner le chemin des fichiers d'environnement et définir des budgets de performance pour garantir que la taille de l'application reste sous contrôle.  

De plus il faut ajouter le favicon, les scripts, le browser et l'index dans l'objet `options`.  

<h2 id="packaging">
  <img
    alt="PACKAGING"
    title="PACKAGING"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/commitlint.png"
  />
  PACKAGING
</h2>

