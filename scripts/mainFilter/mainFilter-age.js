document.addEventListener("DOMContentLoaded", () => {

  const inputFrom = document.querySelector('.filters__age_input-from')
  const inputTo = document.querySelector('.filters__age_input-to')
  const ageFrom = document.querySelector('.choosen-filters__ageInpFrom')
  const ageTo = document.querySelector('.choosen-filters__ageInpTo')
  const ageBlock = document.querySelector('.age-filter')

  let inputFromValue;
  let inputToValue;

  // скрытие и показ возраста в списке выбранных фильтров
  ageBlock.querySelector('.filters__age').oninput = () => {
    if (mainCheckInput == false) {
      if (inputTo.value.length > 0 || inputFrom.value.length > 0) {
        mainCheckInput = true;
        mainFilterCounter++
        // document.querySelector('.mainFilter-clear').classList.remove('closed')
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
      document.querySelector('.filter-items__age-wrap').classList.remove('closed')
    } else if (inputFrom.value == '' && inputTo.value == '') {
      document.querySelector('.filter-items__age-wrap').classList.add('closed')
    }
  }

  // закрытие по крестику в выбранных фильтрах
  document.querySelector('.choosen-filters__age-clear').onclick = () => {
    document.querySelector('.filter-items__age-wrap').classList.add('closed')
    delete_cookie('ageFilterFrom')
    delete_cookie('ageFilterTo')
    inputFrom.value = ''
    inputTo.value = ''
    document.querySelector('.ageInpFrom').textContent = ''
    document.querySelector('.ageInpTo').textContent = ''
    document.querySelector('.choosen-filters__ageInpFrom').classList.add('closed')
    document.querySelector('.choosen-filters__ageInpTo').classList.add('closed')

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

  // Вывод значений "от" и "до" в блоке age в выбранных фильтрах
  // ОТ
  inputFrom.addEventListener('input', function (e) {
    // Убираем стрелки в инпутах

    checkDigits(inputFrom)

    ageFrom.querySelector('.ageInpFrom').textContent = inputFrom.value
    inputFromValue = inputFrom.value
    writeCookie('ageFilterFrom', inputFromValue, 30)

    if (inputFrom.value != '') {
      ageFrom.classList.remove('closed')
    } else {
      ageFrom.classList.add('closed')
    }
  })
  // ДО
  inputTo.addEventListener('input', function () {

    checkDigits(inputTo)

    ageTo.querySelector('.ageInpTo').textContent = inputTo.value
    inputToValue = inputTo.value
    writeCookie('ageFilterTo', inputToValue, 30)

    if (inputTo.value != '') {
      ageTo.classList.remove('closed')
    } else {
      ageTo.classList.add('closed')
    }
  })

  function ageReadCookie() {
    // для инпута "ОТ"
    if (readCookie('ageFilterFrom') != undefined) {
      inputFromValue = readCookie('ageFilterFrom')
      // заносим значение из куки в инпуты
      inputFrom.value = inputFromValue
    }
    // если элемент в куки содержит значение
    if (inputFromValue != '' && inputFromValue != undefined) {
      // inputFrom.closest('.age-inp').querySelector('.age-clear').querySelector('.age-clear-icon').classList.remove('closed')
      // выводим его в выбранных фильтрах
      document.querySelector('.filter-items__age-wrap').classList.remove('closed')
      ageFrom.classList.remove('closed')
      ageFrom.querySelector('.ageInpFrom').textContent = inputFromValue
      mainFilterCounter += 0.5
    }

    // для инпута "ДО"
    if (readCookie('ageFilterTo') != undefined) {
      inputToValue = readCookie('ageFilterTo')
      // заносим значение из куки в инпуты
      inputTo.value = inputToValue
    }
    // если элемент в куки содержит значение
    if (inputToValue != '' && inputToValue != undefined) {
      // inputTo.closest('.age-inp').querySelector('.age-clear').querySelector('.age-clear-icon').classList.remove('closed')

      // выводим его в выбранных фильтрах
      document.querySelector('.filter-items__age-wrap').classList.remove('closed')
      ageTo.classList.remove('closed')
      ageTo.querySelector('.ageInpTo').textContent = inputToValue
      mainFilterCounter += 0.5
    }
  }

  // вывод значений из куки
  window.addEventListener('load', function load() {
    ageReadCookie()
  }, false)
})