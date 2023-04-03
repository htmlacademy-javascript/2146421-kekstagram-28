import { showAlert } from './util.js';

const getData = () => fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    showAlert('Не удалось загрузить данные. Пожалуйста, обновите страницу');
  });

//const sendData = (body) => {};

export { getData };
