import { scaleControlDefaultValue } from './resizing-image.js';

const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue= document.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const scaleControlValue = document.querySelector('.scale__control--value');

const initSelectionEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    imgUploadPreview.className = '';
    imgUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
    scaleControlValue.value = scaleControlDefaultValue;
    if (evt.target.value === 'none') {
      imgUploadPreview.className = '';
    }
  }
};

const chooseSelectionEffect = () => {
  imgUploadPreview.removeAttribute('style');

  if (imgUploadPreview.className === 'effects__preview--chrome') {
    imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  } else if (imgUploadPreview.className === 'effects__preview--sepia') {
    imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
  } else if (imgUploadPreview.className === 'effects__preview--marvin') {
    imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
  } else if (imgUploadPreview.className === 'effects__preview--phobos') {
    imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
  } else if (imgUploadPreview.className === 'effects__preview--heat') {
    imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
  }
};

const initUiSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    chooseSelectionEffect();
  });
};

const checkSelectionEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {

    if (imgUploadPreview.className === '') {
      effectLevelSlider.classList.add('hidden');
    } else {
      effectLevelSlider.classList.remove('hidden');
    }

    if (imgUploadPreview.className === 'effects__preview--chrome' ||
        imgUploadPreview.className === 'effects__preview--sepia') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
    } else if (imgUploadPreview.className === 'effects__preview--marvin') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
    } else if (imgUploadPreview.className === 'effects__preview--heat') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
    } else if (imgUploadPreview.className === 'effects__preview--phobos') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
    } else if (imgUploadPreview.className === '') {
      imgUploadPreview.removeAttribute('style');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 100,
          max: 100
        },
        start: 100
      });
    }
  }
};

const initImageEffect = () => {
  effectLevelSlider.classList.add('hidden');
  effectsList.addEventListener('change', initSelectionEffect);
  initUiSlider();
  effectsList.addEventListener('change', checkSelectionEffect);
};

export { initImageEffect, initSelectionEffect, checkSelectionEffect };
