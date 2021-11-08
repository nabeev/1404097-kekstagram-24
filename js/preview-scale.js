//Модуль отвечающий за изменение масштаба превью фото

//Находим предварительный просмотр фотографии и инпут со значением масштаба
const imgPreview = document.querySelector('.img-upload__preview').firstElementChild;
const scaleControlValue = document.querySelector('.scale__control--value');

//Функция увеличения масштаба
const increaseScale = () => {
  let imgScale = parseFloat(scaleControlValue.value) / 100;
  if (imgScale < 1) {
    imgScale += 0.25;
    imgPreview.style.transform = `scale(${imgScale})`;
    scaleControlValue.value = `${imgScale*100}%`;
  }
};

//Функция уменьшения масштаба
const decreaseScale = () => {
  let imgScale = parseFloat(scaleControlValue.value) / 100;
  if (imgScale > 0.25) {
    imgScale -= 0.25;
    imgPreview.style.transform = `scale(${imgScale})`;
    scaleControlValue.value = `${imgScale*100}%`;
  }
};

export {increaseScale, decreaseScale};
