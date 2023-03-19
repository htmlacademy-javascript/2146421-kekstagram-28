import { picturesArray } from './main.js';
import { isEscapeKey } from './util.js';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPicturePreview = document.querySelector('.big-picture__preview');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCommentList = bigPicturePreview.querySelector('.social__comments');

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function clearBigPictureComments () {
  bigPictureCommentList.innerHTML = '';
}

function onPictureClick (evt) {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  if (evt.target.closest('.picture')) {
    const target = evt.target.closest('.picture');
    const currentArray = picturesArray.find((item) => item.id === Number(target.dataset.id));
    bigPicture.classList.remove('hidden');
    bigPicturePreview.querySelector('.big-picture__img img').src = evt.target.src;
    bigPicturePreview.querySelector('.likes-count').textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    bigPicturePreview.querySelector('.comments-count').textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    bigPicturePreview.querySelector('.social__caption').textContent = currentArray.description;
    bigPicturePreview.querySelector('.comments-loader').classList.add ('hidden');
    bigPicturePreview.querySelector('.social__comment-count').classList.add ('hidden');
    document.body.classList.add('modal-open');
    const currentCommentsArray = currentArray.comments;
    bigPictureComments(currentCommentsArray);
    document.addEventListener('keydown', onDocumentKeydown);
    deliteDefaultComments();
  }
}

function deliteDefaultComments () {
  const defaultComments = bigPicturePreview.querySelectorAll('.social__comment');
  defaultComments[0].remove();
  defaultComments[1].remove();
}

//Функция, которая отрисовывает разметку под комменты
function bigPictureComments (array) {

  array.forEach((element) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add ('social__comment');
    bigPicturePreview.querySelector('.social__comments').append(commentItem);
    const commentImg = document.createElement('img');
    commentImg.classList.add ('social__picture');
    commentImg.src = element.avatar;
    commentImg.alt = element.name;
    commentImg.width = 35;
    commentImg.height = 35;
    commentItem.append(commentImg);
    const commentText = document.createElement('p');
    commentText.classList.add ('social__text');
    commentText.textContent = element.message;
    commentItem.append(commentText);
  });
}

picturesContainer.addEventListener('click', onPictureClick);

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearBigPictureComments();
  document.body.classList.remove('modal-open');
}

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

