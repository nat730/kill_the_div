# Kill the divs

## Objectifs

Utilisez des API Web pour se rapprocher de l'experience d'une application native (desktop ou mobile)

## Le jeu

On aura un premier ecran avec un bouton "Start" qui permettra de lancer le jeu.
En cliquant dessus, on aura un ecran avec des divs qui apparaissent a  des positions aleatoires sur l'ecran.
Le but du jeu est de cliquer sur ces divs pour les faire disparaaitre.
On en fera apparaaitre de nouveaux a  chaque fois qu'on en fait disparaaitre un.
La partie se termine quand on a clique sur 10 divs.
On affichera alors un ecran de fin de partie avec un bouton "Rejouer" qui permettra de relancer une partie et le temps qu'on a mis pour finir la partie.

## Les etapes

### 1. Jeu de base

1. Ajouter un routing avec 3 routes : "/" pour l'ecran d'accueil, "/game" pour l'ecran de jeu et "/end" pour l'ecran de fin de partie
2. Creer un bouton "Start" dans la page d'accueil, qui amene a  l'ecran de jeu
3. Dans l'ecran de jeu, on affiche une div ronde (Boite de 50px de ca´te, bordure arrondie, fond blanc) a  une position aleatoire sur l'ecran
4. l'ecran de jeu prend 100% de la hauteur et de la largeur de l'ecran
5. on affiche un compteur de divs cliquees en haut a  droite de l'ecran
6. en dessous de ce compteur, on affiche un chrono croissant en secondes ex: 6.867 sec
7. l'ecran de jeu a un fond noir
8. lorsque l'on clique sur la div, elle disparait et on en fait apparaitre une nouvelle a  une position aleatoire
9. quand on a clique sur 10 divs, on affiche un ecran de fin de partie avec un bouton "Rejouer" qui permet de relancer une partie et le temps qu'on a mis pour finir la partie

### 2. Pimp my game

Choisissez des ameliorations a  apporter au jeu dans l'order que vous voulez :

- Ajouter un son quand on clique sur une div (Utiliser l'API Web Audio)
- Ajouter des vibrations quand on clique sur une div (Utiliser l'API Vibration)
- Ajouter une notification quand on clique sur la derniere div avec affichage du temps total (Utiliser l'API Notification)
- Ajouter un bouton "Pause" qui met le jeu en pause (Utiliser l'API Page Visibility)
- Utiliser l'api suivante et la geolocalisation pour afficher le pays de l'utilisateur :
https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837&localityLanguage=en
- stocker les meilleurs scores dans le local storage et les afficher dans l'ecran de fin de partie
- Ajouter un bouton "Fullscreen" qui permet de mettre le jeu en plein ecran (Utiliser l'API Fullscreen)
- Ajouter un bouton "Share" qui permet de partager le jeu sur les reseaux sociaux (Utiliser l'API Share)
- Ajouter un bouton "Install" qui permet d'installer le jeu sans passer par la barre URL