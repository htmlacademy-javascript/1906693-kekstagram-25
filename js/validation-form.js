import { isEscapeKey } from './utils/is-escape-key.js';
import { initResizingImage, deleteResizingImage, scaleControlDefaultValue } from './resizing-image.js';
import { initImageEffect, initSelectionEffect, checkSelectionEffect } from './apply-image-effect.js';
import { showAlert } from './utils/show-alert.js';

const imgUpload = document.querySelector('.img-upload');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const uploadFileNewImage = imgUpload.querySelector('#upload-file');
const imgUploadForm = imgUpload.querySelector('.img-upload__form');
const textHashtagsNewImage = imgUploadOverlay.querySelector('.text__hashtags');
const textDescriptionNewImage = imgUploadOverlay.querySelector('.text__description');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const scaleControlValue = document.querySelector('.scale__control--value');
const effectsList = document.querySelector('.effects__list');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const submitButton = document.querySelector('.img-upload__submit');
const success = document.querySelector('#success').content.querySelector('.success');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const successInner = document.querySelector('#success').content.querySelector('.success__inner');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');
const errorInner = document.querySelector('#error').content.querySelector('.error__inner');

document.body.append(success);
success.classList.add('hidden');

const closeSuccessClickButton = () => {
  successButton.addEventListener('click', () => {
    success.classList.add('hidden');
  });
};

const closeSuccessClickOutside = () => {
  document.addEventListener('click', (evt) => {
    if (!successInner.contains(evt.target)) {
      success.classList.add('hidden');
    }
  });
};

document.body.append(error);
error.classList.add('hidden');

const closeErrorClickButton = () => {
  errorButton.addEventListener('click', () => {
    error.classList.add('hidden');
  });
};

const closeErrorClickOutside = () => {
  document.addEventListener('click', (evt) => {
    if (!errorInner.contains(evt.target)) {
      error.classList.add('hidden');
    }
  });
};

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    success.classList.add('hidden');
    error.classList.add('hidden');
  }
});

const clearDataImgUpload = () => {
  imgUpload.querySelector('.img-upload__input').value = '';
  textHashtagsNewImage.value = '';
  textDescriptionNewImage.value = '';
  effectLevelSlider.noUiSlider.destroy();
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--error',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload-error'
});

const closeImgUpload = () => {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  deleteResizingImage();
  clearDataImgUpload();
  imgUploadPreview.removeAttribute('class');
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onImgUploadFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      fetch(
        'https://25.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData
        },
      ).then((response) => {
        if (response.ok) {
          closeImgUpload();
          unblockSubmitButton();
          success.classList.remove('hidden');
          closeSuccessClickButton();
          closeSuccessClickOutside();
        } else {
          showAlert('Не удалось загрузить изображения. Пожалуйста, обновите страницу');
          error.classList.remove('hidden');
          closeErrorClickButton();
          closeErrorClickOutside();
        }
      }).catch(() => {
        showAlert('Не удалось загрузить изображения. Пожалуйста, обновите страницу');
      });
    }
  });
};

const onUploadPictureCancel = () => {
  closeImgUpload();
  imgUploadOverlay.querySelector('.img-upload__cancel').removeEventListener('click', onUploadPictureCancel);
  document.removeEventListener('keydown', onimgUploadEscKeydown);
  imgUploadPreview.className = '';
  effectsList.removeEventListener('change', initSelectionEffect);
  effectsList.removeEventListener('change', checkSelectionEffect);
};

function onimgUploadEscKeydown(evt) {
  if (textDescriptionNewImage === document.activeElement ||
      textHashtagsNewImage === document.activeElement) {
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onimgUploadEscKeydown);
    deleteResizingImage();
    clearDataImgUpload();
    imgUploadOverlay.querySelector('.img-upload__cancel').removeEventListener('click', onUploadPictureCancel);
    imgUploadPreview.className = '';
    effectsList.removeEventListener('change', initSelectionEffect);
    effectsList.removeEventListener('change', checkSelectionEffect);
    success.classList.add('hidden');
  }
}

const openImgUpload = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onimgUploadEscKeydown);
};

const initFormValidation = () => {
  pristine.addValidator(textHashtagsNewImage, () => {
    const arrayTextHashtags = textHashtagsNewImage.value.split(' ');
    for (const textHashtags of arrayTextHashtags) {
      if (!re.test(textHashtags) &&
          textHashtags !== '') {
        return false;
      }
    }
    return true;
  },
  'Хэш-тег начинается с символа # (решётка). Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы');

  pristine.addValidator(textHashtagsNewImage, () => {
    const arrayTextHashtags = textHashtagsNewImage.value.split(' ');
    for (let i = 0; i < arrayTextHashtags.length; i++) {
      for (let j = i + 1; j < arrayTextHashtags.length; j++) {
        if (arrayTextHashtags[i].toLowerCase() === arrayTextHashtags[j].toLowerCase() &&
            arrayTextHashtags[i] !== '') {
          return false;
        }
      }
    }
    return true;
  },
  'Один и тот же хэш-тег не может быть использован дважды');

  pristine.addValidator(textHashtagsNewImage, () => {
    const arrayTextHashtags = textHashtagsNewImage.value.split(' ');
    if (arrayTextHashtags.length > 5) {
      return false;
    }
    return true;
  },
  'Нельзя указать больше пяти хэш-тегов');
};

const initImgUpload = () => {
  uploadFileNewImage.addEventListener('click', () => {
    openImgUpload();
    scaleControlValue.value = scaleControlDefaultValue;
    initResizingImage();
    initImageEffect();
    initFormValidation();
    imgUploadOverlay.querySelector('.img-upload__cancel').addEventListener('click', onUploadPictureCancel);
  });
};

export { initImgUpload, onImgUploadFormSubmit};
