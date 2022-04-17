import {isEscapeKey} from './utils.js';

const COMMENTS_CHUNK_COUNT = 5;

let postComments = [];

const bodyElement = document.body;
const overlayElement = document.querySelector('.big-picture');
const largeImageElement = overlayElement.querySelector('.big-picture__img img');
const largeImageLikesElement = overlayElement.querySelector('.likes-count');
const largeImageCommentsListElement = overlayElement.querySelector('.social__comments');
const commentTemplateElement = overlayElement.querySelector('.social__comment').cloneNode(true);
const renderedCommentsCountElement = document.querySelector('.rendered-comments');
const commentsCounterElement = overlayElement.querySelector('.comments-count');
const largeImageDescriptionElement = overlayElement.querySelector('.social__caption');
const newCommentsLoaderElement = overlayElement.querySelector('.comments-loader');
const closeBtnElement = overlayElement.querySelector('.big-picture__cancel');

function onCloseFromKeyboard(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalHandler();
  }
}

function makeCommentElement({avatar, name, message}) {
  newCommentsLoaderElement.classList.add('hidden');
  if(postComments.length) {
    newCommentsLoaderElement.classList.remove('hidden');
  }
  const commentElement = commentTemplateElement.cloneNode(true);
  const commentPictureElement = commentElement.querySelector('.social__picture');
  commentPictureElement.src = avatar;
  commentPictureElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
}

function renderComments(comments) {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsFragment.appendChild(makeCommentElement(comment));
  });
  largeImageCommentsListElement.appendChild(commentsFragment);
  renderedCommentsCountElement.textContent = largeImageCommentsListElement.querySelectorAll('.social__comment').length;
}

function clearComments() {
  largeImageCommentsListElement.querySelectorAll('.social__comment')
    .forEach((commentElement) => commentElement.remove());
}

function openModal({url, likes, comments, description}) {
  bodyElement.classList.add('modal-open');
  overlayElement.classList.remove('hidden');
  largeImageElement.src = url;
  largeImageLikesElement.textContent = likes;
  commentsCounterElement.textContent = comments.length;
  largeImageDescriptionElement.textContent = description;
  postComments = [...comments];
  clearComments();
  renderComments(postComments.splice(0, COMMENTS_CHUNK_COUNT));
  bodyElement.addEventListener('keydown', onCloseFromKeyboard);
}

function closeModalHandler() {
  bodyElement.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  bodyElement.removeEventListener('keydown', onCloseFromKeyboard);
}

newCommentsLoaderElement.addEventListener('click', () => renderComments(postComments.splice(0, COMMENTS_CHUNK_COUNT)));

closeBtnElement.addEventListener('click', closeModalHandler);

export {openModal};
