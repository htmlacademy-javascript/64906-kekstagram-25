import {getPostsFromServer} from './get-data.js';
import {renderPostThumbnails} from './render-post-thumbnails.js';
import './form.js';
import './image-editor.js';
import './network.js';
import './notifications.js';
import {showFilters, setFilterHandlers} from './filters.js';

getPostsFromServer((posts) => {
  renderPostThumbnails(posts);
  showFilters();
  setFilterHandlers(posts);
});
