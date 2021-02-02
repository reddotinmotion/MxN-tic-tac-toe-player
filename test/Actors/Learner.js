const {TicTacToe} = require('../../src/Game/TicTacToe.js');
const {Learner} = require('../../src/Actors/Learner.js');
const {Action} = require('../../src/Game/Action.js');
const {R2toR1} = require('../../src/utils.js');
const assert = require('assert');
const should = require('should');

const game = new TicTacToe(3,3,3,false);
const learnerX = new Learner(game, 'x');
const learnerO = new Learner(game, 'o');

learnerX.try(new Action([6,'x',[]]));
learnerO.try(new Action([7,'o',[]]));
learnerX.try(new Action([4,'x',[]]));
learnerO.try(new Action([5,'o',[]]));
learnerX.try(new Action([2,'x',[[2,4,6]]]));
learnerO.try(new Action([1,'o',[]]));
learnerX.try(new Action([0,'x',[]]));
game.end();

learnerX.learn();
console.log(learnerX.export());

learnerO.learn();
console.log(learnerO.export());