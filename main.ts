import { Logger } from './log';
import * as Utils from './utils';
import Game from './Game';

const container = document.querySelector('#morpion');
const nbCol: Number = 3;
const nbLig: Number = 3;
const Morpion: Game = new Game(container, nbCol, nbLig)

document.querySelector('#btn_launch').addEventListener('click', () => Morpion.launch())