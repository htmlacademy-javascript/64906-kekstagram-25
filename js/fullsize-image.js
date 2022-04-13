import {isEscapeKey} from './utils.js';

const COMMENTS_CHUNK_COUNT = 5;

const bodyElement = document.body;
const overlayElement = document.querySelector('.big-picture');
const largeImageElement = overlayElement.querySelector('.big-picture__img img');
const largeImageLikesElement = overlayElement.querySelector('.likes-count');
const largeImageCommentsListElement = overlayElement.querySelector('.social__comments');
const renderedCommentsCountElement = document.querySelector('.rendered-comments');
const commentsCounterElement = overlayElement.querySelector('.comments-count');
const largeImageDescriptionElement = overlayElement.querySelector('.social__caption');
const newCommentsLoaderElement = overlayElement.querySelector('.comments-loader');
const closeBtnElement = overlayElement.querySelector('.big-picture__cancel');

let postComments = [];

closeBtnElement.addEventListener('click', closeModal);

function onCloseFromKeyboard(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

function setThumbnailsHandlers(posts) {
  const picturesThumbnails = document.querySelectorAll('.picture');
  picturesThumbnails.forEach((thumbnail, i) => {
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openModal(posts[i]);
    });
  });
}

newCommentsLoaderElement.addEventListener(
  'click',
  () => {
    postComments.splice(0, COMMENTS_CHUNK_COUNT).forEach((comment) => renderComment(comment));
    renderedCommentsCountElement.textContent = largeImageCommentsListElement.querySelectorAll('.social__comment').length;
  }
);

function renderComment({avatar, name, message}) {
  newCommentsLoaderElement.classList.add('hidden');
  if(postComments.length) {
    newCommentsLoaderElement.classList.remove('hidden');
  }
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  commentItem.innerHTML = `
        <img
            class="social__picture"
            src="${avatar}"
            alt="${name}"
            width="35" height="35">
        <p class="social__text">${message}</p>
`;
  largeImageCommentsListElement.appendChild(commentItem);
}

function openModal({url, likes, comments, description}) {
  bodyElement.classList.add('modal-open');
  overlayElement.classList.remove('hidden');
  largeImageElement.src = url;
  largeImageLikesElement.textContent = likes;
  commentsCounterElement.textContent = comments.length;
  largeImageCommentsListElement.querySelectorAll('.social__comment')
    .forEach((commentElement) => commentElement.remove());
  largeImageDescriptionElement.textContent = description;
  postComments = [...comments];
  postComments.splice(0, COMMENTS_CHUNK_COUNT).forEach((comment) => {
    renderComment(comment);
  });
  renderedCommentsCountElement.textContent = largeImageCommentsListElement.querySelectorAll('.social__comment').length;
  bodyElement.addEventListener('keydown', onCloseFromKeyboard);
}

function closeModal() {
  bodyElement.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  bodyElement.removeEventListener('keydown', onCloseFromKeyboard);
}

export {setThumbnailsHandlers};
