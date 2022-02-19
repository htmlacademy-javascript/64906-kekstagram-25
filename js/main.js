// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range

const getRandomNumber = (min, max) => {
  if(min < 0) {
    return;
  } else if (min === max){
    return;
  }
  min = Math.ceil(min);
  max = Math.ceil(max);
  return (Math.floor(Math.random() * (max - min + 1) + min));
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

getRandomNumber(1, 20);
checkStringLength('не очень-то длинный комментарий', 140);
