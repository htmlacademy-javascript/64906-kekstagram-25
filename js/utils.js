// const checkStringLength = (string, maxLength) => string.length <= maxLength;

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

const getUniqRandomNumber = (maxStep) => {
  let currentNumber = 0;

  function getNextNumber () {
    if (maxStep === 1) {
      return ++currentNumber;
    }
    currentNumber += getRandomPositiveNumber(1, maxStep);

    return currentNumber;
  }

  return getNextNumber;
};

export {getRandomPositiveNumber, getUniqRandomNumber};
