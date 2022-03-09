import { images } from './data.js';

const picturesTitle = document.querySelector('.pictures__title');
picturesTitle.classList.remove('visually-hidden');

const similarListImages = document.querySelector('.pictures');

const similarImagesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarImages = images();

similarImages.forEach(({url, likes, comments}) => {
  const imagesElement = similarImagesTemplate.cloneNode(true);
  imagesElement.querySelector('.picture__img').src = url;
  imagesElement.querySelector('.picture__likes').textContent = likes;
  imagesElement.querySelector('.picture__comments').textContent = Object.keys(comments).length;
  similarListImages.appendChild(imagesElement);
});
