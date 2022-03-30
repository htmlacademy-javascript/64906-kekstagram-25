import {isEscapeKey} from './utils.js';
import {photoDescriptions} from './mock.js';

const bodyElement = document.body;
const picturesContainerElement = document.querySelectorAll('.pictures .picture');
const overlayElement = document.querySelector('.big-picture');
const largeImageElement = document.querySelector('.big-picture__img img');
const largeImageLikesElement = document.querySelector('.likes-count');
const largeImageCommentsListElement = document.querySelector('.social__comments');
const commentsCounterElement = document.querySelector('.comments-count');
const commentsCounterBlockElement = document.querySelector('.social__comment-count');
const largeImageDescriptionElement = document.querySelector('.social__caption');
const newCommentsLoaderElement = document.querySelector('.comments-loader');
const closeBtnElement = overlayElement.querySelector('.big-picture__cancel');

closeBtnElement.addEventListener('click', closeModal);

function onCloseFromKeyboard(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

function openModal(photo) {
  bodyElement.classList.add('modal-open');
  overlayElement.classList.remove('hidden');
  largeImageElement.src = photo.url;
  largeImageLikesElement.textContent = photo.likes;
  commentsCounterElement.textContent = photo.comments.length;
  largeImageCommentsListElement.innerHTML =
    `<li class="social__comment">
    <img
        class="social__picture"
        src="${ photo.comments[0].avatar }"
        alt="${ photo.comments[0].name }"
        width="35" height="35">
    <p class="social__text">${ photo.comments[0].message }</p>
  </li>`;
  largeImageDescriptionElement.textContent = photo.description;
  bodyElement.addEventListener('keydown', onCloseFromKeyboard);
  commentsCounterBlockElement.classList.add('hidden');
  newCommentsLoaderElement.classList.add('hidden');
}

function closeModal() {
  bodyElement.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  bodyElement.removeEventListener('keydown', onCloseFromKeyboard);
}

for(let i = 0; i < picturesContainerElement.length; i++) {
  picturesContainerElement[i].addEventListener('click', () => openModal(photoDescriptions[i]));
}
