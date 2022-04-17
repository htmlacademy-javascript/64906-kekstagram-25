import {showAlert} from './notifications.js';

const KEKSTAGRAM_DATA_SERVER = 'https://25.javascript.pages.academy/kekstagram/data';

function getPostsFromServer(cb) {
  fetch(KEKSTAGRAM_DATA_SERVER)
    .then((data) => data.json())
    .then((images) => cb(images))
    .catch((err) => showAlert(err));
}

export {getPostsFromServer};
