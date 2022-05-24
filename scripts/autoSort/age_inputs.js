document.addEventListener("DOMContentLoaded", () => {

  const inputFrom = document.querySelector('.age-input-from')
  const inputTo = document.querySelector('.age-input-to')
  const ageFrom = document.querySelector('.age-from-wrap')
  const ageTo = document.querySelector('.age-to-wrap')
  const clearInpIcons = document.querySelectorAll('.age-clear-icon')
  const ageBlock = document.querySelector('.age')

  let inputFromValue;
  let inputToValue;


  // скрытие и показ возраста в списке выбранных фильтров
  ageBlock.querySelector('.age-inps').oninput = () => {
    if (checkInput == false) {
      if (inputTo.value.length > 0 || inputFrom.value.length > 0) {
        checkInput = true;
        filterCounter++
        // document.querySelector('.filters-clear').classList.remove('closed')
      } else {
        filterCounter--
      }
    }

    // при стирании backspace'ом
    if (inputTo.value.length == 0 && inputFrom.value.length == 0) {
      filterCounter--
      checkInput = false;
    }

    // показ выбранного возраста в выбранных фильтрах
    if (inputFrom.value != '' || inputTo.value != '') {
      document.querySelector('.age-filter-item').classList.remove('closed')
    } else if (inputFrom.value == '' && inputTo.value == '') {
      document.querySelector('.age-filter-item').classList.add('closed')
    }
  }

  // закрытие по крестику в выбранных фильтрах
  document.querySelector('.age-item-clear').onclick = () => {
    document.querySelector('.age-filter-item').classList.add('closed')
    delete_cookie('ageSortFrom')
    delete_cookie('ageSortTo')
    inputFrom.value = ''
    inputTo.value = ''
    document.querySelector('.age-from').textContent = ''
    document.querySelector('.age-to').textContent = ''
    document.querySelector('.age-from-wrap').classList.add('closed')
    document.querySelector('.age-to-wrap').classList.add('closed')

    if (inputTo.value.length == 0 && inputFrom.value.length == 0) {
      filterCounter--
      checkInput = false;
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
  inputFrom.addEventListener('input', function () {

    checkDigits(inputFrom)

    ageFrom.querySelector('.age-from').innerHTML = inputFrom.value
    inputFromValue = inputFrom.value
    writeCookie('ageSortFrom', inputFromValue, 30)

    if (inputFrom.value != '') {
      ageFrom.classList.remove('closed')
    } else {
      ageFrom.classList.add('closed')
    }
  })
  // ДО
  inputTo.addEventListener('input', function () {

    checkDigits(inputTo)

    ageTo.querySelector('.age-to').innerHTML = inputTo.value
    inputToValue = inputTo.value
    writeCookie('ageSortTo', inputToValue, 30)

    if (inputTo.value != '') {
      ageTo.classList.remove('closed')
    } else {
      ageTo.classList.add('closed')
    }
  })


  function ageReadCookie() {
    // для инпута "ОТ"
    if (readCookie('ageSortFrom') != undefined) {
      inputFromValue = readCookie('ageSortFrom')
      // заносим значение из куки в инпуты
      inputFrom.value = inputFromValue
    }
    // если элемент в куки содержит значение
    if (inputFromValue != '' && inputFromValue != undefined) {
      inputFrom.closest('.age-inp').querySelector('.age-clear').querySelector('.age-clear-icon').classList.remove('closed')
      // выводим его в выбранных фильтрах
      document.querySelector('.age-filter-item').classList.remove('closed')
      ageFrom.classList.remove('closed')
      ageFrom.querySelector('.age-from').textContent = inputFromValue
      filterCounter += 0.5
    }

    // для инпута "ДО"
    if (readCookie('ageSortTo') != undefined) {
      inputToValue = readCookie('ageSortTo')
      // заносим значение из куки в инпуты
      inputTo.value = inputToValue
    }
    // если элемент в куки содержит значение
    if (inputToValue != '' && inputToValue != undefined) {
      inputTo.closest('.age-inp').querySelector('.age-clear').querySelector('.age-clear-icon').classList.remove('closed')

      // выводим его в выбранных фильтрах
      document.querySelector('.age-filter-item').classList.remove('closed')
      ageTo.classList.remove('closed')
      ageTo.querySelector('.age-to').textContent = inputToValue
      filterCounter += 0.5
    }
  }

  // вывод значений из куки
  window.addEventListener('load', function load() {
    ageReadCookie()
  }, false)






  // Очистка полей
  clearInpIcons.forEach(function (clearInpIcon) {
    let ageInput = clearInpIcon.closest('.age-inp').querySelectorAll('input');

    ageInput.forEach(function (input) {
      // удаление значения инпута при клике на крестик в инпуте
      clearInpIcon.onclick = () => {
        input.value = ''
        clearInpIcon.classList.add('closed')
        if (inputFrom.value == '' && inputTo.value == '') {
          checkInput = false;
          filterCounter--
          document.querySelector('.age-filter-item').classList.add('closed')
        }
        if (clearInpIcon.closest('.age-inp').querySelector('.age-input-from')) {
          // очищаем поле куки при клике
          inputFromValue = ''
          delete_cookie('ageSortFrom')
          document.querySelector('.age-from-wrap').classList.add('closed')

        } else if (clearInpIcon.closest('.age-inp').querySelector('.age-input-to')) {
          // очищаем поле куки при клике
          inputToValue = ''
          delete_cookie('ageSortTo')
          document.querySelector('.age-to-wrap').classList.add('closed')
        }
      }

      input.addEventListener('input', function () {
        if (input.value != '') {
          clearInpIcon.classList.remove('closed')
          if (filterCounter > 0) {
            if (inputTo.value.length == 0 && inputFrom.value.length == 0) {
              checkInput = false;
              filterCounter--

            }
          }
        } else {
          clearInpIcon.classList.add('closed')
        }

      })

    })

  })
  // скрытие крестиков в инпутах если они пустые
  document.addEventListener('click', function () {
    if (inputFrom.value == '' && inputTo.value == '') {
      clearInpIcons.forEach(function (clearInpIcon) {
        clearInpIcon.classList.add('closed')
      })
    }
  })
})