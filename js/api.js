import { showAlert, showSuccessMessage } from './util.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Пожалуйста, обновите страницу',
  SEND_DATA: 'Не удалось отправить данные. Произошла ошибка',
};

const getData = () => fetch(`${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    showAlert(`${ErrorText.GET_DATA}`);
  });

const sendData = (formData) => {
  fetch(
    fetch(`${BASE_URL}${Route.SEND_DATA}`),
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    showSuccessMessage('Фото добавлено!');
  })
    .catch(() => {
      showAlert(`${ErrorText.SEND_DATA}`);
    });
};

export { getData, sendData};
