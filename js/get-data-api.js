import { createPreviews } from './create-previews.js';
import { initBigPicture } from './big-picture.js';
import { showAlert } from './utils/show-alert.js';

const getData = () => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((images) => {
      createPreviews(images);
      initBigPicture(images);
    })
    .catch(() => {
      showAlert('Не удалось загрузить изображения. Пожалуйста, обновите страницу');
    });
};

export { getData };
