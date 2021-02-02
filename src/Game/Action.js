const {isWholeNumber} = require('../utils.js');

class Action {
  constructor(game, marker) {
    this.game = game;
    this.marker = marker;
    this.cell = null;
    this.strikes = [];
    this.locked = false;

    if (Array.isArray(game)) {
      this.use(JSON.stringify(game))
    }
  }

  use(string) {
  	if (this.locked) {
  		throw new Error('Cannot modify a locked action.');
  	}

  	if (typeof string !== 'string') {
  		let message = 'Expected string to be of type string. ';
  		message += 'Got ' + (typeof string) + ' instead.';
  		throw new TypeError(message);
  	}

  	let array;
    try {
    	array = JSON.parse(string);
    } catch {
    	throw new Error('Error occured while parsing ' + string + '.');
    }

    if (!Array.isArray(array)) {
    	let message = 'Expected array to be an array. ';
    	message += 'Got ' + (typeof array) + ' instead.';
    	throw new TypeError(message);
    }

    if (array.length !== 3) {
    	let message = 'Expected array to be of length 3. ';
    	message += 'Got ' + array.length + ' instead.';
    	throw new TypeError(message);	
    }

    if (!isWholeNumber(array[0])) {
    	let message = 'Expected array[0] to be whole number. ';
    	message += 'Got ' + array[0] + ' instead.';
    	throw new TypeError(message);	
    }

    if (typeof array[1] !== 'string') {
    	let message = 'Expected array[1] to be string. ';
    	message += 'Got ' + (array[1] ) + ' instead.';
    	throw new TypeError(message);	
    }

    if (!Array.isArray(array[2])) {
    	let message = 'Expected array[2] to be an array. ';
    	message += 'Got ' + (typeof array[2]) + ' instead.';
    	throw new TypeError(message);	
    }

    this.cell = array[0];
	  this.marker = array[1];
	  this.strikes = array[2];
    this.locked = true;
  }

  hash() {
  	if (!this.locked) {
  		this.pick();
  	}

  	return JSON.stringify([this.cell, this.marker, this.strikes]);
  }

  pick() {
  	if (this.locked) {
  		return {
  			cell: this.cell,
  			marker: this.marker,
  			strikes: this.strikes.slice()
  		}
  	}

  	this.cell = this.game.random.empty();
  	this.strikes = this.game.random.strikables(this.cell, this.marker);
  	this.locked = true;

  	return {
		cell: this.cell,
		marker: this.marker,
		strikes: this.strikes.slice()
	}
  }
}

exports.Action = Action;