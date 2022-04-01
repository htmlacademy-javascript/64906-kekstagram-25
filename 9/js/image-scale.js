const SCALE_STEP = 25;
const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;

const scaleElement = document.querySelector('.scale');
const scaleDecrementElement = scaleElement.querySelector('.scale__control--smaller');
const scaleIncrementElement = scaleElement.querySelector('.scale__control--bigger');
const uploadedImageElement = document.querySelector('.img-upload__preview img');
const imageScaleValueElement = document.querySelector('.scale__control--value');

function decreaseScale() {
  if(imageScaleValueElement.value > SCALE_VALUE_MIN) {
    imageScaleValueElement.value = Number(imageScaleValueElement.value) - SCALE_STEP;
    uploadedImageElement.style.transform = `scale(${  imageScaleValueElement.value / 100  })`;
  }
}

function increaseScale() {
  if(imageScaleValueElement.value < SCALE_VALUE_MAX) {
    imageScaleValueElement.value = Number(imageScaleValueElement.value) + SCALE_STEP;
    uploadedImageElement.style.transform = `scale(${  imageScaleValueElement.value / 100  })`;
  }
}

scaleDecrementElement.addEventListener('click', decreaseScale);

scaleIncrementElement.addEventListener('click', increaseScale);
