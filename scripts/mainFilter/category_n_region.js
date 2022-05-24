document.addEventListener("DOMContentLoaded", () => {
  const html = document.querySelector('html'),
    body = document.querySelector('body')

  const filterCategoriesText = document.querySelector('.categories__filter p'); // получение текста из фильтра категории
  const filterRegion = document.querySelector('.region__filter'); // получение фильтра регион
  const regionFilterList = document.querySelector('.region-list__items'); // получение списка выбранных городов
  const ChoosenFilterList = document.querySelector('.choosen-filters__filter-items'); // получение списка выбранных городов
  const popupCategoryWrap = document.querySelector('.popup-categories'); // получение фона для попап
  const popupRegionWrap = document.querySelector('.popup-region'); // получение фона для попап
  const popupCategories = popupCategoryWrap.querySelector('.popup__categories'); // получение попап категории
  const popupCategoriesList = popupCategories.querySelectorAll('li'); // элементы списка в попап категории
  const popupCategoriesBtn = popupCategories.querySelectorAll('button'); // получение кнопок в попап категории
  const popupRegion = popupRegionWrap.querySelector('.popup__region'), // получение попап регион
    popupRegionSearch = popupRegion.querySelector('.search-input'),
    popupRegionValue = popupRegion.querySelector('.popup__region-list'); // получение поля ввода региона


  // удаление региона из выбранных фильтров 
  // const regionListItemRemove = (regionList) => {
  //   regionList.querySelectorAll('.item').forEach(elem => {
  //     if (target.parentNode.textContent == elem.textContent) {
  //       elem.remove();
  //     }
  //   })
  // }

  // ============================================= //
  // создание элемента в выбранных фильтрах
  function createFilterItem(elem) {
    // создание элемента
    let filterItem = document.createElement('div');
    filterItem.classList.add('filter-items__item');
    filterItem.classList.add('region-filter__item');
    filterItem.textContent = elem;
    // добавление иконки "очистить"
    let pic = document.createElement("IMG");
    pic.src = "./img/filter-del.svg";
    pic.classList.add('img-close-choosen');
    filterItem.appendChild(pic);
    // добавление элемента в список выбранных фильтров
    regionFilterList.append(filterItem);


    // добавление элемента в список выбранных регионов
    // let cloneFilter = filterItem.cloneNode(true)
    // ChoosenFilterList.append(cloneFilter);

    // клик по иконке "очистить"
    pic.onclick = (event) => {
      let target = event.target;
      // удаление элемента в списке выбранных фильтров
      target.closest('.filter-items__item').remove();
      mainFilterCounter--
      // удаление элемента в списке выбранных регионов
      // regionFilterList.querySelectorAll('.filter-items__item').forEach((item) => {
      //   if (target.closest('.filter-items__item').textContent == item.textContent) {
      //     item.remove()
      //   }
      // })

      popupRegionArr.forEach(elemArr => {
        if (elemArr == target.parentNode.textContent) {
          popupRegionArr.splice((popupRegionArr.indexOf(elemArr)), 1);
          localStorage.setItem('region-value', JSON.stringify(popupRegionArr));
        }
      })
      document.querySelector('.word-region-count').textContent = popupRegionArr.length
      // изменаем слово "выбран"
      document.querySelector('.word-region-choosen').textContent = declOfNum(popupRegionArr.length, ['Выбран', 'Выбраны', 'Выбрано'])
      // изменаем слово "регион"
      document.querySelector('.word-region-region').textContent = declOfNum(popupRegionArr.length, ['Регион', 'Региона', 'Регионов'])
      if (popupRegionArr.length == 0) {
        document.querySelector('.word-region-count').textContent = ''
        document.querySelector('.word-region-choosen').textContent = ''
        document.querySelector('.word-region-region').textContent = ''
      }
    }
  }

  // функционал в попап регион
  const popupRegionInput = () => {
    let popupRegionSearchList;

    popupRegion.addEventListener('click', e => {
      let target = e.target;
      if (target == popupRegionSearch) {
        popupRegionSearch.addEventListener('input', () => {
          popupRegionSearchList = popupRegion.querySelector('.search-list'); // получение выподающего списка регионов
          popupRegionSearchList.classList.add('active');
        })
      }

      if (target.closest('.search-list') && target.closest('.item')) {
        popupRegionSearchList.classList.remove('active');
        popupRegionSearch.value = '';

        if (popupRegionArr.indexOf(target.textContent) == -1) {
          let elem = target.textContent
          popupRegionArr.push(target.textContent);
          localStorage.setItem('region-value', JSON.stringify(popupRegionArr));
          mainFilterCounter++

          document.querySelector('.word-region-count').textContent = popupRegionArr.length
          // изменаем слово "выбран"
          document.querySelector('.word-region-choosen').textContent = declOfNum(popupRegionArr.length, ['Выбран', 'Выбрано', 'Выбрано'])
          // изменаем слово "регион"
          document.querySelector('.word-region-region').textContent = declOfNum(popupRegionArr.length, ['регион', 'региона', 'регионов'])
          if (popupRegionArr.length == 0) {
            document.querySelector('.word-region-count').textContent = ''
            document.querySelector('.word-region-choosen').textContent = ''
            document.querySelector('.word-region-region').textContent = ''
          }
          createFilterItem(elem)
        }
      }
    })
  }
  popupRegionInput();


  // нажатие на список в фильтре категории
  const clickCategoriesItem = (list1) => {
    list1.forEach(item => {
      item.addEventListener('click', () => {
        if (categoryValueArr.indexOf(item.getAttribute('data-value')) == -1) {
          item.classList.add('active');
          categoryValueArr.push(item.getAttribute('data-value'))
          writeCookie('categories-value', categoryValueArr, 30)
          document.querySelector('.word-category-count').textContent = categoryValueArr.length;
          // изменаем слово "выбран"
          document.querySelector('.word-category-choosen').textContent = declOfNum(categoryValueArr.length, ['Выбран', 'Выбраны', 'Выбрано'])
          // изменаем слово "регион"
          document.querySelector('.word-category-category').textContent = declOfNum(categoryValueArr.length, ['категория', 'категории', 'категорий'])
        } else {
          item.classList.remove('active');
          categoryValueArr.splice(categoryValueArr.indexOf(item.getAttribute('data-value')), 1)
          writeCookie('categories-value', categoryValueArr, 30)
          document.querySelector('.word-category-count').textContent = categoryValueArr.length;
          if (categoryValueArr.length == 0) {
            document.querySelector('.word-category-count').textContent = ''
            document.querySelector('.word-category-choosen').textContent = ''
            document.querySelector('.word-category-category').textContent = ''
          }
        }
        if (categoryValueArr.length == 0) {
          delete_cookie('categories-value')
        }
        // активировать кнопки в попап категории если выбранна любая категория
        if (categoryValueArr.length > 0) {
          popupCategoriesBtn.forEach(btn => {
            btn.disabled = false;
          })
        } else {
          popupCategoriesBtn.forEach(btn => {
            btn.disabled = true;
          })
        }

      });
    });


  };
  clickCategoriesItem(popupCategoriesList);


  // проверка активной категории
  const loadCategories = (list) => {
    if (readCookie('categories-value') != undefined) {
      document.querySelector('.word-category-count').textContent = categoryValueArr.length
      // изменаем слово "выбран"
      document.querySelector('.word-category-choosen').textContent = declOfNum(categoryValueArr.length, ['Выбран', 'Выбраны', 'Выбрано'])
      // изменаем слово "регион"
      document.querySelector('.word-category-category').textContent = declOfNum(categoryValueArr.length, ['Категория', 'Категории', 'Категорий'])
    } else {
      document.querySelector('.word-category-count').textContent = ''
      document.querySelector('.word-category-choosen').textContent = ''
      document.querySelector('.word-category-category').textContent = ''
    }
  };

  // получение записанных городов в фильтре регион при загрузке
  const examinationRegionFilter = () => {
    if (localStorage.getItem('region-value') != undefined) {
      let regionValue = JSON.parse(localStorage.getItem('region-value'));
      popupRegionArr = regionValue;
      document.querySelector('.word-region-count').textContent = popupRegionArr.length
      // изменаем слово "выбран"
      document.querySelector('.word-region-choosen').textContent = declOfNum(popupRegionArr.length, ['Выбран', 'Выбраны', 'Выбрано'])
      // изменаем слово "регион"
      document.querySelector('.word-region-region').textContent = declOfNum(popupRegionArr.length, ['Регион', 'Региона', 'Регионов'])
      if (popupRegionArr.length == 0) {
        document.querySelector('.word-region-count').textContent = ''
        document.querySelector('.word-region-choosen').textContent = ''
        document.querySelector('.word-region-region').textContent = ''
      }
      regionValue.forEach(elem => {
        createFilterItem(elem)
      })
    }
  };

  // получение данных из localStorage при загрузки страницы
  window.addEventListener("load", function load() {
    loadCategories(popupCategoriesList);
    if (readCookie('categories-value') != undefined) {
      popupCategoriesBtn.forEach(btn => {
        btn.disabled = false;
      })
    }
    examinationRegionFilter();
  }, false);


  // ============================================= //
  // клики на странице
  body.addEventListener('click', (event) => {
    let target = event.target

    // нажатие на кнопки в попап категории
    if (target.closest('.popup__categories-btn')) {
      if (target.classList.contains('clear')) {
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
      if (target.classList.contains('next')) {
        popupCategoryWrap.classList.remove('active')
      }
    }

    // закрытие попапа регионов при нажатии на крестик
    if (target.classList.contains('region-close-icon')) {
      popupRegionWrap.classList.remove('active');
      popupRegion.classList.remove('active');
    }

    // нажатие на кнопки в попап регион
    if (target.closest('.popup__region-btn')) {
      if (target.classList.contains('clear')) {
        popupRegionArr.length = 0;
        localStorage.setItem('region-value', JSON.stringify(popupRegionArr));
        // удаление элемента в списке выбранных фильтров
        // ChoosenFilterList.querySelectorAll('.filter-items__item').forEach((item) => {
        //   if (item.classList.contains('region-filter__item')) {
        //     item.remove()
        //   }
        // })
        // удаление элемента в списке выбранных регионов
        regionFilterList.querySelectorAll('.filter-items__item').forEach((item) => {
          if (item.classList.contains('region-filter__item')) {
            item.remove()
            mainFilterCounter--
          }
        })
        document.querySelector('.word-region-count').textContent = ''
        document.querySelector('.word-region-choosen').textContent = ''
        document.querySelector('.word-region-region').textContent = ''
      }

      if (target.classList.contains('search')) {
        html.classList.remove('lock');
        popupRegionWrap.classList.remove('active');
        popupRegion.classList.remove('active');
      }
    }
  });


  // открытие попапов
  document.addEventListener('click', (e) => {
    let target = e.target
    // нажатие на фильтр регион
    if (target.closest('.region__filter-top')) {
      popupRegionWrap.classList.add('active');
    }
    // нажатие на фильтр категории
    if (target.closest('.categories__filter')) {
      popupCategoryWrap.classList.add('active');
    }
  })
  // закрытие попапа регионов
  document.addEventListener('click', function (e) {
    let target = e.target;
    let its_popup = target == popupRegion || popupRegion.contains(target);
    let its_btn = target.closest('.region__filter-top');
    let its_close_item = target.classList.contains('img-close-choosen')
    let is_active = popupRegionWrap.classList.contains('active')
    if (!its_popup && is_active && !its_btn && !its_close_item) {
      popupRegionWrap.classList.remove('active')
    }
  })
  // закрытие попапа категорий
  document.addEventListener('click', function (e) {
    let target = e.target;
    let its_popup = target == popupCategories || popupCategories.contains(target);
    let its_btn = target.closest('.categories__filter');
    let is_active = popupCategoryWrap.classList.contains('active')
    if (!its_popup && is_active && !its_btn) {
      popupCategoryWrap.classList.remove('active')
    }
  })
});
