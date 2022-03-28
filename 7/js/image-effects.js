const sliderElement = document.querySelector('.effect-level__slider');
const uploadedImageElement = document.querySelector('.img-upload__preview img');
const effectsListNode = document.querySelector('.effects__list');
const effectLevelElement = document.querySelector('.effect-level');
const effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
const imageScaleValueElement = document.querySelector('.scale__control--value');
const EFFECT_START_VALUE = 100;

const currentEffect = {
  effect: '',
  unit: '',
};

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

effectsListNode.addEventListener('click', (evt) => {
  if(evt.target.checked) {
    effectLevelElement.classList.remove('hidden');
    uploadedImageElement.removeAttribute('class');
    uploadedImageElement.removeAttribute('style');
    effectLevelValueElement.value = EFFECT_START_VALUE;
    imageScaleValueElement.value = EFFECT_START_VALUE;
    uploadedImageElement.classList.add(`effects__preview--${evt.target.value}`);
  }
  if(evt.target.value === 'none') {
    currentEffect.effect = '';
    currentEffect.unit = '';
    effectLevelElement.classList.add('hidden');
  }
  if(evt.target.value === 'chrome') {
    currentEffect.effect = 'grayscale';
    currentEffect.unit = '';
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
    currentEffect.effect = 'sepia';
    currentEffect.unit = '';
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
    currentEffect.effect = 'invert';
    currentEffect.unit = '%';
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
    currentEffect.effect = 'blur';
    currentEffect.unit = 'px';
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
    currentEffect.effect = 'brightness';
    currentEffect.unit = '';
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

function setEffectValue() {
  effectLevelValueElement.value = sliderElement.noUiSlider.get();
  uploadedImageElement.style.filter = `${currentEffect.effect}(${effectLevelValueElement.value}${currentEffect.unit})`;
}

sliderElement.noUiSlider.on('update', setEffectValue);
