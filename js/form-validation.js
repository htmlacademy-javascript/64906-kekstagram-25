import {isEscapeKey, checkStringLength} from './utils.js';
import {hashtagInput, descriptionArea} from './form-modal.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_REG_EXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const uploadForm = document.querySelector('#upload-select-image');

const pristine = new Pristine(uploadForm, {
  classTo: 'form-group',
  errorTextTag: 'span',
  errorTextClass: 'invalid',
});

pristine.addValidator(
  hashtagInput,
  (value) => {
    if(value === '') {
      return true;
    }
    const hashtags = value.split(' ');
    return hashtags.every((hashtag) => HASHTAG_REG_EXP.test(hashtag));
  },
  'Хэштеги не валидны',
  1,
  true
);

pristine.addValidator(
  hashtagInput,
  (value) => {
    const hashtags = value.split(' ');
    return hashtags.length <= 5;
  },
  'Нельзя указать больше пяти хэш-тегов',
  1,
  false
);

pristine.addValidator(
  hashtagInput,
  (value) => {
    const hashtags = value.toLowerCase().split(' ');
    return hashtags.every((hashtag) => hashtags.filter((tag) => tag === hashtag).length === 1);
  },
  'Один и тот же хэш-тег не может быть использован дважды',
  1,
  false
);

pristine.addValidator(descriptionArea, (value) => checkStringLength(value, COMMENT_MAX_LENGTH), `Не более ${COMMENT_MAX_LENGTH} символов`, 1, false);

hashtagInput.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

descriptionArea.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

uploadForm.addEventListener('submit', (evt) => {
  const formIsValid = pristine.validate();
  if(!formIsValid) {
    evt.preventDefault();
  }
});
