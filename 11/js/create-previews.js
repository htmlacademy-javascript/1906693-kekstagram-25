import { initBigPicture } from './big-picture.js';
import { getData } from './get-data-api.js';
import { debounce } from './utils/debounce.js';

const similarImagesBlock = document.querySelector('.pictures');
const similarImagesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imgFilters = document.querySelector('.img-filters');
const defaultButton = imgFilters.querySelector('#filter-default');
const randomButton = imgFilters.querySelector('#filter-random');
const discussedButton = imgFilters.querySelector('#filter-discussed');

const createPreviews = (images) => {
  const pictures = document.querySelectorAll('.picture');
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].remove();
  }

  const similarImagesFragment = document.createDocumentFragment();

  images.forEach(({ url, likes, comments, id }) => {
    const imagesElement = similarImagesTemplate.cloneNode(true);
    imagesElement.querySelector('.picture__img').src = url;
    imagesElement.querySelector('.picture__likes').textContent = likes;
    imagesElement.querySelector('.picture__comments').textContent = comments.length;
    imagesElement.querySelector('.picture__img').setAttribute('data-id', id);
    similarImagesFragment.appendChild(imagesElement);
  });

  similarImagesBlock.appendChild(similarImagesFragment);
  imgFilters.classList.remove('img-filters--inactive');
};

const initPressButtonDefaultImages = debounce(() => {
  defaultButton.classList.add('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');
  getData((images) => {
    createPreviews(images);
    initBigPicture(images);
  });
});

const initPressButtonRandomImages = debounce(() => {
  defaultButton.classList.remove('img-filters__button--active');
  randomButton.classList.add('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');
  getData((images) => {
    const randomImages = images.slice();

    const shuffleArrayImages = (ArrayImages) => {
      let j, temp;
      for (let i = ArrayImages.length - 1; i > 0; i--) {
        j = Math.floor(Math.random()*(i + 1));
        temp = ArrayImages[j];
        ArrayImages[j] = ArrayImages[i];
        ArrayImages[i] = temp;
      }
      return ArrayImages;
    };

    const randomArrayImages = shuffleArrayImages(randomImages).slice(0, 10);
    createPreviews(randomArrayImages);
    initBigPicture(randomArrayImages);
  });
});

const initPressButtonDiscussedImages = debounce(() => {
  defaultButton.classList.remove('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  discussedButton.classList.add('img-filters__button--active');
  const compareCommentsImages = (imageA, imageB) => imageB.comments.length - imageA.comments.length;
  getData((images) => {
    const discussedImages = images.slice();
    discussedImages.sort(compareCommentsImages);
    createPreviews(discussedImages);
    initBigPicture(discussedImages);
  });
});

const initPressButtonImagesFilters = () => {
  defaultButton.addEventListener('click', initPressButtonDefaultImages);
  randomButton.addEventListener('click', initPressButtonRandomImages);
  discussedButton.addEventListener('click', initPressButtonDiscussedImages);
};

export { createPreviews, initPressButtonImagesFilters };
