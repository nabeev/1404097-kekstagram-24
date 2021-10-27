import {getRandomNumberFromRange} from './util.js';
//ГЕНЕРАЦИЯ ДАННЫХ: МАССИВ ОБЪЕКТОВ - ОПИСАНИЙ ФОТОГРАФИЙ

//Создание вложенного в описание фотографии массива объектов комментариев
//Перечень имен - авторов комментариев
const COMMENT_NAMES = [
  'Артём',
  'Василий',
  'Евгений',
  'Яков',
  'Хабиб',
  'Бард',
];

//Перечень возможных сообщений в комментариях
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

//Максимальное значение id комментария
const MAX_COMMENT_ID = 100;
//Использованные id в комментариях
const usedCommentIds = [];

//Функция, создающая комментарий
const createComment = () => {
  //функция, возвращающее рандомное, ранее не использованное id
  const getCommentId = (maxId) => {
    let CommentId = getRandomNumberFromRange(1, maxId);
    //решил использовать условие на включение в массив, может быть будет долго работать, если нужно создать много значений
    //а максимальное небольшое
    while (usedCommentIds.indexOf(CommentId) !== -1) {
      CommentId = getRandomNumberFromRange(1, maxId);
    }
    //добавляем выбранное в массив использованных
    usedCommentIds.push(CommentId);
    return CommentId;
  };
  //функция генерации аватара
  const createAvatar = () => `img/avatar-${getRandomNumberFromRange(1,6)}.svg`;

  //функция генерации сообщения из не более двух занных
  const createMessage = () => {
    //определяем сколько исходных сообщений будем использовать
    const lengthOfMessage = getRandomNumberFromRange(1, 2);
    //рандомное первое сообщение
    let createdMessage = MESSAGES[getRandomNumberFromRange(0, MESSAGES.length-1)];
    //рандомное второе сообщение, если нужно
    if (lengthOfMessage > 1) {
      createdMessage += ` ${MESSAGES[getRandomNumberFromRange(0, MESSAGES.length-1)]}`;
    }
    return createdMessage;
  };

  return {
    id: getCommentId(MAX_COMMENT_ID),
    avatar: createAvatar(),
    message: createMessage(),
    name: COMMENT_NAMES[getRandomNumberFromRange(0, COMMENT_NAMES.length-1)],
  };
};

//Функция, создающая массив комментариев, указанной длины
const createCommentArray = (commentQnty) => Array.from({length: commentQnty}, createComment);

//Максимальная длина описания
const MAX_LENGTH_OF_DESCRIPTION = 30;

//Задаём массив идентификаторов описания
const ids = [];
for (let i = 0; i < 25; i++) {
  ids[i] = i + 1;
}
let idsCounter = 0;

//Задаём массив адресов картинок
const urls = [];
for (let i = 0; i < 25; i++) {
  urls[i] = `photos/${i + 1}.jpg`;
}
let urlsCounter = 0;

const createPhotoDescription = () => {
  //функция возвращающая случайный элемент массива с индекса и до конца и ставящая этот элемент в начало
  const gentRandomArrayElementFrom = (array, beginIndex, isIdOrUrl) => {
    //выбираем рандомный индекс от заданного до конца массива
    const randomIndex = getRandomNumberFromRange(beginIndex, array.length - 1);
    //меняем выбранный индекс с начальным
    const swap = array[beginIndex];
    array[beginIndex] = array[randomIndex];
    array[randomIndex] = swap;
    //двигаем счетчик либо id либо url вперед
    //??Думаю можно решить не используя счетчики, а, например удаляя выбранные элементы из массива??
    isIdOrUrl ? idsCounter++ : urlsCounter++;
    //возвращаем рандомны элемент, выбранный вначале функции
    return array[beginIndex];
  };
  //функция возвращающая случайную строку длиной до заданной
  //на основе
  //https://qna.habr.com/q/424075
  const getRandomString = (maxLengthOfString) => {
    //исходный алфавит символов
    const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ .,!?:;';
    //определяем длину результирующей строки
    const lengthOfString = getRandomNumberFromRange(1, maxLengthOfString);
    let resultString = '';
    //наполняем строку рандомными символами из алфавита
    for (let i = 0; i < lengthOfString; i++) {
      resultString += alphabet[getRandomNumberFromRange(0, alphabet.length-1)];
    }
    return resultString;
  };

  return {
    id: gentRandomArrayElementFrom(ids, idsCounter, true),
    url: gentRandomArrayElementFrom(urls, urlsCounter, false),
    description: getRandomString(MAX_LENGTH_OF_DESCRIPTION),
    likes: getRandomNumberFromRange(15, 200),
    comments: createCommentArray(getRandomNumberFromRange(1,3)),
  };
};

export {createPhotoDescription};

//const resultArray = Array.from({length: 25}, createPhotoDescription);
//console.log(resultArray);
