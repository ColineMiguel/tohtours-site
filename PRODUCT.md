# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Site statique en HTML/CSS, sans framework : un fichier `.html` par onglet, une feuille de style partagée et un peu de JavaScript léger. Publié tel quel avec GitHub Pages depuis ce dépôt public. Polices auto-hébergées dans le dépôt. La structure doit permettre d'ajouter des pages (et plus tard les versions anglaise et espagnole) sans tout refaire.

## Users

- **Voyageurs francophones** (couples, familles avec enfants, petits groupes d'amis), avec une voiture, logés à Valladolid ou venant en excursion depuis Tulum, Cancún ou Mérida. Ils cherchent une expérience privée et authentique, souvent sur téléphone, pendant le voyage ou juste avant.
- **Voyageurs qui préparent un séjour** de 1 à 3 semaines dans la péninsule du Yucatán et veulent un voyage sur mesure, accompagné en français.
- **Professionnels du voyage** (onglet Réceptif) : agences de voyage et travel planners, qui cherchent un partenaire local pour leurs voyageurs.

## Product Purpose

Toh Tours Yucatán est une agence locale et francophone basée à Valladolid. Le site présente trois offres et mène vers une conversation WhatsApp :

1. **Excursions** : deux circuits à Yalcobá (Demi-journée Essentiel, Journée complète Immersion) et des activités à la carte chez des familles du village. D'autres types d'excursions viendront plus tard.
2. **Organisation de voyage** : voyages sur mesure dans la péninsule, de A à Z.
3. **Réceptif** : services pour les professionnels du voyage.

Le succès, c'est qu'un visiteur comprenne en quelques secondes ce qui est proposé, ait confiance, et écrive sur WhatsApp.

## Positioning

Une Française installée au Yucatán depuis 2022, qui a travaillé avec une ONG auprès des familles de Yalcobá (agroforesterie, méliponiculture, tourisme rural). Les expériences reposent sur des liens de confiance construits dans la durée avec la communauté : tourisme communautaire, humain et responsable, culture yucatèque telle qu'elle est aujourd'hui.

## Operating Context

- Réservation et devis uniquement par WhatsApp (+52 985 106 0333, wa.me/529851060333) ; catalogue professionnel par e-mail (tohtoursyucatan@gmail.com) ; Instagram tohtours_yucatan.
- Pas de paiement en ligne, pas de formulaire. Un acompte confirme la réservation.
- Transport jamais inclus dans les excursions ; Yalcobá est à 30 min de Valladolid.
- Excursions privées, à partir de 2 personnes, jusqu'à 15 (10 pour les ateliers).

## Capabilities and Constraints

- Langue : français uniquement pour la v1. Anglais et espagnol plus tard.
- Onglets : Excursions, Organisation de voyage, Réceptif, Contact. Organisation et Réceptif s'affichent « Bientôt » tant que leurs textes ne sont pas validés.
- Prix publics : seulement les deux circuits (75 € / 1 500 MXN et 110 € / 2 200 MXN par personne). Activités à la carte, voyages et réceptif : « Sur devis ».
- Dépôt public : jamais de prix nets, commissions, noms de clients, noms de famille, noms d'agences partenaires, informations personnelles. Pas d'assurance, statut légal, licence ou agrément. Pas de chiffres d'expérience, nombre de voyageurs ni note Google.
- Lien vers Legado Salsa Motion seulement en commentaire HTML tant que le site de l'école n'existe pas.

## Brand Commitments

- Nom : Toh Tours Yucatán. Logo : le « toh solaire », version « L'aile » (motmot dans un soleil, raquette turquoise), kit complet dans `images/logo/cenote/` avec son guide. Texte du logo vectorisé ; versions web dans `assets/img/logo/` (couleur sur fond clair, crème et turquoise sur fond foncé).
- Palette « Cénote » (validée le 13/11/2026) : bleu cénote #1F4E4F (titres, liens, logo), turquoise #3FB5AC en accent (boutons, détails ; jamais en texte sur fond clair, texte #163A3B sur un bouton turquoise), crème #F2EDE3 (fond clair), foncé #163A3B (pied de page, sections sombres). Elle remplace l'ancienne charte olive, orange et crème.
- Typographie : Montserrat pour les textes, Satisfy pour quelques accents, une serif expressive libre de droits pour les titres.
- Ton : authentique et chaleureux, sans folklore. Le visiteur est vouvoyé ; Coline parle à la première personne.
- Crédit photo : « © Toh Tours Yucatán ».
- Références d'ambiance (ne pas copier) : voyage-immersionandine.com, costarica-voyage.com, voyageursdumonde.fr. Pas de méga-menu, de blog, de logos de presse ni de certifications.

## Evidence on Hand

- Textes : `contenu/` (circuits, FAQ, avis, accueil, histoire, activités à la carte, organisation de voyage, réceptif).
- Avis : deux avis Google réels dans `contenu/avis.md`. Aucun autre avis, ni note globale.
- Photos : `images/` (cénotes, cuisine, artisanat, mélipones, milpa et randonnée). Les photos des voyages hors Yalcobá seront fournies dans `images/voyages/` ; d'ici là, aucune photo inventée ni trouvée en ligne.
- Absences à ne pas combler : photo de Coline, chiffres, labels, partenaires.

## Product Principles

1. N'inventer aucun texte, avis, chiffre ni photo : tout vient de `contenu/` et `images/`.
2. Chaque section mène à WhatsApp en un geste.
3. Lisible et rapide sur téléphone, avec une connexion moyenne.
4. Montrer les familles de Yalcobá avec dignité, sans retouche ni folklore.
5. Une structure qui grandit (nouvelles excursions, pages, langues) sans refonte.

## Accessibility & Inclusion

Familles et voyageurs de tous âges, consultation surtout mobile en extérieur : contrastes WCAG AA, cibles tactiles confortables, textes alternatifs en français pour chaque photo.
