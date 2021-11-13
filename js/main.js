import {setUploadFormSubmit, closeUploadForm} from './upload-form.js';
import {getData} from './api.js';
import {renderGallery} from './gallery.js';
import {debounce} from './debounce.js';
import {RERENDER_DELAY} from './const.js';
import {getFilteredPictures, setFilterClick} from './filter.js';

setUploadFormSubmit(closeUploadForm);

getData((pictures) => {
  renderGallery(pictures);
  setFilterClick(debounce(
    () => renderGallery(getFilteredPictures(pictures)),
    RERENDER_DELAY,
  ));
});
