//Модуль обработки событий кликов на миниатюры

import {isEscapeKey} from './util.js';
import {makeBigPicture, makeComments} from './big-picture.js';
import {renderThumbnail} from './thumbnail.js';

const renderBigPicture = (picturesList) => {
  //Отрисовка миниатюр
  renderThumbnail(picturesList);
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

      //Функция загрузки комментариев
      const loadMoreComments = () => makeComments(picturesList[i].comments, false);
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

export {renderBigPicture};
