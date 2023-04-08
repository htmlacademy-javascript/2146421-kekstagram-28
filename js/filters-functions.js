import { createPictures } from './create-miniatures.js';
const RANDOM_PICTURES_COUNT = 10;
const randomFilterButton = document.querySelector('#filter-random');
const defaultFilterButton = document.querySelector('#filter-default');
const discussedFilterButton = document.querySelector('#filter-discussed');

//функция, показывающая фильтры фото
export const openFilters = () => {
  const fitters = document.querySelector('.img-filters');
  fitters.classList.remove('img-filters--inactive');
};

//Функция, которая перемешивает элементы массива случайным образом
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const likesCount = (object) => object.comments.length;

//Функция, которая сортирует объекты по убыванию количесвта лайков
const compare = (picture1, picture2) => {
  const likes1 = likesCount(picture1);
  const likes2 = likesCount(picture2);
  return likes2 - likes1;
};

//функция, которая отрисовыввает рандомные фото пользователей
export const createRandomPictures = (picturesFromServer) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  picturesFromServer = picturesFromServer.slice();
  shuffle(picturesFromServer);
  const newPicturesArray = picturesFromServer.slice(0, RANDOM_PICTURES_COUNT);
  createPictures(newPicturesArray);
  randomFilterButton.classList.add('img-filters__button--active');
};

//функция, которая отрисовыввает фото пользователей в порядке, полученном от сервера
export const createDefaultPictures = (picturesFromServer) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  createPictures(picturesFromServer);
  defaultFilterButton.classList.add('img-filters__button--active');
};

//функция, которая отрисовыввает фото пользователей, сортируя их по убыванию количества комментариев
export const createDiscussedPictures = (picturesFromServer) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  picturesFromServer = picturesFromServer.slice();
  picturesFromServer.sort(compare);
  createPictures(picturesFromServer);
  discussedFilterButton.classList.add('img-filters__button--active');
};

export const setRandomPictures = (cb) => {
  randomFilterButton.addEventListener('click', () => {
    cb();
  });
};

export const setDefaultPictures = (cb) => {
  defaultFilterButton.addEventListener('click', () => {
    cb();
  });
};

export const setDiscussedPictures = (cb) => {
  discussedFilterButton.addEventListener('click', () => {
    cb();
  });
};

