const getRandomNumberFromRange = (begin, end) => {
  if (begin < 0 || end < 0 || begin > end) {
    return NaN;
  }

  return Math.floor(Math.random() * (end - begin + 1)) + begin;
  //источник функции
  //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

const checkLengthOfString = (checkingString, maxLength) => {
  return checkingString.length <= maxLength;
  //источник определения длины строки
  //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/length
};

export {getRandomNumberFromRange, checkLengthOfString};
