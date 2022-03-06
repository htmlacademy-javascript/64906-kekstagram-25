const checkStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomNumber = (a, b) => {
  if (a < 0 || b < 0) {
    return 0;
  }
  if (a === b) {
    return a;
  }
  if (a > b) {
    [a, b] = [b, a];
  }
  a = Math.ceil(a);
  b = Math.floor(b);
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

const getUniqRandomNumber = (maxStep) => {
  let currentNumber = 0;

  function getNextNumber () {
    if (maxStep === 1) {
      return ++currentNumber;
    }
    currentNumber += getRandomNumber(1, maxStep);

    return currentNumber;
  }

  return getNextNumber;
};

export {getRandomNumber, getUniqRandomNumber};
