//Модуль обработки событий кликов на миниатюры

import {isEscapeKey} from './util.js';
import {picturesList} from './thumbnail.js';
import {makeBigPicture} from './big-picture.js';

//Найти миниатюры
const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const onBigBictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onBigBictureEscKeydown);
}

const showBigPicture = (currentPicture) => {
  makeBigPicture(currentPicture);
  //Отрисовка окна
  bigPicture.classList.remove('hidden');
  //Ищем счетчик комментариев
  const bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
  //Прячем счетчик
  bigPictureSocialCommentCount.classList.add('hidden');
  //Ищем кнопку загрузки новых комментариев
  const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
  //Прячем кнопку загрузки
  bigPictureCommentsLoader.classList.add('hidden');
  //После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
  //При закрытии окна не забудьте удалить этот класс.
  document.querySelector('body').classList.add('modal-open');
};

//Добавляем на наждый елемент обработчик открытия по клику
for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', () => {
    showBigPicture(picturesList[i]);

    bigPictureCloseButton.addEventListener('click', closeBigPicture);

    document.addEventListener('keydown', onBigBictureEscKeydown);
  });
}
