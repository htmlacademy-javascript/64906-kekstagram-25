import {isEscapeKey} from './utils.js';

const IMAGE_SCALE_VALUE = 100;
const FILE_TYPES = ['jpeg', 'png', 'jpg', 'gif'];

const bodyElement = document.body;
const uploadControlElement = document.querySelector('#upload-file'); // *
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadedImageElement = document.querySelector('.img-upload__preview img'); // *
const imageScaleValueElement = document.querySelector('.scale__control--value');
const imageEffectLevelElement = document.querySelector('.effect-level');
const imageEffectLevelValueElement = document.querySelector('.effect-level__value');
const hashtagInputElement = document.querySelector('.text__hashtags');
const descriptionAreaElement = document.querySelector('.text__description');
const defaultImageEffectElement = document.querySelector('#effect-none');
const uploadBtnElement = document.querySelector('.img-upload__submit');
const closeBtnElement = uploadOverlayElement.querySelector('.img-upload__cancel');

closeBtnElement.addEventListener('click', closeUploadWindow);

function onCloseFromKeyboard(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadWindow();
  }
}

function openUploadWindow() {
  imageEffectLevelElement.classList.add('hidden');
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  imageScaleValueElement.value = IMAGE_SCALE_VALUE;
  bodyElement.addEventListener('keydown', onCloseFromKeyboard);
}

function closeUploadWindow() {
  uploadedImageElement.removeAttribute('style');
  uploadedImageElement.removeAttribute('class');
  uploadControlElement.value = '';
  imageScaleValueElement.value = IMAGE_SCALE_VALUE;
  imageEffectLevelValueElement.value = '';
  hashtagInputElement.value = '';
  descriptionAreaElement.value = '';
  defaultImageEffectElement.checked = true;
  uploadBtnElement.disabled = false;
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  bodyElement.removeEventListener('keydown', onCloseFromKeyboard);
}

function previewImage() {
  const image = uploadControlElement.files[0];
  const imageName = image.name.toLowerCase();

  const match = FILE_TYPES.some((type) => imageName.endsWith(type));

  if(match) {
    uploadedImageElement.src = URL.createObjectURL(image);
  }
}

uploadControlElement.addEventListener('change', () => {
  openUploadWindow();
  previewImage();
});

export {closeUploadWindow};
