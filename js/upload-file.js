import { initImgUpload } from './validation-form.js';
import { isEscapeKey } from './utils/is-escape-key.js';


const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');

const onInputFileDelete = () => {
  imgUploadPreview.src = '';
  document.querySelector('.img-upload__cancel').removeEventListener('click', onInputFileDelete);
  document.removeEventListener('keydown', onInputFileEscKeydownDelete);
};

const uploadFile = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }

  if (fileName) {
    initImgUpload();
  }

  document.querySelector('.img-upload__cancel').addEventListener('click', onInputFileDelete);
  document.addEventListener('keydown', onInputFileEscKeydownDelete);
};

function onInputFileEscKeydownDelete(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgUploadPreview.src = '';
    document.querySelector('.img-upload__cancel').removeEventListener('click', onInputFileDelete);
    document.removeEventListener('keydown', onInputFileEscKeydownDelete);
  }
}

const initUploadFile = () => {
  fileChooser.addEventListener('change', uploadFile);
};

export { initUploadFile, onInputFileDelete, onInputFileEscKeydownDelete };
