var joueur = 1; // Numéro du joueur qui joue.
var colonne = 7;
var ligne = 6;
var cercles = document.querySelectorAll(".fas");
var game = true; // Partie en cours.
var texte = ""; // Texte qui s'affiche.
var plateau = new Array();
// Deuxième dimension du tableau.
for (var i = 0; i < ligne; i++) plateau[i] = new Array();
const logo1 = document.querySelector(".logo1");
const logo2 = document.querySelector(".logo2");
const form = document.querySelector("form");
const nom1 = document.getElementById("nom1");
const nom2 = document.getElementById("nom2");
const inputs = document.querySelectorAll(`input[type="text"]`);
const boxNames = document.querySelector(".box-names");
let prenom1 = "";
let prenom2 = "";

// Création nouveau jeu.
newGame();

function nomDuJoueur(numJoueur) {
  if (numJoueur == 1) {
    cercles.forEach((cercle) => {
      cercle.style.color = "#703048";
    });
    logo1.style.display = "block";
    logo2.style.display = "none";
    return `<i class="fas fa-circle red"></i> ` + prenom1;
  } else {
    cercles.forEach((cercle) => {
      cercle.style.color = "#3c5772";
    });
    logo2.style.display = "block";
    logo1.style.display = "none";
    return `<i class="fas fa-circle blue"></i> ` + prenom2;
  }
}

function detectClic(j) {
  // Case de libre dans la colonne + si le jeu est en cours.
  if (verifPosition(j) && this.game) {
    var ligneEnCours = poseJeton(j); // Numéro de ligne en cours.

    // Vérification si win.
    var verifEnd = Puissance4(ligneEnCours, j, 0, 0); // Renvoie "true" ou "false" si partie gagnée ou non.

    if (verifEnd) {
      this.game = false;
      afficheTexteAnnonce(
        `<div class="win">Partie gagnée pour</div><span> ${nomDuJoueur(
          this.joueur
        )} </span>`
      );
      console.log("END OF GAME !");
    }
    // Si partie non terminée, passe au joueur qui suit.
    else {
      this.joueur == 1 ? (this.joueur = 2) : (this.joueur = 1);
      afficheTexteAnnonce("A ton tour " + nomDuJoueur(this.joueur) + " !");
    }
  }
}

function verifPosition(j) {
  // Si première case du haut de la colonne est vide.
  if (this.plateau[0][j] == 0) return true;
  else return false;
}

function poseJeton(j) {
  // Retourne le numéro de ligne disponible ou le jeton a été posé.
  for (var i = this.ligne - 1; i >= 0; i--) {
    if (this.plateau[i][j] == 0) {
      // Informe la cellule du numéro du joueur qui lui est affecté.
      this.plateau[i][j] = this.joueur;
      // Met à jour la div avec le jeton.
      refreshTableau(i, j, this.joueur);
      return i;
    }
  }
}

function creerTableau() {
  this.texte = "<table>";
  for (var i = 0; i < this.ligne; i++) {
    this.texte += "<tr>";
    for (var j = 0; j < this.colonne; j++) {
      this.texte +=
        "<td onclick='detectClic(" + j + ")' id=" + i + "-" + j + ">";
      if (this.plateau[i][j] == 1) this.texte += "<div class='joueur1'></div>";
      else if (this.plateau[i][j] == 2)
        this.texte += "<div class='joueur2'></div>";
      this.texte += "</td>";
    }
    this.texte += "</tr>";
  }
  this.texte += "</table>";
  document.getElementById("Puissance4").innerHTML = this.texte;
}

function refreshTableau(x, y, i) {
  document.getElementById(x + "-" + y).innerHTML =
    "<div class='joueur" + i + "'></div>";
}

function newGame() {
  for (var i = 0; i < this.ligne; i++) {
    for (var j = 0; j < this.colonne; j++) {
      plateau[i][j] = 0;
    }
  }
  this.joueur = 1;
  afficheTexteAnnonce(
    `<div class="letsgo">Let's go ! </div>A ton tour ${nomDuJoueur(
      this.joueur
    )} !`
  );
  this.game = true;
  creerTableau();
}

function afficheTexteAnnonce(texte) {
  document.getElementById("TexteAnnonce").innerHTML = texte;
}

// "lig" et "col" sont les positions du point num ligne et num colonne
// c et l le type d'avancement
function Puissance4(lig, col, l, c) {
  // Commencement de l'analyse
  console.log("Valeurs : " + lig + " " + col + " / Incrément " + l + " " + c);
  if (c == 0 && l == 0) {
    // inversé a verticale, b horizontal, c diag gauche et d diag droit
    // Honrizontal
    var va =
      1 + Puissance4(lig + 1, col, 1, 0) + Puissance4(lig - 1, col, -1, 0);
    // Vertical
    var vb =
      1 + Puissance4(lig, col + 1, 0, 1) + Puissance4(lig, col - 1, 0, -1);
    // Diagonale Droite
    var vc =
      1 +
      Puissance4(lig + 1, col + 1, 1, 1) +
      Puissance4(lig - 1, col - 1, -1, -1);
    // Diagonale Gauche
    var vd =
      1 +
      Puissance4(lig - 1, col + 1, -1, 1) +
      Puissance4(lig + 1, col - 1, 1, -1);
    console.log(va, vb, vc, vd);
    if (va >= 4 || vb >= 4 || vc >= 4 || vd >= 4) return true;
    else return false;
  }
  // Vérification "lig" et "col" (ne sortent pas du tableau).
  if (lig < this.ligne && lig >= 0 && col < this.colonne && col >= 0) {
    if (this.plateau[lig][col] == joueur) {
      return 1 + Puissance4(lig + l, col + c, l, c);
    } else {
      return 0;
    }
  } else return 0;
}

nom1.addEventListener("input", (e) => {
  prenom1 = e.target.value;
});

nom2.addEventListener("input", (e) => {
  prenom2 = e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  boxNames.innerHTML = ` 
    <h1><i class="fas fa-circle red"> </i> ${prenom1}</h3>
    <h1><i class="fas fa-circle blue"> </i> ${prenom2}</h4>
    `;
  form.style.display = "none";
});
