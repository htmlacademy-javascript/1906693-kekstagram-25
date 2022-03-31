import { getRandomInteger } from './utils/get-random-integer.js';
import { getRandomArrayElement } from './utils/get-random-array-element.js';

const CURRENT_USERS_COUNT = 25;

const DESCRIPTIONS = [
  'Тестовое описание № 1.',
  'Тестовое описание № 2.',
  'Тестовое описание № 3.',
  'Тестовое описание № 4.',
  'Тестовое описание № 5.',
  'Тестовое описание № 6.'
];

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

let j = 1;
const createComments = () => ({
  id: j++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createImages = () => {
  const imagesArray = [];
  for (let i = 1; i <= CURRENT_USERS_COUNT; i++) {
    imagesArray.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: Array.from({length: getRandomInteger(1, 20)}, createComments)
    });
  }
  return imagesArray;
};

export { createImages };
