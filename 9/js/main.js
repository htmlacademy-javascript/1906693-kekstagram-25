import { createImages } from './data.js';
import { createPreviews } from './create-previews.js';
import { initBigPicture } from './big-picture.js';
import { initImgUpload } from './validation-form.js';
import './apply-image-effect.js';

const images = createImages();

createPreviews(images);
initBigPicture(images);
initImgUpload();
