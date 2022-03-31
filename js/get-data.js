import {renderPostThumbnails} from './render-post-thumbnails.js';
import {showNotification} from './utils.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((data) => data.json())
  .then((images) => renderPostThumbnails(images))
  .catch((err) => showNotification(err));
