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

const showDefaultImages = (cb) => {
  defaultButton.addEventListener('click', () => {
    defaultButton.classList.add('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');
    cb();
  });
};

const showRandomImages = (cb) => {
  randomButton.addEventListener('click', () => {
    defaultButton.classList.remove('img-filters__button--active');
    randomButton.classList.add('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');
    cb();
  });
};

const showDiscussedImages = (cb) => {
  discussedButton.addEventListener('click', () => {
    defaultButton.classList.remove('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.add('img-filters__button--active');
    cb();
  });
};

export { createPreviews, showDefaultImages, showRandomImages, showDiscussedImages };
