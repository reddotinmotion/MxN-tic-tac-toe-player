const fs = require('fs');
const path = require('path');
const cliProgress = require('cli-progress');
const chalk = require('chalk');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const {Learner} = require('./Actors/Learner.js');
const {TicTacToe} = require('./Game/TicTacToe.js');
const log = console.log;

const width = argv.width === undefined ? 3 : parseInt(argv.width);
if (width < 3) {
  throw new Error('Expecting width to be greater than 3.');
}

const height = argv.height === undefined ? 3 : parseInt(argv.height);
if (height < 3) {
  throw new Error('Expecting height to be greater than 3.');
}

const strike = argv.strikeLength === undefined ? 3 : parseInt(argv.strikeLength);
if (strike < 3) {
  throw new Error('Expecting strike to be greater than 3.');
}

let continuous = true;
if (argv.strikesCanOverlap === 'false') {
  constinuous = false;
}

let threshold = Infinity;
if (parseInt(argv.threshold) >= 1) {
  threshold = parseInt(argv.threshold);
}

const append = argv.append === undefined ? true : !!argv.append;

const iterations = Math.max(1, parseInt(argv.iterations));

function filePath(prefix) {
  let filename = prefix;
  filename += '-' + width + 'x' + height;
  filename += '-strikeLength' + strike;
  filename += '-strikesCanOverlap' + (continuous ? 1 : 0);
  filename += '.json';

  return path.resolve(
      __dirname,
      'Experience',
      filename,
  );
}

const game = new TicTacToe(width, height, strike, continuous, threshold);
const player1 = new Learner(game, 'x');
const player2 = new Learner(game, 'o');

let Qx = null;
let Qo = null;
if (append) {
  log('[    ] Loading previous training experience.');

  try {
    if (!fs.existsSync(filePath('x'))) {
      fs.writeFileSync(filePath('x'), JSON.stringify({}));
    }
  } catch(err) {
    console.error(err);
  }

  Qx = fs.readFileSync(
      filePath('x'),
      {encoding: 'utf8', flag: 'r'},
  );  

  try {
    if (!fs.existsSync(filePath('o'))) {
      fs.writeFileSync(filePath('o'), JSON.stringify({}));
    }
  } catch(err) {
    console.error(err);
  }

  Qo = fs.readFileSync(
      filePath('o'),
      {encoding: 'utf8', flag: 'r'},
  );

  player2.preLearn(Qo);

  log(`[${chalk.green('Done')}] Loading previous training experience.`);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const progress = new cliProgress.SingleBar({
    format: `[    ] Playing Tic Tac Toe games ${numberWithCommas(iterations)} times: ` + '{bar}' + '| {percentage}% done, or {value} of {total} games played.',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});

let i = 1;
progress.start(iterations, 0);
while (i <= iterations) {
  progress.update(i);
  game.reset();

  while (!game.isOver()) {
    player1.try();
    if (!game.isOver()) {
      player2.try();
    }

    if (game.isOver()) {
      player1.learn();
      player2.learn();
    }
  }

  i = i + 1;
}
progress.stop();
log(`[${chalk.green('Done')}] Playing Tic Tac Toe games ${numberWithCommas(iterations)} times.`);

log('[    ] Exporting experience for X player.');
Qx = player1.export();
fs.writeFileSync(filePath('x'), Qx);
log(`[${chalk.green('Done')}] Exporting experience for X player.`);

log('[    ] Exporting experience for O player.');
Qo = player2.export();
fs.writeFileSync(filePath('o'), Qo);
log(`[${chalk.green('Done')}] Exporting experience for O player.`);