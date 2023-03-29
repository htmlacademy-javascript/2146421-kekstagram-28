import './big-picture-modal.js';
import './form.js';
import { createObjectsArray } from './data.js';
import { createPictures } from './create-miniatures.js';

const picturesArray = createObjectsArray();
createPictures(picturesArray);

export { picturesArray };
