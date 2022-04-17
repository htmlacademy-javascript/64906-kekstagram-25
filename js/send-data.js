const KEKSTAGRAM_UPLOAD_SERVER = 'https://25.javascript.pages.academy/kekstagram';

function uploadImage(formData, onSuccess, onFail) {
  fetch(KEKSTAGRAM_UPLOAD_SERVER, {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export {uploadImage};
