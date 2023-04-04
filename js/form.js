import { isEscapeKey } from './util.js';
import { resetEffects } from './image-filters.js';
import { resetScale } from './scale-image.js';
import { sendData } from './api.js';
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_QTY = 5;
const VALID_SYMBOLS = /^#[a-zа-я0-9]{1,19}$/i;
const imgUploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel ');
const description = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagField = imgUploadForm.querySelector('.text__hashtags');

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

export function closeUploadForm () {
  resetEffects();
  resetScale();
  form.reset();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadFile.value = '';
}

imgUploadFile.addEventListener('change', () => {
  openUploadForm();
});

uploadCancelButton.addEventListener('click', () => {
  closeUploadForm();
});

const pristine = new Pristine (imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

//Проверка валидности хештегов

const inputInFocus = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

hashtagField.addEventListener('keydown', inputInFocus);
description.addEventListener('keydown', inputInFocus);


//Функция, проверяющая соответствие символом хештега
const isTagValid = () => {
  const hashtagsArray = hashtagField.value.split(' ');
  if (hashtagField.value.length === 0) {
    return true;
  }
  return hashtagsArray.every((hashtag) => VALID_SYMBOLS.test(hashtag));
};

pristine.addValidator(
  hashtagField,
  isTagValid,
  'Хештег должен начинаться с #, содержать буквы или цифры, быть не длиннее 20 символов.'
);

//функция, которая проверяет количество хэштегов
const validateHashtagCount = () => {
  const hashtagsArray = hashtagField.value.split(' ');
  return hashtagsArray.length <= HASHTAG_MAX_QTY;
};

pristine.addValidator(
  hashtagField,
  validateHashtagCount,
  'Количество хештегов не может превышать 5'
);

//функция, которая проверяет уникальность хэштегов

const validateHashtagUnique = () => {
  const hashtagsArray = hashtagField.value.split(' ');
  const uniqueHashtags = new Set(hashtagsArray);

  return hashtagsArray.length === uniqueHashtags.size;
};

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


imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    const formData = new FormData(evt.target);
    sendData(formData);
  }
});
