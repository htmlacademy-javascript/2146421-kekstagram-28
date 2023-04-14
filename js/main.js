import './big-picture-modal.js';
import './form.js';
import './scale-image.js';
import './image-filters.js';
import { getData } from './api.js';
import { loadErrorMessage } from './util.js';
import { createPictures } from './create-miniatures.js';
import { setUserFormSubmit, closePictureForm } from './form.js';
import { renderBigPicture } from './big-picture-modal.js';
import { openFilters, selectGenerateFunction } from './filters-functions.js';
import './load-new-picture.js';

getData()
  .then((pictures) => {
    createPictures(pictures);
    renderBigPicture(pictures);
    openFilters();
    selectGenerateFunction(pictures);
  })
  .catch((err) => {
    loadErrorMessage(err.message);
  });

setUserFormSubmit(closePictureForm);
