//Модуль валидации формы
import {isDubbleInArrayFree} from './util.js';

//Функция валидности хэштегов: совпадение, количество, соответствие шаблону.
const makeHashtagValidMessage = (hashtag) => {
  const reHashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  //из строки делаем массив
  const hashtags = hashtag.split(' ');

  let validMessage ='';

  //Проверяем полученный массив на условия
  if ((hashtags[hashtags.length-1] === '')) {
    if (isDubbleInArrayFree(hashtags)) {
      validMessage = 'Такой хэштег уже есть!';
    }
    else if (hashtags.length > 5) {
      validMessage = 'Не более пяти хэштегов!';
    }
  } else {
    for (let i = 0; i < hashtags.length; i++) {
      if (hashtags[i] === '#') {
        validMessage = 'Хэштег не может состоять из одной решетки!';
      }
      else if (!reHashtag.test(hashtags[i])) {
        validMessage = 'Введен недопустимый символ!';
      }
      else {
        validMessage = '';
      }
    }
  }
  return validMessage;
};

//Проверка валидности комментария. Пока что только на длину. Функция возвращаяет ошибку валидности.
const makeCommentValidMessage = (comment) => {
  let validMessage ='';
  if (comment.length > 140) {
    validMessage = 'Максимальное значение символов 140';
  }
  return validMessage;
};

export {makeCommentValidMessage, makeHashtagValidMessage};
