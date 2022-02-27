const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENT_USERS = [
  'Анастасия',
  'Олег',
  'Игорь',
  'Оксана',
  'Самир',
];

const PHOTO_DESCRIPTIONS_COUNT = 25;

const checkStringLength = (string, maxLength) => string.length <= maxLength;
checkStringLength('не очень-то длинный комментарий', 140);

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

const uniqCommentId = getUniqRandomNumber(20);

const generateComment = () => ({
  id: uniqCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: COMMENT_MESSAGES[getRandomNumber(0, COMMENT_MESSAGES.length - 1)],
  name: COMMENT_USERS[getRandomNumber(0, COMMENT_USERS.length - 1)],
});

const generatePhotoDescription = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: 'Фотография пряников на деревянном столе. Но это не точно.',
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, 2)}, generateComment),
});

const photoDescriptions = Array.from(
  {length: PHOTO_DESCRIPTIONS_COUNT},
  (_, index) => generatePhotoDescription(++index)
);
