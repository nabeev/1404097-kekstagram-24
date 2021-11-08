//Модуль, отвечающий за применение эффектов к превью фото

//Найдем слайдер
const effectSlider = document.querySelector('.effect-level__slider');
//Найдем инпут глубины эффекта
const effectLevelValue = document.querySelector('.effect-level__value');
//Найдем превью изображения
const imgPreview = document.querySelector('.img-upload__preview').firstElementChild;

const makeImageEffect= (evt) => {
  //Найдем элемент, на котором сработал выбор эффекта
  const effect = evt.target;
  //Настройки слайдера по умолчанию
  const sliderSetup = {
    sliderMin : 0,
    sliderMax : 1,
    sliderStart : 1,
    sliderStep : 0.1,
    roundLevel : 1,
  };
  //Функция создания слайдера
  const createSlider = (sliderElement, setup) => {
    noUiSlider.create(sliderElement, {
      range : {
        min : setup.sliderMin,
        max : setup.sliderMax,
      },
      start : setup.sliderStart,
      step : setup.sliderStep,
      format : {
        to: function (value) {
          return value.toFixed(setup.roundLevel);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    });
  };
  //Функция удаления слайдера
  const removeSlider = (sliderElement) => {
    if(sliderElement.noUiSlider) {
      sliderElement.noUiSlider.destroy();
    }
  };

  //Переменные для формирования стиля
  let effectStyleBegin = '';
  let effectStyleEnd = '';
  //Удаляем ранее присвоенный класс
  imgPreview.classList = '';

  if (effect.checked) {

    removeSlider(effectSlider);

    imgPreview.classList.add(`effects__preview--${effect.value}`);

    switch (effect.value) {
      case 'none':
        //Удаяем стили
        imgPreview.classList = '';
        imgPreview.style.filter = '';
        break;

      case 'chrome':
        //Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
        //формирвоание стиля
        effectStyleBegin = 'grayscale(';
        effectStyleEnd = ')';
        break;

      case 'sepia':
        //Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
        //формирвоание стиля
        effectStyleBegin = 'sepia(';
        effectStyleEnd = ')';
        break;

      case 'marvin':
        //Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
        //Обновление настроек слайдера
        sliderSetup.sliderMax = 100;
        sliderSetup.sliderStart = 100;
        sliderSetup.sliderStep = 1;
        sliderSetup.roundLevel = 0;
        //формирвоание стиля
        effectStyleBegin = 'invert(';
        effectStyleEnd = '%)';
        break;

      case 'phobos':
        //Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
        //Обновление настроек слайдера
        sliderSetup.sliderMax = 3;
        sliderSetup.sliderStart = 3;
        //формирвоание стиля
        effectStyleBegin = 'blur(';
        effectStyleEnd = 'px)';
        break;

      case 'heat':
        //Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
        //Обновление настроек слайдера
        sliderSetup.sliderMin = 1;
        sliderSetup.sliderMax = 3;
        sliderSetup.sliderStart = 3;
        //формирвоание стиля
        effectStyleBegin = 'brightness(';
        effectStyleEnd = ')';
        break;
    }
    if (!(effect.value === 'none')) {
      //Рисуем слайдер с выбранными настройками
      createSlider(effectSlider, sliderSetup);

      //Вешаем обработчик на изменение положения слайдера
      effectSlider.noUiSlider.on('update', (handleValue, handle) => {
        effectLevelValue.value = handleValue[handle];

        imgPreview.style.filter = `${effectStyleBegin}${effectLevelValue.value}${effectStyleEnd}`;
      });
    }
  }
};

export {makeImageEffect};
