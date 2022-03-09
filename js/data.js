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

const createComments = (count) => {
  const comments = [];
  for (let i = 1; i <= count; i++) {
    comments.push({
      id: i,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    });
  }
  return comments;
};

const commentsArray = createComments(CURRENT_USERS_COUNT);

const createImages = (count) => {
  const imagesArray = [];
  for (let i = 1; i <= count; i++) {
    imagesArray.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: getRandomArrayElement(commentsArray)
    });
  }
  return imagesArray;
};

const images = () => createImages(CURRENT_USERS_COUNT);
export { images };
