const bigPicture = document.querySelector('.big-picture');

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const initBigPicture = () => {

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

export { bigPicture, openBigPicture, initBigPicture };
