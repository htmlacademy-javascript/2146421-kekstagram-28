import { showAlert, loadingErrorMessage, showSuccessMessage } from './util.js';
import { closeUploadForm } from './form.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
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
    loadingErrorMessage(`${ErrorText.GET_DATA}`);
  });

const sendData = (formData) => {
  fetch((`${BASE_URL}`),
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    showSuccessMessage('Фото добавлено!');
    closeUploadForm();
  })
    .catch(() => {
      showAlert(`${ErrorText.SEND_DATA}`);
    });
};

export { getData, sendData};
