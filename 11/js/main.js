import { getData } from './get-data-api.js';
import { createPreviews, showDefaultImages, showRandomImages, showDiscussedImages } from './create-previews.js';
import { initBigPicture } from './big-picture.js';
import { debounce } from './utils/debounce.js';
import { initImgUpload, initImgUploadFormSubmit } from './validation-form.js';

getData((images) => {
  createPreviews(images);
  initBigPicture(images);

  showDefaultImages(debounce(
    () => createPreviews(images)
  ));

  showRandomImages(debounce(
    () => {
      const randomImages = images.slice();
      const shuffleArrayImages = (ArrayImages) => {
        let j, temp;
        for (let i = ArrayImages.length - 1; i > 0; i--) {
          j = Math.floor(Math.random()*(i + 1));
          temp = ArrayImages[j];
          ArrayImages[j] = ArrayImages[i];
          ArrayImages[i] = temp;
        }
        return ArrayImages;
      };
      const randomArrayImages = shuffleArrayImages(randomImages).slice(0, 10);
      createPreviews(randomArrayImages);
    }));

  showDiscussedImages(debounce(
    () => {
      const compareCommentsImages = (imageA, imageB) => imageB.comments.length - imageA.comments.length;
      const discussedImages = images.slice();
      discussedImages.sort(compareCommentsImages);
      createPreviews(discussedImages);
    }));
});

initImgUpload();
initImgUploadFormSubmit();
