//Поле в котором все выводится
let input = document.querySelector('.input');
let prevResult = document.querySelector('.prev-result');

//Сохраненная часть выражения для возведения в степень
let power = '';

//Вставить символ
function insert(num) {
  if (input.textContent == 0) {
    input.textContent = '';
    input.textContent += num;
  } else
    input.textContent += num;
}

//Очистить все поле
function clean() {
  input.textContent = '0';
  power = '';
}

//Удалить символ
function back() {
  let exp = input.textContent;
  input.textContent = exp.substring(0, exp.length - 1);
  if (input.textContent == 0) {
    input.textContent = '0';
  }
}

//Посчитать выражение
function equal() {
  let exp = input.textContent;
  if (input.textContent.includes('^')) {
    let tmp = input.textContent.split('^')
    let num = Function(`'use strict'; return ${power}`)();
    let pow = +tmp[1]
    input.textContent = Math.pow(num, pow);
    power = '';
    return;
  }
  if (exp) {
    input.textContent = Function(`'use strict'; return ${exp}`)();
  }
}

//Вычислить проценты
function percent() {
  input.textContent = Function(`'use strict'; return ${input.textContent}`)() / 100;
}

//Для добавления констант
function constant(name) {
  if (input.textContent == 0) {
    input.textContent = '';
  }
  if (name == 'pi')
    input.textContent += Math.PI.toFixed(8);
  if (name == 'e')
    input.textContent += Math.E.toFixed(8);
}

//Корень квадратный, в квадрат в '-1' степень
function operation(name) {
  if (name == 'sqrt')
    input.textContent = Math.sqrt(Function(`'use strict'; return ${input.textContent}`)());
  if (name == 'sqr')
    input.textContent = Math.pow(Function(`'use strict'; return ${input.textContent}`)(), 2);
  if (name == '^-1')
    input.textContent = Math.pow(Function(`'use strict'; return ${input.textContent}`)(), -1);
  if (name == '^') {
    power = input.textContent;
    input.textContent += '^';
  }
}

//Факториал числа
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}
function fact() {
  input.textContent = factorial(+Function(`'use strict'; return ${input.textContent}`)());
}

function fact() {
  let exp = input.textContent;
  let num = parseFloat(exp);
  if (num < 0) {
    input.textContent = 'Invalid input';
  } else {
    input.textContent = factorial(num).toString();
  }
}


// Логарифмы десятичные(lg) и натуральные(ln)
function log(name) {
  const inputValue = Number(input.textContent);
  if (name === 'lg' && inputValue > 0) {
    input.textContent = Math.log10(inputValue).toFixed(8);
  } else if (name === 'ln' && inputValue > 0) {
    input.textContent = Math.log(inputValue).toFixed(8);
  }
}

//Переключение с градусов на радианы

document.querySelector('.type').addEventListener('click', function () {
  if (document.querySelector('.type').textContent == 'deg') {
    this.textContent = 'rad';
  } else if (document.querySelector('.type').textContent == 'rad') {
    this.textContent = 'deg';
  }
})

//Синусы, косинусы, тангенсы и котангексы
function f(name) {
  const value = parseFloat(input.textContent);
  const angle = document.querySelector('.type').textContent === 'deg' ? value / 180 * Math.PI : value;

  if (name === 'sin') {
    input.textContent = parseFloat(Math.sin(angle).toFixed(8).toString());
  } else if (name === 'cos') {
    input.textContent = parseFloat(Math.cos(angle).toFixed(8).toString());
  } else if (name === 'tan') {
    input.textContent = parseFloat(Math.tan(angle).toFixed(8).toString());
  } else if (name === 'ctg') {
    input.textContent = parseFloat(1 / Math.tan(angle).toFixed(8).toString());
  }
}