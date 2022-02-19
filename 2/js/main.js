// за основу взят код отсюда https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const MINIMAL_VALUE = 0;
function getRandomInteger (min, max) {
  if (min < 0) {
    min = MINIMAL_VALUE;
  } else {
    min = Math.ceil(min);
  }

  if (max < 0) {
    max = MINIMAL_VALUE;
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
}
getRandomInteger(-100, -10);

// за основу взят код отсюда https://www.cyberforum.ru/javascript/thread1165903.html

function checkStringMaxLength (stringCheck, maxLength) {
  if (stringCheck.length > maxLength) {
    return false;
  }
  return true;
}
checkStringMaxLength('Привет', 140);
