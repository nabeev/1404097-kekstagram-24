//Модуль, отвечающий за работу фильтра

import {getRandomNumberFromRange} from './util.js';

const RANDOM_PICTURE_QTY = 10;

//Функция, показывающая 10 случайных фотографий
const getRandomPictures = (pictures, qty) => {
  const randomPictures = [];
  do {
    const newRandomIndex = getRandomNumberFromRange(0, pictures.length-1);
    if (!randomPictures.includes(pictures[newRandomIndex])) {
      randomPictures.push(pictures[newRandomIndex]);
    }
  } while (randomPictures.length < qty);
  return randomPictures;
};

//Функция, возвращающая отсортированный массив по количеству комментариев
const getDisscusedPictures = (pictures) => {
  //Функция сравнения
  const getCompare = (pictureA, pictureB) => {
    const commetsQtyA = pictureA.comments.length;
    const commetsQtyB = pictureB.comments.length;
    return commetsQtyB - commetsQtyA;
  };
  //Возврат отсортированнй копии массива
  return pictures.slice().sort(getCompare);
};

//В зависимости от таго какой класс сформировался, сделать массив
const getFilteredPictures = (pictures) => {
  const imgActiveFilterButton = document.querySelector('.img-filters__button--active');
  if (imgActiveFilterButton.id === 'filter-default') {
    return pictures;
  }
  if (imgActiveFilterButton.id === 'filter-random') {
    return getRandomPictures(pictures, RANDOM_PICTURE_QTY);
  }
  if (imgActiveFilterButton.id === 'filter-discussed') {
    return getDisscusedPictures(pictures);
  }
};

//Отрисовка с учетом фильтров на данные
const setFilterClick = (cb) => {

  const imgFiltersButton = document.querySelectorAll('.img-filters__button');

  imgFiltersButton.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      imgFiltersButton.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });
      evt.target.classList.add('img-filters__button--active');
      cb();
    });
  });
};

export {setFilterClick, getFilteredPictures};
