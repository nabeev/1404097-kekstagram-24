//Модуль обработки событий кликов на миниатюры

import {isEscapeKey} from './util.js';
import {picturesList} from './thumbnail.js';
import {makeBigPicture, makeComments} from './big-picture.js';

//Ищем миниатюры
const pictures = document.querySelectorAll('.picture');
//Ищем большое изображение
const bigPicture = document.querySelector('.big-picture');
//Ищем кнопку закрытия большого изображения
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
//Ищем кнопку загрузки новых комментариев
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

const showBigPicture = (currentPicture) => {
  makeBigPicture(currentPicture);
  //Отрисовка окна
  bigPicture.classList.remove('hidden');

  document.querySelector('body').classList.add('modal-open');
};

//Добавляем на наждый елемент обработчик открытия по клику
for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', () => {
    //Отрисовка и показ страницы
    showBigPicture(picturesList[i]);
    //Обработчик на загрузку дополнительных комментариев
    //Надо удалять обработчи при закрытии окна (дважды срабатывает)
    //Поэтому перенес объявление функций закрытия окно в обработчик, чтобы была одна область видимости.
    //Непонятно насколько это правильно, но хотя бы обработчик удаляется.
    const loadMoreComments = () => {
      makeComments(picturesList[i].comments, false);
    };
    bigPictureCommentsLoader.addEventListener('click', loadMoreComments);
    //Затащил объявление сюда для возможности удаления обработчика ↑
    const onBigBictureEscKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        closeBigPicture();
      }
    };
    //Затащил объявление сюда для возможности удаления обработчика ↑
    function closeBigPicture () {
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onBigBictureEscKeydown);
      bigPictureCommentsLoader.removeEventListener('click', loadMoreComments);
    }

    bigPictureCloseButton.addEventListener('click', closeBigPicture);

    document.addEventListener('keydown', onBigBictureEscKeydown);
  });
}
