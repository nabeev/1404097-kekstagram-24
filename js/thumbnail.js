//Модуль отрисовки миниатюр на странице
const renderThumbnail = (pictures) => {
  //Находим место вставки данных
  const picturesContainer = document.querySelector('.pictures');
  //Находим шаблон фото
  const pictuteTemplate = document.querySelector('#picture').content.querySelector('.picture');
  //Создаем фрагмент данных
  const picturesFragment = document.createDocumentFragment();

  //Проходим все элементы массива данных
  pictures.forEach( ({url, likes, comments}) => {
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
  picturesContainer.appendChild(picturesFragment);
};

export {renderThumbnail};
