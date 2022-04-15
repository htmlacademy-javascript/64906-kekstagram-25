import {isEscapeKey, checkStringLength} from './utils.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_REG_EXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const hashtagInputElement = document.querySelector('.text__hashtags');
const descriptionAreaElement = document.querySelector('.text__description');
const uploadFormElement = document.querySelector('#upload-select-image');
const uploadBtnElement = uploadFormElement.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'form-group',
  errorTextTag: 'span',
  errorTextClass: 'invalid',
});

function initUploadFormValidation(onSuccessValidation) {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formIsValid = pristine.validate();

    if(formIsValid) {
      uploadBtnElement.disabled = true;
      const formData = new FormData(evt.target);
      onSuccessValidation(formData);
    }
  });
}

pristine.addValidator(
  hashtagInputElement,
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
  hashtagInputElement,
  (value) => {
    const hashtags = value.split(' ');
    return hashtags.length <= 5;
  },
  'Нельзя указать больше пяти хэш-тегов',
  1,
  false
);

pristine.addValidator(
  hashtagInputElement,
  (value) => {
    const hashtags = value.toLowerCase().split(' ');
    return hashtags.every((hashtag) => hashtags.filter((tag) => tag === hashtag).length === 1);
  },
  'Один и тот же хэш-тег не может быть использован дважды',
  1,
  false
);

pristine.addValidator(descriptionAreaElement, (value) => checkStringLength(value, COMMENT_MAX_LENGTH), `Не более ${COMMENT_MAX_LENGTH} символов`, 1, false);

hashtagInputElement.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

descriptionAreaElement.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

export {initUploadFormValidation};
