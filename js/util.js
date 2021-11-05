const getRandomNumberFromRange = (begin, end) => {
  if (begin < 0 || end < 0 || begin > end) {
    return NaN;
  }

  return Math.floor(Math.random() * (end - begin + 1)) + begin;
  //источник функции
  //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

const checkLengthOfString = (checkingString, maxLength) => checkingString.length <= maxLength;
//источник определения длины строки
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/length

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

export {getRandomNumberFromRange, checkLengthOfString, isEscapeKey, isDubbleInArrayFree};
