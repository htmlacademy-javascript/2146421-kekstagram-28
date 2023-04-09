import { createPictures } from './create-miniatures.js';
import { shuffle } from './util.js';
const RANDOM_PICTURES_COUNT = 10;
const filtersContainer = document.querySelector('.img-filters__form');
const randomFilterButton = document.querySelector('#filter-random');
const defaultFilterButton = document.querySelector('#filter-default');
const discussedFilterButton = document.querySelector('#filter-discussed');
const filterRandom = document.getElementById('#filter-random');
const filterDefault = document.getElementById('#filter-default');
const filterDiscussed = document.getElementById('#filter-discussed');

//функция, показывающая фильтры фото
export const openFilters = () => {
  const fitters = document.querySelector('.img-filters');
  fitters.classList.remove('img-filters--inactive');
};

const likesCount = (object) => object.comments.length;

//Функция, которая сортирует объекты по убыванию количесвта лайков
const compare = (picture1, picture2) => {
  const likes1 = likesCount(picture1);
  const likes2 = likesCount(picture2);
  return likes2 - likes1;
};

//функция, удаляющая активное состояние кнопки, после переключения на новый фильтр
const removeActiveFilterStatus = () => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
};

//функция, которая отрисовыввает рандомные фото пользователей
const createRandomPictures = (picturesFromServer) => {
  removeActiveFilterStatus();
  picturesFromServer = picturesFromServer.slice();
  shuffle(picturesFromServer);
  const newPicturesArray = picturesFromServer.slice(0, RANDOM_PICTURES_COUNT);
  createPictures(newPicturesArray);
  randomFilterButton.classList.add('img-filters__button--active');
};


//функция, которая отрисовыввает фото пользователей в порядке, полученном от сервера
const createDefaultPictures = (picturesFromServer) => {
  removeActiveFilterStatus();
  createPictures(picturesFromServer);
  defaultFilterButton.classList.add('img-filters__button--active');
};

//функция, которая отрисовыввает фото пользователей, сортируя их по убыванию количества комментариев
const createDiscussedPictures = (picturesFromServer) => {
  removeActiveFilterStatus();
  picturesFromServer = picturesFromServer.slice();
  picturesFromServer.sort(compare);
  createPictures(picturesFromServer);
  discussedFilterButton.classList.add('img-filters__button--active');
};

export const generateMiniatures = (array, evt) => {
  if (evt.target.id === filterRandom) {
    createRandomPictures(array);
  }
  if (evt.target.id === filterDefault) {
    createDefaultPictures(array);
  }
  if (evt.target.id === filterDiscussed) {
    createDiscussedPictures(array);
  }
};

export const setFilterClick = (cb) => {
  filtersContainer.addEventListener('click', () => {
    cb();
  });
};


