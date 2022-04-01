import { scaleControlDefaultValue } from './resizing-image.js';

const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue= document.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsItems = effectsList.querySelectorAll('.effects__item');
const scaleControlValue = document.querySelector('.scale__control--value');

const selectionEffect = (effectItem) => {
  const effectsRadio = effectItem.querySelector('.effects__radio');
  effectsRadio.addEventListener('click', () => {
    imgUploadPreview.className = '';
    imgUploadPreview.classList.add(`effects__preview--${effectsRadio.value}`);
    scaleControlValue.value = scaleControlDefaultValue;
    if (effectsRadio.value === 'none') {
      imgUploadPreview.removeAttribute('class');
    }
  });
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const chooseSelectionEffect = () => {
  imgUploadPreview.removeAttribute('style');

  if (imgUploadPreview.className === 'effects__preview--chrome') {
    imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  }

  if (imgUploadPreview.className === 'effects__preview--sepia') {
    imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
  }

  if (imgUploadPreview.className === 'effects__preview--marvin') {
    imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
  }

  if (imgUploadPreview.className === 'effects__preview--phobos') {
    imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
  }

  if (imgUploadPreview.className === 'effects__preview--heat') {
    imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
  }
};

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  chooseSelectionEffect();
});

const checkSelectionEffect = (effectItem) => {
  const effectsRadio = effectItem.querySelector('.effects__radio');
  effectLevelSlider.classList.add('hidden');

  effectsRadio.addEventListener('click', () => {
    if (imgUploadPreview.className === 'effects__preview--chrome' ||
        imgUploadPreview.className === 'effects__preview--sepia') {
      effectLevelSlider.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
    }

    if (imgUploadPreview.className === 'effects__preview--marvin') {
      effectLevelSlider.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
    }

    if (imgUploadPreview.className === 'effects__preview--heat') {
      effectLevelSlider.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
    }

    if (imgUploadPreview.className === 'effects__preview--phobos') {
      effectLevelSlider.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
    }

    if (!imgUploadPreview.hasAttribute('class')) {
      effectLevelSlider.classList.add('hidden');
      imgUploadPreview.removeAttribute('style');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 100,
          max: 100
        },
        start: 100
      });
    }
  });
};

for (let i = 0; i < effectsItems.length; i++) {
  selectionEffect(effectsItems[i]);
  checkSelectionEffect(effectsItems[i]);
}
