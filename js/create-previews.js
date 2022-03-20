import { bigPicture } from './big-picture.js';
import { openBigPicture } from './big-picture.js';

const similarImagesBlock = document.querySelector('.pictures');
const similarImagesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPreviews = (images) => {
  const similarImagesFragment = document.createDocumentFragment();

  images.forEach(({ url, likes, comments, id }) => {
    const imagesElement = similarImagesTemplate.cloneNode(true);
    imagesElement.querySelector('.picture__img').src = url;
    imagesElement.querySelector('.picture__likes').textContent = likes;
    imagesElement.querySelector('.picture__comments').textContent = comments.length;
    imagesElement.querySelector('.picture__img').setAttribute('data-id', id);

    imagesElement.addEventListener('click', () => {
      const idBigPreview = imagesElement.querySelector('img').getAttribute('data-id');
      const matchingPreviewBigPicture =  images.find((photo) => String(photo.id) === idBigPreview);
      const socialComments = bigPicture.querySelector('.social__comments');
      const templateComment = document.querySelector('#comment').content.querySelector('.social__comment');
      const similarPictureComment = document.createDocumentFragment();

      bigPicture.querySelector('.social__comments').innerHTML = '';

      matchingPreviewBigPicture.comments.forEach(({ avatar, message, name }) => {
        const commentsElement = templateComment.cloneNode(true);
        commentsElement.querySelector('.social__picture').src = avatar;
        commentsElement.querySelector('.social__picture').alt = name;
        commentsElement.querySelector('.social__text').textContent = message;
        similarPictureComment.appendChild(commentsElement);
      });

      socialComments.appendChild(similarPictureComment);

      bigPicture.querySelector('.social__caption').textContent = matchingPreviewBigPicture.description;
      bigPicture.querySelector('img').src = matchingPreviewBigPicture.url;
      bigPicture.querySelector('.likes-count').textContent = matchingPreviewBigPicture.likes;

      openBigPicture();

      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
    });

    similarImagesFragment.appendChild(imagesElement);
  });

  similarImagesBlock.appendChild(similarImagesFragment);
};

export { createPreviews };
