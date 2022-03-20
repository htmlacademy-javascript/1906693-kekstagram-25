import { createImages } from './data.js';
import { createPreviews } from './create-previews.js';
import { closeBigPicture } from './close-big-picture.js';

const images = createImages();
createPreviews(images);
closeBigPicture();
