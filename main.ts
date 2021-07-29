import { Logger } from './log';
import * as Utils from './utils';
import Game from './Game';

const nbCol: Number = 3;
const nbLig: Number = 3;
const Morpion: Game = new Game(nbCol, nbLig)

Morpion.launch();
Logger.log(Morpion);

Morpion.setPlayerTurn();
Logger.log(Morpion);
Logger.log(Morpion.checkCompleted());