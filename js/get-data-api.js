import { showAlert } from './utils/show-alert.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((images) => {
      onSuccess(images);
    })
    .catch(() => {
      showAlert('Не удалось загрузить изображения. Пожалуйста, обновите страницу');
    });
};

export { getData };
