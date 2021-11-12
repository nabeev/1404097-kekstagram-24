import {isEscapeKey} from './util.js';

const createSuccessUploadMessage = () => {
  //Находим место вставки данных
  const messageContainer = document.querySelector('body');
  //Находим шаблон сообщения
  const messageTemplate = document.querySelector('#success').content.querySelector('.success');
  const newMessage = messageTemplate.cloneNode(true);
  //Добавление на страницу
  messageContainer.appendChild(newMessage);
  //Контейнер с сообщением
  const newMessageInner = newMessage.querySelector('.success__inner');
  //Функция обработки нажатия на Esc
  const onSuccessMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeSuccessMessage();
    }
  };
  //Функция удаление элемента
  function removeSuccessMessage () {
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
    newMessage.remove();
  }
  //Находим кнопку закрытия
  const successButton = document.querySelector('.success__button');
  //Обработчик клика по кнопке
  successButton.addEventListener('click', removeSuccessMessage);
  //Обработчик нажатия на Esc
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  //Обработчик клика вне области сообщения
  newMessage.addEventListener('click', (evt) => {
    if (!newMessageInner.contains(evt.target)) {
      removeSuccessMessage();
    }
  });
};

const createErrorUploadMessage = () => {
  //Находим место вставки данных
  const messageContainer = document.querySelector('body');
  //Находим шаблон сообщения
  const messageTemplate = document.querySelector('#error').content.querySelector('.error');
  const newMessage = messageTemplate.cloneNode(true);
  //Добавление на страницу
  messageContainer.appendChild(newMessage);
  const newMessageInner = newMessage.querySelector('.error__inner');
  //Функция обработки нажатия на Esc
  const onErrorMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeErrorMessage();
    }
  };
  //Функция удаление элемента
  function removeErrorMessage () {
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
    newMessage.remove();
  }
  //Находим кнопку закрытия
  const errorButton = document.querySelector('.error__button');
  //Обработчик клика по кнопке
  errorButton.addEventListener('click', removeErrorMessage);
  //Обработчик нажатия на Esc
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  //Обработчик клика вне области сообщения
  newMessage.addEventListener('click', (evt) => {
    if (!newMessageInner.contains(evt.target)) {
      removeErrorMessage();
    }
  });
};

export {createSuccessUploadMessage, createErrorUploadMessage};
