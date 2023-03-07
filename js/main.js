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

//Функция, которая возвращает последовательно сгенерированные идентификаторы объектов, счетчик
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateObjectId = createIdGenerator();

//Функция, которая генерирует и возвращает случайное целое число из диапазона
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//Функция, которая генерирует и возвращает случайное уникальное целое число из диапазона
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      //console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

//Функция, которая создает и возвращает объект-комментарий
const createComment = () => ({
  id: createRandomIdFromRangeGenerator (1, COMMENT_ID_COUNT),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_ID_COUNT)}.svg`,
  message: Array.from({length: getRandomInteger(1, 2)}, () => randomArrayElement(MASSAGES)).join(' '),
  name: randomArrayElement(NAMES),
});

//Функция, которая возвращает случайный элемент из массива
function randomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

const randomPhotosId = createRandomIdFromRangeGenerator(1, OBJECTS_COUNT);

//Функция, которая создает объект
const createObject = () => ({
  id: generateObjectId(),
  url: `photos/${randomPhotosId()}.jpg`,
  description: randomArrayElement(DESCRIPTON),
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(1, COMMENTS_MAX_COUNT)}, createComment),
});


const createObjectsArray = () => Array.from({length: OBJECTS_COUNT}, createObject);

console.log(createObjectsArray());
