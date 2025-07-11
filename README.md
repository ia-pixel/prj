
 pour lancer l'app
npm run dev -- app
node server.js -- server

-----------------------------------------------------------

## 🩺 DOCTEC – À propos de l'application

### 🔍 Composant `About.jsx`

Ce composant React représente la page "À propos" d'une application de santé numérique nommée **DocTeq**. Il est conçu pour informer les utilisateurs sur la mission, l’histoire et les valeurs de l’entreprise tout en mettant en avant son professionnalisme et sa technologie.

### 📌 Fonctionnalités principales

- **Animation fluide avec Framer Motion**  
  Le composant utilise `framer-motion` pour animer l’apparition des éléments, créant une expérience utilisateur moderne et dynamique.

- **Section Héros (Hero Section)**  
  Une grande bannière visuelle présente l’ambition de DocTeq de révolutionner la santé numérique, avec un slogan fort et un texte de présentation.

- **Statistiques et garanties**  
  Une grille de 4 cartes met en avant :
  - Le nombre de patients satisfaits
  - L’équipe en constitution
  - Le chiffrement SSL utilisé
  - La disponibilité du support médical

- **Notre Histoire**  
  Cette section combine une image de l’équipe avec un récit expliquant la genèse de DocTeq, sa mission et ses engagements (comme la digitalisation du parcours patient et la protection des données de santé).

- **Nos Valeurs**  
  Trois valeurs clés sont mises en avant :
  - Innovation responsable
  - Transparence
  - Accessibilité

### 🧰 Technologies utilisées

- **React.js** – Composant fonctionnel
- **Framer Motion** – Pour les animations fluides
- **React Icons (Feather Icons)** – Pour des icônes légères et modernes
- **Tailwind CSS** – Pour une mise en page réactive et esthétique
- **Import d’image** – Illustration d’équipe depuis un fichier local (`team.jpg`)










# 🩺 Appointment Component

Ce composant React permet à un utilisateur connecté de **prendre un rendez-vous médical** avec un médecin spécialisé, en fonction d’un type de consultation (cardiologie, dermatologie, etc.).

## ✅ Fonctionnalités

- Sélection d’un **type de rendez-vous** (ex : cardiologie, pédiatrie…)
- Filtrage automatique des **médecins correspondants**
- Sélection intuitive du médecin (affichage dynamique avec image Pinterest)
- Choix de la **date, l’heure**, et **motif du rendez-vous**
- **Validation** des champs requis
- **Feedback** utilisateur : messages d’erreur ou confirmation
- Stockage local du rendez-vous dans `localStorage`
- Intégration de l’utilisateur via `redux` (`state.auth.user`)
- Affichage du **dernier scan médical** de l'utilisateur (depuis `localStorage`)

## 🧱 Stack utilisée

- **React**
- **Redux** (pour récupérer l’utilisateur)
- **Axios** (pour récupérer la liste des médecins)
- **Tailwind CSS** (pour le style)
- **localStorage** (pour stockage temporaire des rendez-vous)

## 📁 Structure des données

### Exemple de médecin (`doctor`)

```json
{
  "id": 1,
  "name": "Dr. Clara Dupont",
  "specialty": "Dermatologie",
  "experience": 10,
  "location": "Paris",
  "rating": 4.5,
  "languages": ["Français", "Anglais"],
  "pinterestId": "1234567890"
}








# Blog Component

Ce composant affiche une section blog stylisée pour un site médical, avec animations.

## Fonctionnalités

- Affichage de cartes de blog
- Animation au survol avec Framer Motion
- Icônes pour la date et la catégorie
- Extrait et temps de lecture
- Lien vers le détail de l'article

## Stack utilisée

- React
- Framer Motion
- React Router
- React Icons
- Tailwind CSS

## Structure d’un article

```json
{
  "id": 1,
  "title": "L'avenir de la télémédecine",
  "date": "18 Fevrier 2025",
  "category": "Innovation",
  "excerpt": "Découvrez comment les nouvelles technologies révolutionnent la consultation à distance...",
  "readTime": "5 min"
}







## Chatbot DocTeq

