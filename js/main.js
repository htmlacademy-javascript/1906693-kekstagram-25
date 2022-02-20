// за основу взят код отсюда https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInteger (min, max) {
  const MINIMAL_VALUE = 0;

  if ((min >= MINIMAL_VALUE) && (max >= MINIMAL_VALUE) && (min <= max)) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return false;
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
