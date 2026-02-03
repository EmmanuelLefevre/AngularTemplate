<h1 align="center">♿ ACCESSIBILITÉ ♿</h1>

<br>
<br>

## SOMMAIRE

- [INTRODUCTION](#introduction)
- [A11Y](#a11y)
- [NORME WCAG](#wcag)
- [QUELQUES CHIFFRES](#quelques-chiffres)
- [JURIDIQUE](#juridique)

## INTRODUCTION

**Qu'est-ce que l'Accessibilité Numérique ?**

L'accessibilité numérique consiste à concevoir et développer des produits digitaux (sites web, applications mobiles, documents) de manière à ce que tous les utilisateurs, quelles que soient leurs capacités physiques ou mentales, puissent y accéder, les comprendre et interagir avec eux.

L'objectif fondamental n'est pas de créer une version "spéciale" pour les personnes handicapées, mais de supprimer les barrières technologiques qui excluent une partie de la population. Comme une rampe d'accès est indispensable pour un fauteuil roulant mais pratique pour une poussette ou un livreur, l'accessibilité numérique profite à tous.

L'objectif est de supprimer les barrières qui pourraient empêcher quelqu'un d'accéder à l'information ou d'utiliser un service. Cela inclut les handicaps (non exhaustif) :

- **Visuels** (cécité, basse vision, daltonisme, etc).
- **Moteurs** (incapacité à utiliser une souris, tremblements, etc).
- **Auditifs** (surdité, malentendance, etc).
- **Cognitifs** (troubles de l'attention, dyslexie, difficultés d'apprentissage, etc).
- **Vieillesse et limitations fonctionnelles :** le vieillissement n'est pas une maladie ou un handicap en soi, mais il s'accompagne souvent de limitations fonctionnelles qui rejoignent directement les problématiques d'accessibilité. La baisse de la vue, de l'ouïe, de la dextérité motrice ou de la vitesse de traitement cognitif sont des obstacles courants. Rendre un site accessible, c'est donc aussi le rendre utilisable par une population senior grandissante.

De plus il est important de noter qu'une bonne accessibilité profite souvent à tous les utilisateurs, pas seulement à ceux en situation de handicap :

- Les sous-titres (conçus pour les sourds) aident aussi quelqu'un à regarder une vidéo dans un environnement bruyant.
- Un bon contraste de couleurs (conçu pour les malvoyants) aide tout le monde à lire un écran en plein soleil.
- Une navigation au clavier simple (conçue pour ceux qui ne peuvent utiliser une souris) peut être pratique à bien des égards (oubli de souris ou celle-ci cassée/en panne).

**Le spectre du handicap**

Il est crucial de comprendre que le handicap n'est pas toujours un état permanent. L'approche moderne de l'accessibilité (notamment le "Design Inclusif") distingue trois contextes :

- **Permanent :** une personne aveugle ou amputée d'un bras.
- **Temporaire :** une personne ayant une cataracte en attente d'opération ou un bras dans le plâtre.
- **Situationnel :** une personne tenant un bébé dans un bras (limitation motrice).

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
