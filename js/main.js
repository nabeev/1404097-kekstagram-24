import {renderBigPicture} from './gallery.js';
import {setUploadFormSubmit, closeUploadForm} from './upload-form.js';
import {getData} from './api.js';
import {THUMBNAIL_QTY} from './const.js';

setUploadFormSubmit(closeUploadForm);

getData((pictures) => {
  renderBigPicture(pictures.slice(0, THUMBNAIL_QTY));
});