Ce projet est un chatbot interactif développé en React offrant diverses fonctionnalités pour une expérience utilisateur fluide et interactive. Il inclut la gestion des sessions, la reconnaissance vocale, et un mode sombre/clair.

Fonctionnalités principales

Reconnaissance vocale : Permet aux utilisateurs de communiquer avec le chatbot par la voix. Le système utilise l'API Web Speech pour capter et convertir la voix en texte.
Mode sombre/clair : L'utilisateur peut basculer entre un thème sombre et clair pour personnaliser son interface. Cette préférence est sauvegardée dans le localStorage.
Gestion des sessions de chat : L'application permet de créer, sauvegarder et charger des sessions de chat. Chaque session est conservée dans le localStorage et peut être rechargée pour continuer la conversation là où elle a été laissée.
Messages animés : L'interface utilise Framer Motion pour animer les messages envoyés et reçus, offrant une expérience plus interactive.
Gestion des erreurs : Si une erreur survient lors de l'interaction avec l'API backend (par exemple, une erreur de réseau ou une réponse invalide), un message d'erreur est affiché dans la conversation.
Traduction des messages : Utilisation de l'API LibreTranslate pour la traduction automatique des messages, permettant à l'utilisateur de communiquer dans différentes langues.
Réponse en temps réel : Le chatbot affiche un indicateur de frappe pendant qu'il génère une réponse, créant une expérience plus naturelle et fluide.
Enregistrement de l'historique des messages : Chaque message envoyé et reçu est enregistré et associé à une session, permettant à l'utilisateur de revoir ses anciennes conversations.
Technologies

React : Pour la création de l'interface utilisateur.
Framer Motion : Pour animer l'interface de chat.
API Web Speech : Pour la reconnaissance vocale dans les navigateurs compatibles.
LibreTranslate API : Pour la traduction automatique des messages.
TailwindCSS : Pour la gestion de la mise en page et du style.





## Contact 
Ce code est un composant `Contact` permet aux utilisateurs de sélectionner un docteur et d'envoyer un message. Il intègre plusieurs fonctionnalités comme la gestion des notifications, l'animation avec Framer Motion, la gestion de l'état du formulaire et la communication avec une API pour récupérer les docteurs et envoyer un message.

### Explication du code :

1. **State Management** :
   - `selectedDoctor`: L'ID du docteur sélectionné par l'utilisateur.
   - `message`: Le contenu du message que l'utilisateur souhaite envoyer.
   - `doctors`: La liste des docteurs récupérée depuis l'API.
   - `notification`: Gère l'affichage et le type des notifications (succès ou erreur).

2. **Notification System** :
   - `showNotification`: Affiche une notification pendant 3 secondes, qu'elle soit de type succès ou erreur.

3. **Fetching Doctors** :
   - `useEffect`: Au chargement du composant, il fait une requête à l'API pour récupérer la liste des docteurs.
   - Si l'API renvoie une erreur, une notification d'erreur est affichée.

4. **Form Handling** :
   - Lors de l'envoi du message (via le formulaire), une vérification est effectuée pour s'assurer qu'un docteur a été sélectionné et qu'un message a été écrit. Si l'un des deux est manquant, une notification d'erreur s'affiche.
   - Le message est ensuite envoyé via une requête `POST` à l'API.

5. **Animations et Styles** :
   - **Framer Motion** est utilisé pour ajouter des animations lors du chargement du composant (`opacity`) et pour les boutons (au survol et au clic).
   - **Tailwind CSS** est utilisé pour la mise en forme du composant, comme les couleurs, les espacements, et les effets au survol.

### Améliorations et suggestions :
- **Gestion des erreurs API** : En plus de la gestion des erreurs générales, il peut être utile d'afficher des messages d'erreur spécifiques provenant de l'API pour informer l'utilisateur sur des problèmes particuliers (ex. : champ manquant, serveur non disponible).
- **Accessibilité** : Ajouter des attributs `aria-*` pour améliorer l'accessibilité du formulaire (par exemple, `aria-label` pour les boutons et champs de texte).
- **Validation Formulaire** : Vous pourriez également valider le message avant son envoi pour vérifier qu'il n'est pas trop court ou trop long, etc.





