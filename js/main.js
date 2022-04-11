import { getData } from './get-data-api.js';
import { initImagesFilters } from './create-previews.js';
import { initBigPicture } from './big-picture.js';
import { initUploadFile } from './upload-file.js';

getData((images) => {
  initImagesFilters(images);
  initBigPicture(images);
});

initUploadFile();
