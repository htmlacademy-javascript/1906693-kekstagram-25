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

const toggleFilterButtons = (currentButton) => {
  imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  currentButton.classList.add('img-filters__button--active');
};

const initImagesFilters = (images) => {
  let currentButton;
  createPreviews(images);

  const debounceShowDefaultImages = debounce(() => {
    currentButton = defaultButton;
    toggleFilterButtons(currentButton);
    createPreviews(images);
  });

  const debounceShowRandomImages = debounce(() => {
    currentButton = randomButton;
    toggleFilterButtons(currentButton);
    const randomImages = images.slice();
    const shuffleImagesArray = (imagesArray) => {
      let j, temp;
      for (let i = imagesArray.length - 1; i > 0; i--) {
        j = Math.floor(Math.random()*(i + 1));
        temp = imagesArray[j];
        imagesArray[j] = imagesArray[i];
        imagesArray[i] = temp;
      }
      return imagesArray;
    };
    const randomImagesArray = shuffleImagesArray(randomImages).slice(0, 10);
    createPreviews(randomImagesArray);
  });

  const debounceShowDiscussedImages = debounce(() => {
    currentButton = discussedButton;
    toggleFilterButtons(currentButton);
    const compareCommentsImages = (imageA, imageB) => imageB.comments.length - imageA.comments.length;
    const discussedImages = images.slice();
    discussedImages.sort(compareCommentsImages);
    createPreviews(discussedImages);
  });

  defaultButton.addEventListener('click', debounceShowDefaultImages);
  randomButton.addEventListener('click', debounceShowRandomImages);
  discussedButton.addEventListener('click', debounceShowDiscussedImages);
};

export { initImagesFilters };
