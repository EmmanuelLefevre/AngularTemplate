<h1 align="center">💡 FAQ & ERREURS 💡</h1>

<br>
<br>

<h2 id="erreurs-frequentes">
  ⚠️ ERREURS FREQUENTES
</h2>

### 🛑 Ma **PR/MR** est bloquée alors que mon commit est passé ?

<details>

  <summary>🧐 Consulter la méthode de résolution du problème</summary>

&nbsp;

C'est normal si vous aviez laissé des warnings. Votre commit est passé localement car il respectait la limite des 50 mais la **CI** exige la perfection.

Pour corriger :

- Regardez les logs de l'action **GitHub** pour voir les fichiers incriminés.
- Lancez la vérification stricte en local pour les reproduire :

```Bash
pnpm lint:ci
pnpm lint:html:ci
pnpm lint:scss:ci
```

Corrigez les warnings restants, commitez et pushez.

</details>

<br>

### 🛑 Que faire si Gitleaks lève une alerte ?

<details>

  <summary>🧐 Consulter la méthode de résolution du problème</summary>

&nbsp;

Pas de panique ! Cela arrive aux meilleurs. Si un commit est bloqué en local ou si la **CI** échoue avec un message de **Gitleaks**, suivre ces étapes dans l'ordre :

1. **Identifier la nature de l'alerte**

Consulter le log de **Gitleaks**. Il indiquera le fichier, la ligne et le type de secret détecté (ex: Generic API Key).

2. **Cas A : C'est un "Vrai" Secret (Clé réelle, MDP...)**

Si un secret valide traîne réellement :

- **Révoquer le secret immédiatement :** changer le mot de passe ou désactiver la clé API sur la plateforme concernée (**AWS**, **Stripe**...). Une clé poussée sur **Git** doit être considérée comme compromise !!!
- **Nettoyer le code :** remplacer le secret par une variable d'environnement ou une référence à un coffre-fort (**Secret Manager**).
- **Supprimer le secret de l'historique :** si le commit est uniquement local : faire un `git commit --amend` ou un `git rebase`.

Si le commit est déjà sur le serveur : il faudra utiliser un outil comme **BFG Repo-Cleaner** ou **git filter-repo**.

> [🔗 Procédure Git Filter Repo](https://github.com/EmmanuelLefevre/Documentations/blob/main/Tutorials/github_tricks.md)

3. **Cas B : C'est un "Faux Positif"**

Si **Gitleaks** s'est trompé (ex: il a pris un ID de test pour une clé API) :

- **Utiliser l'empreinte (Fingerprint) :** une empreinte unique pour cette détection est donnée par **Gitleaks**.
- **Ajouter l'empreinte à l'allowlist :** copier cette empreinte dans le fichier `.gitleaks.toml` sous la section `[allowlist]`.

**Gitleaks** ignorera cette valeur précise à l'avenir.

💡 **Rappel : La règle d'or**

Ne jamais utiliser `--no-verify` pour forcer un commit bloqué par **Gitleaks**. Si l'outil aboie, c'est qu'il y a une raison !!!  
Prendre 2 minutes pour vérifier, cela peut éviter des heures de gestion de crise plus tard...

</details>

<br>

### 🛑 Le job "check-integrity" de la pipeline plante !

<details>

  <summary>🧐 Consulter la méthode de résolution du problème</summary>

&nbsp;

> **Message :** "ERR_PNPM_OUTDATED_LOCKFILE"

Le fichier `pnpm-lock.yaml` n'est pas synchronisé avec le `package.json`. Cela arrive typiquement quand :

- Vous avez modifié une version manuellement dans `package.json`.
- Vous avez résolu un conflit de fusion (merge conflict) dans `package.json` sans mettre à jour le lockfile.
- Vous avez oublié de commit le lockfile après une installation.

La **CI** est configurée en mode **STRICT** (`frozen-lockfile`) : elle refuse d'installer des dépendances si le "contrat" (lockfile) n'est pas clair, afin d'éviter d'installer des versions non testées en production.

Pour corriger :

```Bash
pnpm install
```

Push again 😜

</details>

<br>

### 🛑 Le step "🛡️ PNPM Audit" du job "security" de la pipeline plante !

<details>

  <summary>🧐 Consulter la méthode de résolution du problème</summary>

&nbsp;

> **Message :** "Critical vulnerability found in qs"

```shell
Critical vulnerability found in qs
  Package: qs
  Vulnerability: Uncontrolled Resource Consumption
  Severity: critical
  Installed version: 6.5.2
  Path: your-project > some-dependency > qs
  Fixed in: >=6.14.1
```

Ajouter sa version patchée dans `package.json` =>

```JSON
"pnpm": {
  "overrides": {
    "qs": ">=6.14.1"
  }
}
```

Supprimer le `node_modules`, le `pnpm-lock.yaml` et clean le cache de **PNPM** =>

```bash
pnpm store prune
```

Puis relancer une install :

```Bash
pnpm install --no-frozen-lockfile
```

Push 🤜🤜🤜

</details>

<br>

### 🛑 Warning lors du premier push !

<details>

  <summary>🧐 Consulter la méthode de résolution du problème</summary>

&nbsp;

![Terminal Screen](https://github.com/EmmanuelLefevre/MarkdownImg/blob/main/template_angular_git_warning.png)

<br>

Créer le fichier `.gitattributes` à la racine du projet...  

Puis "renormaliser" la config **Git** en lançant ces commandes dans le projet :

```shell
git add --renormalize .
git commit -m "chore: enforce LF line endings" --no-verify
```

Publier la branche et écraser le contenu sur **Github** avec la version locale :

```shell
git push --force origin main
```

</details>

<br>

### 🛑 Option 'baseUrl' is deprecated

<details>

  <summary>🧐 Consulter la méthode de résolution du problème</summary>

&nbsp;

L'auteur "Andrew Branch" est membre de l'équipe **TypeScript** chez **Microsoft**, ce qui garantit la fiabilité et la pertinence de l'outil.

> [🔗 andrewbranch/ts5to6 – Outil de migration TypeScript 5 vers 6](https://github.com/andrewbranch/ts5to6)

- **BaseUrl**

Pour le fichier de configuration de base du projet

```shell
npx @andrewbranch/ts5to6 --fixBaseUrl ./tsconfig.json
```

Pour le fichier de configuration de l'application (où se trouvent les paths)

```shell
npx @andrewbranch/ts5to6 --fixBaseUrl ./tsconfig.app.json
```

- **RootDir**

Pour le fichier de configuration de base du projet

```shell
npx @andrewbranch/ts5to6 --fixRootDir ./tsconfig.json
```

Pour le fichier de configuration de l'application

```shell
npx @andrewbranch/ts5to6 --fixRootDir ./tsconfig.app.json
```

</details>

### 🛑 SonarQube Cloud : faux positif sur le mot de passe de mock !

<details>

  <summary>🧐 Consulter la méthode de résolution du problème</summary>

&nbsp;

> **Message :** "Review this potentially hard-coded password."

La meilleure pratique DevOps est d'utiliser l'outil pour gérer les exceptions sans modifier un code qui est légitime.  

1. Se connecter au dashboard **SonarQube Cloud**.
2. Aller dans l'onglet **Issues** du projet.
3. Retrouver l'alerte concernant le fichier `environment.ts`.
4. Cliquer sur le statut de l'anomalie (*Open*).
5. Changer le statut en **"Resolve as False Positive"**.

</details>
