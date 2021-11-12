const ALERT_SHOW_TIME = 5000;

//Проверка клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

//Есть ли в массиве дубли.
const isDubbleInArray = (array) => {
  let result = false;
  if (array.length > 1) {
    for (let i = 0; i < array.length; i++) {
      for(let j = 0; j < array.length; j++) {
        if ( !(j === i) && (array[j] === array[i]) ) {
          result = true;
        }
      }
    }
  }
  return result;
};

//Есть ли дубли в массиве без учета регистра
const isDubbleInArrayFree = (array) => {
  const upperArray = array.map((el) => el.toUpperCase());
  return isDubbleInArray(upperArray);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.appendChild(document.createElement('div'));
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'fixed';
  alertContainer.style.width = '100%';
  alertContainer.style.height = '100%';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;

  alertContainer.firstChild.style.position = 'absolute';
  alertContainer.firstChild.style.top = '50%';
  alertContainer.firstChild.style.left = '50%';
  alertContainer.firstChild.style.transform = 'translate(-50%, -50%)';

  alertContainer.firstChild.style.padding = '10px';
  alertContainer.firstChild.style.fontSize = '30px';
  alertContainer.firstChild.style.lineHeight = '50px';
  alertContainer.firstChild.style.textAlign = 'center';
  alertContainer.firstChild.style.backgroundColor = 'red';

  alertContainer.firstChild.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {isEscapeKey, isDubbleInArrayFree, showAlert};
