import { createImages } from './data.js';
import { createPreviews } from './create-previews.js';
import { showBigPicture } from './show-big-picture.js';
import './show-modal.js';

const images = createImages();
createPreviews(images);
showBigPicture(images);
