import {renderPostThumbnails} from './render-post-thumbnails.js';
import {debounce} from './utils.js';

const DEBOUNCE_TIME = 500;
const RANDOM_PHOTO_MAX_QUANTITY = 10;

const imageFiltersElement = document.querySelector('.img-filters');
const imageFiltersListElement = imageFiltersElement.querySelector('.img-filters__form');
const imageFilterBtnElement = imageFiltersListElement.querySelectorAll('.img-filters__button');
const picturesContainer = document.querySelector('.pictures');

const filterItems = (photos, filter) => {
  picturesContainer.querySelectorAll('.picture').forEach((post) => post.remove());

  if(filter.id.endsWith('default')) {
    photos.sort((previousPhoto, nextPhoto) => previousPhoto.id - nextPhoto.id);
    renderPostThumbnails(photos);
  }
  if(filter.id.endsWith('random')) {
    photos.sort(() => Math.random() - 0.5);
    renderPostThumbnails(photos.slice(0, RANDOM_PHOTO_MAX_QUANTITY));
  }
  if(filter.id.endsWith('discussed')) {
    photos.sort((previousPhoto, nextPhoto) => nextPhoto.comments.length - previousPhoto.comments.length);
    renderPostThumbnails(photos);
  }
};

const setFilterHandlers = (photos) => {
  imageFilterBtnElement.forEach((filterBtn) => {
    filterBtn.addEventListener('click', debounce(() => filterItems(photos, filterBtn), DEBOUNCE_TIME));
  });
};

const showFilters = (photos) => {
  imageFiltersElement.classList.remove('img-filters--inactive');
  setFilterHandlers(photos);
};

imageFiltersListElement.addEventListener('click', (evt) => {
  imageFilterBtnElement.forEach((filterBtn) => {
    filterBtn.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
});

export {showFilters};
