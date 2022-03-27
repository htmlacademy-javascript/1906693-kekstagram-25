import { isEscapeKey } from './utils/is-escape-key.js';

const imgUpload = document.querySelector('.img-upload');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const uploadFileNewImage = imgUpload.querySelector('#upload-file');
const imgUploadForm = imgUpload.querySelector('.img-upload__form');
const textHashtagsNewImage = imgUploadOverlay.querySelector('.text__hashtags');
const textDescriptionNewImage = imgUploadOverlay.querySelector('.text__description');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const clearDataImgUpload = () => {
  imgUpload.querySelector('.img-upload__input').value = '';
  textHashtagsNewImage.value = '';
  textDescriptionNewImage.innerHTML = '';
};

const onimgUploadEscKeydown = (evt) => {
  if (textDescriptionNewImage === document.activeElement || textHashtagsNewImage === document.activeElement) {
    return evt;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onimgUploadEscKeydown);
    clearDataImgUpload();
  }
};

const openImgUpload = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onimgUploadEscKeydown);
};

const closeImgUpload = () => {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onimgUploadEscKeydown);
};

const initImgUpload = () => {
  uploadFileNewImage.addEventListener('click', () => {
    openImgUpload();
  });

  imgUploadOverlay.querySelector('.img-upload__cancel').addEventListener('click', () => {
    closeImgUpload();
    clearDataImgUpload();
  });
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--error',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload-error'
});

pristine.addValidator(textHashtagsNewImage, () => {
  const arrayTextHashtags = textHashtagsNewImage.value.split(' ');
  for (const textHashtags of arrayTextHashtags) {

    if (!re.test(textHashtags) && textHashtags !== '') {
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
      if (arrayTextHashtags[i].toLowerCase() === arrayTextHashtags[j].toLowerCase() && arrayTextHashtags[i] !== '') {
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

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    imgUploadForm.submit();
  }
  return evt;
});

export { initImgUpload };
