import {openModal} from './fullsize-image.js';

let postsData = [];
const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const initPosts = (posts) => {
  postsData = posts;
};

const removePostThumbnails = () => {
  picturesContainer.querySelectorAll('.picture').forEach((post) => post.remove());
};

const renderPostThumbnails = (posts) => {
  removePostThumbnails();
  posts.forEach((post) => {
    const pictureElement = picturesTemplate.cloneNode(true);
    pictureElement.dataset.postId = post.id;
    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(picturesFragment);
};

picturesContainer.addEventListener('click', (evt) => {
  const thumbnailElement = evt.target.closest('.picture');
  if(!thumbnailElement) {
    return;
  }

  const postId = thumbnailElement.dataset.postId;
  const postData = postsData.find((post) => post.id === Number(postId));
  if(postData) {
    openModal(postData);
  }
});

export {renderPostThumbnails, initPosts};
