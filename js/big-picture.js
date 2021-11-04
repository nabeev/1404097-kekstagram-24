//Модуль наполнения большого изображения
//Находим большое изображение
const bigPicture = document.querySelector('.big-picture');

//Функция заполнения комментариев
const makeComments = (comments) => {
  //Находим контейнер
  const bigPictureComments = bigPicture.querySelector('.social__comments');
  //Находим шаблон
  const bigPictureCommentsElement = bigPictureComments.querySelector('.social__comment');
  //Делаем фрагмент
  const commentsFragment = document.createDocumentFragment();

  comments.forEach( (comment) => {
    //Клонируем шаблон
    const commentTemplate = bigPictureCommentsElement.cloneNode(true);
    //Заполняем шаблон
    commentTemplate.querySelector('.social__picture').src = comment.avatar;
    commentTemplate.querySelector('.social__picture').alt = comment.name;
    commentTemplate.querySelector('.social__text').textContent = comment.message;
    //Добавляем во фрагмент
    commentsFragment.appendChild(commentTemplate);
  });
  //Очищаем контейнер
  bigPictureComments.innerHTML='';
  //Добавляем в контейнер созданное
  bigPictureComments.appendChild(commentsFragment);
};


const makeBigPicture = (currentPicture) => {

  //Находим элемент изображения большого фото
  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  //Подставляем адрес
  bigPictureImg.src = currentPicture.url;

  //Заполняем большое фото
  bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;
  bigPicture.querySelector('.comments-count').textContent = currentPicture.comments.length;
  makeComments(currentPicture.comments);
  bigPicture.querySelector('.social__caption').textContent = currentPicture.description;

};

export {makeBigPicture};
