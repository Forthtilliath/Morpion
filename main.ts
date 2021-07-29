import { Logger } from './log';

Logger.log('TypeScript works!') ;

// détermine qui commence 
let player:Number = Math.floor(Math.random()*2);

const nbCol:Number = 3;
const nbLig:Number = 3;
const nbCases:Number = nbLig * nbCol;

let tabMorpion:Number[] = [... new Array(nbCases).keys()].map(x => -1);

tabMorpion = Array.from(9, (_, i) =>-1) ; 

Logger.log(player,tabMorpion);