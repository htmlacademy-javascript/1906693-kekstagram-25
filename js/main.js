// за основу взят код отсюда https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInteger = (min, max) => {
  let minimumInteger = Math.ceil(min);
  let maximumInteger = Math.floor(max);

  if (min < 0) {
    minimumInteger = 0;
  }

  if ((max < 0) || (max < min)) {
    maximumInteger = minimumInteger;
  }

  return Math.floor(Math.random() * (maximumInteger - minimumInteger + 1)) + minimumInteger;
};

// за основу взят код отсюда https://www.cyberforum.ru/javascript/thread1165903.html

const checkStringMaxLength = (stringCheck, maxLength) => {
  if (stringCheck.length > maxLength) {
    return false;
  }
  return true;
};
checkStringMaxLength('Привет', 140);

const CURRENT_USERS_COUNT = 25;

const mainId = Array.from({length: CURRENT_USERS_COUNT}, (v, i) =>  i + 1);

const DESCRIPTIONS = [
  'Тестовое описание № 1.',
  'Тестовое описание № 2.',
  'Тестовое описание № 3.',
  'Тестовое описание № 4.',
  'Тестовое описание № 5.',
  'Тестовое описание № 6.'
];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const idComments = [];
for (let i = 0; i < CURRENT_USERS_COUNT; i++) {
  idComments.push(i);
  shuffle(idComments);
}

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Хуан',
  'Мария'
];

const createComments = () => ({
  id: getRandomArrayElement(idComments),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const currentComments = Array.from({length: CURRENT_USERS_COUNT}, createComments);

const doStructure = () => ({
  id: getRandomArrayElement(mainId),
  url: `photos/${getRandomInteger(1, CURRENT_USERS_COUNT)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: getRandomArrayElement(currentComments),
});

const mainStructure = Array.from({length: CURRENT_USERS_COUNT}, doStructure);
mainStructure();
