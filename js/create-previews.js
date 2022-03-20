import { bigPicture } from './close-big-picture.js';

const similarImagesBlock = document.querySelector('.pictures');
const similarImagesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPreviews = (images) => {
  const similarImagesFragment = document.createDocumentFragment();

  images.forEach(({ url, likes, comments, id }) => {
    const imagesElement = similarImagesTemplate.cloneNode(true);
    imagesElement.querySelector('.picture__img').src = url;
    imagesElement.querySelector('.picture__likes').textContent = likes;
    imagesElement.querySelector('.picture__comments').textContent = comments.length;
    // 1.1 Задать изображениям дата-атрибут с id изображения
    imagesElement.querySelector('.picture__img').id = id;

    imagesElement.addEventListener('click', () => {
      const idBigPreview = imagesElement.querySelector('img').getAttribute('id');

      bigPicture.querySelector('.social__comments').innerHTML = '';

      images.find((photo) => String(photo.id) === idBigPreview).comments.forEach(({avatar, message, name}) => {
        bigPicture.querySelector('.social__comments').insertAdjacentHTML('beforeend', `
              <li class="social__comment">
                <img
                  class="social__picture"
                  src="${avatar}"
                  alt="${name}"
                  width="35" height="35">
                <p class="social__text">${message}</p>
              </li>`);
      });

      bigPicture.querySelector('.social__caption').textContent = images.find((photo) => String(photo.id) === idBigPreview).description;
      bigPicture.querySelector('img').src = images.find((photo) => String(photo.id) === idBigPreview).url;
      bigPicture.querySelector('.likes-count').textContent = images.find((photo) => String(photo.id) === idBigPreview).likes;

      bigPicture.classList.remove('hidden');
      // Счетчик комментариев
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');
    });

    similarImagesFragment.appendChild(imagesElement);
  });

  similarImagesBlock.appendChild(similarImagesFragment);
};

export { createPreviews };
