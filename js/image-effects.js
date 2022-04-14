const CURRENT_EFFECT = {
  effect: '',
  unit: '',
};
const EFFECT_START_VALUE = 100;

const sliderElement = document.querySelector('.effect-level__slider');
const uploadedImageElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelElement = document.querySelector('.effect-level');
const effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
const imageScaleValueElement = document.querySelector('.scale__control--value');

function setEffectValue() {
  effectLevelValueElement.value = sliderElement.noUiSlider.get();
  uploadedImageElement.style.filter = `${CURRENT_EFFECT.effect}(${effectLevelValueElement.value}${CURRENT_EFFECT.unit})`;
}

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectsListElement.addEventListener('click', (evt) => {
  if(evt.target.checked) {
    effectLevelElement.classList.remove('hidden');
    uploadedImageElement.removeAttribute('class');
    uploadedImageElement.removeAttribute('style');
    effectLevelValueElement.value = EFFECT_START_VALUE;
    imageScaleValueElement.value = EFFECT_START_VALUE;
    uploadedImageElement.classList.add(`effects__preview--${evt.target.value}`);
  }
  if(evt.target.value === 'none') {
    CURRENT_EFFECT.effect = '';
    CURRENT_EFFECT.unit = '';
    effectLevelElement.classList.add('hidden');
  }
  if(evt.target.value === 'chrome') {
    CURRENT_EFFECT.effect = 'grayscale';
    CURRENT_EFFECT.unit = '';
    effectLevelElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  if(evt.target.value === 'sepia') {
    CURRENT_EFFECT.effect = 'sepia';
    CURRENT_EFFECT.unit = '';
    effectLevelElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  if(evt.target.value === 'marvin') {
    CURRENT_EFFECT.effect = 'invert';
    CURRENT_EFFECT.unit = '%';
    effectLevelElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
  if(evt.target.value === 'phobos') {
    CURRENT_EFFECT.effect = 'blur';
    CURRENT_EFFECT.unit = 'px';
    effectLevelElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
  if(evt.target.value === 'heat') {
    CURRENT_EFFECT.effect = 'brightness';
    CURRENT_EFFECT.unit = '';
    effectLevelElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
});

sliderElement.noUiSlider.on('update', setEffectValue);
