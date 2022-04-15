import {isEscapeKey} from './utils.js';

const bodyElement = document.body;
const successMsgTemplate = document.querySelector('#success').content.querySelector('.success');
const failureMsgTemplate = document.querySelector('#error').content.querySelector('.error');

function showSuccessNotification() {
  const successMsgElement = successMsgTemplate.cloneNode(true);
  const removeSuccessMsgBtnElement = successMsgElement.querySelector('.success__button');
  removeSuccessMsgBtnElement.addEventListener('click', () => successMsgElement.remove());
  bodyElement.insertAdjacentElement('beforeend', successMsgElement);

  const successMessageOverlay = document.querySelector('.success');

  successMessageOverlay.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('success')) {
      successMsgElement.remove();
    }
  });

  bodyElement.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      successMsgElement.remove();
    }
  });
}

function showFailureNotification() {
  const failureMsgElement = failureMsgTemplate.cloneNode(true);
  const removeFailureMsgBtnElement = failureMsgElement.querySelector('.error__button');
  removeFailureMsgBtnElement.addEventListener('click', () => failureMsgElement.remove());
  bodyElement.insertAdjacentElement('beforeend', failureMsgElement);

  const errorMessageOverlay = document.querySelector('.error');

  errorMessageOverlay.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('error')) {
      failureMsgElement.remove();
    }
  });

  bodyElement.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      failureMsgElement.remove();
    }
  });
}

function showAlert(errorMsg) {
  const errorMsgContainer = document.createElement('div');
  const errorMsgCloseBtn = document.createElement('button');
  errorMsgCloseBtn.classList.add('error-msg__close-btn');
  errorMsgContainer.classList.add('error-msg');
  errorMsgContainer.textContent = errorMsg;
  errorMsgContainer.appendChild(errorMsgCloseBtn);
  document.body.appendChild(errorMsgContainer);
  errorMsgCloseBtn.addEventListener('click', () => errorMsgContainer.remove());
}

export {showSuccessNotification, showFailureNotification, showAlert};
