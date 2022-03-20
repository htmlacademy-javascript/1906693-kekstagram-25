const bigPicture = document.querySelector('.big-picture');

const closeBigPicture = () => {

  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });

};

export { bigPicture, closeBigPicture };
