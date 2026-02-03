<h1 align="center">♿ ACCESSIBILITÉ ♿</h1>

<br>
<br>

## SOMMAIRE

- [INTRODUCTION](#introduction)
- [A11Y](#a11y)
- [NORME WCAG](#wcag)
- [QUELQUES CHIFFRES](#quelques-chiffres)
- [JURIDIQUE](#juridique)
- [OUTILS & RESSOURCES](#outils-ressources)
- [BONNES PRATIQUES / EXEMPLES DE CODE](#bonnes-pratiques-exemples-code)

## INTRODUCTION

**Qu'est-ce que l'Accessibilité Numérique ?**  

L'accessibilité numérique consiste à concevoir et développer des produits digitaux (sites web, applications mobiles, documents) de manière à ce que tous les utilisateurs, quelles que soient leurs capacités physiques ou mentales, puissent y accéder, les comprendre et interagir avec eux.

L'objectif fondamental n'est pas de créer une version "spéciale" pour les personnes handicapées, mais de supprimer les barrières technologiques qui excluent une partie de la population. Comme une rampe d'accès est indispensable pour un fauteuil roulant mais pratique pour une poussette ou un livreur, l'accessibilité numérique profite à tous.

L'objectif est de supprimer les barrières qui pourraient empêcher quelqu'un d'accéder à l'information ou d'utiliser un service. Cela inclut les handicaps (non exhaustif) :

- **Visuels** (cécité, basse vision, daltonisme, etc).
- **Moteurs** (incapacité à utiliser une souris, tremblements, etc).
- **Auditifs** (surdité, malentendance, etc).
- **Cognitifs** (troubles de l'attention, dyslexie, difficultés d'apprentissage, etc).
- **Vieillesse et limitations fonctionnelles :** le vieillissement n'est pas une maladie ou un handicap en soi, mais il s'accompagne souvent de limitations fonctionnelles qui rejoignent directement les problématiques d'accessibilité. La baisse de l'acuité visuelle et audtive, de la dextérité motrice ou de la vitesse de traitement cognitif sont des obstacles courants. Rendre un site accessible, c'est donc aussi le rendre utilisable par une population senior grandissante.

De plus il est important de noter qu'une bonne accessibilité profite souvent à tous les utilisateurs, pas seulement à ceux en situation de handicap :

- Les sous-titres (conçus pour les sourds) aident aussi quelqu'un à regarder une vidéo dans un environnement bruyant si celui-ci n'a pas de casque/écouteurs.
- Un bon contraste de couleurs (conçu pour les malvoyants) aide tout le monde à lire un écran en plein soleil.
- Une navigation au clavier simple (conçue pour ceux qui ne peuvent utiliser une souris) peut être pratique à bien des égards (oubli de souris ou celle-ci cassée/en panne).

**Le spectre du handicap**  

Il est crucial de comprendre que le handicap n'est pas toujours un état permanent. L'approche moderne de l'accessibilité (notamment le "Design Inclusif") distingue trois contextes :

- **Permanent :** une personne aveugle ou amputée d'un bras.
- **Temporaire :** une personne ayant une cataracte en attente d'opération, un bras dans le plâtre ou en convalescence.
- **Situationnel :** une personne tenant un bébé dans un bras ou u parent avec une poussette (limitation motrice).

En rendant votre site accessible pour le cas "permanent", vous résolvez automatiquement les problèmes des cas "temporaires" et "situationnels".

<h2 id="a11y">
  <img
    alt="A11Y"
    title="A11Y"
    width="34px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/a11y.png"
  />
  A11Y
</h2>

> [🔗 A11y Documentation](https://www.a11yproject.com/)  

Au-delà de l'abréviation, **A11y** est la pratique de concevoir et développer des sites web et des applications numériques pour qu'ils soient utilisables par tout le monde, y compris et surtout les personnes en situation de handicap.  

**Que signifie A11y ?**

C'est un numéronyme (une abréviation basée sur des chiffres) pour le mot anglais Accessibility.

- **A :** la première lettre
- **11 :** le nombre de lettres entre la première et la dernière (c-c-e-s-s-i-b-i-l-i-t)
- **Y :** la dernière lettre

On le prononce souvent "Al-li" (comme le prénom Allie en anglais) ou simplement "Accessibilité".  

![A11y](https://github.com/EmmanuelLefevre/MarkdownImg/blob/main/a11y.png)  

**Pourquoi utiliser ce terme ?**

Au-delà du raccourci d'écriture, le terme **A11y** est devenu le symbole de la communauté des développeurs et designers engagés pour un web inclusif. Voir ce terme dans un projet indique généralement que l'équipe technique a pris en compte les normes d'accessibilité dès la conception.

<h2 id="wcag">
  <img
    alt="WCAG"
    title="WCAG"
    width="84px"
    src="https://raw.githubusercontent.com/EmmanuelLefevre/GitHubProfileIcons/main/wcag.jpg"
  />
  NORME WCAG
</h2>

Si le numéronyme **A11y** est une convention, les règles techniques à respecter sont quand à elles des normes internationales strictes. On ne fait pas de l'accessibilité "au feeling".

Tout repose sur le **WCAG** (**Web Content Accessibility Guidelines**), édicté par le **W3C** (l'organisme qui standardise le **Web** comme le **HTML** ou le **CSS**).

> [🔗 WCAG Documentation](https://www.accessiway.com/economies-sanctions-accessibilite?adgroupid=189936695924&utm_campaign=TA_SRC_2_Des+Mob_FR_Generic_Exact&utm_source=google&utm_medium=cpc&utm_content=783031921168&utm_term=p_wcag&hsa_acc=9218225427&hsa_cam=23095677526&hsa_grp=189936695924&hsa_ad=783031921168&hsa_src=g&hsa_tgt=kwd-387224701&hsa_kw=wcag&hsa_mt=p&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=23095677526&gbraid=0AAAAApYqMe7DLm4ytvmfzg6EIeP0cZ-0O&gclid=Cj0KCQiA7fbLBhDJARIsAOAqhscZfe_t_2GQs19eI41fuSBJ5AaMb53iXL-pqTJkhjfAUF-C01cpox0aAuqwEALw_wcB)  

Le **WCAG** est la norme technique mondiale. Elle est structurée en 4 grands principes :

- **Perceptible :** l'information doit être visible ou audible (contraste des couleurs, texte alternatif).
- **Utilisable (Operable) :** l'interface doit être navigable (navigation au clavier, pas de piège au focus).
- **Compréhensible :** le langage et le fonctionnement doivent être clairs (langue de la page définie, messages d'erreur explicites).
- **Robuste :** le code doit être interprétable par les outils d'assistance (**HTML** sémantique, compatibilité lecteurs d'écran).

Cette norme définit 3 niveaux de conformité :

- **Niveau A (Essentiel) :** si ce n'est pas respecté, le site est inutilisable pour certaines personnes.
- **Niveau AA (Standard) :** c'est le niveau visé par la loi (**RGAA**, lois européennes). Il rend le site accessible à la majorité.
- **Niveau AAA (Optimal) :** niveau très élevé, réservé à des contextes spécifiques.

La norme technique (**WCAG**) est ensuite transformée en obligation légale par les états. C'est là que cela devient contraignant...

- **En Europe :** la norme harmonisée est la **EN 301 549**. C'est une transposition directe du **WCAG**.
- **En France :** nous avons le **RGAA** (Référentiel Général d'Amélioration de l'Accessibilité). C'est la méthode technique officielle de l'État français pour vérifier qu'on respecte la norme **WCAG**.

### QUELQUES CHIFFRES

1. **Sites web non accessibles en 2024**

**Source :**  
> [🔗 The WebAIM Million](https://webaim.org/projects/million/)

- **96%** des sites web présentent des défaillances d'accessibilité.
- texte à faible contraste => présent sur **79%** des pages d'accueil.
- texte alternatif (attribut alt) manquant sur les images : **58%** des pages.
- liens vides : **49%** des pages (un lien sans texte descriptif est déroutant pour la navigation au clavier ou via un lecteur d'écran).
- étiquettes de formulaire (label) manquantes : **45%** des pages (sans étiquette, une personne utilisant un lecteur d'écran ne sait pas quel champ elle doit remplir).

Il est important de noter que ce test est automatisé et ne détecte qu'environ **30%** des problèmes potentiels. En effet il ne concerne que le "**TOP 1M home page**" et ne scan donc **QUE** la page d'accueil de ce **TOP** sites.

**La situation réelle est donc probablement bien pire !!!**

2. **Personnes en situation de handicap**

- A l'échelle mondiale : **1,3 milliard** de personnes de personnes, soit environ **16%** de la population mondiale (1 personne sur 6), vivent avec un handicap significatif.  

**Source :**  

> [🔗 OMS : rapport mondial sur la santé et le handicap 2023](https://www.who.int/fr/news-room/fact-sheets/detail/disability-and-health)

- A l'échelle européenne : environ **135M** de personnes dans l'Union Européenne, soit près d'un citoyen sur quatre (**27%**), déclarent une forme de handicap ou de limitation durable.  

  **Source :**  

> [🔗 Eurostat : statistiques sur le handicap 2023/2024](https://drees.solidarites-sante.gouv.fr/sites/default/files/2025-01/Fiche%208.7%20-%20Le%20handicap%20en%20Europe.pdf)

- A l'échelle de la France : **12M** de personnes sont touchées par un handicap (1 personne sur 5).  
  **80%** des handicaps sont invisibles (troubles cognitifs, maladies chroniques invalidantes...).  

**Source :**  

> [🔗 Chiffres consolidés par l'INSEE et la DREES 2022-2024](https://handicap.gouv.fr/publication-drees-le-handicap-en-chiffres-edition-2024#:~:text=Les%20chiffres%20cl%C3%A9s%20du%20handicap,des%20probl%C3%A8mes%20de%20m%C3%A9moire%2C%20etc.)

3. **Conformité dans le secteur public français**

Malgré l'obligation légale (depuis la loi de 2005) pour les services publics d'être accessibles, la conformité reste très faible.

> [🔗 Loi pour l'égalité des droits et des chances](https://www.info.gouv.fr/accessibilite/loi-accessibilite-cadre-legal-et-obligations#:~:text=La%20loi%20pour%20l%27%C3%A9galit%C3%A9,personnes%20en%20situation%20de%20handicap.)

Dans son baromètre de 2025, l'Observatoire révélait que le taux de conformité moyen au RGAA (Référentiel Général d'Amélioration de l'Accessibilité) pour les 250 démarches les plus utilisées par les Français stagnait en dessous de **60%** (loin des **100%** requis par la loi).  

**Source :**  

> [🔗 Observatoire de la qualité des démarches en ligne 2025](https://observatoire.numerique.gouv.fr/observatoire)

L'accessibilité numérique n'est pas seulement une bonne pratique technique, c'est avant tout une obligation éthique et légale visant à construire un web inclusif.

Concrètement, cela signifie permettre :

- à un utilisateur malvoyant de comprendre la structure et le contenu via un lecteur d'écran. Celui-ci vocalise la page en se basant sur un balisage correct : il annonce les titres (`h1`, `h2`), décrit le rôle des éléments (`bouton`, `lien`) et lit le contenu textuel des images grâce à leur attribut `alt`.
- à un utilisateur de lecteur d'écran de bénéficier d'une prononciation correcte. En déclarant la langue principale de la page avec `<html lang="fr">`, la synthèse vocale utilise le bon accent pour tout le site.
  Pour les termes anglophones, les encadrer avec un `<span>` afin de permettre au lecteur de basculer sur une prononciation anglaise juste pour ce mot, évitant ainsi une lecture confuse.
  (ex : `<span lang="en">framework</span>`).
- à une personne ayant un handicap moteur (et ne pouvant utiliser de souris) de contrôler l'interface entièrement au clavier. Cela se fait principalement avec la touche `Tab` pour se déplacer entre les éléments interactifs (`liens`, `boutons`, `champs`), et les touches `Entrée` ou `Espace` pour les activer. Un balisage sémantique est essentiel car les éléments natifs comme la balise `<button>` ou `<a>` sont "focusables" par défaut.
- ou encore à un utilisateur sourd ou malentendant d'accéder au contenu d'une vidéo grâce à des `captions` (sous-titres enrichis), qui décrivent non seulement les dialogues mais aussi les sons importants (ex: `[musique entraînante]`, `[porte qui claque]`), ainsi qu'une transcription textuelle complète disponible à côté de la vidéo.

Garantir l'accessibilité, c'est s'assurer que personne n'est laissé pour compte dans l'accès à l'information et aux services.

### JURIDIQUE

Le cadre légal s'appuie notamment sur la transposition en droit français des directives européennes qui visent à harmoniser les exigences en la matière. Ce cadre légal s'est considérablement durci avec le **European Accessibility Act** (**EAA**).  

**Cette directive est entrée en vigueur le 28 juin 2025 ...!!!**

> [🔗 Directive Européenne sur l'Accessibilité](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/la-nouvelle-directive-europeenne-accessibilite-pour-des-produits-et-des-services-accessibles-aux-personnes-en-situation)

**Qui est concerné ?**  

La loi s'applique à une vaste gamme de produits et services numériques :

- Sites de commerce électronique (e-commerce).  
- Services bancaires et financiers.  
- Services de transport (aérien, ferroviaire, autocar).  
- Livres numériques (e-books) et logiciels spécialisés.  
- Équipements terminaux (bornes de paiement, distributeurs de billets).  

**Sanctions**  

En France, le non-respect des obligations d'accessibilité numérique, définies par le **RGAA**, expose les organismes concernés à des sanctions financières.  
Le défaut de conformité ou l'absence de publication d'une déclaration d'accessibilité peut entraîner une sanction administrative dont le montant peut s'élever jusqu'à **25K€/PAR infraction** constatée.

> [🔗 Décret n° 2019-768 du 24 juillet 2019](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000038811937)

**Exemptions et Nuances**  

Il existe des dérogations, mais elles sont encadrées strictement. Ne sont pas soumises aux mêmes obligations les **micro-entreprises** (définies comme employant **moins de 10 personnes** et dont le **CA**** annuel ou le bilan total n'excède pas **2 millions d'euros**).  

Cependant, l'application diffère selon votre rôle :  

- **Prestataires de services** (petite agence web, freelance, site vitrine artisanal...)  

Ils sont **exemptés** des obligations d'accessibilité de la directive.  

💡💡💡 Même exemptés légalement, l'accessibilité reste un atout commercial et éthique majeur.  

- **Fabricants, importateurs et distributeurs de produits**  

Ils peuvent déroger aux obligations sans avoir à fournir de justificatifs administratifs lourds mais sont encouragés à respecter les normes.  

**Autres critères d'exemption (Charge disproportionnée)**  

Pour les entreprises dépassant les seuils ci-dessus, deux cas spécifiques permettent une dérogation (qui doit être justifiée et documentée) :  

- **Modification fondamentale :** si la mise en conformité modifie la nature même du produit ou service (ex: supprimer l'image d'un outil de radiologie rendrait l'outil inutile).  

- **Charge disproportionnée :** si l'application des normes impose un coût excessif qui mettrait en péril la viabilité économique de l'opérateur (le calcul est précis et défini par la réglementation).  

<h2 id="outils-ressources">🛠️ OUTILS & RESSOURCES</h2>

L'accessibilité ne se devine pas, elle se mesure. Voici les outils de référence pour auditer vos projets, au-delà du simple score **Lighthouse**.  

### 🔍 Audit & Scan Global

> [🔗 Google Lighthouse](https://developers.google.com/web/tools/lighthouse)

Accessible directement via la touche `F12` (onglet **Lighthouse**), c'est le point de départ incontournable. Il génère un rapport global (**Performance**, **SEO**, **Accessibilité**) et attribue un score sur 100.  
*Attention : Un score de 100% ne garantit pas une accessibilité parfaite, car il ne détecte que les erreurs automatisables (~30% des problèmes réels).*  

> [🔗 WAVE (Web Accessibility Evaluation Tool)](https://wave.webaim.org/)

C'est la référence visuelle. Il injecte des icônes directement sur votre page pour montrer les erreurs (titres manquants, contrastes faibles, images sans alt).  
*Disponible en extension Chrome/Firefox.*  

> [🔗 Axe DevTools](https://www.deque.com/axe/devtools/)

Le moteur qui fait tourner **Lighthouse** mais en version dédiée et plus puissante. Il permet de scanner des portions de page et offre des explications très détaillées pour corriger les bugs.  
*Disponible en extension navigateur.*  

> [🔗 Yellow Lab Tools](https://yellowlab.tools/)

Un outil en ligne excellent qui audite la performance **ET** la qualité du code (**DOM Complexity**, mauvaises pratiques **CSS**/**JS**) avec une section dédiée à l'accessibilité.  

> [🔗 HeadingsMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi)

Une extension indispensable qui génère le "plan" de votre site basé sur vos balises `<h1>` à `<h6>`. Si le plan est incohérent, votre accessibilité est compromise.  

### 🎨 Couleurs & Contrastes

> [🔗 WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

L'outil "juge de paix". Vous entrez vos deux codes hexadécimaux et il vous dit instantanément si vous passez les niveaux **AA** ou **AAA**.  

> [🔗 Adobe Color (Roue d'accessibilité)](https://color.adobe.com/fr/create/color-contrast-analyzer)

Idéal pour les designers. Il permet de tester des palettes entières et suggère des couleurs proches pour corriger les contrastes insuffisants.  

> [🔗 Coolors Contrast Checker](https://coolors.co/contrast-checker)

Très visuel, il permet de voir le rendu du texte sur le fond en temps réel et donne un score de lisibilité (**Poor**, **Good**, **Very Good**).  

> [🔗 Vision Simulator (Chrome Extension)](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl)

Permet de simuler différents troubles de la vision (daltonisme, cataracte, vision floue) directement sur votre site pour vérifier que l'interface reste utilisable.  

### 🗣️ Lecteurs d'écrans (screen readers)**

C'est l'outil final qui valide ou invalide tout votre travail. Un lecteur d'écran est un logiciel d'assistance qui transmet l'information affichée à l'écran (texte, images, liens, menus) à un utilisateur aveugle ou malvoyant, soit par **synthèse vocale** (**Text-to-Speech**) soit via une **plage braille**.  

**Comment ça marche ?**  

Contrairement à une idée reçue, un utilisateur de lecteur d'écran n'écoute pas la page du début à la fin de manière linéaire (ce serait interminable). Il **navigue** dans la page en sautant d'élément en élément.  

D'où l'importance cruciale de votre code HTML :  

- Il utilise des raccourcis pour sauter de **Titre** en **Titre** (`H1`, `H2`...).  
- Il peut lister tous les **Liens** de la page pour trouver "Contact".  
- Il navigue par **Landmarks** (Régions) pour aller directement au `<footer>` ou au `<main>`.  

Si votre sémantique est mauvaise (pas de balises `<h1>` ou des boutons `<div>`) la page devient un labyrinthe sans issue.  

**Les solutions du marché**  

Il existe quelques acteurs majeurs qu'il est bon de connaître :  

1. **NVDA (NonVisual Desktop Access)** - *Windows / Gratuit & Open Source*  

C'est la référence mondiale et le meilleur outil pour tester vos développements sur **PC**. Il est léger, puissant et respecte strictement les normes.  

> [📥 Télécharger NVDA](https://www.nvaccess.org/download/)

2. **JAWS (Job Access With Speech)** - *Windows / Payant*  

Historiquement le plus utilisé en entreprise. Très cher mais très performant pour les applications bureautiques complexes (**Office**...).

3. **VoiceOver** - *Apple (Mac, iPhone, iPad) / Natif*  

Déjà installé sur tous les appareils **Apple**. C'est la référence absolue sur mobile. Si vous avez un **iPhone** vous pouvez l'essayer dès maintenant (Réglages > Accessibilité).  

4. **TalkBack** - *Android / Natif*  

L'équivalent de **VoiceOver** pour l'écosystème **Google/Android**.  

<h2 id="bonnes-pratiques-exemples-code">✨ BONNES PRATIQUES / EXEMPLES DE CODE</h2>

L'accessibilité ne se limite pas à des contrastes de couleurs. Elle repose sur une structure **HTML** sémantique, une gestion rigoureuse des interactions **JavaScript** et le respect des normes **ARIA**.  

1. **La Sémantique** (Structure de la page)

Les lecteurs d'écran utilisent les balises **HTML** pour naviguer ("Aller au menu", "Aller au contenu principal"). Remplacer des <div> par des balises sémantiques est la fondation.  

❌ **Mauvaise pratique :**

```HTML
<div class="header">...</div>
<div class="main-content">
  <div class="article-title">Mon Titre</div>
</div>
```

✅ **Bonne pratique :**

```HTML
<header>...</header>
<main> <article>
  <h1>Mon Titre</h1> </article>
</main>
```

2. **Images & Texte Alternatif** (Alt)

Le texte alternatif remplace l'image si elle ne s'affiche pas ou pour un utilisateur aveugle. C'est le contexte qui dicte le contenu.  

❌ **Mauvaise pratique :**

```HTML
<img src="k8s_v2_final.jpg">
<img src="logo.png" alt="image">
```

✅ **Bonne pratique :**

```HTML
<img src="search.png" alt="Lancer la recherche">
<img src="stats-2024.png" alt="Graphique des ventes 2024, hausse de 20% au T3">
```

3. **Contraste des Couleurs**

Le texte doit être lisible pour les malvoyants ou en cas de forte luminosité (soleil sur écran). Le ratio minimum standard (**AA**) est de 4.5:1 pour un texte normal.  

💡 Astuce : utiliser les **DevTools** du navigateur pour vérifier le ratio !  

❌ **Mauvaise pratique :**

```CSS
.text-muted {
  color: #b3b3b3; /* Gris clair sur blanc : Ratio 2.1:1 (Illisible) */
  background-color: #ffffff;
}
```

✅ **Bonne pratique :**

```CSS
.text-muted {
  color: #595959; /* Gris foncé sur blanc : Ratio 4.6:1 (Conforme AA) */
  background-color: #ffffff;
}
```

4. **Navigation Clavier** (Indicateur visuel)  

Un utilisateur naviguant au clavier (touche `Tab`) doit toujours savoir où il se trouve. Ne supprimez jamais l'outline **CSS** sans fournir une alternative visuelle forte.  

❌ **Mauvaise pratique :**

```CSS
*:focus {
  outline: none; /* L'utilisateur clavier devient "invisible" */
}
```

✅ **Bonne pratique :**

```CSS
/* :focus-visible cible uniquement la navigation clavier (pas le clic souris) */
button:focus-visible {
  outline: 3px solid #2d3e50;
  outline-offset: 2px;
}
```

5. **Gestion du Focus** (Focus Management)

Lorsqu'une interaction change le contexte (ouverture d'une modale) le focus clavier doit suivre sinon l'utilisateur reste "perdu" derrière.  

❌ **Mauvaise pratique :** j'ouvre une modale mais le focus reste sur le bouton qui l'a ouverte en arrière-plan.  

✅ **Bonne pratique :**

```javascript
function openModal() {
  const modal = document.getElementById('myModal');
  modal.classList.add('open');

  // 1. Déplacer le focus DANS la modale (sur le 1er élément interactif ou le conteneur)
  const closeBtn = modal.querySelector('.close-button');
  closeBtn.focus();

  // 2. Piéger le focus (Focus Trap) pour qu'il ne sorte pas de la modale (via JS)
}
```

6. **Liens, Boutons et Rôles ARIA**

Il ne faut pas utiliser des `<div>` ou `<span>` pour créer des boutons. Si vous n'avez pas le choix vous devez recréer le comportement natif manquant.  

❌ **Mauvaise pratique :**

```HTML
<div class="btn" onclick="submit()">Valider</div>
```

✅ **Bonne pratique :** (Native - Recommandé)

```HTML
<button type="button" onclick="submit()">Valider</button>
```

✅ **Bonne pratique :** (Si `<div>` obligatoire - **ARIA**)

```HTML
<div
  role="button"
  tabindex="0"
  onclick="submit()"
  onkeydown="if(event.key === 'Enter' || event.key === ' ') submit()">
  Valider
</div>
```

7. **Formulaires & Labels**

Un champ de saisie doit toujours être lié à une étiquette. Le placeholder ne suffit pas...  

❌ **Mauvaise pratique :**

```HTML
<input type="email" placeholder="Votre email">
```

✅ **Bonne pratique :**

```HTML
<label for="user-email">Votre adresse email</label>
<input type="email" id="user-email" name="email" autocomplete="email">
```

8. **Alertes & Notifications** (ARIA Live Regions)

Lorsqu'un message apparaît dynamiquement (erreur, succès) sans rechargement de page, le lecteur d'écran ne le voit pas s'il n'est pas averti.  

❌ **Mauvaise pratique :**

```javascript
// Injecter du texte dans une div standard
errorDiv.innerHTML = "Identifiants incorrects";
// Le lecteur d'écran reste silencieux
```

✅ **Bonne pratique :**

```HTML
<div role="alert" id="error-message">
  Identifiants incorrects
</div>

<div aria-live="polite">Mise à jour effectuée</div>
```

9. **Vidéo et Audio**

Le contenu multimédia doit avoir une alternative textuelle synchronisée (sous-titres) ou une transcription.  

❌ **Mauvaise pratique :** une vidéo en autoplay sans contrôles ou sans piste de sous-titres.  

✅ **Bonne pratique :**

```HTML
<video controls width="250">
  <source src="video.mp4" type="video/mp4">

  <track kind="captions" src="sous-titres-fr.vtt" srclang="fr" label="Français">

  Votre navigateur ne supporte pas la vidéo. Voici <a href="transcription.txt">la transcription textuelle</a>.
</video>
```

10. **Langue & Prononciation**

Définit l'accent utilisé par la synthèse vocale.  

✅ **Bonne pratique :**

```HTML
<html lang="fr">
<p>
  J'utilise le framework <span lang="en">React</span> pour mes projets.
</p>
```

11. **Composants dynamiques** (ARIA States)

Indiquer l'état d'un composant (Ouvert/Fermé, Sélectionné/Non sélectionné) aux technologies d'assistance.  

✅ **Bonne pratique :**

```HTML
<button
  aria-expanded="false" aria-controls="content-1"
  id="accordion-btn-1"
  onclick="toggleAccordion(this)"
>
  Voir plus d'infos
</button>

<div id="content-1" role="region" aria-labelledby="accordion-btn-1" hidden>
  Contenu caché...
</div>
```

**Conseil pour les développeurs**  

💡💡💡 Ne faites pas confiance aveugle aux outils automatiques (**Lighthouse**, **Wave**). Ils ne détectent que **30% des erreurs**.  

Prenez l'habitude de lancer **NVDA** (sur Windows) ou **VoiceOver** (sur Mac) une fois par sprint.  

- Fermez les yeux (ou éteignez l'écran).  
- Essayez de naviguer sur votre site uniquement au clavier.  
- Si vous arrivez à comprendre où vous êtes et à effectuer une action clé (ex: envoyer un message), c'est gagné.  
