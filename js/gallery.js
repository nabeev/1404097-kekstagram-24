//Модуль обработки событий кликов на миниатюры

import {isEscapeKey} from './util.js';
import {makeBigPicture, makeComments} from './big-picture.js';
import {renderThumbnail} from './thumbnail.js';

const renderGallery = (pictures) => {
  //Показываем фильтр
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  //Удаляем вначале все миниатюры что есть на странице
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
  //Отрисовка миниатюр
  renderThumbnail(pictures);
  //Ищем миниатюры//
  const thumbnails = document.querySelectorAll('.picture');
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
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', () => {
      //Отрисовка и показ страницы
      showBigPicture(pictures[i]);

      //Функция загрузки комментариев
      const loadMoreComments = () => makeComments(pictures[i].comments, false);
      //Обработчик кнопки загрузки изображений
      bigPictureCommentsLoader.addEventListener('click', loadMoreComments);
      //Обработчик клавиши Esc
      const onBigBictureEscKeydown = (evt) => {
        if (isEscapeKey(evt)) {
          evt.preventDefault();
          closeBigPicture();
        }
      };
      //Функция закрытия окна
      function closeBigPicture () {
        bigPicture.classList.add('hidden');
        document.querySelector('body').classList.remove('modal-open');
        document.removeEventListener('keydown', onBigBictureEscKeydown);
        bigPictureCommentsLoader.removeEventListener('click', loadMoreComments);
      }
      //Обработчик нажатия на крестик
      bigPictureCloseButton.addEventListener('click', closeBigPicture);
      //Обработчик нажатия на Esc
      document.addEventListener('keydown', onBigBictureEscKeydown);
    });
  }

};

export {renderGallery};
