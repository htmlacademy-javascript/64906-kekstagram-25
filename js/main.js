import {getPostsFromServer} from './get-data.js';
import {renderPostThumbnails, initPosts} from './render-post-thumbnails.js';
import {showFilters, setFilterHandlers} from './filters.js';
import './form.js';
import './image-editor.js';
import './notifications.js';

getPostsFromServer((posts) => {
  initPosts(posts);
  renderPostThumbnails(posts);
  showFilters();
  setFilterHandlers(posts);
});
