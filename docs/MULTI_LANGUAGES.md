<h1 align="center">🗣️ MULTI LANGUES 🗣️</h1>

<br>

Pour offrir une expérience utilisateur de premier plan, l'internationalisation (**i18n**) est une étape incontournable. Elle permet non seulement de toucher un public mondial, mais aussi de séparer proprement le contenu textuel de la logique métier.

Installer les librairies suivantes =>

```shell
pnpm add @ngx-translate/core @ngx-translate/http-loader
```

**Internationalisation avec NGX-Translate**

L'implémentation choisie repose sur **NGX-Translate**, la bibliothèque de référence pour **Angular**. Elle permet de charger des fichiers de traduction de manière asynchrone et de basculer d'une langue à l'autre dynamiquement, sans recharger l'application.

**Pourquoi cette solution ?**

- **Flexibilité :** les traductions sont stockées dans des fichiers **JSON** simples (`fr.json`, `en.json`).
- **Performance :** chargement à la demande (**Lazy Loading**) des fichiers de langue via **HTTP**.
- **Simplicité :** utilisation de `pipes (| translate)` ou de directives dans les templates **HTML**.
