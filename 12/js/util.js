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
  const alertTemplate = document.querySelector('#error').content;
  const alertMessage = alertTemplate.cloneNode(true);
  document.body.append(alertMessage);
  const alertModal = document.querySelector('.error');
  const errorButton = alertModal.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    alertModal.remove();
  });
  document.addEventListener('click', () => {
    alertModal.remove();
  });
};

//Функция, которая генерирует сообщение об ошибке загрузки фото других пользователей
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

//Функция, которая генерирует сообщение об ошибке загрузки фото пользователя
const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content;
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  const successModal = document.querySelector('.success');
  const successButton = successModal.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    successModal.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successModal.remove();
    }
  });
  document.addEventListener('click', () => {
    successModal.remove();
  });
};

export { getRandomInteger, createRandomIdFromRangeGenerator, randomArrayElement, createIdGenerator, isEscapeKey, showAlert, loadingErrorMessage, showSuccessMessage};

