<h1 align="center">🗣️ MULTI LANGUES 🗣️</h1>

<br>
<br>

## SOMMAIRE

- [I18N](#i18n)
- [EXTENSION VSCODE](#extension)

<h2 id="i18n">
  <img
    alt="I18N"
    title="I18N"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/i18n.svg"
  />
  I18N
</h2>

Pour offrir une expérience utilisateur de premier plan, l'internationalisation (**i18n**) est une étape incontournable. Elle permet non seulement de toucher un public mondial mais aussi de séparer proprement le contenu textuel de la logique métier.

Installer les librairies suivantes =>

```shell
pnpm add @ngx-translate/core@latest @ngx-translate/http-loader@latest
```

> [🔗 Ngx Translate Documentation](https://ngx-translate.org/)

**Internationalisation avec NGX-Translate**

L'implémentation choisie repose sur **NGX-Translate**, la bibliothèque de référence pour **Angular**. Elle permet de charger des fichiers de traduction de manière asynchrone et de basculer d'une langue à l'autre dynamiquement sans recharger l'application.

**Pourquoi cette solution ?**

- **Flexibilité :** les traductions sont stockées dans des fichiers **JSON** simples (`fr.json`, `en.json`).
- **Performance :** chargement à la demande (**Lazy Loading**) des fichiers de langue via **HTTP**.
- **Simplicité :** utilisation de **Pipes** (`| translate`) ou de **Directives** dans les templates **HTML**.

<h2 id="extension">EXTENSION VSCODE</h2>

> [🔗 I18n Ally VSCode Extension](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)

Pour un confort de développement absolu, l'extension **I18n Ally** a été implémenté dans ce projet. Elle permet de voir la traduction directement dans le code (à la place de la clé brute) et d'éditer les **JSON** sans changer de fichier.

#### Configuration :

Copier la configuration du fichier `settings.json` (dossier `.vscode` à la racine) du projet pour que l'extension détecte correctement les fichiers et la syntaxe **Angular**.

#### Fonctionnalités clés activées dans ce projet :

- **Visualisation Inline :**
Afficher la traduction française directement dans le code **HTML/TS** à la place de la clé brute (ex: affiche "`Accueil`" au lieu de `HOME.TITLE`).

- **Indicateurs d'état :**
Signaler visuellement si une traduction est manquante dans une des langues.

- **Édition Contextuelle :**
Permettre de modifier le texte (`en.json` et `fr.json`) directement depuis une info-bulle dans le code, sans ouvrir les fichiers **JSON**.

💡 Une documentation complète est disponible dans le fichier `.vscode/settings.json` et ici... =>
> [👀 I18n Ally Config Rules](./RULES-REFERENCES.md#i18n-ally-rules)
