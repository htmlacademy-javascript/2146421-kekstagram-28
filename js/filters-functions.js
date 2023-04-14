import { createPictures } from './create-miniatures.js';
import { shuffle, debounce, RERENDER_DELAY } from './util.js';
const RANDOM_PICTURES_COUNT = 10;
const filtersContainer = document.querySelector('.img-filters');
const randomFilterButton = document.querySelector('#filter-random');
const defaultFilterButton = document.querySelector('#filter-default');
const discussedFilterButton = document.querySelector('#filter-discussed');
const FILTER_RANDOM = 'filter-random';
const FILTER_DEFAULT = 'filter-default';
const FILTER_DISCUSSED = 'filter-discussed';
const debounceCreatePictures = debounce(createPictures, RERENDER_DELAY);

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
  randomFilterButton.classList.add('img-filters__button--active');
  debounceCreatePictures(newPicturesArray);
};

//функция, которая отрисовыввает фото пользователей в порядке, полученном от сервера
const createDefaultPictures = (picturesFromServer) => {
  removeActiveFilterStatus();
  defaultFilterButton.classList.add('img-filters__button--active');
  debounceCreatePictures(picturesFromServer);
};

//функция, которая отрисовыввает фото пользователей, сортируя их по убыванию количества комментариев
const createDiscussedPictures = (picturesFromServer) => {
  removeActiveFilterStatus();
  picturesFromServer = picturesFromServer.slice();
  picturesFromServer.sort(compare);
  discussedFilterButton.classList.add('img-filters__button--active');
  debounceCreatePictures(picturesFromServer);
};


export const selectGenerateFunction = (data) => {
  filtersContainer.addEventListener('click', (evt) => {
    const currentFilter = evt.target.id;
    if (currentFilter === FILTER_RANDOM) {
      return createRandomPictures(data);
    }
    if (currentFilter === FILTER_DEFAULT) {
      return createDefaultPictures(data);
    }
    if (currentFilter === FILTER_DISCUSSED) {
      return createDiscussedPictures(data);
    }
  });
};
