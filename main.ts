import { Logger } from './log';
import * as Utils from './utils';
import Game from './Game';

// détermine qui commence 
let player: Number = Math.floor(Math.random() * 2);

const nbCol: Number = 3;
const nbLig: Number = 3;
const Morpion: Game = new Game(nbCol, nbLig)

Morpion.launch();
Logger.log(player, Morpion.tabCases);