import { Logger } from './log';
import * as Utils from './utils';

// détermine qui commence 
let player: Number = Math.floor(Math.random() * 2);

const nbCol: Number = 3;
const nbLig: Number = 3;
const nbCases: Number = nbLig * nbCol;

Logger.log('test');
// génère un tableau de -1
let tabMorpion = Utils.createArrayOfValues(nbCases, -1);

Logger.log(player, tabMorpion);