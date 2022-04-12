import {isEscapeKey} from './utils.js';

const bodyElement = document.body;
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

function setThumbnailsHandlers(posts) {
  const picturesThumbnails = document.querySelectorAll('.picture');

  picturesThumbnails.forEach((thumbnail, i) => {
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openModal(posts[i]);
    });
  });
}

function renderComment(comment) {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  commentItem.innerHTML = `
        <img
            class="social__picture"
            src="${comment.avatar}"
            alt="${comment.name}"
            width="35" height="35">
        <p class="social__text">${comment.message}</p>
`;

  largeImageCommentsListElement.appendChild(commentItem);
}

function openModal(post) {
  bodyElement.classList.add('modal-open');
  overlayElement.classList.remove('hidden');
  largeImageElement.src = post.url;
  largeImageLikesElement.textContent = post.likes;
  commentsCounterElement.textContent = post.comments.length;
  largeImageCommentsListElement.innerHTML = '';
  largeImageDescriptionElement.textContent = post.description;
  commentsCounterBlockElement.classList.add('hidden');
  newCommentsLoaderElement.classList.add('hidden');

  post.comments.forEach((comment) => {
    renderComment(comment);
  });
  bodyElement.addEventListener('keydown', onCloseFromKeyboard);
}

function closeModal() {
  bodyElement.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  bodyElement.removeEventListener('keydown', onCloseFromKeyboard);
}

export {setThumbnailsHandlers};
