import { isEscapeKey } from './utils/is-escape-key.js';
import { initResizingImage, deleteResizingImage, scaleControlDefaultValue } from './resizing-image.js';
import { initImageEffect, initSelectionEffect, checkSelectionEffect } from './apply-image-effect.js';
import { sendData } from './send-data-api.js';

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

const onCloseSuccessButton = () => {
  success.classList.add('hidden');
  successButton.removeEventListener('click', onCloseSuccessButton);
  document.removeEventListener('click', onCloseSuccessClickOutside);
  document.removeEventListener('keydown', onImgUploadEscKeydown);
};

function onCloseSuccessClickOutside(evt) {
  if (!successInner.contains(evt.target)) {
    success.classList.add('hidden');
    successButton.removeEventListener('click', onCloseSuccessButton);
    document.removeEventListener('click', onCloseSuccessClickOutside);
    document.removeEventListener('keydown', onImgUploadEscKeydown);
  }
}

const initSuccessImgUpload = () => {
  document.removeEventListener('keydown', onUploadPictureEscKeydown);
  document.body.append(success);
  successButton.addEventListener('click', onCloseSuccessButton);
  document.addEventListener('click', onCloseSuccessClickOutside);
  document.addEventListener('keydown', onImgUploadEscKeydown);
};

const onCloseErrorButton = () => {
  error.classList.add('hidden');
  errorButton.removeEventListener('click', onCloseErrorButton);
  document.removeEventListener('click', onCloseErrorClickOutside);
  document.removeEventListener('keydown', onImgUploadEscKeydown);
};

function onCloseErrorClickOutside(evt) {
  if (!errorInner.contains(evt.target)) {
    error.classList.add('hidden');
    errorButton.removeEventListener('click', onCloseErrorButton);
    document.removeEventListener('click', onCloseErrorClickOutside);
    document.removeEventListener('keydown', onImgUploadEscKeydown);
  }
}

const initErrorImgUpload = () => {
  document.removeEventListener('keydown', onUploadPictureEscKeydown);
  document.body.append(error);
  errorButton.addEventListener('click', onCloseErrorButton);
  document.addEventListener('click', onCloseErrorClickOutside);
  document.addEventListener('keydown', onImgUploadEscKeydown);
};

function onImgUploadEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    success.classList.add('hidden');
    error.classList.add('hidden');
    successButton.removeEventListener('click', onCloseSuccessButton);
    document.removeEventListener('click', onCloseSuccessClickOutside);
    errorButton.removeEventListener('click', onCloseErrorButton);
    document.removeEventListener('click', onCloseErrorClickOutside);
    document.removeEventListener('keydown', onImgUploadEscKeydown);
  }
}

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
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onUploadPictureCancel = () => {
  closeImgUpload();
  imgUploadOverlay.querySelector('.img-upload__cancel').removeEventListener('click', onUploadPictureCancel);
  document.removeEventListener('keydown', onUploadPictureEscKeydown);
  imgUploadPreview.className = '';
  effectsList.removeEventListener('change', initSelectionEffect);
  effectsList.removeEventListener('change', checkSelectionEffect);
};

function onUploadPictureEscKeydown(evt) {
  if (textDescriptionNewImage === document.activeElement ||
      textHashtagsNewImage === document.activeElement) {
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUpload();
    imgUploadOverlay.querySelector('.img-upload__cancel').removeEventListener('click', onUploadPictureCancel);
    document.removeEventListener('keydown', onUploadPictureEscKeydown);
    imgUploadPreview.className = '';
    effectsList.removeEventListener('change', initSelectionEffect);
    effectsList.removeEventListener('change', checkSelectionEffect);
    document.getElementById('effect-none').checked = true;
  }
}

const initImgUploadFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          onUploadPictureCancel();
          success.classList.remove('hidden');
          initSuccessImgUpload();
          document.getElementById('effect-none').checked = true;
        },
        () => {
          unblockSubmitButton();
          onUploadPictureCancel();
          error.classList.remove('hidden');
          initErrorImgUpload();
          document.getElementById('effect-none').checked = true;
        },
        new FormData(evt.target),
      );
    }
  });
};

const openImgUpload = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onUploadPictureEscKeydown);
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

export { initImgUpload, initImgUploadFormSubmit };
