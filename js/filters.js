import {renderPostThumbnails} from './render-post-thumbnails.js';
import {debounce} from './utils.js';
import {setThumbnailsHandlers} from './fullsize-image.js';

const DEBOUNCE_TIME = 500;
const RANDOM_PHOTO_MAX_QUANTITY = 10;

const imageFiltersElement = document.querySelector('.img-filters');
const imageFiltersListElement = imageFiltersElement.querySelector('.img-filters__form');
const imageFilterBtnElement = imageFiltersListElement.querySelectorAll('.img-filters__button');

const filterItems = (photos, filter) => {
  if(filter.id.endsWith('default')) {
    renderPostThumbnails(photos);
    setThumbnailsHandlers(photos);
  }
  if(filter.id.endsWith('random')) {
    photos.sort(() => Math.random() - 0.5);
    renderPostThumbnails(photos.slice(0, RANDOM_PHOTO_MAX_QUANTITY));
    setThumbnailsHandlers(photos);
  }
  if(filter.id.endsWith('discussed')) {
    photos.sort((previousPhoto, nextPhoto) => nextPhoto.comments.length - previousPhoto.comments.length);
    renderPostThumbnails(photos);
    setThumbnailsHandlers(photos);
  }
};

const showFilters = () => {
  imageFiltersElement.classList.remove('img-filters--inactive');
};

const setFilterHandlers = (photos) => {
  const filterHandler = debounce(filterItems, DEBOUNCE_TIME);

  imageFilterBtnElement.forEach((filterBtn) => {
    filterBtn.addEventListener('click', () => {
      filterHandler.call(this, photos.slice(), filterBtn);
    });
  });

  imageFiltersListElement.addEventListener('click', (evt) => {
    imageFilterBtnElement.forEach((filterBtn) => {
      filterBtn.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
  });
};

export {showFilters, setFilterHandlers};
