//Отрисовка формы
import {isEscapeKey} from './util.js';
import {makeCommentValidMessage, makeHashtagValidMessage} from './form-validation.js';
import {increaseScale, decreaseScale} from './preview-scale.js';
import {makeImageEffect} from './effects.js';
import {sendData} from './api.js';

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

//Находим предварительный просмотр фотографии и инпут со значением масштаба
const imgPreview = uploadForm.querySelector('.img-upload__preview').firstElementChild;
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
//Находим кнопки изменения масштаба
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');

//Найдем слайдер
const effectSlider = uploadForm.querySelector('.effect-level__slider');
//Найдем радиокнопки выбора эффекта
const effectsRadio = uploadForm.querySelectorAll('.effects__radio');

//Закрытие окна редактирования нового изображения по нажатию Esc
const onUploadFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

//Функция закрытия окна редактирования нового изображения
function closeUploadForm () {
  //Сбрасывание значений полей
  uploadImg.value = '';
  uploadHashtag.value = '';
  uploadDescription.value = '';
  imgPreview.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
  imgPreview.classList = '';
  imgPreview.style.filter = '';

  imgUploadForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadFormEscKeydown);

  //Убираем обработчики масштаба
  scaleControlBigger.removeEventListener('click', increaseScale);
  scaleControlSmaller.removeEventListener('click', decreaseScale);
  //Убираем обработчики эффектов
  effectsRadio.forEach( (element) => {
    element.removeEventListener('change', makeImageEffect);
  });
}

//Показ окна редактирования нового изображения по добавлению изображния
uploadImg.addEventListener('change', () => {
  //показываем форму
  imgUploadForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  //Обработчики закрытия формы
  closeButton.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', onUploadFormEscKeydown);

  //Проверка хэштегов по инпуту
  uploadHashtag.addEventListener('focus', () => {
    //Блокируем закрытие формы по Esc, если поле хэштег в фокусе
    document.removeEventListener('keydown', onUploadFormEscKeydown);
    //Валидация хэштегов
    uploadHashtag.addEventListener('input', () => {
      uploadHashtag.setCustomValidity(makeHashtagValidMessage(uploadHashtag.value));
      uploadHashtag.reportValidity();
    });
  });
  //Проверка комментария по инпуту
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

  //Масштаб изображения
  //Масштаб по умолчанию 100%
  imgPreview.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
  //Увеличение масштаба (макс = 100%)
  scaleControlBigger.addEventListener('click', increaseScale);
  //Уменьшение масштаба (мин = 25%)
  scaleControlSmaller.addEventListener('click', decreaseScale);

  //Эффекты изображения
  //Эффекты по умолчанию отсутствуют
  imgPreview.classList = '';
  imgPreview.style.filter = '';
  if (effectSlider.noUiSlider) {
    effectSlider.noUiSlider.destroy();
  }
  //Управление эффектами для изображения
  effectsRadio.forEach( (element) => {
    element.addEventListener('change', makeImageEffect);
  });
});
//Отправка данных формы
const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!(makeHashtagValidMessage(uploadHashtag.value) === '')) {
      uploadHashtag.setCustomValidity(makeHashtagValidMessage(uploadHashtag.value));
      uploadHashtag.reportValidity();
    } else if (!(makeCommentValidMessage(uploadDescription.value) === '')) {
      evt.preventDefault();
      uploadDescription.setCustomValidity(makeCommentValidMessage(uploadDescription.value));
      uploadDescription.reportValidity();
    } else {

      sendData(
        () => onSuccess(),
        () => closeUploadForm(),
        new FormData(evt.target),
      );

    }
  });
};

export {setUploadFormSubmit, closeUploadForm};
