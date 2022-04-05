import { createPreviews } from './create-previews.js';
import { initBigPicture } from './big-picture.js';
import { getData } from './get-data-api.js';
import { initImgUpload, initImgUploadFormSubmit, closeImgUpload } from './validation-form.js';

getData((images) => {
  createPreviews(images);
  initBigPicture(images);
});

initImgUpload();
initImgUploadFormSubmit(closeImgUpload);
