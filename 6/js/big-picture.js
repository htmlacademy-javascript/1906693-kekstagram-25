const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const fillBigPicture = (id) => {
  const idBigPreview = event.target.closest('.picture__img').getAttribute('data-id');
  const matchingPreviewBigPicture =  id.find((photo) => String(photo.id) === idBigPreview);
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

const initBigPicture = (id) => {
  pictures.addEventListener('click', (event) => {

    if (event.target.className !== 'picture__img') {
      return;
    }

    fillBigPicture(id);

    openBigPicture();
  });

  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closeBigPicture();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPicture();
    }
  });
};

export { initBigPicture };
