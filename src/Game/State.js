class State {
  constructor(game) {
    this.game = game;
  }

  hash() {
    const {
        width: w,
        height: h,
        strikeLength: l,
        strikesCanOverlap: o 
    } = this.game.attributes;
    
    return `${[w,h,l,(o ? 1 : 0)].join(',')},${this.game.array().join(',')}`;
  }
}

exports.State = State;