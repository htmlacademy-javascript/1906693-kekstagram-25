// за основу взят код отсюда https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInteger (min, max) {
  let minimumInteger = Math.ceil(min);
  let maximumInteger = Math.floor(max);

  if (min < 0) {
    minimumInteger = 0;
  }

  if ((max < 0) || (max < min)) {
    maximumInteger = minimumInteger;
  }

  return Math.floor(Math.random() * (maximumInteger - minimumInteger + 1)) + minimumInteger;
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
