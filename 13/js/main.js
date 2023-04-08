import './big-picture-modal.js';
import './form.js';
import './scale-image.js';
import './image-filters.js';
import { getData } from './api.js';
import { loadingErrorMessage, debounce, RERENDER_DELAY } from './util.js';
import { createPictures } from './create-miniatures.js';
import { setUserFormSubmit, closePictureForm } from './form.js';
import { renderBigPicture } from './big-picture-modal.js';
import { openFilters, createRandomPictures, setRandomPictures, setDefaultPictures, createDefaultPictures, setDiscussedPictures, createDiscussedPictures } from './filters-functions.js';
import './load-new-picture.js';

getData()
  .then((pictures) => {
    createPictures(pictures);
    setDefaultPictures(() => {
      createDefaultPictures(pictures);
    });
    renderBigPicture(pictures);
    openFilters();
    setRandomPictures(debounce(
      () => createRandomPictures(pictures),
      RERENDER_DELAY));
    setDiscussedPictures(() => {
      createDiscussedPictures(pictures);
    });
  })
  .catch((err) => {
    loadingErrorMessage(err.message);
  });
setUserFormSubmit(closePictureForm);
