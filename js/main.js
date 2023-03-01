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
const createCommentObject = () => {
  const randomCommentId = createRandomIdFromRangeGenerator (1, 7000);
  const randomAvatarId = getRandomInteger(1, 6);

  return {
    id: randomCommentId(),
    avatar: `img/avatar-${randomAvatarId}.svg`,
    message: randomArrayElement(MASSAGES),
    name: randomArrayElement(NAMES),
  };
};

//Создаем список комментариев - массив объектов
const commentsArray = Array.from({length: 4}, createCommentObject);


//Функция, которая возвращает случайный элемент из массива
function randomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

const createObject = () => {
  const randomObjectId = createRandomIdFromRangeGenerator(1, 25);
  const randomNumberOfLikes = getRandomInteger(15, 200);
  const randomPhotosId = createRandomIdFromRangeGenerator(1, 25);

  return {
    id: randomObjectId(),
    url: `photos/${randomPhotosId()}.jpg`,
    description: randomArrayElement(DESCRIPTON),
    likes: randomNumberOfLikes,
    comments: commentsArray,
  };
};

console.log(createObject());


