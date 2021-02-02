const {Markable} = require('./Markable.js');
const {Action} = require('../Action.js');
const {sequence, isWholeNumber, shuffle} = require('../../utils.js');

class Strikable extends Markable {
  
  constructor(
      width = 3,
      height = 3,
      strikeLength = 3,
      strikesCanOverlap = false
  ) {
    super(width, height);
    this.strikeLength = strikeLength;
    this.strikesCanOverlap = strikesCanOverlap;
  }

  get attributes() {
    return {
      width: this.width,
      height: this.height,
      strikeLength: this.strikeLength,
      strikesCanOverlap: this.strikesCanOverlap
    }
  }

  isStrikable(cells, center, marker) {
    if (!Array.isArray(cells)) {
      let message = 'Expecting cells to be array. ';
      message += `${typeof cells} given. `;
      throw new Error(message);
    }

    if (cells.length !== this.strikeLength) {
      let message = 'Number of cells does not match strike length. ';
      message += `Expected ${this.strikeLength}, got ${cells.length} instead. `;
      throw new Error(message);
    }

    if (!isWholeNumber(center)) {
      let message = `Expecting center to be a whole number. `;
      message += `Got ${center} instead. `;
      throw new Error(message); 
    }

    if (center >= this.width * this.height) {
      let message = 'Expecting cell to be within bounds ';
      message += `[0, ${this.width * this.height}]. `;
      message += `Got ${center} instead. `; 
      throw new Error(message);
    }

    if (typeof marker !== 'string') {
      let message = 'Expecting marker to be a string. ';
      message += `Got ${typeof marker} instead. `;
      throw new Error(message);
    }

    if (![this.markers.x, this.markers.o].includes(marker)) {
      let message = 'Expecting marker to be either ';
      message += `${this.markers.x} or ${this.markers.o}. `;
      message += `Got ${marker} instead. `
      throw new Error(message);
    }

    const pattern = [];
    for (let i = 0; i < cells.length; i += 1) {
      if (!(cells[i] >= 0 && cells[i] < this.width * this.height)) {
        let message = 'Expecting cell to be within bounds ';
        message += `[0, ${this.width * this.height}]. `;
        message += `Got ${cells[i]} instead in cells ${JSON.stringify(cells)}. `
        throw new Error(message);
      }

      if (cells[i] !== center) {
        pattern.push(this.cells[cells[i]]);
      }
    }

    if (this.strikesCanOverlap) {
      if (pattern.every((mark) => mark.toLowerCase() === marker)) {
        return true;
      }

      return false;
    }

    if (pattern.every((mark) => mark === marker)) {
      return true;
    }

    return false;
  }

  strike(cells, center, marker) {
    if (!Array.isArray(cells)) {
      let message = 'Expecting cells to be array. ';
      message += `${typeof cells} given. `;
      throw new Error(message);
    }

    if (cells.length !== this.strikeLength) {
      let message = 'Number of cells does not match strike length. ';
      message += `Expected ${this.strikeLength}, got ${cells.length} instead. `;
      throw new Error(message);
    }

    if (!isWholeNumber(center)) {
      let message = `Expecting center to be a whole number. `;
      message += `Got ${center} instead. `;
      throw new Error(message); 
    }

    if (center >= this.width * this.height) {
      let message = 'Expecting cell to be within bounds ';
      message += `[0, ${this.width * this.height}]. `;
      message += `Got ${center} instead. `; 
      throw new Error(message);
    }

    if (typeof marker !== 'string') {
      let message = 'Expecting marker to be a string. ';
      message += `Got ${typeof marker} instead. `;
      throw new Error(message);
    }

    if (![this.markers.x, this.markers.o].includes(marker)) {
      let message = 'Expecting marker to be either ';
      message += `${this.markers.x} or ${this.markers.o}. `;
      message += `Got ${marker} instead. `
      throw new Error(message);
    }

    if (!this.isStrikable(cells, center, marker)) {
      let message = 'You are trying to strike unstrikable cells. ';
      message += `Attempted to strike [${cells.join(', ')}] `;
      message += `with center ${center} and consisting of `;
      message += `${marker} sequence. `
      throw new Error(message);      
    }

    for (let i = 0; i < cells.length; i += 1) {
      this.cells[cells[i]] = this.cells[cells[i]].toUpperCase();
    }
  }

