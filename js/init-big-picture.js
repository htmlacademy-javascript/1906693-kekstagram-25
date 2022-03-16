const bigPicture = document.querySelector('.big-picture');
// Сейчас я нажимаю на pictures, на любую картинку. А надо на конкретную!!!
const similarBigPictureComments = document.querySelector('.social__comments');
const similarBigPictureCommentsTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const initBigPicture = (images) => {

  // Для комментариев под фотографией использовал Document Fragment. Но выводятся все комментарии.
  // А как достать текущий комментарий?

  const bigPictureCommentsArray = document.createDocumentFragment();

  images.forEach(({ url, likes, comments, description }) => {
    const bigPictureCommentsElement = similarBigPictureCommentsTemplate.cloneNode(true);
    bigPicture.querySelector('img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__caption').textContent = description;
    bigPictureCommentsElement.querySelector('.social__picture').src = comments[0].avatar;
    bigPictureCommentsElement.querySelector('.social__picture').alt = comments[0].name;
    bigPictureCommentsElement.querySelector('.social__text').textContent = comments[0].message;
    bigPictureCommentsArray.appendChild(bigPictureCommentsElement);
  });

  similarBigPictureComments.appendChild(bigPictureCommentsArray);

  // Сейчас я нажимаю на pictures, на любую картинку. А надо на конкретную!!!
  document.querySelector('.pictures').addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    // Счетчик комментариев
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
  });

  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
    }
  });
};

export { initBigPicture };
