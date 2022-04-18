import {isEscapeKey} from './utils.js';

const bodyElement = document.body;
const successMsgTemplate = document.querySelector('#success').content.querySelector('.success');
const failureMsgTemplate = document.querySelector('#error').content.querySelector('.error');

const showSuccessNotification = () => {
  const successMsgElement = successMsgTemplate.cloneNode(true);
  bodyElement.insertAdjacentElement('beforeend', successMsgElement);

  const successMsgOverlay = document.querySelector('.success');

  function closeOutsideOverlay(evt) {
    if(evt.target.classList.contains('success') || evt.target.classList.contains('success__button')) {
      successMsgElement.remove();
      successMsgOverlay.removeEventListener('click', closeOutsideOverlay);
      bodyElement.removeEventListener('keydown', closeFromKeyboardHandler);
    }
  }

  function closeFromKeyboardHandler(evt) {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      successMsgElement.remove();
      successMsgOverlay.removeEventListener('click', closeOutsideOverlay);
      bodyElement.removeEventListener('keydown', closeFromKeyboardHandler);
    }
  }

  successMsgOverlay.addEventListener('click', closeOutsideOverlay);
  bodyElement.addEventListener('keydown', closeFromKeyboardHandler);
};

const showFailureNotification = () => {
  const failureMsgElement = failureMsgTemplate.cloneNode(true);
  bodyElement.insertAdjacentElement('beforeend', failureMsgElement);

  const errorMsgOverlay = document.querySelector('.error');

  function closeOutsideOverlay(evt) {
    if(evt.target.classList.contains('error') || evt.target.classList.contains('error__button')) {
      failureMsgElement.remove();
      errorMsgOverlay.removeEventListener('click', closeOutsideOverlay);
      bodyElement.removeEventListener('keydown', closeFromKeyboardHandler);
    }
  }

  function closeFromKeyboardHandler(evt) {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      failureMsgElement.remove();
      errorMsgOverlay.removeEventListener('click', closeOutsideOverlay);
      bodyElement.removeEventListener('keydown', closeFromKeyboardHandler);
    }
  }

  errorMsgOverlay.addEventListener('click', closeOutsideOverlay);
  bodyElement.addEventListener('keydown', closeFromKeyboardHandler);
};

const showAlert = (errorMsg) => {
  const errorMsgContainer = document.createElement('div');
  const errorMsgCloseBtn = document.createElement('button');
  errorMsgCloseBtn.classList.add('error-msg__close-btn');
  errorMsgContainer.classList.add('error-msg');
  errorMsgContainer.textContent = errorMsg;
  errorMsgContainer.appendChild(errorMsgCloseBtn);
  document.body.appendChild(errorMsgContainer);
  errorMsgCloseBtn.addEventListener('click', () => errorMsgContainer.remove());
};

export {showSuccessNotification, showFailureNotification, showAlert};
