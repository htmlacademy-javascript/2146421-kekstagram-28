import './big-picture-modal.js';
import './form.js';
import './scale-image.js';
import './image-filters.js';
import { getData } from './api.js';
import { loadingErrorMessage } from './util.js';
import { createPictures } from './create-miniatures.js';
//import { renderBigPicture } from './big-picture-modal.js';
import { setUserFormSubmit, closePictureForm } from './form.js';

getData()
  .then((pictures) => {
    createPictures(pictures);
  })
  .catch(
    (err) => {
      loadingErrorMessage(err.message);
    }
  );

setUserFormSubmit(closePictureForm);


