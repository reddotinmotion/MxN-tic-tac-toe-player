const {TicTacToeBoard} = require('../Game/TicTacToeBoard.js');
const {argMax} = require('../utils.js');

class Player {
  constructor(game) {
    if (!(game instanceof TicTacToeBoard)) {
      throw new TypeError('Expecting TicTacToeBoard');
    }

    this.game = game;
    this.identity = null;
    this.experience = null;
  }

  play(coordinate, firstMarker) {
    if (!['x', 'o'].includes(firstMarker)) {
      throw new Error('Expecting an "x" or an "o".');
    }

    if (this.identity === null) {
      this.identity = (firstMarker === 'x') ? 'o' : 'x';
    }

    const width = this.game.width;
    const height = this.game.height;

    if (!(Number.isInteger(coordinate[0]) &&
			Number.isInteger(coordinate[1]))) {
      throw Error('Expecting integer indexes.');
    }

    if (!(coordinate[0] >= 0 && coordinate[0] <= height)) {
      throw new Error('Vertical coordinate out of range.');
    }

    if (!((coordinate[1] >= 0 && coordinate[1] <= width))) {
      throw new Error('Horizontal coordinate out of range.');
    }

    if (this.experience === null) {
      const radius = this.game.rules.radiusOfStrike;
      const reuse = this.game.rules.reuseStrikedPositions;

      let filename = this.identity;
      filename += '-' + width + 'x' + height;
      filename += '-radius' + radius;
      filename += '-reuse' + (reuse ? 1 : 0);
      filename += '.json';
      this.experience = require('../Experience/' + filname);
    }

    let cell = width*coordinate[1] + coordinate[0];
    const result = this.game.mark(cell, firstMarker);

    cell = null;
    if (!this.game.isOver) {
			 cell = argMax(this.experience[result.state]);
			 if (cell !== null) {
			 	this.game.mark(cell);
			 }
    }

    return cell;
  }

  reset() {
    this.game.reset();
  }
}
