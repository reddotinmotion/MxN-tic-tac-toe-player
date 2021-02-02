function argMax(object) {
  if (typeof object !== 'object') {
    throw new TypeError('Expecting object to be Object.')
  }

  const keys = Object.keys(object);
  if (keys.length === 0) {
  	return null;
  }

  return keys.reduce(function(a, b) { 
    return object[a] > object[b] ? a : b;
  });
}

function shuffle(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('Expecting array to be Array.')
  }

  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function isWholeNumber(number) {
  return Number.isInteger(number) && number >= 0;
}

function sequence(start, step, numberOfItems) {
  if (typeof start !== 'number') {
    throw new TypeError('Expecting start to be a number.');
  }

  if (typeof step !== 'number') {
    throw new TypeError('Expecting step to be a number.');
  }

  if (!isWholeNumber(numberOfItems)) {
    throw new TypeError('Execting numberOfItems to be a whole number.');
  }

  const array = [];

  for (let i = 0; i < numberOfItems; i += 1) {
    array.push(start + i*step);
  }

  return array;
}

function hasKeys(obj) {
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).length > 0;
  }
  
  return false;
}

function R2toR1(array, height, width) {
  let i, j;
  let list = [];
  
  for (i = 0; i < array.length; i += 1) {
    for (j = 0; j < array[i].length; j += 1) {
      list.push(array[i][j]);
    }
  }

  return list.slice();
}

function max(object) {
  if (typeof object === 'object' && object !== null) {
    if (hasKeys(object)) {
      return Math.max(...Object.values(object));  
    }
    
    let message = 'Expecting object to have attributes.'
    throw new Error(message);
  }
  
  let message = 'Expecting object to be of type object. '
  message += `Got ${typeof object} instead. `
  throw new TypeError(message);
}

exports.max = max;
exports.argMax = argMax;
exports.shuffle = shuffle;
exports.isWholeNumber = isWholeNumber;
exports.sequence = sequence;
exports.hasKeys = hasKeys;
exports.R2toR1 = R2toR1;