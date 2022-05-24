document.addEventListener("DOMContentLoaded", () => {
  const checksList = document.querySelectorAll('.auto-sort__checks');
  const currFilterList = document.querySelector('.filter-items');

  // очистка всех фильтров и куки из сортировки
  function allSortClear(checks) {
    let filterItems = currFilterList.querySelectorAll('.filter-item')
    let check = checks.querySelectorAll('input');
    checkInput = false;
    document.querySelector('.sex-btn').textContent = 'Не имеет значения';
    // удаляем все элементы
    filterItems.forEach(function (item) {
      item.remove()
    })
    // все чекбоксы false
    check.forEach(function (inp) {
      inp.checked = false
    })
    // очищаем знания языков
    function languagesClear() {
      document.querySelector('.languages__list').querySelectorAll('.languages').forEach(item => {
        if (item.getAttribute('data-count') > 0) {
          item.remove()
        } else if (item.getAttribute('data-count') == 0) {

        } {
          let addLanguageBtn = document.querySelector('.languages__list .add-language')
          item.querySelector('.select-language .header .item').textContent = 'Выберите язык';
          item.querySelector('.select-language .header .item').setAttribute('data-name', '');
          item.querySelector('.select-language .header .item').setAttribute('data-value', '');
          item.querySelector('.select-lavel .header .item').textContent = 'Выберите уровень';
          item.querySelector('.select-lavel .header .item').setAttribute('data-name', '');
          item.querySelector('.select-lavel .header .item').setAttribute('data-value', '');
          let languagesList = item.querySelectorAll('.select-language .list .item');
          languagesList.forEach(elem => {
            elem.classList.remove('hide');
          })
          let filtersLanguagesList = document.querySelectorAll('.filter-items .language-autoSort-item')
          filtersLanguagesList.forEach(item => {
            item.remove()
          })

          item.querySelector('.select-lavel').classList.add('dont-click');
          addLanguageBtn.classList.add('dont-click');

          allLanguage2.length = 0;
          localStorage.removeItem('mainFilter-languages-value')
        }
      })
    }
    languagesClear()

    filterCounter = 0
    // document.querySelector('.filters-clear').classList.add('closed')
    // скрываем фильтр возраста
    document.querySelector('.age-filter-item').classList.add('closed')
    document.querySelector('.age-filter-item').querySelector('.age-from').textContent = ''
    document.querySelector('.age-filter-item').querySelector('.age-to').textContent = ''

    // очищаем инпуты возраста
    let ageInputs = document.querySelectorAll('.age-inp')
    ageInputs.forEach(function (input) {
      input.querySelector('input').value = '';
    })
    // очищаем все куки
    arrayFormatWork.length = 0;
    arrayExperience.length = 0;
    delete_cookie('ageSortFrom')
    delete_cookie('ageSortTo')
    delete_cookie('autoSortSex')
    delete_cookie('autoSort-experience')
    delete_cookie('autoSort-format-work')

    allLanguage.length = 0;
    localStorage.setItem('autoSort-languages-value', JSON.stringify(allLanguage));
  }

  // проход по всем полям с чекбоксами
  checksList.forEach(function (checks) {
    let checkLi = checks.querySelectorAll('label')
    // проход по всем чекбоксам в полях
    checkLi.forEach(function (check) {
      // создаем элемент
      createFilterElem(check)
      // клик на "очистить фильтр"
      document.querySelector('.filters-clear').onclick = () => {
        allSortClear(checks)
      }

      document.querySelector('.auto-sort-clear').onclick = () => {
        allSortClear(checks)
        document.querySelector('.auto-sort-wrapper').classList.remove('active')
      }
    })
  })

  // создаем элемент в выбранных фильтрах при изменении чекбокса
  function createFilterElem(check) {
    // инпут на котором произошло событие
    let inp = check.querySelector('input')
    // при изменении состояния чекбокса
    inp.onchange = (e) => {
      let target = e.target
      // добавление элементов в выбранные фильтры
      if (inp.checked == true) {
        filterCounter++;
        if (filterCounter > 0) {
          // показываем кнопку 'очистить все фильтры'
          // document.querySelector('.filters-clear').classList.remove('closed')
        }
        // создание элемента
        let filterItem = document.createElement('div')
        filterItem.classList.add('filter-item')
        if (target.closest('.autoSort-format-work') != null) {
          filterItem.classList.add('sort-format-work')
        }
        if (target.closest('.autoSort-experience') != null) {
          filterItem.classList.add('sort-experience')
        }
        filterItem.textContent = inp.closest('.item').querySelector('p').textContent
        // -------------------------------------------------
        let itemValue = inp.closest('.item').getAttribute('data-value')
        filterItem.setAttribute('data-value', itemValue)
        // -------------------------------------------------
        // добавление иконки "очистить"
        let pic = document.createElement("IMG");
        pic.src = "../responses/img/filter-del.svg";
        pic.classList.add('img-close-current')
        filterItem.appendChild(pic);
        // добавление элемента в список выбранных фильтров
        currFilterList.append(filterItem)
      } else {
        let filterItems = currFilterList.querySelectorAll('.filter-item')

        filterItems.forEach(function (item) {
          if (item.textContent == target.closest('.item').querySelector('p').textContent) {
            item.remove()

            filterCounter--
          }
        })
      }
    }
  }
})