function uploadImage(formData, onSuccess, onFail) {
  fetch('https://25.javascript.pages.academy/kekstagram', {
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
