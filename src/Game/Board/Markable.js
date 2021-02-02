const {sequence, isWholeNumber, shuffle} = require('../../utils.js');

class Markable {
  constructor(width = 3, height = 3) {
    this.width = width;
    this.height = height;
    this.symbols = {
      x: 'x',
      o: 'o',
      _: '',
      X: 'X',
      O: 'O'
    };
    this.cells = Array(width * height).fill(this.symbols._);
    this.emptyCells = sequence(0, 1, width * height);
    this.lastMarkedCell = {cell: null, symbol: null};
  }

  get markers() {
    return {
      x: this.symbols.x,
      o: this.symbols.o
    }
  }

  get lastMarked() {
    return {...this.lastMarkedCell};
  }

  initialize(array) {
    if (!Array.isArray(array)) {
      let message = 'Expected array to be an array. ';
      message += 'Got ' + (typeof array) + ' instead.';
      throw new TypeError(message);
    }

    if(array.length !== this.width * this.height) {
      let message = 'Expected array to be of length ' ;
      message += this.width * this.height + '. '; 
      message += 'Got ' + array.length + ' instead.';
      throw new TypeError(message); 
    }
    
    const symbols = Object.values(this.symbols);
    for (let i = 0; i < this.width * this.height; i+= 1) {
      if (!symbols.includes(array[i])) {
        let message = 'array contains disallowed symbols. ';
        message += array[i] + ' encountered.';
        throw new Error(message);
      }
    }
    this.cells = array.slice();

    this.emptyCells = [];
    for (let i = 0; i < this.width * this.height; i++) {
      if (this.cells[i] === this.symbols._) {
        this.emptyCells.push(i)
      }
    }
    this.lastMarkedCell = {cell: null, marker: null};
  }

  reset() {
    this.cells = Array(this.width * this.height).fill(this.symbols._);
    this.emptyCells = sequence(0, 1, this.width * this.height);
    this.lastMarkedCell = {cell: null, marker: null};
  }

  array() {
    return this.cells.slice();
  }

  isFull() {
    return this.emptyCells.length === 0;
  }

  randomEmptyCell() {
    if (this.emptyCells.length === 0) {
      return null;
    }

    return this.emptyCells[
        Math.floor(Math.random() * Math.floor(this.emptyCells.length))
    ];
  }

  mark(cell, marker) {
    if (!isWholeNumber(cell)) {
      let message = 'Expecting cell to be whole number. ';
      message += cell + ' given.';
      throw new TypeError(message);
    }

    if (cell >= this.width * this.height) {
      throw new TypeError('Expecting cell to be within bounds.');
    }

    if (![this.symbols.x, this.symbols.o].includes(marker)) {
      let message = 'Expecting marker to be valid board marker. ';
      message += marker + ' given.';
      throw new TypeError(message);
    }

    if (this.cells[cell] !== this.symbols._) {
      let message = 'Position is already filled before. ';
      message += 'Attempted to mark cell ' + cell;
      message += ' with ' + marker + '.';

      throw new TypeError(message);
    } else {
      this.cells[cell] = marker;
      this.emptyCells.splice(this.emptyCells.indexOf(cell), 1);
      this.lastMarkedCell = {cell: cell, symbol: marker};
    }
  }
}

exports.Markable = Markable;
