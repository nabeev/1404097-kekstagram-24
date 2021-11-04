//Импортируем функцию генерации данных
import {createPhotoDescription} from './data.js';

//Генерируем данные
const picturesList = Array.from({length: 12}, createPhotoDescription);
//Находим место вставки данных
const pictures = document.querySelector('.pictures');
//Находим шаблон фото
const pictuteTemplate = document.querySelector('#picture').content.querySelector('.picture');
//Создаем фрагмент данных
const picturesFragment = document.createDocumentFragment();

//Проходим все элементы массива данных
picturesList.forEach( ({url, likes, comments}) => {
  //Клонируем шаблон
  const pictureElement = pictuteTemplate.cloneNode(true);
  //Заполнение клона данными
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  //Добавление клона в фрагмент
  picturesFragment.appendChild(pictureElement);
});

//Отрисовка на странице
pictures.appendChild(picturesFragment);

export {picturesList};
