import './big-picture-modal.js';
import './form.js';
import './scale-image.js';
import './image-filters.js';
import { getData } from './api.js';
//import { showAlert } from './util.js';
//import { createObjectsArray } from './data.js';
import { createPictures } from './create-miniatures.js';

//const picturesArray = createObjectsArray();
//createPictures(picturesArray);

//export { picturesArray };

getData()
  .then((pictures) => {
    createPictures(pictures);
  });

