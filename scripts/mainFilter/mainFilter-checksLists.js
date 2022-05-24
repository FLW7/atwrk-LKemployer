document.addEventListener("DOMContentLoaded", () => {
  const checksList = document.querySelectorAll('.checks__list')
  const currFilterList = document.querySelector('.choosen-filters__filter-items');

  // проход по всем полям с чекбоксами
  checksList.forEach(checks => {
    let checkLi = checks.querySelectorAll('label')
    // проход по всем чекбоксам в полe
    checkLi.forEach(function (check) {
      // создаем элемент
      createFilterElem(check)

      // клик на "очистить фильтр"
      document.querySelector('.mainFilter-clear').onclick = () => {
        allSortClear(checks)
      }
    })

  });

  // создаем элемент в выбранных фильтрах при изменении чекбокса
  function createFilterElem(check) {
    // инпут на котором произошло событие
    let inp = check.querySelector('input')
    // при изменении состояния чекбокса
    inp.onchange = (e) => {
      let target = e.target
      // добавление элементов в выбранные фильтры
      if (inp.checked == true) {
        inp.closest('.item').classList.add('active')
        mainFilterCounter++;
        // показываем кнопку 'очистить все фильтры'
        if (mainFilterCounter > 0) {
          // document.querySelector('.mainFilter-clear').classList.remove('closed')
        }
        // создание элемента
        let filterItem = document.createElement('div')
        filterItem.classList.add('filter-items__item')
        filterItem.textContent = inp.closest('.item').querySelector('p').textContent
        if (target.closest('.filters__experience') != null) {
          filterItem.classList.add('mainFilter-experience')
        }
        if (target.closest('.citizenship__filter-list') != null) {
          filterItem.classList.add('mainFilter-citizenship')
        }
        if (target.closest('.driver-license__filter') != null) {
          filterItem.classList.add('mainFilter-driver')
        }
        // добавление иконки "очистить"
        let pic = document.createElement("IMG");
        pic.src = "../responses/img/filter-del.svg";
        pic.classList.add('img-close-choosen')
        filterItem.appendChild(pic);
        // добавление элемента в список выбранных фильтров
        document.querySelector('.choosen-filters__filter-items').append(filterItem)
      }
      else {
        inp.closest('.item').classList.remove('active')
        let filterItems = document.querySelector('.choosen-filters__filter-items').querySelectorAll('.filter-items__item')

        filterItems.forEach(function (item) {
          if (item.textContent == target.closest('.item').querySelector('p').textContent) {
            item.remove()

            mainFilterCounter--

            if (mainFilterCounter == 0) {
              // document.querySelector('.mainFilter-clear').classList.add('closed')
            }
          }
        })
      }
    }
  }
  // очистка всех фильтров и куки из главных фильтров
  function allSortClear(checks) {
    let filterItems = currFilterList.querySelectorAll('.filter-items__item')

    // снимаем все чекбоксы
    checksList.forEach((item) => {
      item.querySelectorAll('.item label').forEach((elem) => {
        elem.querySelector('input').checked = false
        elem.closest('.item').classList.remove('active')
      })
    })

    mainCheckInput = false;
    // удаляем все элементы
    filterItems.forEach(function (item) {
      item.remove()
    })
    document.querySelector('.region-list__items').querySelectorAll('.filter-items__item').forEach((item) => {
      item.remove()
    })


    mainFilterCounter = 0
    // скрываем от и до в фильтре возраста и очищаем
    // document.querySelector('.mainFilter-clear').classList.add('closed')
    document.querySelector('.filter-items__age-wrap').classList.add('closed')
    document.querySelector('.filter-items__age-wrap').querySelector('.ageInpFrom').textContent = ''
    document.querySelector('.filter-items__age-wrap').querySelector('.ageInpTo').textContent = ''
    document.querySelector('.filter-items__age-wrap').querySelector('.choosen-filters__ageInpFrom').classList.add('closed')
    document.querySelector('.filter-items__age-wrap').querySelector('.choosen-filters__ageInpTo').classList.add('closed')
    // скрываем от и до в фильтре зарплаты и очищаем
    document.querySelector('.filter-items__wage-wrap').classList.add('closed')
    document.querySelector('.filter-items__wage-wrap').querySelector('.wageInpFrom').textContent = ''
    document.querySelector('.filter-items__wage-wrap').querySelector('.wageInpTo').textContent = ''
    document.querySelector('.filter-items__wage-wrap').querySelector('.choosen-filters__wageInpFrom').classList.add('closed')
    document.querySelector('.filter-items__wage-wrap').querySelector('.choosen-filters__wageInpTo').classList.add('closed')

    // очищаем инпуты возраста
    let ageInputs = document.querySelectorAll('.filters__age_input')
    ageInputs.forEach(function (input) {
      input.value = '';
    })
    // очищаем инпуты зарплаты
    let wageInputs = document.querySelectorAll('.filters__wage_input')
    wageInputs.forEach(function (input) {
      input.value = '';
    })
    // ставим в выборе пола первоначальное значение
    document.querySelector('.filters__sex').querySelectorAll('.item').forEach((elem) => {
      elem.querySelector('input').checked = false
    })
    // очищаем категориии
    function clearMainFilterCategories() {
      const popupCategories = document.querySelector('.popup-categories').querySelector('.popup__categories'); // получение попап категории
      const popupCategoriesList = popupCategories.querySelectorAll('li'); // элементы списка в попап категории
      document.querySelector('.word-category-count').textContent = ''
      document.querySelector('.word-category-choosen').textContent = ''
      document.querySelector('.word-category-category').textContent = ''
      const clearPopupCategories = (list) => {
        list.forEach(elem => {
          elem.classList.remove('active')
        })
        categoryValueArr.length = 0
        delete_cookie('categories-value');
      };
      clearPopupCategories(popupCategoriesList);
    }
    clearMainFilterCategories()
    // очищаем регионы
    function clearMainFilterRegions() {
      const regionFilterList = document.querySelector('.region-list__items'); // получение списка выбранных городов
      popupRegionArr.length = 0;
      localStorage.setItem('region-value', JSON.stringify(popupRegionArr));
      // удаление элемента в списке выбранных регионов
      regionFilterList.querySelectorAll('.filter-items__item').forEach((item) => {
        if (item.classList.contains('region-filter__item')) {
          item.remove()
        }
      })
      document.querySelector('.word-region-count').textContent = ''
      document.querySelector('.word-region-choosen').textContent = ''
      document.querySelector('.word-region-region').textContent = ''
    }
    clearMainFilterRegions()

    // очищаем знания языков
    function languagesClear() {
      document.querySelector('.languages__list2').querySelectorAll('.languages2').forEach(item => {
        if (item.getAttribute('data-count') > 0) {
          item.remove()
        } else if (item.getAttribute('data-count') == 0) {

        } {
          let addLanguageBtn = document.querySelector('.languages__list2 .add-language2')
          item.querySelector('.select-language2 .header2 .item').textContent = 'Выберите язык';
          item.querySelector('.select-language2 .header2 .item').setAttribute('data-name', '');
          item.querySelector('.select-language2 .header2 .item').setAttribute('data-value', '');
          item.querySelector('.select-lavel2 .header2 .item').textContent = 'Выберите уровень';
          item.querySelector('.select-lavel2 .header2 .item').setAttribute('data-name', '');
          item.querySelector('.select-lavel2 .header2 .item').setAttribute('data-value', '');
          let languagesList = item.querySelectorAll('.select-language2 .list2 .item');
          languagesList.forEach(elem => {
            elem.classList.remove('hide');
          })
          let filtersLanguagesList = document.querySelectorAll('.choosen-filters__filter-items .language-filter-item')
          filtersLanguagesList.forEach(item => {
            item.remove()
          })

          item.querySelector('.select-lavel2').classList.add('dont-click');
          addLanguageBtn.classList.add('dont-click');

          allLanguage2.length = 0;
          localStorage.removeItem('mainFilter-languages-value')
        }
      })
    }
    languagesClear()
    delete_cookie('filter-sex')
    if (document.querySelector('.sex-item') != null) {
      document.querySelector('.sex-item').remove()
    }
    delete_cookie('filter-region')
    if (document.querySelector('.region-item') != null) {
      document.querySelector('.region-item').remove()
    }

    arrayFilterExperience.length = 0
    arrayCitizenship.length = 0
    arrayDriverLicense.length = 0
    delete_cookie('wageFilterFrom')
    delete_cookie('wageFilterTo')
    delete_cookie('ageFilterFrom')
    delete_cookie('ageFilterTo')
    delete_cookie('filter-citizenship')
    delete_cookie('filter-driverLicense')
    delete_cookie('filter-experience')
    delete_cookie('categories-value')
    popupRegionArr.length = 0;
    localStorage.setItem('region-value', JSON.stringify(popupRegionArr));
    allLanguage2.length = 0;
    localStorage.setItem('mainFilter-languages-value', JSON.stringify(allLanguage2));
  }
})