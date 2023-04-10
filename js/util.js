const MESSAGE_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;
const isEscapeKey = (evt) => evt.key === 'Escape';
const alertTemplate = document.querySelector('#error').content;
const successMessageTemplate = document.querySelector('#success').content;


//Функция, которая удаляет сообщение об ошибке загрузки фото при клике на esc
const onErrorLoadingKeydown = (evt) => {
  const alertModal = document.querySelector('.error');
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    alertModal.remove();
    alertModal.removeEventListener('keydown', onErrorLoadingKeydown);
  }
};

//Функция, удаляющая окно с сообщением об ошибке
const onErrorButtonClick = () => {
  document.querySelector('.error').remove();
  document.removeEventListener ('click', onErrorButtonClick);
};

const onModalErrorOutsideClick = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    document.querySelector('.error').remove();
    document.removeEventListener('click', onModalErrorOutsideClick);
  }
};

//функция, которая генерирует сообщение об ошибке отправки данных на сервер
const showAlert = () => {
  const alertMessage = alertTemplate.cloneNode(true);
  document.body.append(alertMessage);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorLoadingKeydown);
  document.addEventListener('click', onModalErrorOutsideClick);
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

//Функция, которая удаляет сообщение об успешной загрузке при клике на esc
const onSuccessLoadingKeydown = (evt) => {
  const successModal = document.querySelector('.success');
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successModal.remove();
    successModal.removeEventListener('keydown', onSuccessLoadingKeydown);
  }
};

//Функция, удаляющая окно с сообщением об успешной загрузке фото
const onSuccessButtonClick = () => {
  document.querySelector('.success').remove();
  document.removeEventListener ('click', onSuccessButtonClick);
};

const onModalSuccessOutsideClick = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    document.querySelector('.success').remove();
    document.removeEventListener('click', onModalSuccessOutsideClick);
  }
};

//Функция, которая генерирует сообщение об успешной загрузке фото пользователя
const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  const successModal = document.querySelector('.success');
  const successButton = successModal.querySelector('.success__button');
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onSuccessLoadingKeydown);
  document.addEventListener('click', onModalSuccessOutsideClick);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

//Функция, которая перемешивает элементы массива случайным образом
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export { isEscapeKey, showAlert, loadingErrorMessage, showSuccessMessage, debounce, RERENDER_DELAY, shuffle };


