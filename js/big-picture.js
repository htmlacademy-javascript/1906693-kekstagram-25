import { isEscapeKey } from './utils/is-escape-key.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  }
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
};

const fillBigPicture = (id, images) => {
  const matchingPreviewBigPicture =  images.find((photo) => String(photo.id) === id);
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
  bigPicture.querySelector('.comments-count').textContent = matchingPreviewBigPicture.comments.length;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

const clearBigPicture = () => {
  bigPicture.querySelector('.social__comments').innerHTML = '';
  bigPicture.querySelector('.social__caption').innerHTML = '';
  bigPicture.querySelector('.big-picture__img').querySelector('img').alt = '';
  bigPicture.querySelector('img').src = '';
  bigPicture.querySelector('.likes-count').innerHTML = '';
  bigPicture.querySelector('.comments-count').innerHTML = '';
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

const initBigPicture = (images) => {
  pictures.addEventListener('click', (evt) => {

    if (evt.target.className !== 'picture__img') {
      return;
    }

    const idBigPreview = evt.target.closest('.picture__img').getAttribute('data-id');

    fillBigPicture(idBigPreview, images);
    openBigPicture();
  });

  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    clearBigPicture();
    closeBigPicture();
  });
};

export { initBigPicture };
