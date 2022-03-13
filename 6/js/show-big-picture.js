const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img');
const bigPictureUrl = bigPictureImage.querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureSocialComments = bigPicture.querySelector('.social__comments');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
const bigPictureSocialPictureSrc = bigPicture.querySelector('.social__picture');
const bigPictureSocialPictureAlt = bigPictureSocialPictureSrc;
const bigPictureSocialPictureSocialText = bigPictureSocialPictureSrc;
const bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

const showBigPicture = (images) => {
  bigPicture.classList.remove('hidden');

  images.forEach(({ url, likes, comments, description }) => {
    bigPictureUrl.src = url;
    bigPictureLikes.textContent = likes;
    bigPictureComments.textContent = comments.length;
    bigPictureSocialCaption.textContent = description;
    bigPictureUrl.src = url;
    bigPictureSocialPictureSrc.src = comments[0].avatar;
    bigPictureSocialPictureAlt.textContent = comments[0].name;
    bigPictureSocialPictureSocialText.textContent = comments[0].message;
  });

  const lastСomment = `<li class="social__comment"><img class="social__picture" src="${bigPictureSocialPictureSrc.src}" alt="${bigPictureSocialPictureAlt.textContent}" width="35" height="35"><p class="social__text">${bigPictureSocialPictureSocialText.textContent}</p></li>`;
  bigPictureSocialComments.insertAdjacentHTML('beforeend', lastСomment);
  bigPictureSocialCommentCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
};

export { showBigPicture };
