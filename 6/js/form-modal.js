import {isEscapeKey} from './utils.js';

const pageBody = document.querySelector('body');
const uploadControl = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const scaleControlValue = document.querySelector('.scale__control--value');
const defaultScaleControlValue = scaleControlValue.value;
const effectLevelValue = document.querySelector('.effect-level__value');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionArea = document.querySelector('.text__description');
const defaultImageEffect = document.querySelector('#effect-none');
const closeBtn = uploadOverlay.querySelector('.img-upload__cancel');

function uploadNewImage(evt) {
  evt.preventDefault();
  uploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  closeBtn.addEventListener('click', cancelUpload);
}

function cancelUpload() {
  uploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadControl.value = '';
  scaleControlValue.value = defaultScaleControlValue;
  effectLevelValue.value = '';
  hashtagInput.value = '';
  descriptionArea.value = '';
  defaultImageEffect.checked = true;
  closeBtn.removeEventListener('click', cancelUpload);
}

uploadControl.addEventListener('change', uploadNewImage);

pageBody.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    cancelUpload();
  }
});

export {hashtagInput, descriptionArea};
