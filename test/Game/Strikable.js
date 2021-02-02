const {Strikable} = require('../../src/Game/Board/Strikable.js');
const {R2toR1} = require('../../src/utils.js');
const assert = require('assert');
const should = require('should');

describe('On a 3x3 board, Strikable', function() {
	it('should be able to make full strikes only made up of x.', function() {
		let board;
		let strikables;

		board = new Strikable(3,3,3,true);

		// Check cell 0 strikeables.
		board.initialize(R2toR1([
			['','x' ,'x' ],
			['' ,'',''  ],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(0, 'x');
		assert.deepEqual(strikables,[[0,1,2]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'x',''  ],
			['' ,'' ,'x']
		]));
		strikables = board.randomStrikables(0, 'x');
		assert.deepEqual(strikables,[[0,4,8]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['x' ,'',''  ],
			['x' ,'' ,'']
		]));
		strikables = board.randomStrikables(0, 'x');
		assert.deepEqual(strikables,[[0,3,6]]);

		// Check cell 1 strikeables.
		board.initialize(R2toR1([
			['x','' ,'x' ],
			['' ,'',''  ],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(1, 'x');
		assert.deepEqual(strikables,[[0,1,2]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'x',''  ],
			['' ,'x' ,'']
		]));
		strikables = board.randomStrikables(1, 'x');
		assert.deepEqual(strikables,[[1,4,7]]);

		// Check cell 2 strikeables.
		board.initialize(R2toR1([
			['x','x' ,'' ],
			['' ,'',''  ],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(2, 'x');
		assert.deepEqual(strikables,[[0,1,2]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'','x'  ],
			['' ,'' ,'x']
		]));
		strikables = board.randomStrikables(2, 'x');
		assert.deepEqual(strikables,[[2,5,8]]);

		// Check cell 3 strikeables.
		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'x','x'  ],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(3, 'x');
		assert.deepEqual(strikables,[[3,4,5]]);

		board.initialize(R2toR1([
			['x','' ,'' ],
			['' ,'',''  ],
			['x' ,'' ,'']
		]));
		strikables = board.randomStrikables(3, 'x');
		assert.deepEqual(strikables,[[0,3,6]]);

		// Check cell 4 strikeables.
		board.initialize(R2toR1([
			['','' ,'' ],
			['x' ,'','x'  ],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(4, 'x');
		assert.deepEqual(strikables,[[3,4,5]]);

		board.initialize(R2toR1([
			['','x' ,'' ],
			['' ,'',''  ],
			['' ,'x' ,'']
		]));
		strikables = board.randomStrikables(4, 'x');
		assert.deepEqual(strikables,[[1,4,7]])

		board.initialize(R2toR1([
			['x','' ,'' ],
			['' ,'',''  ],
			['' ,'' ,'x']
		]));
		strikables = board.randomStrikables(4, 'x');
		assert.deepEqual(strikables,[[0,4,8]]);

		board.initialize(R2toR1([
			['','' ,'x' ],
			['' ,'',''  ],
			['x' ,'' ,'']
		]));
		strikables = board.randomStrikables(4, 'x');
		assert.deepEqual(strikables,[[2,4,6]]);

		// Check cell 5 strikeables.
		board.initialize(R2toR1([
			['','' ,'x' ],
			['' ,'',''  ],
			['' ,'' ,'x']
		]));
		strikables = board.randomStrikables(5, 'x');
		assert.deepEqual(strikables,[[2,5,8]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['x' ,'x',''],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(5, 'x');
		assert.deepEqual(strikables,[[3,4,5]]);

		// Check cell 6 strikeables.
		board.initialize(R2toR1([
			['x','' ,'' ],
			['x' ,'',''],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(6, 'x');
		assert.deepEqual(strikables,[[0,3,6]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'',''],
			['' ,'x' ,'x']
		]));
		strikables = board.randomStrikables(6, 'x');
		assert.deepEqual(strikables,[[6,7,8]]);

		// Check cell 7 strikeables.
		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'',''],
			['x' ,'' ,'x']
		]));
		strikables = board.randomStrikables(7, 'x');
		assert.deepEqual(strikables,[[6,7,8]]);

		board.initialize(R2toR1([
			['','x' ,'' ],
			['' ,'x',''],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(7, 'x');
		assert.deepEqual(strikables,[[1,4,7]]);

		// Check cell 8 strikeables.
		board.initialize(R2toR1([
			['','' ,'x' ],
			['' ,'','x'],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(8, 'x');
		assert.deepEqual(strikables,[[2,5,8]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'',''],
			['x' ,'x' ,'']
		]));
		strikables = board.randomStrikables(8, 'x');
		assert.deepEqual(strikables,[[6,7,8]]);
	}),
	it('should be able to to make strikes only made up of o.', function() {
		let board;
		let strikables;

		board = new Strikable(3,3,3,true);

		// Check cell 0 strikeables.
		board.initialize(R2toR1([
			['','o' ,'o' ],
			['' ,'',''  ],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(0, 'o');
		assert.deepEqual(strikables,[[0,1,2]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'o',''  ],
			['' ,'' ,'o']
		]));
		strikables = board.randomStrikables(0, 'o');
		assert.deepEqual(strikables,[[0,4,8]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['o' ,'',''  ],
			['o' ,'' ,'']
		]));
		strikables = board.randomStrikables(0, 'o');
		assert.deepEqual(strikables,[[0,3,6]]);

		// Check cell 1 strikeables.
		board.initialize(R2toR1([
			['o','' ,'o' ],
			['' ,'',''  ],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(1, 'o');
		assert.deepEqual(strikables,[[0,1,2]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'o',''  ],
			['' ,'o' ,'']
		]));
		strikables = board.randomStrikables(1, 'o');
		assert.deepEqual(strikables,[[1,4,7]]);

		// Check cell 2 strikeables.
		board.initialize(R2toR1([
			['o','o' ,'' ],
			['' ,'',''  ],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(2, 'o');
		assert.deepEqual(strikables,[[0,1,2]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'','o'  ],
			['' ,'' ,'o']
		]));
		strikables = board.randomStrikables(2, 'o');
		assert.deepEqual(strikables,[[2,5,8]]);

		// Check cell 3 strikeables.
		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'o','o'  ],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(3, 'o');
		assert.deepEqual(strikables,[[3,4,5]]);

		board.initialize(R2toR1([
			['o','' ,'' ],
			['' ,'',''  ],
			['o' ,'' ,'']
		]));
		strikables = board.randomStrikables(3, 'o');
		assert.deepEqual(strikables,[[0,3,6]]);

		// Check cell 4 strikeables.
		board.initialize(R2toR1([
			['','' ,'' ],
			['o' ,'','o'  ],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(4, 'o');
		assert.deepEqual(strikables,[[3,4,5]]);

		board.initialize(R2toR1([
			['','o' ,'' ],
			['' ,'',''  ],
			['' ,'o' ,'']
		]));
		strikables = board.randomStrikables(4, 'o');
		assert.deepEqual(strikables,[[1,4,7]])

		board.initialize(R2toR1([
			['o','' ,'' ],
			['' ,'',''  ],
			['' ,'' ,'o']
		]));
		strikables = board.randomStrikables(4, 'o');
		assert.deepEqual(strikables,[[0,4,8]]);

		board.initialize(R2toR1([
			['','' ,'o' ],
			['' ,'',''  ],
			['o' ,'' ,'']
		]));
		strikables = board.randomStrikables(4, 'o');
		assert.deepEqual(strikables,[[2,4,6]]);

		// Check cell 5 strikeables.
		board.initialize(R2toR1([
			['','' ,'o' ],
			['' ,'',''  ],
			['' ,'' ,'o']
		]));
		strikables = board.randomStrikables(5, 'o');
		assert.deepEqual(strikables,[[2,5,8]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['o' ,'o',''],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(5, 'o');
		assert.deepEqual(strikables,[[3,4,5]]);

		// Check cell 6 strikeables.
		board.initialize(R2toR1([
			['o','' ,'' ],
			['o' ,'',''],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(6, 'o');
		assert.deepEqual(strikables,[[0,3,6]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'',''],
			['' ,'o' ,'o']
		]));
		strikables = board.randomStrikables(6, 'o');
		assert.deepEqual(strikables,[[6,7,8]]);

		// Check cell 7 strikeables.
		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'',''],
			['o' ,'' ,'o']
		]));
		strikables = board.randomStrikables(7, 'o');
		assert.deepEqual(strikables,[[6,7,8]]);

		board.initialize(R2toR1([
			['','o' ,'' ],
			['' ,'o',''],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(7, 'o');
		assert.deepEqual(strikables,[[1,4,7]]);

		// Check cell 8 strikeables.
		board.initialize(R2toR1([
			['','' ,'o' ],
			['' ,'','o'],
			['' ,'' ,'']
		]));
		strikables = board.randomStrikables(8, 'o');
		assert.deepEqual(strikables,[[2,5,8]]);

		board.initialize(R2toR1([
			['','' ,'' ],
			['' ,'',''],
			['o' ,'o' ,'']
		]));
		strikables = board.randomStrikables(8, 'o');
		assert.deepEqual(strikables,[[6,7,8]]);
	}),
	it('should return multiple strikes when strikes of x can overlap.', function() {
		let board;
		let strikables;

		board = new Strikable(3,3,3,true);

		// Check cell 0 strikeables.
		board.initialize(R2toR1([
			['','x' ,'x' ],
			['x' ,'x',''  ],
			['x' ,'' ,'x']
		]));
		strikables = board.randomStrikables(0, 'x');
		strikables.should.containEql([0,1,2]);
		strikables.should.containEql([0,4,8]);
		strikables.should.containEql([0,3,6]);

		// Check cell 1 strikeables.
		board.initialize(R2toR1([
			['x','' ,'x' ],
			['' ,'x',''  ],
			['' ,'x' ,'']
		]));
		strikables = board.randomStrikables(1, 'x');
		strikables.should.containEql([0,1,2]);
		strikables.should.containEql([1,4,7]);

		board.initialize(R2toR1([
			['x','x' ,'' ],
			['' ,'x','x'  ],
			['x' ,'' ,'x']
		]));
		strikables = board.randomStrikables(2, 'x');
		strikables.should.containEql([0,1,2]);
		strikables.should.containEql([2,4,6]);
		strikables.should.containEql([2,5,8]);

		board.initialize(R2toR1([
			['x','' ,'' ],
			['' ,'x','x'  ],
			['x' ,'' ,'']
		]));
		strikables = board.randomStrikables(3, 'x');
		strikables.should.containEql([0,3,6]);
		strikables.should.containEql([3,4,5]);

		board.initialize(R2toR1([
			['x','x' ,'x' ],
			['x' ,'','x'  ],
			['x' ,'x' ,'x']
		]));
		strikables = board.randomStrikables(4, 'x');
		strikables.should.containEql([3,4,5]);
		strikables.should.containEql([1,4,7]);
		strikables.should.containEql([2,4,6]);
		strikables.should.containEql([0,4,8]);

		board.initialize(R2toR1([
			['','' ,'x' ],
			['x' ,'x',''  ],
			['' ,'' ,'x']
		]));
		strikables = board.randomStrikables(5, 'x');
		strikables.should.containEql([3,4,5]);
		strikables.should.containEql([2,5,8]);

		board.initialize(R2toR1([
			['x','' ,'' ],
			['x' ,'',''  ],
			['' ,'x' ,'x']
		]));
		strikables = board.randomStrikables(6, 'x');
		strikables.should.containEql([6,7,8]);
		strikables.should.containEql([0,3,6]);

		board.initialize(R2toR1([
			['','x' ,'' ],
			['' ,'x',''  ],
			['x' ,'' ,'x']
		]));
		strikables = board.randomStrikables(7, 'x');
		strikables.should.containEql([6,7,8]);
		strikables.should.containEql([1,4,7]);

		board.initialize(R2toR1([
			['','' ,'x' ],
			['' ,'','x'  ],
			['x' ,'x' ,'']
		]));
		strikables = board.randomStrikables(8, 'x');
		strikables.should.containEql([6,7,8]);
		strikables.should.containEql([2,5,8]);
	}),
	it('should return multiple strikes when strikes of o can overlap.', function() {
		let board;
		let strikables;

		board = new Strikable(3,3,3,true);

		// Check cell 0 strikeables.
		board.initialize(R2toR1([
			['','o' ,'o' ],
			['o' ,'o',''  ],
			['o' ,'' ,'o']
		]));
		strikables = board.randomStrikables(0, 'o');
		strikables.should.containEql([0,1,2]);
		strikables.should.containEql([0,4,8]);
		strikables.should.containEql([0,3,6]);


		board.initialize(R2toR1([
			['o','' ,'o' ],
			['' ,'o',''  ],
			['' ,'o' ,'']
		]));
		strikables = board.randomStrikables(1, 'o');
		strikables.should.containEql([0,1,2]);
		strikables.should.containEql([1,4,7]);

		board.initialize(R2toR1([
			['o','o' ,'' ],
			['' ,'o','o'  ],
			['o' ,'' ,'o']
		]));
		strikables = board.randomStrikables(2, 'o');
		strikables.should.containEql([0,1,2]);
		strikables.should.containEql([2,4,6]);
		strikables.should.containEql([2,5,8]);

		board.initialize(R2toR1([
			['o','' ,'' ],
			['' ,'o','o'  ],
			['o' ,'' ,'']
		]));
		strikables = board.randomStrikables(3, 'o');
		strikables.should.containEql([0,3,6]);
		strikables.should.containEql([3,4,5]);

		board.initialize(R2toR1([
			['o','o' ,'o' ],
			['o' ,'','o'  ],
			['o' ,'o' ,'o']
		]));
		strikables = board.randomStrikables(4, 'o');
		strikables.should.containEql([3,4,5]);
		strikables.should.containEql([1,4,7]);
		strikables.should.containEql([2,4,6]);
		strikables.should.containEql([0,4,8]);

		board.initialize(R2toR1([
			['','' ,'o' ],
			['o' ,'o',''  ],
			['' ,'' ,'o']
		]));
		strikables = board.randomStrikables(5, 'o');
		strikables.should.containEql([3,4,5]);
		strikables.should.containEql([2,5,8]);

		board.initialize(R2toR1([
			['o','' ,'' ],
			['o' ,'',''  ],
			['' ,'o' ,'o']
		]));
		strikables = board.randomStrikables(6, 'o');
		strikables.should.containEql([6,7,8]);
		strikables.should.containEql([0,3,6]);

		board.initialize(R2toR1([
			['','o' ,'' ],
			['' ,'o',''  ],
			['o' ,'' ,'o']
		]));
		strikables = board.randomStrikables(7, 'o');
		strikables.should.containEql([6,7,8]);
		strikables.should.containEql([1,4,7]);

		board.initialize(R2toR1([
			['','' ,'o' ],
			['' ,'','o'  ],
			['o' ,'o' ,'']
		]));
		strikables = board.randomStrikables(8, 'o');
		strikables.should.containEql([6,7,8]);
		strikables.should.containEql([2,5,8]);
	}),
	it('should return only one strike when strikes of x cannot overlap', function() {
		let board;
		let strikables;

		board = new Strikable(3,3,3,false);
		board.initialize(R2toR1([
			['','x' ,'x' ],
			['x' ,'x','' ],
			['x' ,'' ,'x']
		]));
		strikables = board.randomStrikables(0, 'x');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[0,1,2],[0,4,8],[0,3,6]].should.containEql(strikables);

		// Check cell 1 strikeables.
		board.initialize(R2toR1([
			['x','' ,'x' ],
			['' ,'x',''  ],
			['' ,'x' ,'']
		]));
		strikables = board.randomStrikables(1, 'x');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[0,1,2],[1,4,7]].should.containEql(strikables);

		board.initialize(R2toR1([
			['x','x' ,'' ],
			['' ,'x','x'  ],
			['x' ,'' ,'x']
		]));
		strikables = board.randomStrikables(2, 'x');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[0,1,2],[2,4,6],[2,5,8]].should.containEql(strikables);

		board.initialize(R2toR1([
			['x','' ,'' ],
			['' ,'x','x'  ],
			['x' ,'' ,'']
		]));
		strikables = board.randomStrikables(3, 'x');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[0,3,6],[3,4,5]].should.containEql(strikables);

		board.initialize(R2toR1([
			['x','x' ,'x' ],
			['x' ,'','x'  ],
			['x' ,'x' ,'x']
		]));
		strikables = board.randomStrikables(4, 'x');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[3,4,5],[1,4,7],[2,4,6],[0,4,8]].should.containEql(strikables);

		board.initialize(R2toR1([
			['','' ,'x' ],
			['x' ,'x',''  ],
			['' ,'' ,'x']
		]));
		strikables = board.randomStrikables(5, 'x');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[3,4,5],[2,5,8]].should.containEql(strikables);

		board.initialize(R2toR1([
			['x','' ,'' ],
			['x' ,'',''  ],
			['' ,'x' ,'x']
		]));
		strikables = board.randomStrikables(6, 'x');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[6,7,8],[0,3,6]].should.containEql(strikables);

		board.initialize(R2toR1([
			['','x' ,'' ],
			['' ,'x',''  ],
			['x' ,'' ,'x']
		]));
		strikables = board.randomStrikables(7, 'x');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[6,7,8],[1,4,7]].should.containEql(strikables);

		board.initialize(R2toR1([
			['','' ,'x' ],
			['' ,'','x'  ],
			['x' ,'x' ,'']
		]));
		strikables = board.randomStrikables(8, 'x');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[6,7,8],[2,5,8]].should.containEql(strikables);
	}),
	it('should return only one strike when strikes of o cannot overlap', function() {
		let board;
		let strikables;

		board = new Strikable(3,3,3,false);
		board.initialize(R2toR1([
			['','o' ,'o' ],
			['o' ,'o','' ],
			['o' ,'' ,'o']
		]));
		strikables = board.randomStrikables(0, 'o');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[0,1,2],[0,4,8],[0,3,6]].should.containEql(strikables);

		// Check cell 1 strikeables.
		board.initialize(R2toR1([
			['o','' ,'o' ],
			['' ,'o',''  ],
			['' ,'o' ,'']
		]));
		strikables = board.randomStrikables(1, 'o');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[0,1,2],[1,4,7]].should.containEql(strikables);

		board.initialize(R2toR1([
			['o','o' ,'' ],
			['' ,'o','o'  ],
			['o' ,'' ,'o']
		]));
		strikables = board.randomStrikables(2, 'o');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[0,1,2],[2,4,6],[2,5,8]].should.containEql(strikables);

		board.initialize(R2toR1([
			['o','' ,'' ],
			['' ,'o','o'  ],
			['o' ,'' ,'']
		]));
		strikables = board.randomStrikables(3, 'o');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[0,3,6],[3,4,5]].should.containEql(strikables);

		board.initialize(R2toR1([
			['o','o' ,'o' ],
			['o' ,'','o'  ],
			['o' ,'o' ,'o']
		]));
		strikables = board.randomStrikables(4, 'o');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[3,4,5],[1,4,7],[2,4,6],[0,4,8]].should.containEql(strikables);

		board.initialize(R2toR1([
			['','' ,'o' ],
			['o' ,'o',''  ],
			['' ,'' ,'o']
		]));
		strikables = board.randomStrikables(5, 'o');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[3,4,5],[2,5,8]].should.containEql(strikables);

		board.initialize(R2toR1([
			['o','' ,'' ],
			['o' ,'',''  ],
			['' ,'o' ,'o']
		]));
		strikables = board.randomStrikables(6, 'o');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[6,7,8],[0,3,6]].should.containEql(strikables);

		board.initialize(R2toR1([
			['','o' ,'' ],
			['' ,'o',''  ],
			['o' ,'' ,'o']
		]));
		strikables = board.randomStrikables(7, 'o');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[6,7,8],[1,4,7]].should.containEql(strikables);

		board.initialize(R2toR1([
			['','' ,'o' ],
			['' ,'','o'  ],
			['o' ,'o' ,'']
		]));
		strikables = board.randomStrikables(8, 'o');
		strikables = strikables.length > 0 ? strikables[0]: [];
		[[6,7,8],[2,5,8]].should.containEql(strikables);
	});
})