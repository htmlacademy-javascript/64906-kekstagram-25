import {renderPostThumbnails} from './render-post-thumbnails.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((data) => data.json())
  .then((images) => renderPostThumbnails(images));
