import { isEscapeKey } from './utils/is-escape-key.js';
import { initResizingImage, deleteResizingImage, scaleControlDefaultValue } from './resizing-image.js';
import { initImageEffect, onSelectionEffectChange } from './apply-image-effect.js';
import { sendData } from './send-data-api.js';
import { onInputFileDelete, onInputFileEscKeydownDelete } from './upload-file.js';

const imgUpload = document.querySelector('.img-upload');
const imgUploadForm = imgUpload.querySelector('.img-upload__form');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const textHashtagsNewImage = imgUploadOverlay.querySelector('.text__hashtags');
const textDescriptionNewImage = imgUploadOverlay.querySelector('.text__description');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
const effectsList = imgUploadOverlay.querySelector('.effects__list');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').querySelector('img');
const effectLevelSlider = imgUploadOverlay.querySelector('.effect-level__slider');
const submitButton = imgUploadOverlay.querySelector('.img-upload__submit');
const success = document.querySelector('#success').content.querySelector('.success');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const successInner = document.querySelector('#success').content.querySelector('.success__inner');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');
const errorInner = document.querySelector('#error').content.querySelector('.error__inner');

const onSuccessButtonClose = () => {
  success.classList.add('hidden');
  successButton.removeEventListener('click', onSuccessButtonClose);
  document.removeEventListener('click', onSuccessOutsideClickClose);
  document.removeEventListener('keydown', onImgUploadEscKeydown);
};

function onSuccessOutsideClickClose(evt) {
  if (!successInner.contains(evt.target)) {
    success.classList.add('hidden');
    successButton.removeEventListener('click', onSuccessButtonClose);
    document.removeEventListener('click', onSuccessOutsideClickClose);
    document.removeEventListener('keydown', onImgUploadEscKeydown);
  }
}

const initSuccessImgUpload = () => {
  document.removeEventListener('keydown', onUploadPictureEscKeydown);
  document.body.append(success);
  successButton.addEventListener('click', onSuccessButtonClose);
  document.addEventListener('click', onSuccessOutsideClickClose);
  document.addEventListener('keydown', onImgUploadEscKeydown);
};

const onErrorButtonClose = () => {
  error.classList.add('hidden');
  errorButton.removeEventListener('click', onErrorButtonClose);
  document.removeEventListener('click', onErrorOutsideClickClose);
  document.removeEventListener('keydown', onImgUploadEscKeydown);
};

function onErrorOutsideClickClose(evt) {
  if (!errorInner.contains(evt.target)) {
    error.classList.add('hidden');
    errorButton.removeEventListener('click', onErrorButtonClose);
    document.removeEventListener('click', onErrorOutsideClickClose);
    document.removeEventListener('keydown', onImgUploadEscKeydown);
  }
}

const initErrorImgUpload = () => {
  document.removeEventListener('keydown', onUploadPictureEscKeydown);
  document.body.append(error);
  errorButton.addEventListener('click', onErrorButtonClose);
  document.addEventListener('click', onErrorOutsideClickClose);
  document.addEventListener('keydown', onImgUploadEscKeydown);
};

function onImgUploadEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    success.classList.add('hidden');
    error.classList.add('hidden');
    successButton.removeEventListener('click', onSuccessButtonClose);
    document.removeEventListener('click', onSuccessOutsideClickClose);
    errorButton.removeEventListener('click', onErrorButtonClose);
    document.removeEventListener('click', onErrorOutsideClickClose);
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
  effectsList.removeEventListener('change', onSelectionEffectChange);
  imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
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
    effectsList.removeEventListener('change', onSelectionEffectChange);
    document.getElementById('effect-none').checked = true;
    imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
  }
}

function onImgUploadFormSubmit(evt) {
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
  imgUploadOverlay.querySelector('.img-upload__cancel').removeEventListener('click', onInputFileDelete);
  document.removeEventListener('keydown', onInputFileEscKeydownDelete);
}

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
  openImgUpload();
  scaleControlValue.value = scaleControlDefaultValue;
  initResizingImage();
  initImageEffect();
  initFormValidation();
  imgUploadOverlay.querySelector('.img-upload__cancel').addEventListener('click', onUploadPictureCancel);
  imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
};

export { initImgUpload };
