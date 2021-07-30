import * as Utils from './utils';
import { Logger } from './log';

class Game {
  constructor(container: HTMLElement, nbCol: Number, nbLig: Number) {
    this.container = container;
    this.nbCol = nbCol;
    this.nbLig = nbLig;
    this.nbCases = nbLig * nbCol;
    this.tabCases = [];
    this.playerTurn = -1;

    // tableaux contenant les positions
    this.tabKeys = Utils.createArrayOfKeys(this.nbCases);
    this.tabKeysCol = this.tabKeys.slice(0, this.nbCol);
    this.tabKeysLig = this.tabKeys.slice(0, this.nbLig).map(x => x * this.nbCol);
    this.tabVictories = [];

    this.createCases();
    this.createEvents();
  }

  /****************
   * Cases        *
   ****************/
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

  /*getCase(i) {
    return this.container.querySelector(`.case:nth-child(${i})`)
  }*/

  /*****************
   * Events        *
   *****************/
  createEvents(): void {
    this.container.querySelectorAll('.case').forEach((uneCase) => uneCase.addEventListener('click', event => this.handleClick(event)));

  }

  handleClick(event) {
    event.target.style.backgroundColor = 'red';
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

  /************************
   * Generation victories *
   ************************/
  generateArrayVictory() {
    //const arr = [...Array(this.nbCases).keys()];
    const arr = Utils.createArrayOfKeys(this.nbCases);

    const arrcol = this.getFirstValuesCol();
    //const arrline = this.getFirstValuesLine();

    // victoires liées aux lignes et colonnes
    // this.tabVictories.push(...arrcol.map(x => [x, x + 3, x + 6]));
    //this.tabVictories.push(...arrline.map(x => [x, x + 1, x + 2]));
    // victoires liées aux diagonales (j'ai peu testé celles ci donc à vérifier ) 
    // this.tabVictories.push(...arrline.filter(x => ((x + this.nbCol) <= this.nbCol)).map(x => [x, x + 4, x + 8]));
    //this.tabVictories.push(...arrline.filter(x => ((x - (this.nbCol - 1) * 2) >= 0)).map(x => [x, x - 2, x - 4]));

    // Logger.log(arrWin);
    Logger.log(arrcol);
  }

  // retourne les id des valeurs de chaque colonne
  getFirstValuesCol(): Number[] {
    return [...Array(this.nbCol).keys()];
  }

  // retourne les id des valeurs de chaque ligne
  getFirstValuesLine(): Number[] {
    return [...Array(this.nbLig).keys()].map(x => x * this.nbCol);
  }

};

export default Game;