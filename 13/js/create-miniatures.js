const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createPictures = (picturesFromServer) => {
  picturesContainer.querySelectorAll('.picture').forEach ((element) => element.remove());
  picturesFromServer.forEach(({url, comments, likes, id}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.dataset.id = id;
    fragment.appendChild(pictureElement);
  });

  return picturesContainer.appendChild(fragment);
};

export { createPictures };

