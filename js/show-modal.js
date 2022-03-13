const bodyModalElement = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bodyModalCloseElement = bigPicture.querySelector('.big-picture__cancel');
const bodyModalOpenElement = document.querySelector('.pictures');

bodyModalElement.classList.add('modal-open');

bodyModalOpenElement.addEventListener('click', () => {
  bodyModalElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
});

bodyModalCloseElement.addEventListener('click', () => {
  bodyModalElement.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});
