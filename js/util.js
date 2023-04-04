const isEscapeKey = (evt) => evt.key === 'Escape';
const MESSAGE_SHOW_TIME = 5000;

//Функция, которая генерирует и возвращает случайное целое число из диапазона
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция, которая генерирует и возвращает случайное уникальное целое число из диапазона
const createRandomIdFromRangeGenerator = (min, max) => {
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
};

//Функция, которая возвращает случайный элемент из массива
function randomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

//Функция, которая возвращает последовательно сгенерированные идентификаторы объектов, счетчик
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

//функция, которая генерирует сообщение об ошибке отправки данных на сервер
const showAlert = () => {
  const alertTemplate = document.querySelector('#error').content.querySelector('.error');
  const error = document.createElement('div');
  error.append(alertTemplate.cloneNode(true));
  document.body.append(error);
  const closeAlertButton = error.querySelector('.error__button');
  closeAlertButton.addEventListener('click', () => {
    error.classList.add('hidden');
  });
};

const loadingErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '20%';
  alertContainer.style.top = '10%';
  alertContainer.style.right = '20%';
  alertContainer.style.padding = '20px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, MESSAGE_SHOW_TIME);
};

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content;
  const success = document.createElement('div');
  success.append(successMessage.cloneNode(true));
  document.body.append(success);
  const successButton = success.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    success.remove();
  });
  successButton.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      success.remove();
    }
  });
  document.addEventListener('click', (evt) => {
    if (!evt.target.matches('.success')) {
      success.remove();
    }
  });
};

export { getRandomInteger, createRandomIdFromRangeGenerator, randomArrayElement, createIdGenerator, isEscapeKey, showAlert, loadingErrorMessage, showSuccessMessage};


import {onDocKeydown} from './upload-modal.js';
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessage = errorMessageTemplate.cloneNode(true);

const onClickCloseModal = (evt) => {
  if (evt.target.matches('.success')) {
    document.querySelector('.success').remove();
  } else if (evt.target.matches('.error')) {
    document.querySelector('.error').remove();
  }
};

const closeSuccessMessage = () => {
  document.querySelector('.success').remove();
};

export const uploadSuccess = () => {
  document.body.append(successMessage);
  const successModal = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');
  successModal.addEventListener('click', onClickCloseModal);
  successButton.addEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onDocKeydown);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      document.querySelector('.success').remove();
      document.addEventListener('keydown', onDocKeydown);
    }
  });
};

const closeErrorMessage = () => {
  document.querySelector('.error').remove();
};

export const uploadError = () => {
  document.body.append(errorMessage);
  const errorModal = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  errorModal.addEventListener('click', onClickCloseModal);
  errorButton.addEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onDocKeydown);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      document.querySelector('.error').remove();
      document.addEventListener('keydown', onDocKeydown);
    }
  });
};
