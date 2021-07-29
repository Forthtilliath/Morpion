import * as Utils from './utils';

class Game {
  constructor(nbCol, nbLig) {
    this.nbCol = nbCol;
    this.nbLig = nbLig;
    this.nbCases = nbLig * nbCol;
    this.tabCases = [];
  }

  init() {
    // génère un tableau de -1
    this.tabCases = Utils.createArrayOfValues(this.nbCases, -1);
  }
  
  launch(){
    this.init();
  }
};

export default Game;