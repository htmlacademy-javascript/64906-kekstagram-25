import {getRandomPositiveNumber, getUniqRandomNumber} from '/js/utils.js';
import {COMMENT_MESSAGES, COMMENT_USERS, PHOTO_DESCRIPTIONS_COUNT} from '/js/data.js';

const uniqCommentId = getUniqRandomNumber(20);

const generateComment = () => ({
  id: uniqCommentId(),
  avatar: `img/avatar-${getRandomPositiveNumber(1, 6)}.svg`,
  message: COMMENT_MESSAGES[getRandomPositiveNumber(0, COMMENT_MESSAGES.length - 1)],
  name: COMMENT_USERS[getRandomPositiveNumber(0, COMMENT_USERS.length - 1)],
});

const generatePhotoDescription = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: 'Фотография пряников на деревянном столе. Но это не точно.',
  likes: getRandomPositiveNumber(15, 200),
  comments: Array.from({length: getRandomPositiveNumber(1, 2)}, generateComment),
});

const photoDescriptions = Array.from(
  {length: PHOTO_DESCRIPTIONS_COUNT},
  (_, index) => generatePhotoDescription(++index)
);

export {photoDescriptions};
