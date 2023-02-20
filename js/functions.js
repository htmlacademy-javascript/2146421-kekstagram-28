// Функция, вычисляющая, соответствует ли длина строки заданной
// возвращает true, если длина строки не превыщает заданную, иначе - false.
function isStringFits (str, lgth) {
  if (str.length <= lgth) {
    return true;
  }
  return false;
}
isStringFits ('super ', 5);

// Функция, выясняющая, является ли строка полиндромом
// возвращает true, если строка полиндром, иначе - false.
function isPolindrom (str) {
  str = str.toLowerCase();
  str = str.split(' ').join('');
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
isPolindrom ('topoT');


// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// Возвращает извлеченные цифры в виде целого положительного числа
const zero = '0'.charCodeAt(0);
const nine = '9'.charCodeAt(0);

function getNumbers (str) {
  let result = '';
  str = String(str);
  for (let i = 0; i <= str.length - 1; i++) {
    if (str.charCodeAt(i) >= zero && str.charCodeAt(i) <= nine) {
      result += str[i];
    }
  }
  if (result === '') {
    result = NaN;
  }
  return Number(result);
}
getNumbers ('1 кефир, 0.5 батона');

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
// Возвращает исходную строку, дополненную указанными символами до заданной длины.
function newString (str, qty, extraChars) {
  if (str.length >= qty) {
    return str;
  } else {
    return extraChars.slice(- (extraChars.lenght - 1), qty - str.length) + str;
  }
}
newString ('q', 4, 'werty');
