import {showAlert} from './notifications.js';

const getPostsFromServer = (cb) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((data) => data.json())
    .then((images) => cb(images))
    .catch((err) => showAlert(err));
};

export {getPostsFromServer};
