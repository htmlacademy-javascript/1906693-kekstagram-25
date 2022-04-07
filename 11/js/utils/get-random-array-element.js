import { getRandomInteger } from './get-random-integer.js';

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export { getRandomArrayElement };
