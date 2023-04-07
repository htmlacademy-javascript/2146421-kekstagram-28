import './big-picture-modal.js';
import './form.js';
import './scale-image.js';
import './image-filters.js';
import { getData } from './api.js';
import { loadingErrorMessage } from './util.js';
import { createPictures } from './create-miniatures.js';
import { setUserFormSubmit, closePictureForm } from './form.js';
import { renderBigPicture } from './big-picture-modal.js';

getData()
  .then((pictures) => {
    createPictures(pictures);
    renderBigPicture(pictures);
  })
  .catch((err) => {
    loadingErrorMessage(err.message);
  }
  );

// try {
//   const data = await getData();
//   createPictures(data);
//   renderBigPicture(data);
// } catch (err) {
//   loadingErrorMessage(err.message);
// }

setUserFormSubmit(closePictureForm);

