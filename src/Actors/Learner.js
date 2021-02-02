const {TicTacToe} = require('../Game/TicTacToe.js');
const {State} = require('../Game/State.js');
const {Action} = require('../Game/Action.js');
const {argMax, hasKeys, max} = require('../utils.js');

class Learner {
  constructor(
      game,
      marker = '',
      learningRate = 0.1,
      explorationRate = 0.3,
      discountRate = 0.99,
  ) {
    this.marker = marker;
    this.moves = [];

    this.Q = {};
    this.a = learningRate;
    this.e = explorationRate;
    this.g = discountRate;

    if (!(game instanceof TicTacToe)) {
      throw new TypeError('Expecting intance of TicTacToe.');
    }

    this.game = game;
  }

  preLearn(Q) {
    if (typeof Q !== 'string') {
      throw new TypeError('Expecting a JSON string.');
    }

    this.Q = JSON.parse(Q);
  }

  try(action) {
    if (this.e === 0) {
      if (action === undefined) {
        let message = `Exploration rate is 0 so you need to specify an Action to take.`;
        throw new Error(message);  
      }
    }

    if (action === undefined) {
       action = new Action(this.game, this.marker);
    }

    if (!(action instanceof Action)) {
      let message = 'Expecting action to be and Action object. ';
      message += `Got ${typeof action} instead. `;
      throw new Error(message);
    }

    let state = new State(this.game).hash();

    if (Math.random() > this.e && hasKeys(this.Q[state])) {
      action.use(argMax(this.Q[state]));
    }

    this.moves.push({
      state: state,
      action: action.hash(),
      score: this.game.play(action),
    });
  }

  learn() {
    let state;
    let action;
    let score;
    let Q = 0;
    let q = 0;
    const a = this.a;
    const g = this.g;

    const rewards = this.game.finalRewards();
    let me = this.marker;
    let other = this.marker === 'x' ? 'o' : 'x';
    let mine;
    if (rewards[me].move === null || rewards[other].move === null) {
      if (rewards[me].move === null && rewards[other].move === null) {
        mine = this.moves.length;
      }
      if (rewards[me].move !== null && rewards[other].move === null ) {
        mine = rewards[me].move;
      }
      if (rewards[me].move === null && rewards[other].move !== null) {
        mine = rewards[other].move - 1;
      }
    } else {
      mine = rewards[me].move;
    }

    let l = mine - 1;
    this.moves[l].score = rewards[me].reward;

    while (l >= 0) {
      state = this.moves[l].state;
      action = this.moves[l].action;
      score = this.moves[l].score;

      if (this.Q[state] === undefined) {
        this.Q[state] = {};
        this.Q[state][action] = 0;
      }

      if (this.Q[state][action] === undefined) {
        this.Q[state][action] = 0;
      }

      Q = this.Q[state][action];
      this.Q[state][action] = a*(score  + g*q) + (1-a)*Q;

      q = max(this.Q[state]);

      l = l - 1;
    }
  }

  export() {
    return JSON.stringify(this.Q);
  }

  reset() {
    this.moves = [];
  }
}

exports.Learner = Learner;
