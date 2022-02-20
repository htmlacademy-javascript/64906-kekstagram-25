// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range

const getRandomNumber = (a, b) => {
  const swapValues = () => {
    const swap = a;
    a = Math.ceil(b);
    b = Math.floor(swap);
  };
  if(Math.min(a, b) < 0) {
    return 0;
  } else if (a === b){
    return a;
  } else if (a > b) {
    swapValues();
  }
  a = Math.ceil(a);
  b = Math.floor(b);
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

getRandomNumber(1, 20);
checkStringLength('не очень-то длинный комментарий', 140);
