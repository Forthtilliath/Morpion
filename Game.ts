import * as Utils from './utils';

class Game {
  constructor(container: HTMLElement, nbCol: Number, nbLig: Number) {
    this.container = container;
    this.nbCol = nbCol;
    this.nbLig = nbLig;
    this.nbCases = nbLig * nbCol;
    this.tabCases = [];
    this.playerTurn = -1;

    this.createCases();
  }

  createCase(): HTMLDivElement {
    const uneCase = document.createElement('div');
    uneCase.classList.add('case');

    return uneCase;
  }

  createCases(): void {
    for (let i = 0; i < this.nbCases; i++) {
      let div = this.container.appendChild(this.createCase());
      div.textContent = i;
    }
  }

  // initialise les valeurs pour commencer une partie 
  init(): void {
    // détermine qui commence 
    this.playerTurn = Math.floor(Math.random() * 2);

    // génère un tableau de -1
    this.tabCases = Utils.createArrayOfValues(this.nbCases, -1);
  }

  // démarre une nouvelle partie 
  launch(): void {
    this.init();
  }

  // Change le tour du joueur
  setPlayerTurn(): void {
    this.playerTurn = +!this.playerTurn;
  }

  // verifie s'il reste une case vide. Retourne true si toutes les sont complétées
  checkCompleted(): Boolean {
    return !this.tabCases.some(x => x === -1);
  }
};

export default Game;