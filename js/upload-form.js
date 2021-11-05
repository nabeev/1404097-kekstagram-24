//Отрисовка формы
import {isEscapeKey} from './util.js';
import {makeCommentValidMessage, makeHashtagValidMessage} from './form-validation.js';

//Находим форму
const uploadForm = document.querySelector('.img-upload__form');

//Находим окно редактирования изображения
const imgUploadForm = uploadForm.querySelector('.img-upload__overlay');

//Находим поле загрузки нового изображения
const uploadImg = uploadForm.querySelector('#upload-file');

//Находим кнопку закрытия окна редактирования изображения
const closeButton = uploadForm.querySelector('.img-upload__cancel');

//Находим поля хэштегов и описания
const uploadHashtag = uploadForm.querySelector('.text__hashtags');
const uploadDescription = uploadForm.querySelector('.text__description');

//Закрытие окна редактирования нового изображения по нажатию Esc
const onUploadFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeCloseUploadForm();
  }
};

//Функция закрытия окна редактирования нового изображения
function closeCloseUploadForm () {
  //Сбрасывание значений полей
  uploadImg.value = '';
  uploadHashtag.value = '';
  uploadDescription.value = '';

  imgUploadForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadFormEscKeydown);
}

//Показ окна редактирования нового изображения по добавлению изображния
uploadImg.addEventListener('change', () => {
  imgUploadForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  closeButton.addEventListener('click', closeCloseUploadForm);
  document.addEventListener('keydown', onUploadFormEscKeydown);

  uploadHashtag.addEventListener('focus', () => {
    //Блокируем закрытие формы по Esc, если поле хэштег в фокусе
    document.removeEventListener('keydown', onUploadFormEscKeydown);
    //Валидация хэштегов
    uploadHashtag.addEventListener('input', () => {
      uploadHashtag.setCustomValidity(makeHashtagValidMessage(uploadHashtag.value));
      uploadHashtag.reportValidity();
    });
  });

  uploadDescription.addEventListener('focus', () => {
    //Блокируем закрытие формы по Esc, если поле коммент в фокусе
    document.removeEventListener('keydown', onUploadFormEscKeydown);
    //Валидация комментария
    uploadDescription.addEventListener('input', () => {
      uploadDescription.setCustomValidity(makeCommentValidMessage(uploadDescription.value));
      uploadDescription.reportValidity();
    });
  });
  //Возвращаем возможность закрыть форму по Esc
  uploadHashtag.addEventListener('blur', () => {
    document.addEventListener('keydown', onUploadFormEscKeydown);
  });
  uploadDescription.addEventListener('blur', () => {
    document.addEventListener('keydown', onUploadFormEscKeydown);
  });
});

uploadForm.addEventListener('submit', (evt) => {
  if (!(makeCommentValidMessage(uploadDescription.value) === '')) {
    evt.preventDefault();
    uploadDescription.setCustomValidity(makeCommentValidMessage(uploadDescription.value));
    uploadDescription.reportValidity();
  }
  if (!(makeCommentValidMessage(uploadDescription.value) === '')) {
    evt.preventDefault();
    uploadDescription.setCustomValidity(makeCommentValidMessage(uploadDescription.value));
    uploadDescription.reportValidity();
  }
});
