import { picturesArray } from './main.js';
import { isEscapeKey } from './util.js';

const COMMENTS_PORTION_FOR_LOADING = 5;
const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPicturePreview = document.querySelector('.big-picture__preview');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCommentList = bigPicturePreview.querySelector('.social__comments');
const commentsLoadButton = bigPicturePreview.querySelector('.social__comments-loader');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const picturesArray = await getData();

const clearBigPictureComments = () => {
  bigPictureCommentList.innerHTML = '';
};

const deliteDefaultComments = () => {
  const defaultComments = bigPicturePreview.querySelectorAll('.social__comment');
  defaultComments[0].remove();
  defaultComments[1].remove();
};

deliteDefaultComments();

const renderBigPictureContent = (object) => {
  bigPicturePreview.querySelector('.big-picture__img img').src = object.url;
  bigPicturePreview.querySelector('.likes-count').textContent = object.likes;
  bigPicturePreview.querySelector('.comments-count').textContent = object.comments.length;
  bigPicturePreview.querySelector('.social__caption').textContent = object.description;
};

//Функция, которая отрисовывает разметку под комменты
const renderBigPictureComments = (array) => {

  array.forEach((element) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add ('social__comment', 'hidden');
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
};

const updateCommentsCounetrs = () => {
  bigPicturePreview.querySelector('.loaded-count').textContent = bigPicturePreview.querySelector('.social__comments').querySelectorAll('li:not(.hidden)').length;
};


const showFirstComments = (array) => {
  const end = Math.min(array.length, COMMENTS_PORTION_FOR_LOADING);
  for (let i = 0; i < end; i++) {
    array[i].classList.remove('hidden');
  }

  if (array.length > COMMENTS_PORTION_FOR_LOADING) {
    commentsLoadButton.classList.remove('hidden');
  }
  updateCommentsCounetrs();
};

const onPictureClick = (evt) => {
  if (evt.target.closest('.picture')) {
    const target = evt.target.closest('.picture');
    bigPicture.classList.remove('hidden');
    const currentPhotoDescription = picturesArray.find((item) => item.id === Number(target.dataset.id));
    renderBigPictureContent(currentPhotoDescription);
    commentsLoadButton.classList.add ('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);

    const currentCommentsArray = currentPhotoDescription.comments;
    renderBigPictureComments(currentCommentsArray);

    const hiddenComments = bigPictureCommentList.querySelectorAll('.hidden');

    showFirstComments (hiddenComments);
  }
};


const loadComments = () => {
  const hiddenComments = bigPictureCommentList.querySelectorAll('.hidden');
  const end = Math.min(hiddenComments.length, COMMENTS_PORTION_FOR_LOADING);
  for (let i = 0; i < end; i++) {
    hiddenComments[i].classList.remove('hidden');
  }
  if (hiddenComments.length <= end) {
    commentsLoadButton.classList.add('hidden');
  }
  updateCommentsCounetrs();
};


commentsLoadButton.addEventListener ('click', () => {
  loadComments();
});


picturesContainer.addEventListener('click', onPictureClick);

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearBigPictureComments();
  document.body.classList.remove('modal-open');
}

bigPictureCloseElement.addEventListener ('click', () => {
  closeBigPicture();
});
