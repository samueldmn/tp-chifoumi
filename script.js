let coups = ["PIERRE", "FEUILLE", "CISEAUX"];
let statutJeu = document.querySelector("#statut-jeu");
let boutons = document.querySelectorAll("button"); // récupère tous les boutons
let affichageCoupsJoues = document.querySelectorAll(
  ".container-coups-joues h2" // récupère tous les h2 qui sont enfants de .container-coups-joues
);

let affichageScore = document.querySelectorAll(".Score h3");

let score_Joueur = 0;
let score_Ordi = 0;

// Appel de la fonction de mise en place d'une nouvelle partie
commencerPartie();

// La suite du script constitue en la définition des fonctions utilisées dans le jeu

/**
 * Calcule le résultat de la partie, ie. le message de victoire, défaite ou égalité
 * @param  {Number}   monCoup  coup du joueur
 * @param  {Number}   coupOrdi  coup de l'ordinateur
 * @return {String}   result le message correspondant au résultat
 */
function calculerResultat(monCoup, coupOrdi) {
    if (monCoup === coupOrdi){
        return "Copieur !";
    }

    if (monCoup === 2){
        if (coupOrdi === 0){
            AjouterScore("Ordi");
            return "Looser !"
        }
        else{
            AjouterScore("Joueur");
            return "OK, gagné ..."
        }

    } else if (monCoup === 1){
        if (coupOrdi === 2){
            AjouterScore("Ordi");
            return "Looser !"
        }
        else{
            AjouterScore("Joueur");
            return  "OK, gagné ..." 
        }

    } else {
        if (coupOrdi === 1){
            AjouterScore("Ordi");
            return "Looser !"
        }
        else{
            AjouterScore("Joueur");
            return "OK, gagné ..." 
        }
    }

}

/**
 * @return {Number}   nombre entier aléatoire entre 0 et 2
 */
function coupAleatoire() {
  return Math.floor(Math.random() * 3);
}

/**
 * Mise en place d'une nouvelle partie
 */
function commencerPartie() {
    statutJeu.textContent = "Choisissez !";

    afficherScore;

    // Réaffichage des boutons cachés 
    boutons[0].style.display = "block";
    boutons[2].style.display = 'block';
    
    affichageCoupsJoues.forEach((coup) => {
        coup.style.display = "none";
    })

    boutons.forEach((btn, index) => {
        btn.textContent = coups[index];
        btn.addEventListener("click", finirPartie)  ;
    });

    }

/**
 * Affiche le résultat final de la partie
 * @param {Event} event événement contenant les informations de l'entrée utilisateur
 */

function finirPartie(event) {
    // On récupère le coup joué par le joueur
    let monCoup = coups.indexOf(event.target.textContent);
  
    // On génère un coup aléatoire pour l'ordinateur
    coupOrdi = coupAleatoire();

    // On calcule le résultat de la partie et on l'affiche dans "statutJeu"
    statutJeu.textContent = calculerResultat(monCoup, coupOrdi);

    // On affiche les coups joués par les deux joueurs dans les éléments "affichageCoupsJoues" sous la forme "monCoup" "vs." "coupOrdi"
    affichageCoupsJoues[0].style.display= "block";
    affichageCoupsJoues[0].textContent = coups[monCoup];
    affichageCoupsJoues[1].style.display= "block";
    affichageCoupsJoues[1].textContent = "vs.";
    affichageCoupsJoues[2].style.display= "block";
    affichageCoupsJoues[2].textContent = coups[coupOrdi];

    // Affichage des scores 

    affichageScore[0].textContent = "Score :";
    affichageScore[1].textContent = score_Joueur;
    affichageScore[2].textContent = score_Ordi;


    // On cache les 1er et 3ème boutons de jeu
    boutons[0].style.display = "none";
    boutons[2].style.display = 'none';

    p// On modifie le texte du bouton de nouvelle partie (2ème bouton) pour afficher "Rejouer"
    boutons[1].textContent = "Rejouer";

    // On supprime l'event listener existant sur le bouton "Rejouer"
    boutons[1].removeEventListener("click", finirPartie);
  
    // On ajoute un event listener sur le bouton "Rejouer" qui renvoie vers la fonction "commencerPartie"
    boutons[1].addEventListener("click", commencerPartie);

  }


function AjouterScore(gagnantCoup) {
    if (gagnantCoup === "Joueur"){
        score_Joueur += 1;
    } 
    else if (gagnantCoup === "Ordi"){
        score_Ordi += 1;
    }
}


function afficherScore() {
    affichageScore[0].textContent = "Score :";
    affichageScore[1].textContent = score_Joueur;
    affichageScore[2].textContent = score_Ordi;
}