import {showAlert} from './util.js';
import {createSuccessUploadMessage, createErrorUploadMessage} from './load-message.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Сожалеем, но что-то пошло не так. Попытайтесь вернуться к нам позднее.');
      }
    })
    .then((photoes) => {
      onSuccess(photoes);
    })
    .catch(() => {
      showAlert('Сожалеем, но что-то пошло не так. Попытайтесь вернуться к нам позднее.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        createSuccessUploadMessage();
      } else {
        onFail();
        createErrorUploadMessage();
      }
    })
    .catch(() => {
      onFail();
      createErrorUploadMessage();
    });
};

export {getData, sendData};