## DoctorAppointments
Ce code React représente un composant DoctorAppointments qui permet à un médecin de gérer ses rendez-vous avec les patients. Il offre des fonctionnalités comme l'annulation de rendez-vous, la suppression, ainsi que l'ajout de notifications pour les utilisateurs concernés.

Explication du code :
State Management :
appointments: Stocke la liste des rendez-vous récupérée depuis localStorage ou initialise une liste vide si aucune donnée n'est présente.
selectedAppointment: L'état du rendez-vous sélectionné pour l'annulation.
rescheduleReason et cancelReason: Stocke les raisons associées à la modification ou l'annulation d'un rendez-vous.
Filtrage des Rendez-vous :
doctorAppointments: Filtre les rendez-vous de l'utilisateur médecin connecté, en utilisant user.id pour correspondre à l'ID du médecin.
Gestion des notifications :
addNotification: Ajoute une notification à localStorage chaque fois qu'un rendez-vous est annulé. Ces notifications contiennent un message et un horodatage.
Annulation d'un Rendez-vous :
handleCancel: Affiche un formulaire modal permettant au médecin de saisir une raison d'annulation avant de confirmer l'annulation.
confirmCancel: Modifie l'état du rendez-vous dans appointments, ajoute une notification pour l'utilisateur concerné, et met à jour localStorage.
Suppression d'un Rendez-vous :
handleDeleteAppointment: Supprime un rendez-vous de la liste en le filtrant et met à jour localStorage.
Interface Utilisateur :
Affichage des rendez-vous avec des boutons pour annuler ou supprimer un rendez-vous.
Utilisation de Tailwind CSS pour le style des boutons, des cartes de rendez-vous, des modals, etc.
Si un rendez-vous est annulé, il est marqué avec une couleur différente et un texte signalant son annulation.
Modal d'Annulation :
Lorsque l'utilisateur clique sur le bouton "Annuler" d'un rendez-vous, un modal apparaît où le médecin peut saisir une raison d'annulation.
Deux boutons sont présents dans le modal : un pour confirmer l'annulation, l'autre pour fermer le modal sans effectuer de modifications.
Points à améliorer ou ajuster :
Gestion des Erreurs :
Actuellement, le code met à jour directement localStorage, mais il serait utile d'ajouter une gestion des erreurs (par exemple, si localStorage est inaccessible ou si une erreur de réseau se produit dans un cas d'API réelle).
Sécurité des Données :
Il est important de noter que localStorage n'est pas sécurisé pour des informations sensibles comme les rendez-vous médicaux. Pour une application en production, il serait préférable d'utiliser une base de données sécurisée avec des API pour gérer ces données.
Notifications en Temps Réel :
Les notifications sont actuellement gérées avec localStorage, mais pour une meilleure expérience utilisateur, une solution en temps réel avec WebSockets ou une API d'actualisation en temps réel serait plus appropriée pour notifier immédiatement l'utilisateur du changement d'état d'un rendez-vous.
Accessibilité :
Ajouter des attributs aria-* pour améliorer l'accessibilité du formulaire et des boutons de suppression/annulation, ainsi que des éléments modaux.
Améliorations possibles :
Confirmation d'annulation :
Ajouter une étape de confirmation avant de supprimer définitivement un rendez-vous pour éviter toute action accidentelle.
Modification de rendez-vous :
Envisager une fonctionnalité pour modifier un rendez-vous (changer la date, l'heure, etc.) en plus de l'annulation et de la suppression.





## DoctorNotifications

Le composant `DoctorNotifications` permet à un médecin de gérer les notifications/messages envoyés par les patients. Il offre la possibilité de répondre aux messages, de les supprimer, et de marquer un message comme "lu". Il affiche également des notifications pour informer l'utilisateur des actions effectuées.

## Fonctionnalités

- **Affichage des messages reçus** : Affiche tous les messages reçus par le médecin (messages envoyés par les patients).
- **Répondre à un message** : Le médecin peut répondre aux messages des patients.
- **Supprimer un message** : Le médecin peut supprimer un message reçu.
- **Marquer un message comme lu** : Lorsqu'un message est sélectionné, il est marqué comme "lu" et son apparence change.
- **Notification toast** : Des notifications toast sont affichées pour informer le médecin de l'état de l'action (réponse envoyée, message supprimé, etc.).
- **Gestion des utilisateurs** : Le médecin peut voir le nom de l'utilisateur (patient) qui a envoyé chaque message.

## Prérequis

1. **React** : Ce projet utilise React pour la gestion des composants.
2. **Redux** : Utilisation de Redux pour la gestion de l'état d'authentification.
3. **Backend API** : Ce composant se connecte à une API RESTful pour récupérer les utilisateurs et les messages.
   - **Endpoint pour récupérer les utilisateurs** : `GET http://localhost:5001/api/users`
   - **Endpoint pour récupérer les messages** : `GET http://localhost:5001/messages`
   - **Endpoint pour envoyer une réponse** : `POST http://localhost:5001/messages/reply`
   - **Endpoint pour supprimer un message** : `DELETE http://localhost:5001/messages/{messageId}`
   - **Endpoint pour marquer un message comme lu** : `PUT http://localhost:5001/messages/{messageId}/read`





## Reseach
Ce code est une application de recherche interactive basée sur React, utilisant des fonctionnalités telles que la reconnaissance vocale, la récupération de résultats de recherche, et l'affichage d'images associées provenant d'une API d'images. L'objectif de cette application est de permettre à l'utilisateur de rechercher des informations en utilisant soit du texte, soit la voix.

Technologies Utilisées
React pour la création de l'interface utilisateur.
Axios pour la récupération des données des API externes.
Framer Motion pour des animations fluides sur les résultats.
SpeechRecognition pour la fonctionnalité de reconnaissance vocale.
Unsplash API pour afficher des images en rapport avec les recherches de l'utilisateur.
Wikipedia API pour récupérer les définitions d'un terme recherché.
Fonctionnalités
Recherche par texte ou voix :
L'utilisateur peut entrer des termes de recherche manuellement ou les dicter en utilisant la reconnaissance vocale.
Le bouton de microphone permet d'activer ou désactiver la reconnaissance vocale.
Affichage des résultats de recherche :
Lorsqu'une recherche est effectuée, des résultats sont retournés et affichés sous forme de liens avec un extrait du texte correspondant.
Historique de recherche organisé par jour :
Les requêtes passées sont sauvegardées dans le stockage local et organisées en fonction des périodes : "Aujourd'hui", "Hier", "Cette semaine", "Plus ancien".
L'historique peut être consulté à tout moment pour faciliter la recherche des informations précédentes.
Affichage des définitions des termes recherchés :
Une définition succincte du terme recherché est affichée si elle est disponible sur Wikipedia.
L'utilisateur peut voir une version plus détaillée en cliquant sur un bouton.
Images associées :
En fonction du terme recherché, des images pertinentes sont récupérées depuis l'API Unsplash et affichées sur la page.
Fonctionnalités Techniques
SpeechRecognition API pour activer la reconnaissance vocale sur les navigateurs compatibles.
LocalStorage pour stocker et récupérer l'historique des requêtes de recherche.
Animations Framer Motion pour les transitions des résultats et une expérience utilisateur fluide.
État de l'application
isLoading : un indicateur qui montre si une recherche est en cours.
query : la chaîne de texte saisie ou dictée par l'utilisateur.
results : les résultats de recherche récupérés depuis l'API interne.
definition : la définition de l'élément recherché, si elle est disponible.
image : une image associée récupérée via l'API interne.
savedQueries : l'historique des requêtes de l'utilisateur.
isListening : l'état de la reconnaissance vocale (active ou non).
searchHistoryByDay : un objet contenant l'historique des recherches organisé par jour.
relatedImages : un tableau d'images associées récupérées via l'API Unsplash.




## Scanner  

Une application basée sur React qui simule le scan des empreintes digitales d'un utilisateur et fournit des informations sur la santé en fonction de données générées aléatoirement. L'application suit des métriques telles que la fréquence cardiaque, l'hydratation, la température corporelle, le niveau de stress, le niveau d'oxygène, la qualité du sommeil, les pas et les calories brûlées. Elle fournit des retours en temps réel et des visualisations à travers des graphiques.

Fonctionnalités

Simulation du Scan de l'Empreinte Digitale : Lance un scan d'empreinte digitale simulé avec un indicateur de progression.
Génération Aléatoire de Données de Santé : Génère des données de santé aléatoires, telles que la fréquence cardiaque, l'hydratation, la température corporelle, le niveau de stress, etc.
Affichage des Métriques de Santé : Affiche les métriques de santé de l'utilisateur dans un format visuel agréable avec des cartes contenant des icônes et des descriptions.
Évaluation de l'État de Santé : Évalue si la santé de l'utilisateur est bonne en fonction des métriques générées et donne des conseils de santé.
Prise de Rendez-vous : Si la santé de l'utilisateur nécessite une attention particulière, il peut prendre rendez-vous chez un médecin.
Graphiques : Affiche des graphiques en lignes et en secteurs pour visualiser les métriques de santé telles que la fréquence cardiaque, l'hydratation, la qualité du sommeil, l'activité et les calories brûlées.
Technologies

Frontend : React, React Router, Redux (pour la gestion de l'état)
Graphiques : Recharts (pour visualiser les données de santé)
Icônes : Lucide React (pour les icônes)
Style : Tailwind CSS
Gestion de l'État : Redux
Navigation : React Router





## Composant Login

Ce composant React permet aux utilisateurs de se connecter à une application en utilisant leur adresse e-mail et leur mot de passe. Il gère la soumission du formulaire de connexion, l'envoi de la requête API à un serveur et la gestion des états de connexion (succès, erreur, et chargement).

Fonctionnalités

Saisie de l'adresse email et du mot de passe : L'utilisateur doit entrer une adresse e-mail et un mot de passe pour se connecter.
Validation de la soumission : Lors de la soumission du formulaire, une requête POST est envoyée à l'API pour valider les informations de l'utilisateur.
Notification de succès/échec : L'utilisateur reçoit une notification toast indiquant si la connexion a réussi ou échoué.
Gestion de l'état de chargement : Un indicateur de chargement est affiché pendant que la demande de connexion est traitée.
Redirection après une connexion réussie : L'utilisateur est redirigé vers la page d'accueil après une connexion réussie.
Technologies utilisées

React : La bibliothèque JavaScript pour construire l'interface utilisateur.
React-Redux : Utilisé pour gérer l'état global de l'application.
React-Router-Dom : Pour la gestion de la navigation dans l'application.
React-Toastify : Pour afficher les notifications toast en cas de succès ou d'erreur.
Tailwind CSS : Utilisé pour le style et la mise en page de l'application.
Fetch API : Pour envoyer des requêtes HTTP (POST) vers un backend.
Fonctionnement du composant

Étapes :
Saisie des informations :
L'utilisateur saisit son adresse e-mail et son mot de passe dans les champs correspondants.
Soumission du formulaire :
Lors de la soumission du formulaire, le composant envoie une requête POST à l'API (à l'URL http://localhost:5001/api/login) avec les informations de connexion (email et mot de passe).
Vérification des réponses :
Si la requête est réussie, l'utilisateur reçoit une notification toast de succès et est redirigé vers la page d'accueil de l'application.
En cas d'erreur, une notification d'erreur est affichée, et le message d'erreur est montré sous les champs de saisie.
Indicateur de chargement :
Pendant la soumission de la requête, le bouton de connexion indique un état de "Connexion en cours..." et devient désactivé pour empêcher plusieurs soumissions simultanées.
Liens de redirection :
Si l'utilisateur a oublié son mot de passe, il peut cliquer sur le lien "Mot de passe oublié ?".
S'il n'a pas encore de compte, il peut s'inscrire en cliquant sur "Inscrivez-vous".





## Gestion des Docteurs

Ce projet permet de gérer les informations des docteurs, y compris l'affichage, l'ajout et la suppression des docteurs. Il inclut un tableau pour afficher la liste des docteurs et un formulaire pour ajouter de nouveaux docteurs avec des informations telles que le nom, l'email, la spécialité, l'expérience, et les langues parlées. Ce projet utilise React, Redux, et Tailwind CSS pour la gestion de l'état et la mise en forme.

Fonctionnalités

Afficher les docteurs : Visualisez tous les docteurs dans un tableau.
Ajouter un docteur : Un formulaire permet d'ajouter un docteur avec les informations suivantes :
Nom
Email
Spécialité
Expérience
Lieu de travail
Langues parlées
Supprimer un docteur : Vous pouvez supprimer un docteur de la liste.
Validation du formulaire : Le formulaire vérifie que toutes les informations requises sont remplies avant de soumettre.
Gestion des erreurs et succès : Affichage de messages de succès ou d'erreur lors des actions d'ajout ou de suppression.
Prérequis

Node.js (version 14 ou supérieure)
npm ou yarn pour la gestion des dépendances
Accès à une API backend pour gérer les données des docteurs





## Gestion des Utilisateurs

Ce projet permet de gérer les utilisateurs d'une application en ligne, en offrant des fonctionnalités telles que l'ajout d'utilisateurs, la mise à jour de leurs rôles (utilisateur/administrateur), et la suppression d'utilisateurs. Il utilise React, Redux pour la gestion de l'état, et Axios pour effectuer des requêtes HTTP. L'interface est également stylisée avec Tailwind CSS.

Fonctionnalités

Afficher les utilisateurs : La liste des utilisateurs est affichée dans un tableau.
Ajouter un utilisateur : Un formulaire permet d'ajouter un utilisateur avec les informations suivantes :
Nom
Email
Mot de passe
Rôle (Utilisateur / Administrateur)
Mise à jour du rôle : Il est possible de modifier le rôle d'un utilisateur.
Supprimer un utilisateur : Chaque utilisateur peut être supprimé de la base de données.
Messages de confirmation : Un message de confirmation ou d'erreur est affiché après chaque action.





## Inscription Utilisateur

Ce projet permet aux utilisateurs de s'inscrire en créant un compte via un formulaire. Lors de l'inscription, l'utilisateur doit fournir son nom, son email et son mot de passe. Les erreurs et les messages de succès sont gérés avec des notifications, et l'utilisateur est redirigé vers la page de connexion après une inscription réussie.

Fonctionnalités

Formulaire d'inscription : L'utilisateur peut saisir son nom, son email et son mot de passe.
Validation de formulaire : L'application valide les champs avant de soumettre le formulaire.
Notification de succès : Une notification apparaît pour informer l'utilisateur que l'inscription a réussi.
Redirection : Après l'inscription, l'utilisateur est redirigé vers la page de connexion après quelques secondes.
Gestion des erreurs : Les erreurs de formulaire ou d'inscription sont affichées sous forme de messages d'erreur.





## Notifications Utilisateur

Ce composant permet d'afficher et de gérer les notifications d'un utilisateur. Les notifications sont stockées localement et peuvent être marquées comme lues ou supprimées. De plus, les notifications liées à des événements spécifiques (par exemple, annulations de rendez-vous) sont affichées de manière distincte.

Fonctionnalités

Affichage des notifications : Les notifications de l'utilisateur sont récupérées et affichées depuis le stockage local.
Marquer comme lue : L'utilisateur peut cliquer sur une notification pour la marquer comme lue.
Supprimer une notification : L'utilisateur peut supprimer une notification en cliquant sur l'icône de corbeille associée.
Réponses du médecin : Si la notification contient des réponses, elles sont affichées sous la notification principale.
Gestion des types de notifications : Les notifications de type annulation de rendez-vous sont affichées différemment (avec un fond rouge et un avertissement).
Fonctionnement

1. Chargement des Notifications
Lors du montage du composant, les notifications sont récupérées depuis le stockage local (localStorage). Elles sont ensuite filtrées en fonction de l'ID de l'utilisateur connecté, ce qui garantit que seules les notifications pertinentes sont affichées.

2. Marquer comme lue
Lorsque l'utilisateur clique sur une notification, celle-ci est marquée comme lue. La notification est mise à jour dans le stockage local pour refléter son nouveau statut. La couleur de la notification change également pour indiquer qu'elle a été lue.

3. Supprimer une Notification
L'utilisateur peut supprimer une notification en cliquant sur l'icône de corbeille. Cela supprime la notification du stockage local et met à jour l'affichage en temps réel.

4. Affichage des Réponses
Si une notification a des réponses associées (par exemple, de la part d'un médecin), elles sont affichées sous la notification principale.

5. Gestion des Notifications d'Annulation de Rendez-vous
Les notifications de type "annulation de rendez-vous" sont affichées avec un fond rouge et un message d'avertissement.





## UserAvatar

Le composant UserAvatar affiche l'avatar d'un utilisateur sous forme d'un cercle coloré avec la première lettre de son nom. Ce composant utilise Framer Motion pour ajouter une animation de survol et de mise à l'échelle. L'avatar permet d'améliorer l'interaction de l'utilisateur avec l'interface, en particulier lorsqu'il est utilisé comme une icône d'utilisateur dans des menus ou des barres de navigation.

Fonctionnalités

Affichage dynamique : Affiche la première lettre du nom de l'utilisateur dans un cercle coloré.
Animation : Lors du survol de l'avatar, une animation de mise à l'échelle est appliquée, créant une interaction visuelle agréable.
Personnalisation : Le composant peut être facilement personnalisé pour s'adapter à différents types d'interfaces utilisateur.
Fonctionnement

Le composant UserAvatar prend une propriété name qui représente le nom complet de l'utilisateur. Il extrait la première lettre du nom et l'affiche dans un cercle avec un fond coloré. Une animation de mise à l'échelle est appliquée lorsque l'utilisateur survole l'avatar, ce qui est géré par Framer Motion.

Détails des Propriétés
name (String) : Le nom de l'utilisateur (ex. : "Jean Dupont"). La première lettre du nom sera extraite et affichée dans l'avatar.





## VerifyFace

Le composant VerifyFace permet de vérifier un visage capturé par l'utilisateur avant de l'envoyer vers la page d'accueil. Ce processus de vérification peut être intégré avec des API de reconnaissance faciale ou d'autres systèmes de validation, bien que dans ce code de base, il est simulé avec une simple logique.

Le composant affiche une image du visage capturé, et un bouton permettant à l'utilisateur de lancer le processus de vérification.

Fonctionnalités

Affichage de la photo capturée : Si une photo est disponible, elle est affichée dans le composant.
Vérification : Un bouton permet de simuler la vérification du visage. La logique réelle de vérification peut être ajoutée à cet endroit.
Navigation : Après la vérification, l'utilisateur est redirigé vers la page d'accueil (/home).
Fonctionnement

Le composant VerifyFace attend une propriété photo passée via l'état de la navigation (via useLocation). Si une photo est présente, l'image du visage est affichée et l'utilisateur peut cliquer sur le bouton pour "vérifier" son visage. Une fois la vérification effectuée, l'utilisateur est redirigé vers la page d'accueil.




##APP 
Description

Cette application permet aux utilisateurs (patients et médecins) de gérer leurs rendez-vous, consulter les notifications, effectuer une vérification via la reconnaissance faciale, et bien plus encore. Elle comprend des fonctionnalités de gestion de profils, notifications en temps réel, et un chatbot interactif pour répondre aux questions des utilisateurs.

Fonctionnalités

Authentification et gestion des utilisateurs : Les utilisateurs peuvent se connecter avec des identifiants classiques ou via la reconnaissance faciale (Face ID).
Tableau de bord des membres : Un tableau de bord interactif permettant aux utilisateurs de gérer leurs rendez-vous, consulter leurs scans médicaux, et voir leurs notifications.
Gestion des rendez-vous : Les utilisateurs peuvent prendre, modifier ou annuler des rendez-vous.
Notifications : Les notifications sont envoyées pour informer les utilisateurs des nouveaux rendez-vous, annulations ou mises à jour de leur état médical.
Chatbot : Un chatbot pour répondre aux questions des utilisateurs en temps réel.
Protection des routes : Des pages protégées accessibles uniquement aux utilisateurs authentifiés.
Technologies Utilisées

Frontend : React, React Router, Framer Motion pour les animations, React-Redux pour la gestion de l'état global.
Bibliothèques :
react-toastify pour les notifications toast.
react-icons pour les icônes.
framer-motion pour l'animation des pages et transitions.
react-router-dom pour la gestion de la navigation.
CSS : TailwindCSS pour la mise en page et les styles.
Installation




## server 
API de gestion des utilisateurs et de chatbot

Ce projet fournit une API RESTful pour gérer les utilisateurs, les messages, les notifications, ainsi que l'intégration avec un chatbot Cohere et Google Custom Search. L'API permet la gestion des rôles (utilisateurs et médecins), l'ajout de nouveaux utilisateurs, la mise à jour de leurs informations, la gestion des messages et des réponses, et bien plus.

Prérequis

Avant de commencer, assurez-vous que vous avez installé les éléments suivants :

Node.js (version 14 ou supérieure)
npm (gestiónnaire de paquets pour Node.js)
Installation

Clonez ce dépôt sur votre machine locale :
git clone https://github.com/votre-repository/api-utilisateur-chatbot.git
Accédez au répertoire du projet :
cd api-utilisateur-chatbot
Installez les dépendances nécessaires :
npm install
Lancer le serveur

Démarrez le serveur avec la commande suivante :
npm start
Le serveur sera accessible sur http://localhost:5001.
Endpoints de l'API

1. Utilisateurs
GET /api/users
Récupère la liste des utilisateurs avec le rôle "user".
POST /api/users
Crée un nouvel utilisateur. Les données doivent inclure name, email, et password.
DELETE /api/users/:id
Supprime un utilisateur en fonction de son id.
PUT /api/users/:id
Met à jour le rôle d'un utilisateur en fonction de son id. Les données doivent inclure un champ role.
2. Médecins
GET /api/doctors
Récupère la liste des utilisateurs avec le rôle "doctor".
POST /api/doctors
Crée un nouveau médecin. Les données doivent inclure id, name, email, role, et specialty.
DELETE /api/doctors/:id
Supprime un médecin en fonction de son id.
3. Chatbot
POST /api/chat
Permet d'envoyer un message au chatbot Cohere et d'obtenir une réponse.

Paramètres : message (le message de l'utilisateur).
Réponse : la réponse du chatbot.
POST /api/chatbot
Utilise Google Custom Search pour répondre à une requête.

Paramètres : query (la question à poser).
Réponse : les résultats de la recherche Google.
4. Inscription et Connexion
POST /api/signup
Permet à un utilisateur de s'inscrire. Les données doivent inclure name, email, et password.
POST /api/login
Permet à un utilisateur de se connecter avec son email et son password.
5. Gestion des messages
GET /messages
Récupère la liste des messages.
POST /messages
Crée un nouveau message.
DELETE /messages/:id
Supprime un message en fonction de son id.
PUT /messages/:id/read
Marque un message comme "lu".
POST /messages/reply
Permet de répondre à un message existant.
6. Notifications
GET /notifications/:id
Récupère les notifications pour un utilisateur avec l'id donné.
POST /notifications/:id/reponse
Permet d'ajouter une réponse à une notification. Les données doivent inclure message.
7. Photo de profil
POST /api/save-face-photo
Permet de sauvegarder une photo de profil pour un utilisateur. Les données doivent inclure userId et facePhoto.
POST /api/faceid-login
Permet à un utilisateur de se connecter via une photo de profil.
Fichiers JSON

Les données des utilisateurs, des messages et des notifications sont stockées dans des fichiers JSON :

src/data/users.json : Contient les informations des utilisateurs (nom, email, rôle, etc.).
src/data/messages.json : Contient les messages échangés.
src/data/reponses.json : Contient les notifications et leurs réponses.
