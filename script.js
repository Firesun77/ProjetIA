// Sélectionne l'élément du plateau
const plateau = document.querySelector('.plateau');

// Génère l'échiquier
function creerPlateau() {
    for (let ligne = 0; ligne < 8; ligne++) {
        for (let colonne = 0; colonne < 8; colonne++) {
            // Crée un élément div pour chaque case
            const caseEchec = document.createElement('div');
            caseEchec.classList.add('case');
            
            // Alterne les couleurs pour créer l'effet d'échiquier
            if ((ligne + colonne) % 2 === 0) {
                caseEchec.classList.add('blanche');
            } else {
                caseEchec.classList.add('noire');
            }
            
            // Ajoute la case à l'échiquier
            plateau.appendChild(caseEchec);
        }
    }
}

// Fonction pour ajouter les pièces (exemple avec des pions)
function ajouterPieces() {
    const pieces = [
        // Positions des pions noirs
        { position: 8, type: '♟' }, { position: 9, type: '♟' },
        { position: 10, type: '♟' }, { position: 11, type: '♟' },
        { position: 12, type: '♟' }, { position: 13, type: '♟' },
        { position: 14, type: '♟' }, { position: 15, type: '♟' },
        
        // Positions des pions blancs
        { position: 48, type: '♙' }, { position: 49, type: '♙' },
        { position: 50, type: '♙' }, { position: 51, type: '♙' },
        { position: 52, type: '♙' }, { position: 53, type: '♙' },
        { position: 54, type: '♙' }, { position: 55, type: '♙' },

        // Tours noires
        { position: 0, type: '♜' }, { position: 7, type: '♜' },
        
        // Cavaliers noirs
        { position: 1, type: '♞' }, { position: 6, type: '♞' },
        
        // Fous noirs
        { position: 2, type: '♝' }, { position: 5, type: '♝' },
        
        // Reine noire
        { position: 3, type: '♛' },

        // Roi noir
        { position: 4, type: '♚' },
        
        // Tours blanches
        { position: 56, type: '♖' }, { position: 63, type: '♖' },

        // Cavaliers blancs
        { position: 57, type: '♘' }, { position: 62, type: '♘' },

        // Fous blancs
        { position: 58, type: '♗' }, { position: 61, type: '♗' },

        // Reine blanche
        { position: 59, type: '♕' },
        
        // Roi blanc
        { position: 60, type: '♔' }    
    ];

    pieces.forEach(piece => {
        const caseEchec = plateau.children[piece.position];
        caseEchec.innerHTML = `<span class="piece">${piece.type}</span>`;
    });
}


// Créer l'échiquier et ajouter les pièces
creerPlateau();
ajouterPieces();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let pieceSelectionnee = null;  // Variable pour stocker la pièce actuellement sélectionnée

// Ajoute des événements de clic sur chaque case du plateau
function ajouterEvenements() {
    const cases = document.querySelectorAll('.case');

    cases.forEach((caseEchec, index) => {
        caseEchec.addEventListener('click', () => {
            // Si une pièce est déjà sélectionnée, on essaie de la déplacer
            if (pieceSelectionnee) {
                deplacerPiece(pieceSelectionnee, caseEchec);
                pieceSelectionnee = null;  // Désélectionne la pièce
            } else {
                // Si la case contient une pièce, on la sélectionne
                if (caseEchec.innerHTML.trim() !== "") {
                    pieceSelectionnee = { case: caseEchec, index: index };
                    caseEchec.style.backgroundColor = "yellow";  // Marque la case sélectionnée
                }
            }
        });
    });
}

// Fonction pour déplacer une pièce
function deplacerPiece(piece, nouvelleCase) {
    nouvelleCase.innerHTML = piece.case.innerHTML;  // Déplace la pièce vers la nouvelle case
    piece.case.innerHTML = "";  // Vide la case d'origine
    reinitialiserCouleurs();  // Réinitialise les couleurs de l'échiquier
}

// Réinitialise les couleurs des cases après un déplacement
function reinitialiserCouleurs() {
    const cases = document.querySelectorAll('.case');
    cases.forEach((caseEchec, index) => {
        if ((Math.floor(index / 8) + index) % 2 === 0) {
            caseEchec.style.backgroundColor = "white";
        } else {
            caseEchec.style.backgroundColor = "#4d4d4d";
        }
    });
}
let pionDeplace = {
    blanc: Array(8).fill(false),  // Pour les pions blancs
    noir: Array(8).fill(false)     // Pour les pions noirs
};


// Appelle la fonction pour ajouter les événements de clic
ajouterEvenements();

// Fonction pour déplacer une pièce (avec vérification des mouvements légaux pour les pions)
function deplacerPiece(piece, nouvelleCase) {
    const typePiece = piece.case.innerText.trim();  // Récupère le symbole de la pièce
    const indexDepart = piece.index;
    const indexArrivee = Array.prototype.indexOf.call(nouvelleCase.parentNode.children, nouvelleCase);

    // Mouvements légaux pour les pions

    if (typePiece === '♙') {  // Pion blanc
        pionIndex = 0;

        // Le pion blanc ne peut avancer que d'une case vers le haut (vers les index inférieurs)
        if (!pionDeplace.blanc[pionIndex]) {
            if ((indexArrivee === indexDepart - 8 || indexArrivee === indexDepart - 16) && nouvelleCase.innerHTML.trim() === "") {

                // Mouvement valide : avancer d'une case
                nouvelleCase.innerHTML = piece.case.innerHTML;
                piece.case.innerHTML = "";  // Vide la case d'origine
                pionDeplace.blanc[pionIndex] = true;

            } else {
                alert("Mouvement invalide pour le pion !");
                reinitialiserCouleurs();
                return;  // Ne déplace pas la pièce
            }
        } else {
            if (indexArrivee === indexDepart - 8 && nouvelleCase.innerHTML.trim() === "") {
                nouvelleCase.innerHTML = piece.case.innerHTML;
                piece.case.innerHTML = "";
            } else {
                alert("Mouvement invalide pour le pion blanc !");
                reinitialiserCouleurs();
                return;
            }
        }
    }
    // Autres mouvements pour les autres pièces (à ajouter)
    
    reinitialiserCouleurs();  // Réinitialise les couleurs de l'échiquier
    
    
    // Mouvements légaux pour les pions

    if (typePiece === '♟') {  // Pion noir

        // Le pion blanc ne peut avancer que d'une case vers le haut (vers les index inférieurs)

        if (indexArrivee === indexDepart + 8 && nouvelleCase.innerHTML.trim() === "") {

            // Mouvement valide : avancer d'une case
            nouvelleCase.innerHTML = piece.case.innerHTML;
            piece.case.innerHTML = "";  // Vide la case d'origine

        } else {
            alert("Mouvement invalide pour le pion !");
            reinitialiserCouleurs();
            return;  // Ne déplace pas la pièce
        }
    }

    // Autres mouvements pour les autres pièces (à ajouter)
    
    reinitialiserCouleurs();  // Réinitialise les couleurs de l'échiquier
}



