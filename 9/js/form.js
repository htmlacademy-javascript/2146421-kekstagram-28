import { isEscapeKey } from './util.js';
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_QTY = 5;
const imgUploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel ');
const description = document.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUploadForm () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadFile.value = '';
  imgUploadOverlay.reset();
}

imgUploadFile.addEventListener('change', () => {
  openUploadForm();
});

uploadCancelButton.addEventListener('click', () => {
  closeUploadForm();
});

const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine (imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

//Проверка валидности хештегов

const validSymbols = /^#[a-zа-я0-9]{1,19}$/i;
const hashtagField = imgUploadForm.querySelector('.text__hashtags');

const inputInFocus = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

hashtagField.addEventListener('keydown', inputInFocus);
description.addEventListener('keydown', inputInFocus);


//Функция, проверяющая соответствие символом хештега
function isTagValid() {
  const hashtagsArray = hashtagField.value.split(' ');
  if (hashtagField.value.length === 0) {
    return true;
  }
  return hashtagsArray.every((hashtag) => validSymbols.test(hashtag));
}

pristine.addValidator(
  hashtagField,
  isTagValid,
  'Неверный хештег'
);

//функция, которая проверяет количество хэштегов
function validateHashtagCount () {
  const hashtagsArray = hashtagField.value.split(' ');
  return hashtagsArray.length <= HASHTAG_MAX_QTY;
}

pristine.addValidator(
  hashtagField,
  validateHashtagCount,
  'Количество хештегов не может превышать 5'
);

//функция, которая проверяет уникальность хэштегов
function validateHashtagUnique () {
  const values = [];
  const hashtagsArray = hashtagField.value.split(' ');
  for (let i = 0; i < hashtagsArray.length; i++) {
    const value = hashtagsArray[i];
    if (values.indexOf(value) !== -1) {
      return false;
    }
    values.push(value);
  }
  return true;
}

pristine.addValidator(
  hashtagField,
  validateHashtagUnique,
  'Хештеги не должны повторяться'
);

//функция, которая проверяет длинну комментария
function validateComment (value) {
  return value.length <= COMMENT_MAX_LENGTH;
}

pristine.addValidator(
  description,
  validateComment,
  'Комментарий слишком длинный'
);


const onFormSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    imgUploadForm.submit();
  }
};

imgUploadForm.addEventListener('submit', onFormSubmit);


