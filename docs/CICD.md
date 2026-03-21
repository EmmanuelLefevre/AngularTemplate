<h1 align="center">🤖 CICD 🤖</h1>

<br>
<br>

## SOMMAIRE

- [Protection des branches](#protection-des-branches)
- [Stratégie de qualité](#strategie-de-qualite)
- [Sonar Cloud](#sonar-cloud)
- [Snyk](#snyk)
- [CodeQL](#codeql)
- [GitLeaks](#gitleaks)
- [Linters](#linters)
- [Rimraf](#rimraf)
- [clean up workflow](#clean-up-workflow)

<h2 id="protection-des-branches">
  PROTECTION DES BRANCHES
</h2>

Pour garantir que la qualité et la sécurité du code ne soient jamais compromises, des règles de protection strictes ont été appliquées sur les branches vitales du projet.  

🔒 **Configuration pour `main` et `develop`**  

Voici les règles implémentées dans ce dépôt (Settings > Branches > Add rule) :

- **Require a pull request before merging :** interdiction totale de pousser directement du code sur ces branches. Tout changement doit passer par une **PR**.
- **Require status checks to pass before merging :** une **PR** ne peut être fusionnée que si les jobs suivants sont au vert :  
  🛡️ Security Scans  
  ✨ Quality & Tests
- **Require conversation resolution before merging :** toutes les remarques des relecteurs lors de la **PR** doivent être traitées.
- **Restrict deletions & force pushes :** empêcher quiconque d'effacer l'historique ou de réécrire les branches stables.

L'option **"Include administrators"** est également activée...  

<h2 id="strategie-de-qualite">
  STRATEGIE DE QUALITE
</h2>

Pour maintenir une base de code saine sans ralentir le développement quotidien, une stratégie de validation stricte mais pragmatique est appliquée : **"Souple en local, Intransigeant en CI"** !!!  

1. **En Local (Commit) :** Tolérance Partielle 🚧

Lors des commits, **Husky** et **lint-staged** analysent uniquement les fichiers modifiés.  

**Philosophie**  

Le développement est un processus itératif. Il est acceptable d'avoir quelques imperfections mineures (warnings) pendant que l'on travaille sur une fonctionnalité.  

**Seuil de tolérance : Max 50 warnings**  

- Si erreurs (errors), le commit est bloqué.
- Si moins de 50 warnings, le commit passe.
- Si plus de 50 warnings, le commit est bloqué.

Commande exécutée : `eslint --fix --max-warnings=50`  

2. **En CI/CD (Pull Request) :** Tolérance Zéro ⛔

Lorsqu'une Pull Request est ouverte vers `develop` ou `main`, le pipeline **GitHub Actions** analyse l'intégralité du projet.  

**Philosophie**  

Le code qui entre dans les branches principales doit être irréprochable. La dette technique ne doit pas s'accumuler silencieusement via des warnings ignorés.  

**Seuil de tolérance : Max 0 warnings** 

Conséquence : Si le moindre warning subsiste (**HTML**, **TS** ou encore **SCSS**), le job ✨ Quality & Tests échoue et le merge est bloqué par **GitHub**.  

Commande exécutée : `pnpm lint:ci` (ng lint --max-warnings=0).  

<h2 id="sonar-cloud">
  <img
    alt="SonarCloud"
    title="SonarCloud"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/sonar_cloud.png"
  />
  SONAR CLOUD
</h2>

**SonarCloud** est l'inspecteur de santé de ce projet. C'est l'outil de référence pour le **"Clean Code"**.  

**Son rôle**  
Il analyse la qualité globale. Il traque :

- **Bugs :** code qui va probablement planter.
- **"Code Smells" :** code mal écrit, difficile à maintenir (dette technique).
- **Couverture de test :** s'assure que tu as bien testé ce que tu as écrit.
- **Hotspots de sécurité :** zones du code qui demandent une révision manuelle.

**Pourquoi c'est top**  

Son concept de **Quality Gate** (Porte de Qualité) est génial : si du nouveau code ne respecte pas les standards (ex : **moins** de **80%** de tests), il bloque la fusion de la **PR**.  

Configurer son compte **SonarCloud** et son secret `SONAR_TOKEN`.  

Créer le fichier `sonar-project.properties` à la racine et y coller la configuration présente dans le template...  

<h2 id="snyk">
  <img
    alt="Snyk"
    title="Snyk"
    width="88px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/snyk.png"
  />
  SNYK
</h2>

**Snyk** est un bouclier de sécurité global. Si dans un projet moderne **80%** du code provient de bibliothèques tierces (via **NPM** ou **PNPM**), **Snyk** s'assure que ces dépendances sont saines, **mais il analyse également le code !**  

Snyk agit sur deux fronts principaux :  

- **Snyk Open Source (les dépendances) :** il parcourt les fichiers `package.json` et `pnpm-lock.yaml` pour les comparer à une base de données géante de vulnérabilités connues (**CVE**).  

- **Snyk Code (analyse statique - SAST) :** il scanne le code source à la recherche de failles de sécurité ou de mauvaises pratiques (mots de passe en dur, fuites de données...).  

**Configuration et Faux Positifs**
Pour éviter que l'analyse de code ne déclenche des alertes inutiles (faux mots de passe utilisés dans les tests unitaires), un fichier `.snyk` est crée à la racine du projet. Ce fichier permet d'exclure spécifiquement les fichiers de tests de l'analyse **Snyk Code**.

**Pourquoi c'est top**  
Il ne se contente pas de dire "c'est cassé", il propose souvent la version précise à laquelle l'on doit mettre à jour pour corriger la faille.

**Seuil**  
Seules les vulnérabilités de niveau high bloquent le pipeline, évitant ainsi de stopper le projet pour des failles mineures ou sans correctif disponible.

<h2 id="codeql">
  <img
    alt="CodeQL"
    title="CodeQL"
    width="60px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/codeql.png"
  />
  CODEQL
</h2>

**CodeQL** est le moteur d'analyse sémantique de **GitHub**. Contrairement à un linter classique qui regarde la forme, **CodeQL** traite le code comme une base de données.

**Son rôle**  
Il exécute des requêtes complexes pour voir comment les données circulent dans l'application. Il peut détecter si une entrée utilisateur non sécurisée finit par être exécutée par une fonction sensible (prévenant ainsi les injections).

**Pourquoi c'est top**  
C'est un outil de "chasseur de failles". Il est capable de trouver des erreurs de logique ou des vulnérabilités critiques que personne n'a encore répertoriées ailleurs.

<h2 id="gitleaks">
  <img
    alt="GitLeaks"
    title="GitLeaks"
    width="100px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/git_leaks.png"
  />
  GIT LEAKS
</h2>

Bien que nous utilisions **Gitleaks** en local, son intégration dans la pipeline **CI/CD** est cruciale pour garantir une étanchéité totale du projet.  

**Pourquoi l'avoir aussi dans la CI ?**  

- **Contournement des Hooks :** un développeur peut (volontairement ou non) bypasser les protections locales avec la commande `git commit --no-verify`. La **CI**, elle, ne peut pas être ignorée.
- **Historique complet :** alors que le scan local se concentre sur les fichiers modifiés (`--staged`), la version **CI** peut être configurée pour scanner l'intégralité de l'historique de la branche pour s'assurer qu'aucun secret n'a été "glissé" dans un commit passé.
- **Auditabilité :** elle génère un rapport officiel dans l'onglet **Security** de **GitHub**, permettant de garder une trace des tentatives d'introduction de données sensibles.

Si **Gitleaks** trouve une faille, le job **Security** échoue immédiatement, bloquant ainsi toute tentative de fusion ou de déploiement.  

<h2 id="linters">
  💎 Linters
</h2>

**TOUS** les linters suivants sont de nouveau éxécutés dans le **Job** `quality` :  

- **ESLINT**  
- **Prettier**  
- **HTMLHint**  
- **Stylelint**  
- **NgxTranslateLint**  

<h2 id="rimraf">
  🧹 RIMRAF
</h2>

L'utilisation de **rimraf** permet de supprimer des dossiers de manière fiable que l'on soit sous **Windows**, **macOS** ou **Linux**. C'est essentiel pour éviter que d'anciens rapports de couverture ne viennent fausser les nouvelles analyses.

```shell
pnpm add -D rimraf
```

Dans `package.json` ajouter les scripts `clean` et `test:coverage`

```JSON
"scripts": {
  "clean": "rimraf coverage .angular",
  "test:coverage": "ng test --coverage --watch=false",
}
```

<h2 id="clean-up-workflow">
  <img
    alt="GitHub Actions"
    title="GitHub Actions"
    width="34px"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg"
  />
  CLEAN UP WORKFLOW
</h2>

### MAINTENANCE : NETTOYAGE DES WORKFLOWS

Ce workflow utilitaire `cleanup.yml` est conçu pour maintenir la propreté de l'onglet **GitHub Actions** en supprimant automatiquement les anciennes éxécutions inutiles.  

#### 🕒 Déclenchement

**Automatique :** tous les jours à 05h00 UTC.  
**Manuel :** peut être lancé à la demande via l'onglet **Actions**.  

#### ⚙️ Fonctionnement

Le script utilise la **GitHub CLI** (gh) pour effectuer deux types de nettoyage :  

1. **Suppression des échecs et annulations :**

- Il scanne tous les workflows du projet.
- Il identifie les 100 dernières exécutions basées sur leur statut `failure` (échec) ou `cancelled` (annulé).

**Objectif :** ne garder que l'historique des builds réussis pour une meilleure lisibilité.  

2. **Suppression des déploiements GitHub Pages :**

- Il cible spécifiquement les pipelines générés automatiquement par **GitHub** sous le nom "`pages build and deployment`".
- Il filtre les 100 dernières exécutions basées sur leur titre d'affichage (`displayTitle`).
- Il supprime ces entrées pour éviter l'accumulation de logs de déploiement qui se déclenchent à chaque mise à jour de la branche de publication.

**Objectif :** nettoyer les traces de déploiement automatique de la **Compodoc** sur **GitHub Pages**.  

3. **Auto-nettoyage (Self-Cleanup) :**

- Il cible spécifiquement l'historique du fichier `cleanup.yml`.
- Il supprime les anciennes exécutions réussies (completed) de ce workflow de nettoyage.

💡 **Note :** Il exclut l'exécution en cours (`$GITHUB_RUN_ID`).  

**Objectif :** éviter que l'historique ne soit pollué par des centaines de logs inutiles.  

⚠️ **Important !!!**  
Si vous renommez le fichier `cleanup.yml`, mettre impérativement à jour la variable `WORKFLOW_FILE="cleanup.yml"` du script, sinon l'auto-nettoyage ne fonctionnera plus !  
