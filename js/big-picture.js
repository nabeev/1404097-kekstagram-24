//Модуль наполнения большого изображения
import {COMMENT_LOAD_QTY} from './const.js';

//Находим большое изображение
const bigPicture = document.querySelector('.big-picture');

//Функция заполнения комментариев
const makeComments = (comments, isFirst) => {
  //Находим контейнер
  const bigPictureComments = bigPicture.querySelector('.social__comments');
  //Находим шаблон
  const bigPictureCommentsElement = bigPictureComments.querySelector('.social__comment');
  //Делаем фрагмент
  const commentsFragment = document.createDocumentFragment();

  //Начальное положение счетчика цикла
  //Если запустили в первый раз, то сначала массива, в следующие разы со следующей позиции массива
  const start = isFirst ? 0 : bigPictureComments.childElementCount;
  //Конечное положение счетчика цикла
  //Нужно показывать по определенному количеству, но не перепрыгруть через последний индекс массива
  const end = ((start + COMMENT_LOAD_QTY) > comments.length) ? comments.length : start + COMMENT_LOAD_QTY;

  for (let i = start; i < end; i++) {
    //Клонируем шаблон
    const commentTemplate = bigPictureCommentsElement.cloneNode(true);
    //Заполняем шаблон
    commentTemplate.querySelector('.social__picture').src = comments[i].avatar;
    commentTemplate.querySelector('.social__picture').alt = comments[i].name;
    commentTemplate.querySelector('.social__text').textContent = comments[i].message;
    //Добавляем во фрагмент
    commentsFragment.appendChild(commentTemplate);
  }
  //Очищаем контейнер, если запустили в первый раз
  //В последующие разы нужно добавлять к текущему состоянию
  if (isFirst) {
    bigPictureComments.innerHTML='';
  }
  //Добавляем в контейнер созданное
  bigPictureComments.appendChild(commentsFragment);
  //Покажем в счетчике сколько комментариев отобразили
  bigPicture.querySelector('.social__comment-count').firstChild.data = `${bigPictureComments.childElementCount} из `;
};

const isAllCommenstLoad = (comments) => {
  const bigPictureComments = bigPicture.querySelector('.social__comments');
  return bigPictureComments.childElementCount === comments.length;
};

const makeBigPicture = (currentPicture) => {

  //Находим элемент изображения большого фото
  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  //Подставляем адрес
  bigPictureImg.src = currentPicture.url;

  //Заполняем большое фото
  bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;
  bigPicture.querySelector('.comments-count').textContent = currentPicture.comments.length;
  makeComments(currentPicture.comments, true);
  bigPicture.querySelector('.social__caption').textContent = currentPicture.description;
};

export {makeBigPicture, makeComments, isAllCommenstLoad};
