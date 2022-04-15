import {initUploadFormValidation} from './form-validation.js';
import {closeUploadWindow} from './form-modal.js';
import {showFailureNotification, showSuccessNotification} from './notifications.js';
import {uploadImage} from './send-data.js';

function uploadFormSubmitHandler(formData) {
  function uploadSuccessHandler() {
    showSuccessNotification();
    closeUploadWindow();
  }
  function uploadFailHandler() {
    showFailureNotification();
    closeUploadWindow();
  }
  uploadImage(formData, uploadSuccessHandler, uploadFailHandler);
}

initUploadFormValidation(uploadFormSubmitHandler);
