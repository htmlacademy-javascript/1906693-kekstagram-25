// за основу взят код отсюда https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const GET_RANDOM_INTEGER = function (min, max) {
  if (min < 0) {
    min = 0;
  } else {
    min = Math.ceil(min);
  }

  if (max < 0) {
    max = 0;
  } else {
    max = Math.floor(max);
  }

  if (max < min) {
    min = Math.ceil(min);
    max = min;
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
  }

  return Math.floor(Math.random() * (max - min)) + min;
};
GET_RANDOM_INTEGER(-100, -10);

// за основу взят код отсюда https://www.cyberforum.ru/javascript/thread1165903.html

const CHECK_MAX_STRING_LENGTH = function (stringCheck, maxLength) {
  if (stringCheck.length > maxLength) {
    return false;
  }
  return true;
};
CHECK_MAX_STRING_LENGTH('Привет', 140);