  randomStrikables(center, marker) {
    if (!isWholeNumber(center)) {
      let message = `Expecting center to be a whole number. `;
      message += `Got ${center} instead. `;
      throw new Error(message); 
    }

    if (center >= this.width * this.height) {
      let message = 'Expecting cell to be within bounds ';
      message += `[0, ${this.width * this.height}]. `;
      message += `Got ${center} instead. `; 
      throw new Error(message);
    }

    if (typeof marker !== 'string') {
      let message = 'Expecting marker to be a string. ';
      message += `Got ${typeof marker} instead. `;
      throw new Error(message);
    }

    if (![this.markers.x, this.markers.o].includes(marker)) {
      let message = 'Expecting marker to be either ';
      message += `${this.markers.x} or ${this.markers.o}. `;
      message += `Got ${marker} instead. `
      throw new Error(message);
    }

    const w = this.width;
    const h = this.height;
    const p = center;
    const deltaR = 1;
    const deltaC = w;
    const deltaB = w + 1;
    const deltaF = w - 1;

    const adj = {
      E: p + deltaR,
      W: p - deltaR,
      N: p - deltaC,
      S: p + deltaC,
      SE: p + deltaB,
      NW: p - deltaB,
      SW: p + deltaF,
      NE: p - deltaF,
    };

    const _ = this;
    Object.keys(adj).map(function(dir) {
      if (!(adj[dir] >= 0 && adj[dir] < w*h)) {
        adj[dir] = false;
      } else {
        if (_.strikesCanOverlap) {
          adj[dir] = _.cells[adj[dir]].toLowerCase() === marker;
        } else {
          adj[dir] = _.cells[adj[dir]] === marker;
        }
      }
    });

    if (!adj.E && !adj.NE && !adj.N && !adj.NW &&
        !adj.W && !adj.SW && !adj.S && !adj.SE) {
      return [];
    }

    const r = this.strikeLength;
    const x = p % w;
    const y = Math.floor(p/w);

    const boundaries = [];
    const indexes = sequence(-(r - 1), 1, 2*r - 1);
    let boundary;

    boundary = (indexes
      .map((index) => [x + index, y])
      .filter((coordinate) => coordinate[0] >= 0 && coordinate[1] >= 0)
      .filter((coordinate) => coordinate[0] < w && coordinate[1] < h)
      .map((coordinate) => coordinate[1]*w + coordinate[0]));

    if (boundary.length >= r) {
      boundary.sort((a, b) => a - b);
      boundaries.push(boundary);
    }

    boundary = (indexes
      .map((index) => [x, y + index])
      .filter((coordinate) => coordinate[0] >= 0 && coordinate[1] >= 0)
      .filter((coordinate) => coordinate[0] < w && coordinate[1] < h)
      .map((coordinate) => coordinate[1]*w + coordinate[0]));

    if (boundary.length >= r) {
      boundary.sort((a, b) => a - b);
      boundaries.push(boundary);
    }

    boundary = (indexes
      .map((index) => [x + index, y - index])
      .filter((coordinate) => coordinate[0] >= 0 && coordinate[1] >= 0)
      .filter((coordinate) => coordinate[0] < w && coordinate[1] < h)
      .map((coordinate) => coordinate[1]*w + coordinate[0]));

    if (boundary.length >= r) {
      boundary.sort((a, b) => a - b);
      boundaries.push(boundary);
    }

    boundary = (indexes
      .map((index) => [x + index, y + index])
      .filter((coordinate) => coordinate[0] >= 0 && coordinate[1] >= 0)
      .filter((coordinate) => coordinate[0] < w && coordinate[1] < h)
      .map((coordinate) => coordinate[1]*w + coordinate[0]));

    if (boundary.length >= r) {
      boundary.sort((a, b) => a - b);
      boundaries.push(boundary);
    }

    if (boundaries.length === 0) {
      return [];
    }

    if (!this.strikesCanOverlap) {
      shuffle(boundaries);
      
      for (let i = 0; i < boundaries.length; i += 1) {
        let boundaryLength = boundaries[i].length;

        if (boundaryLength < r) {
          continue;
        }

        let starts = sequence(0, 1, boundaryLength - r + 1);

        for (let j = 0; j < starts.length; j += 1) {
          let segment = boundaries[i].slice(starts[j], starts[j] + r);
          if (this.isStrikable(segment, center, marker)) {
            return [segment];
          }
        }
      }

      return [];
    }

    const segments = [];
    for (let k = 0; k < boundaries.length; k += 1) {
      let boundaryLength = boundaries[k].length;
      
      if (boundaryLength >= r) {
        let starts = sequence(0, 1, boundaryLength - r + 1);
        for (let l = 0; l < starts.length; l += 1) {
          let segment = boundaries[k].slice(starts[l], starts[l] + r);
          if (this.isStrikable(segment, center, marker)) {
            segments.push(segment);
          }
        }  
      }
      
    }

    return segments;
  }
}

exports.Strikable = Strikable;
