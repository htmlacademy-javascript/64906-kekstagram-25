const checkStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomPositiveNumber = (from, to) => {
  if (from < 0 || to < 0) {
    return 0;
  }
  if (from === to) {
    return from;
  }
  if (from > to) {
    [from, to] = [to, from];
  }
  const min = Math.ceil(from);
  const max = Math.floor(to);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getUniqRandomNumber = (quantity) => {
  const pastNums = [];

  function getNextNumber () {
    let currentNumber = getRandomPositiveNumber(1, quantity);
    if (quantity === 1) {
      return ++currentNumber;
    }
    if(pastNums.length >= quantity) {
      return ++pastNums.length;
    }
    while(pastNums.includes(currentNumber)) {
      currentNumber = getRandomPositiveNumber(1, quantity);
    }
    pastNums.push(currentNumber);
    return currentNumber;
  }

  return getNextNumber;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {checkStringLength, getRandomPositiveNumber, getUniqRandomNumber, isEscapeKey, debounce};
