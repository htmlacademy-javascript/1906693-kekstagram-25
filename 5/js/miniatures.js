const picturesTitle = document.querySelector('.pictures__title');
const similarListImages = document.querySelector('.pictures');
const similarImagesTemplate = document.querySelector('#picture').content.querySelector('.picture');

picturesTitle.classList.remove('visually-hidden');

const createPreviews = (images) => {
  const similarListImage = document.createDocumentFragment();

  images.forEach(({ url, likes, comments }) => {
    const imagesElement = similarImagesTemplate.cloneNode(true);
    imagesElement.querySelector('.picture__img').src = url;
    imagesElement.querySelector('.picture__likes').textContent = likes;
    imagesElement.querySelector('.picture__comments').textContent = comments.length;
    similarListImages.appendChild(imagesElement);
  });

  similarListImages.appendChild(similarListImage);
};

export { createPreviews };
