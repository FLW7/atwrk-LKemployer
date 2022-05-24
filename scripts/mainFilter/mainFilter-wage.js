document.addEventListener("DOMContentLoaded", () => {

  const inputFrom = document.querySelector('.filters__wage_input-from')
  const inputTo = document.querySelector('.filters__wage_input-to')
  const wageFrom = document.querySelector('.choosen-filters__wageInpFrom')
  const wageTo = document.querySelector('.choosen-filters__wageInpTo')
  const wageBlock = document.querySelector('.wage-filter')

  let inputFromValue;
  let inputToValue;


  // скрытие и показ зарплаты в списке выбранных фильтров
  wageBlock.querySelector('.filters__wage').oninput = () => {
    if (mainCheckInput == false) {
      if (inputTo.value.length > 0 || inputFrom.value.length > 0) {
        mainCheckInput = true;
        mainFilterCounter++
        document.querySelector('.mainFilter-clear').classList.remove('closed')
      } else {
        mainFilterCounter--
      }
    }

    // при стирании backspace'ом
    if (inputTo.value.length == 0 && inputFrom.value.length == 0) {
      mainFilterCounter--
      mainCheckInput = false;
    }

    // показ выбранного возраста в выбранных фильтрах
    if (inputFrom.value != '' || inputTo.value != '') {
      document.querySelector('.filter-items__wage-wrap').classList.remove('closed')
    } else if (inputFrom.value == '' && inputTo.value == '') {
      document.querySelector('.filter-items__wage-wrap').classList.add('closed')
    }
  }

  // закрытие по крестику в выбранных фильтрах
  document.querySelector('.choosen-filters__wage-clear').onclick = () => {
    document.querySelector('.filter-items__wage-wrap').classList.add('closed')
    delete_cookie('wageFilterFrom')
    delete_cookie('wageFilterTo')
    inputFrom.value = ''
    inputTo.value = ''
    document.querySelector('.wageInpFrom').textContent = ''
    document.querySelector('.wageInpTo').textContent = ''
    document.querySelector('.choosen-filters__wageInpFrom').classList.add('closed')
    document.querySelector('.choosen-filters__wageInpTo').classList.add('closed')

    if (inputTo.value.length == 0 && inputFrom.value.length == 0) {
      mainFilterCounter--
      mainCheckInput = false;
    }
  }

  // Убираем стрелки в инпутах firefox
  function checkDigits(input) {
    // проверка на пробелы 
    if (input.value == false) {
      input.value = "";
    }

    if (input.value.length > 0) {
      let inputDataArr = input.value.split(/[- — /]/);
      let inputDataClear = inputDataArr.join('');
      let inputDataArrNew = inputDataClear.match(/.{1,1}/g);

      // отсекает первый ноль если больше 1 символа
      if (inputDataArrNew[0] == 0 && inputDataArrNew.length == 2) {
        inputDataArrNew.shift();
      }

      let inputDataArrClear = inputDataArrNew.filter(function (arr) {
        return arr.match(/^[1-9]|[0-9]|[0-9]$/g);
      });

      // фильтр на посторонние символы
      if (!inputDataArrNew[inputDataArrNew.length - 1].match(/[0-9]/)) {
        inputDataArrNew.length = inputDataArrNew.length - 1
        input.value = inputDataArrNew.join('');
      }
      input.value = inputDataArrClear.join('');
    }
  }

  // Вывод значений "от" и "до" в блоке wage в выбранных фильтрах
  // ОТ
  inputFrom.addEventListener('input', function () {

    checkDigits(inputFrom)

    wageFrom.querySelector('.wageInpFrom').textContent = inputFrom.value
    inputFromValue = inputFrom.value
    writeCookie('wageFilterFrom', inputFromValue, 30)

    if (inputFrom.value != '') {
      wageFrom.classList.remove('closed')
    } else {
      wageFrom.classList.add('closed')
    }
  })
  // ДО
  inputTo.addEventListener('input', function () {

    checkDigits(inputTo)

    wageTo.querySelector('.wageInpTo').innerHTML = inputTo.value
    inputToValue = inputTo.value
    writeCookie('wageFilterTo', inputToValue, 30)

    if (inputTo.value != '') {
      wageTo.classList.remove('closed')
    } else {
      wageTo.classList.add('closed')
    }
  })

  function wageReadCookie() {
    // для инпута "ОТ"
    if (readCookie('wageFilterFrom') != undefined) {
      inputFromValue = readCookie('wageFilterFrom')
      // заносим значение из куки в инпуты
      inputFrom.value = inputFromValue
    }
    // если элемент в куки содержит значение
    if (inputFromValue != '' && inputFromValue != undefined) {
      // inputFrom.closest('.age-inp').querySelector('.age-clear').querySelector('.age-clear-icon').classList.remove('closed')
      // выводим его в выбранных фильтрах
      document.querySelector('.filter-items__wage-wrap').classList.remove('closed')
      wageFrom.classList.remove('closed')
      wageFrom.querySelector('.wageInpFrom').textContent = inputFromValue
    }

    // для инпута "ДО"
    if (readCookie('wageFilterTo') != undefined) {
      inputToValue = readCookie('wageFilterTo')
      // заносим значение из куки в инпуты
      inputTo.value = inputToValue
    }
    // если элемент в куки содержит значение
    if (inputToValue != '' && inputToValue != undefined) {
      // inputTo.closest('.age-inp').querySelector('.age-clear').querySelector('.age-clear-icon').classList.remove('closed')

      // выводим его в выбранных фильтрах
      document.querySelector('.filter-items__wage-wrap').classList.remove('closed')
      wageTo.classList.remove('closed')
      wageTo.querySelector('.wageInpTo').textContent = inputToValue
    }
  }

  // вывод значений из куки
  window.addEventListener('load', function load() {
    wageReadCookie()
  }, false)

})