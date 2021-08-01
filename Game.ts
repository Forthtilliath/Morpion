import * as Utils from './utils';
import { Logger } from './log';

class Game {
  constructor(container: HTMLElement, nbCol: Number, nbLig: Number) {
    /**
     * Élément qui contiendra toutes les cases du jeu 
     */
    this.container = container;
    /**
     * Éléments DOM du jeu
     */
    this.elements = {
      victory: document.querySelector('#victory'),
      draw: document.querySelector('#draw'),
      player: document.querySelector('#playerId')
    };
    /**
     * Nombre de colonnes 
     */
    this.nbCol = nbCol;
    /**
     * Nombre de lignes 
     */
    this.nbLig = nbLig;
    /**
     * Nombre total de cases 
     */
    this.nbCases = nbLig * nbCol;
    /**
     * Tableau contenant la valeur de chaque case : -1 pour case vide, 0 pour joueur 1, 1 pour joueur 2
     */
    this.tabCases = [];
    /**
     * 0 signifie que c'est au joueur 1 de jouer, 1 signifie que c'est au joueur 2 de jouer
     */
    this.playerTurn = -1;
    /**
     * Valeur affectée à la case cliquée par un joueur
     */
    this.tabPlayersContent = ['X', 'O'];

    // tableaux contenant les positions
    this.tabKeys = Utils.createArrayOfKeys(this.nbCases);
    // contient les id du début de chaque colonne
    this.tabKeysCol = this.tabKeys.slice(0, this.nbCol);
    // contient les id du début de chaque ligne 
    this.tabKeysLig = this.tabKeys.slice(0, this.nbLig).map(x => x * this.nbCol);
    this.tabVictories = [];

    this.generateArrayVictory();
  }

  // Initialise les valeurs pour commencer une partie 
  init(): void {
    this.deleteCases();
    this.createCases();
    this.createEvents();

    // détermine qui commence 
    this.playerTurn = Math.floor(Math.random() * 2);

    // génère un tableau de -1
    this.tabCases = Utils.createArrayOfValues(this.nbCases, -1);
  }

  // démarre une nouvelle partie 
  launch(): void {
    this.init();

    this.hideEnd();
  }

  /****************
   * Cases        *
   ****************/

  /**
   * Crée une case dans le DOM
   */
  createCase(): HTMLDivElement {
    const uneCase = document.createElement('div');
    uneCase.classList.add('case');

    return uneCase;
  }

  /**
   * Crée un nombre de cases dans le DOM en fonction du nombre de cases dans le jeu
   */
  createCases(): void {
    for (let i = 0; i < this.nbCases; i++) {
      this.container.appendChild(this.createCase());
    }
  }

  deleteCases(): void {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  /**
   * Récupère le contenu d'une case
   */
  getValueOfCase(i) {
    return this.tabCases[i];

    //return +this.container.querySelector(`.case:nth-child(${i+1})`).textContent;
  }

  getValueOfCases(cases: Number[]): Number[] {
    return cases.map(uneCase => this.getValueOfCase(uneCase));
  }

  /**
   * Récupère le numéro d'une case
   */
  getCaseNumber(laCase: HTMLDivElement): Number {
    return [...document.querySelectorAll('.case')].map((uneCase, i) => (uneCase === laCase) ? i : -1).filter(x => x !== -1).pop();
  }



  /*****************
   * Events        *
   *****************/

  /**
   * Génère l'ensemble des événements sur les cases 
   */
  createEvents(): void {
    this.container.querySelectorAll('.case').forEach((uneCase) => uneCase.addEventListener('click', event => this.handleClick(event), { once: true }));

  }

  /**
   * Événement qui s'active lorsqu'on clique sur une case
   */
  handleClick(event: Event) {
    const caseNumber = this.getCaseNumber(event.target);

    this.tabCases[caseNumber] = this.playerTurn;

    event.target.textContent = this.tabPlayersContent[this.playerTurn];

    if (this.checkVictory()) {
      this.showEnd(this.playerTurn);
      return;
    }

    if (this.checkCompleted()) {
      this.showEnd(-1);
      return;
    }

    this.setPlayerTurn();
  }

  // Change le tour du joueur
  setPlayerTurn(): void {
    this.playerTurn = +!this.playerTurn;
  }

  /***********************
   * Fin de partie.      *
   ***********************/

  // Vérifie s'il reste une case vide. Retourne true si toutes les cases sont complétées
  checkCompleted(): Boolean {
    return !this.tabCases.some(x => x === -1);
  }

  // Verifie si un joueur a gagné 
  checkVictory(): Boolean {
    return this.tabVictories.some((tabVictory) => this.getValueOfCases(tabVictory).every(x => x === this.playerTurn));
  }

  // Montre l'écran de fin de partie
  showEnd(typeEnd: Number) {
    Utils.setVisible(this.container, false);

    if (typeEnd === -1) {
      Utils.setVisible(this.elements.draw, true);
    } else {
      this.elements.player.textContent = this.playerTurn;
      Utils.setVisible(this.elements.victory, true);
    }
  }

  /**
   * Cache l'écran de fin
   **/
  hideEnd() {
    Utils.setVisible(this.container, true);
    Utils.setVisible(this.elements.draw, false);
    Utils.setVisible(this.elements.victory, false);
  }

  /************************
   * Generation victories *
   ************************/

  /**
   * Génère le tableau contenant toutes les possibilités de victoire 
   **/
  generateArrayVictory(): void {
    // victoires liées aux lignes et colonnes
    this.tabVictories.push(...this.tabKeysCol.map(x => [x, x + 3, x + 6]));
    this.tabVictories.push(...this.tabKeysLig.map(x => [x, x + 1, x + 2]));
    // victoires liées aux diagonales (j'ai peu testé celles ci donc à vérifier ) 
    this.tabVictories.push(...this.tabKeysLig.filter(x => ((x + this.nbCol) <= this.nbCol)).map(x => [x, x + 4, x + 8]));
    this.tabVictories.push(...this.tabKeysLig.filter(x => ((x - (this.nbCol - 1) * 2) >= 0)).map(x => [x, x - 2, x - 4]));
  }
};

export default Game;