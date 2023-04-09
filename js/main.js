import './big-picture-modal.js';
import './form.js';
import './scale-image.js';
import './image-filters.js';
import { getData } from './api.js';
import { loadingErrorMessage, debounce, RERENDER_DELAY } from './util.js';
import { createPictures } from './create-miniatures.js';
import { setUserFormSubmit, closePictureForm } from './form.js';
import { renderBigPicture } from './big-picture-modal.js';
import { openFilters, setFilterClick, generateMiniatures} from './filters-functions.js';
import './load-new-picture.js';

getData()
  .then((pictures) => {
    createPictures(pictures);
    renderBigPicture(pictures);
    openFilters();

    setFilterClick(debounce((evt) => {
      generateMiniatures(pictures, evt);
    }, RERENDER_DELAY));
  })
  .catch((err) => {
    loadingErrorMessage(err.message);
  });

setUserFormSubmit(closePictureForm);
