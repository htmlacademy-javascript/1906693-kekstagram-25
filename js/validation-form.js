import { isEscapeKey } from './utils/is-escape-key.js';
import { initResizingImage, deleteResizingImage, scaleControlDefaultValue } from './resizing-image.js';
import { initImageEffect, initSelectionEffect, checkSelectionEffect } from './apply-image-effect.js';

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

const clearDataImgUpload = () => {
  imgUpload.querySelector('.img-upload__input').value = '';
  textHashtagsNewImage.value = '';
  textDescriptionNewImage.innerHTML = '';
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--error',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload-error'
});

const checkPristine = () => {
  const isValid = pristine.validate();
  if (isValid) {
    imgUploadForm.submit();
  }
};

const onImgUploadFormSubmit = (evt) => {
  evt.preventDefault();
  checkPristine();
};

const closeImgUpload = () => {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  deleteResizingImage();
  clearDataImgUpload();
};

const onUploadPictureCancel = () => {
  closeImgUpload();
  imgUploadOverlay.querySelector('.img-upload__submit').removeEventListener('click', onImgUploadFormSubmit);
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
    imgUploadOverlay.querySelector('.img-upload__submit').removeEventListener('click', onImgUploadFormSubmit);
    imgUploadOverlay.querySelector('.img-upload__cancel').removeEventListener('click', onUploadPictureCancel);
    imgUploadPreview.className = '';
    effectsList.removeEventListener('change', initSelectionEffect);
    effectsList.removeEventListener('change', checkSelectionEffect);
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
    initFormValidation();
    imgUploadOverlay.querySelector('.img-upload__submit').addEventListener('click', onImgUploadFormSubmit);
    imgUploadOverlay.querySelector('.img-upload__cancel').addEventListener('click', onUploadPictureCancel);
    initImageEffect();
  });
};

export { initImgUpload };
