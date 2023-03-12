import { getRandomInteger, createRandomIdFromRangeGenerator, randomArrayElement, createIdGenerator } from './util.js';

const OBJECTS_COUNT = 25;
const COMMENTS_MAX_COUNT = 20;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const AVATAR_ID_COUNT = 6;
const COMMENT_ID_COUNT = 7000;

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Факундо Орано',
  'Брюс Всемогущий',
  'Форест',
];

const MASSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTON = [
  'Абстракция.',
  'Так видит художник.',
  'Моя лучшая работа.',
  'Вдохновляюсь, глядя на такое!',
  'Вот это вид!',
  'Так фоткает мой новый аппарат!',
  'Нельзя было пройти мимо!',
  'Настроение.',
  'Только учусь.',
  'Заказ фотосессии - в личку.',
];

const generateObjectId = createIdGenerator();

//Функция, которая создает и возвращает объект-комментарий
const createComment = () => ({
  id: createRandomIdFromRangeGenerator (1, COMMENT_ID_COUNT),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_ID_COUNT)}.svg`,
  message: Array.from({length: getRandomInteger(1, 2)}, () => randomArrayElement(MASSAGES)).join(' '),
  name: randomArrayElement(NAMES),
});

const randomPhotosId = createRandomIdFromRangeGenerator (1, OBJECTS_COUNT);


//Функция, которая создает объект
const createObject = () => ({
  id: generateObjectId(),
  url: `photos/${randomPhotosId()}.jpg`,
  description: randomArrayElement(DESCRIPTON),
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(1, COMMENTS_MAX_COUNT)}, createComment),
});

//Функция, которая создает массив объектов
const createObjectsArray = () => Array.from({length: OBJECTS_COUNT}, createObject);

export { createObjectsArray };
