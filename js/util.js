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

const isEscapeKey = (evt) => evt.key === 'Escape';

//функция, которая генерирует сообщение об ошибке загрузки/отправки данных на сервер
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


const showSuccessMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '40%';
  alertContainer.style.top = '50%';
  alertContainer.style.right = '40%';
  alertContainer.style.padding = '40px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.color = 'black';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'lightgrey';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export { getRandomInteger, createRandomIdFromRangeGenerator, randomArrayElement, createIdGenerator, isEscapeKey, showAlert, showSuccessMessage};
