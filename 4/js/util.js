import {getRandomInteger} from './get-random-integer.js';

const checkStringMaxLength = (stringCheck, maxLength) => {
  if (stringCheck.length > maxLength) {
    return false;
  }
  return true;
};
checkStringMaxLength('Привет', 140);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomArrayElement};
