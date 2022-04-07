import { createPreviews, initPressButtonImagesFilters } from './create-previews.js';
import { initBigPicture } from './big-picture.js';
import { getData } from './get-data-api.js';
import { initImgUpload, initImgUploadFormSubmit } from './validation-form.js';

getData((images) => {
  createPreviews(images);
  initBigPicture(images);
});

initPressButtonImagesFilters();
initImgUpload();
initImgUploadFormSubmit();
