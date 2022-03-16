import { createImages } from './data.js';
import { createPreviews } from './create-previews.js';
import { initBigPicture } from './init-big-picture.js';

const images = createImages();
createPreviews(images);
initBigPicture(images);