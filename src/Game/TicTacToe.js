const {Strikable} = require('./Board/Strikable.js');
const {Action} = require('./Action.js');
const {sequence, isWholeNumber, shuffle} = require('../utils.js');

class TicTacToe {
  constructor(
      width = 3,
      height = 3,
      strikeLength = 3,
      strikesCanOverlap = false,
      strikeThreshold = 1
  ) {
    this.numberOfStrikes = {
      x: 0,
      o: 0,
    };
    this.over = false;
    this.board = new Strikable(width, height, strikeLength, strikesCanOverlap);
    
    this.moves = {
      x: 0,
      o: 0
    };

    this.lastScoredMoves = {
      x: null,
      o: null
    };

    this.strikeThreshold = strikeThreshold;
  }

  get attributes() {
    return {...this.board.attributes};
  }

  array() {
    return this.board.array();
  }

  get random() {
    const board = this.board;
    return {
      strikables: function(center, marker) {
        return board.randomStrikables(center, marker);
      },
      empty: function() {
        return board.randomEmptyCell();
      }
    }
  }

  mark(cell, marker) {
    if (this.isOver()) {
      let message = 'You cannot mark on the board when the game is over. ';
      throw new Error(message);
    }

    if (!isWholeNumber(cell)) {
      let message = 'Expecting cell to be whole number. ';
      message += `${cell} given. `;
      throw new TypeError(message);
    }

    if (typeof marker !== 'string') {
      let message = 'Expecting marker to be string. ';
      message += `${typeof marker} given. `;
      throw new TypeError(message);
    }

    const lastMarker = this.board.lastMarked.symbol;
    const expectedMarker = (
      this.board.markers.x === lastMarker ?
      this.board.markers.o :
      this.board.markers.x
    );

    if (marker !== expectedMarker) {
      let message = `Expecting marker to be ${expectedMarker}. `;
      message += `Got ${marker} instead. `; 
      throw new Error(message);
    }

    this.board.mark(cell, marker);
  }

  isOver() {
    return this.over || this.board.isFull();
  }

  end() {
    this.over = true;
  }

  finalRewards() {
    if (!this.isOver()) {
      let message = 'You cannot collect rewards when the game is over. ';
      message += 'Finish the game first. ';
      throw new Error(message);
    }

    const {x, o} = this.numberOfStrikes;
    const width = this.board.attributes.width;
    const height = this.board.attributes.height;
    const area = width * height;
    const {x: xi, o: oi} = this.lastScoredMoves;

    if (x === o) {
      return {
        x: {move: xi, reward: -area},
        o: {move: oi, reward: -area},
      };
    }

    if (x > o) {
      return {
        x: {move: xi, reward: area},
        o: {move: oi, reward: -area},
      };
    }

    if (o > x) {
      return {
        x: {move: xi, reward: -area},
        o: {move: oi, reward: area},
      };
    }
  }

  play(action) {
    if (this.isOver()) {
      let message = 'You cannot play when the game is over. Reset first. ';
      throw new Error(message);
    }
    
    if (!(action instanceof Action)) {
      let message = 'Expecting action to be instance of Action. ';
      message += `${typeof action} given. `;
      throw new TypeError(message);
    }

    const {
      cell,
      marker,
      strikes
    } = action.pick()

    this.mark(cell, marker);

    let numberOfStrikesToMake = strikes.length;
    if (!this.strikesCanOverlap) {
      if (strikes.length >= 1) {
        numberOfStrikesToMake = 1;  
      }
    } 

    const numberOfStrikes = this.numberOfStrikes[marker];

    for (let i = 0; i < numberOfStrikesToMake; i += 1) {
      if (this.board.isStrikable(strikes[i], cell, marker)) {
        this.board.strike(strikes[i], cell, marker);
        this.numberOfStrikes[marker] += 1;
      }
    }

    const score = this.numberOfStrikes[marker] - numberOfStrikes;

    this.moves[marker] += 1;

    if (score !== 0) {
       this.lastScoredMoves[marker] = this.moves[marker];
    }

    if (this.numberOfStrikes.x >= this.strikeThreshold &&
        this.numberOfStrikes.o >= this.strikeThreshold) {
      this.end();
    }

    return score;
  }

  reset() {
    this.board.reset();
    this.numberOfStrikes = {
      x: 0,
      o: 0,
    };
    this.over = false;
    this.moves = {
      x: 0,
      o: 0
    };

    this.lastScoredMoves = {
      x: null,
      o: null
    };
  }
}

exports.TicTacToe = TicTacToe;
