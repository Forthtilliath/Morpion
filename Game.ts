import * as Utils from './utils';

class Game {
  constructor(nbCol: Number, nbLig: Number) {
    this.nbCol = nbCol;
    this.nbLig = nbLig;
    this.nbCases = nbLig * nbCol;
    this.tabCases = [];
    this.playerTurn =-1;
  }

  init() {
    // détermine qui commence 
this.playerTurn = Math.floor(Math.random() * 2);
    
    // génère un tableau de -1
    this.tabCases = Utils.createArrayOfValues(this.nbCases, -1);
  }

  launch() {
    this.init();
  }
  
  setPlayerTurn() {
    this.playerTurn = +!this.playerTurn;
  }
};

export default Game;