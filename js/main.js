import {getPostsFromServer} from './get-data.js';
import {renderPostThumbnails} from './render-post-thumbnails.js';
import {showFilters, setFilterHandlers} from './filters.js';
import './form.js';
import './image-editor.js';
import './network.js';
import './notifications.js';
import {setThumbnailsHandlers} from './fullsize-image.js';

getPostsFromServer((posts) => {
  renderPostThumbnails(posts);
  showFilters();
  setFilterHandlers(posts);
  setThumbnailsHandlers(posts);
});
