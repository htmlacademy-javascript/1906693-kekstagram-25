import { isEscapeKey } from './utils/is-escape-key.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const onBigPictureCancel = () => {
  closeBigPicture();
  bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', onBigPictureCancel);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
};

function onBigPictureEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeydown);
    bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', onBigPictureCancel);
  }
}

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
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
    commentsElement.querySelector('.social__text').textContent = message;
    commentsElement.querySelector('.social__picture').alt = name;
    similarPictureComment.appendChild(commentsElement);
  });

  socialComments.appendChild(similarPictureComment);

  bigPicture.querySelector('.social__caption').textContent = matchingPreviewBigPicture.description;
  bigPicture.querySelector('img').src = matchingPreviewBigPicture.url;
  bigPicture.querySelector('.likes-count').textContent = matchingPreviewBigPicture.likes;
  bigPicture.querySelector('.comments-count').textContent = matchingPreviewBigPicture.comments.length;
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
};

const fillComments = () => {
  const COMMENT_STEP = 5;
  const socialCommentsElements = bigPicture.querySelectorAll('.social__comment');
  let сommentCounter = 0;

  const onCommentsCheck = () => {
    bigPicture.querySelector('.social__comment-count').innerHTML = `${сommentCounter} из <span class="comments-count">${socialCommentsElements.length}</span> комментариев`;
    сommentCounter += COMMENT_STEP;
    if (сommentCounter <= socialCommentsElements.length) {
      for (let i = сommentCounter - COMMENT_STEP; i < сommentCounter; i++) {
        socialCommentsElements[i].style.display = '';
      }
      bigPicture.querySelector('.social__comment-count').innerHTML = `${сommentCounter} из <span class="comments-count">${socialCommentsElements.length}</span> комментариев`;
    }

    if (сommentCounter >= socialCommentsElements.length) {

      for (let i = сommentCounter - COMMENT_STEP; i < socialCommentsElements.length; i++) {
        socialCommentsElements[i].style.display = '';
      }

      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').removeEventListener('click', onCommentsCheck);
    }

    if (сommentCounter > socialCommentsElements.length) {
      bigPicture.querySelector('.social__comment-count').innerHTML = `${socialCommentsElements.length} из <span class="comments-count">${socialCommentsElements.length}</span> комментариев`;
    }
  };

  for (let i = COMMENT_STEP; i < socialCommentsElements.length; i++) {
    socialCommentsElements[i].style.display = 'none';
  }

  if (socialCommentsElements.length <= COMMENT_STEP) {
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPicture.querySelector('.social__comment-count').innerHTML = `${socialCommentsElements.length} из <span class="comments-count">${socialCommentsElements.length}</span> комментариев`;
  } else {
    onCommentsCheck();
    bigPicture.querySelector('.comments-loader').addEventListener('click', onCommentsCheck);
  }

  const onCheckCommentBigPictureCancelClick = () => {
    bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', onCheckCommentBigPictureCancelClick);
    document.removeEventListener('keydown', onCheckCommentBigPictureEscKeydown);
    bigPicture.querySelector('.comments-loader').removeEventListener('click', onCommentsCheck);
  };

  function onCheckCommentBigPictureEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', onCheckCommentBigPictureEscKeydown);
      bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', onCheckCommentBigPictureCancelClick);
      bigPicture.querySelector('.comments-loader').removeEventListener('click', onCommentsCheck);
    }
  }

  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onCheckCommentBigPictureCancelClick);
  document.addEventListener('keydown', onCheckCommentBigPictureEscKeydown);
};

const initBigPicture = (images) => {
  pictures.addEventListener('click', (evt) => {
    if (evt.target.className !== 'picture__img') {
      return;
    }
    const idBigPreview = evt.target.closest('.picture__img').getAttribute('data-id');
    fillBigPicture(idBigPreview, images);
    fillComments();
    openBigPicture();
    bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onBigPictureCancel);
  });
};

export { initBigPicture };
