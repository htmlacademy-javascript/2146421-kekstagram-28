// Функция, вычисляющая, соответствует ли длина строки заданной
// возвращает true, если длина строки не превыщает заданную, иначе - false.
const isStringFits = (str, lgth) => str.lenght <= lgth;
isStringFits ('super ', 5);


// Функция, выясняющая, является ли строка полиндромом
// возвращает true, если строка полиндром, иначе - false.
function isPalindrom (str) {
  str = str
    .toLowerCase()
    .replaceAll(' ', '');
  let i = 0;
  let j = str.length - 1;
  while (i < j) {
    if (str[i] !== str[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}
isPalindrom ('topoT');


// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// Возвращает извлеченные цифры в виде целого положительного числа
const nine = '9'.charCodeAt(0);
const zero = '0'.charCodeAt(0);

function getNumbers (str) {
  if (typeof str === 'number') {
    return str;
  }
  let result = '';
  for (let i = 0; i <= str.length - 1; i++) {
    if (str.charCodeAt(i) >= zero && str.charCodeAt(i) <= nine) {
      result += str[i];
    }
  }
  if (result === '') {
    return NaN;
  }
  return result;
}
getNumbers ('1 бутылка кефира 0.5 батона');


// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
// Возвращает исходную строку, дополненную указанными символами до заданной длины.
function newString (str, minLength, pad) {
  const actualPad = minLength - str.length;
  if (str.length >= minLength) {
    return str;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + str;
}
newString ('qoi', 6, 'we');
