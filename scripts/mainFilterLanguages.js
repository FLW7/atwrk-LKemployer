document.addEventListener("DOMContentLoaded", () => {
  let addLanguageBtn = document.querySelector('.languages__list2 .add-language2'),
    allLanguage2 = [],
    countLanguage = 0,
    languageDataCount,
    languageValue,
    languageName,
    lavelValue,
    lavelName;


  document.addEventListener('click', (event) => {
    if (document.querySelectorAll('.languages__list2 .languages2').length == 1) {
      document.querySelectorAll('.languages__list2 .languages2').forEach(item => {
        item.classList.add('one')
      })
    }
    let allLanguagesItem = document.querySelectorAll('.languages__list2 .languages2');
    for (let index = 0; index < allLanguagesItem.length; index++) {
      allLanguagesItem[index].setAttribute('data-count', index);
    }
    let target = event.target;

    // Создаем элемент в фильтрах с выбранным языком
    function createLanguageFilter() {
      // создание элемента
      let filterItem = document.createElement('div')
      filterItem.classList.add('filter-items__item')
      filterItem.classList.add('language-filter-item')
      filterItem.setAttribute('data-count', target.closest('.languages2').getAttribute('data-count'))
      filterItem.textContent = target.closest('.item').textContent
      let p = document.createElement('p')
      p.classList.add('language-filter-level')
      p.textContent = `: ${lavelValue}`
      filterItem.appendChild(p);
      // добавление иконки "очистить"
      let pic = document.createElement("IMG");
      pic.src = "../responses/img/filter-del.svg";
      pic.classList.add('img-close-choosen')
      filterItem.appendChild(pic);
      // добавление элемента в список выбранных фильтров
      document.querySelector('.choosen-filters__filter-items').append(filterItem)

      pic.onclick = () => {
        let languagesLoadArray = JSON.parse(localStorage.getItem('mainFilter-languages-value'));
        languagesLoadArray.splice(pic.closest('.filter-items__item').getAttribute('data-count'), 1);
        localStorage.setItem('mainFilter-languages-value', JSON.stringify(languagesLoadArray));

        // если удалился последний элемент показывать кнопку добавить еще
        if (addLanguageBtn.classList.contains('hide')) {
          addLanguageBtn.classList.remove('hide');
        }

        document.querySelectorAll('.languages__list2 .languages2').forEach(item => {

          if (pic.closest('.filter-items__item').getAttribute('data-count') == item.getAttribute('data-count')) {
            if (document.querySelectorAll('.language-filter-item').length == 1) {
              item.parentNode.setAttribute('data-count', '0')

              item.parentNode.querySelector('.select-language2 .header2 .item').textContent = 'Выберите язык';
              item.parentNode.querySelector('.select-language2 .header2 .item').setAttribute('data-name', '');
              item.parentNode.querySelector('.select-language2 .header2 .item').setAttribute('data-value', '');
              item.parentNode.querySelector('.select-lavel2 .header2 .item').textContent = 'Выберите уровень';
              item.parentNode.querySelector('.select-lavel2 .header2 .item').setAttribute('data-name', '');
              item.parentNode.querySelector('.select-lavel2 .header2 .item').setAttribute('data-value', '');
              let languagesList = item.parentNode.querySelectorAll('.select-language2 .list2 .item');
              languagesList.forEach(elem => {
                elem.classList.remove('hide');
              })
              item.parentNode.querySelector('.select-lavel2').classList.add('dont-click');
              addLanguageBtn.classList.add('dont-click');

              allLanguage2.length = 0;
              localStorage.removeItem('mainFilter-languages-value')

            } else {
              item.remove()
            }
          }
        })
        setTimeout(() => {
          document.querySelectorAll('.filter-items__item').forEach((item, index) => {
            item.setAttribute('data-count', index)
          })
        }, 10)
      }
    }
    // добавляем уровень языка при выборе
    function addLanguageLevel(target) {
      document.querySelectorAll('.filter-items__item').forEach(item => {
        if (target.closest('.languages2').getAttribute('data-count') == item.getAttribute('data-count')) {
          item.querySelector('.language-filter-level').textContent = ':' + ' ' + target.getAttribute('data-value')
        }
      })

    }

    // выбор языков
    function clickLanguages() {
      // нажатие на селекты вобора языка и выбора уровня языка
      if (target.closest('.header2') && target.closest('.languages__list2')) {
        if (target.closest('.select-language2')) {
          target.closest('.header2').querySelector('.arrow-drop').classList.toggle('rotate-img')
          // если селект языка имеет класс hide 
          if (target.closest('.select-language2').querySelector('.list2_wrapper').classList.contains('hide')) {
            // удалить у открытых списков класс hide
            document.querySelectorAll('.languages__list2 .languages2 .list2_wrapper').forEach(list => {
              if (!(list.classList.contains('hide'))) {
                list.classList.add('hide');
              }
            })
            // открыть тот по которому произошел клик
            target.closest('.select-language2').querySelector('.list2_wrapper').classList.remove('hide');

            // скрывать значения которые уже выбранны
            if (localStorage.getItem('mainFilter-languages-value') != undefined) {
              // let languageList = document.querySelectorAll('.languages__list2 .select-language2 .list2')
              let languageItems = document.querySelectorAll('.languages__list2 .select-language2 .list2 .item')
              let array = JSON.parse(localStorage.getItem('mainFilter-languages-value'));
              let languageName;
              let languageNameArray = [];
              array.forEach(elem => {
                languageName = elem[0].split(':')[0];
                languageNameArray.push(languageName);

                languageItems.forEach(item => {
                  if (languageNameArray.indexOf(item.getAttribute('data-name')) !== -1) {
                    item.classList.add('hide')
                  } else {
                    item.classList.remove('hide')
                  }
                })
              })
            }
          } else {
            target.closest('.select-language2').querySelector('.list2_wrapper').classList.add('hide');
          }
        }
        if (target.closest('.select-lavel2')) {
          target.closest('.header2').querySelector('.arrow-drop').classList.toggle('rotate-img')
          // если селект уровня языка имеет класс hide 
          if (target.closest('.select-lavel2').querySelector('.list2_wrapper').classList.contains('hide')) {
            // удалить у открытых списков класс hide
            document.querySelectorAll('.languages__list2 .languages2 .list2_wrapper').forEach(list => {
              if (!(list.classList.contains('hide'))) {
                list.classList.add('hide');
              }
            })
            // открыть тот по которому произошел клик
            target.closest('.select-lavel2').querySelector('.list2_wrapper').classList.remove('hide');
          } else {
            target.closest('.select-lavel2').querySelector('.list2_wrapper').classList.add('hide');
          }
        }
      } else {
        // удалить у открытых списков класс hide
        document.querySelectorAll('.languages__list2 .languages2 .list2_wrapper').forEach(list => {
          if (!(list.classList.contains('hide'))) {
            list.classList.add('hide');
          }
        })
      }

      // нажатие на элементы из выпадающего списка 
      if (target.closest('.item') && target.closest('.list2') && target.closest('.languages2')) {
        target.parentNode.parentNode.parentNode.querySelector('.header2 .item').textContent = target.closest('.item').textContent;
        target.parentNode.parentNode.parentNode.querySelector('.header2 .item').setAttribute('data-value', target.closest('.item').getAttribute('data-value'));
        target.parentNode.parentNode.parentNode.querySelector('.header2 .item').setAttribute('data-name', target.closest('.item').getAttribute('data-name'));

        // нажатие на элементы списка с языками
        if (target.closest('.select-language2')) {
          let languageItem = target.closest('.select-language2').querySelector('.header2 .item');
          let lavel = target.closest('.languages2').querySelector('.select-lavel2');
          let lavelItem = lavel.querySelector('.header2 .item');
          languageDataCount = target.closest('.languages2').getAttribute('data-count');

          // разблокировать подле для ввода уровня языка и кнопку добавить еще язык
          if (languageItem.getAttribute('data-value') != '') {
            lavel.classList.remove('dont-click');
          } else {
            lavel.classList.add('dont-click');
          }

          // если последний элемент не заполнен, не разблокировать кнопку добавить еще язык
          let lastItem = document.querySelectorAll('.languages__list2 .languages2')[document.querySelectorAll('.languages__list2 .languages2').length - 1]
          if (lastItem.querySelector('.select-language2 .header2 .item').getAttribute('data-value') != '') {
            addLanguageBtn.classList.remove('dont-click');
          }

          languageValue = target.closest('.item').getAttribute('data-value');
          languageName = target.closest('.item').getAttribute('data-name');

          // при выборе языка подтавить уровень по умолчанию
          lavelItem.setAttribute('data-value', 'A1');
          lavelItem.setAttribute('data-name', 'А1 – начальный');
          lavelItem.textContent = 'А1 – начальный';
          lavelValue = lavelItem.getAttribute('data-value');
          lavelName = lavelItem.getAttribute('data-name');

          document.querySelector('.choosen-filters').querySelectorAll('.filter-items__item').forEach(item => {
            if (item.getAttribute('data-count') == target.closest('.languages2').getAttribute('data-count')) {
              item.remove()
            }
          })
          createLanguageFilter()

        }
        // нажатие на элементы с уровнем языков
        if (target.closest('.select-lavel2')) {
          let language = target.closest('.languages2').querySelector('.select-language2 .header2 .item');
          let lavel = target.closest('.languages2').querySelector('.select-lavel2 .header2 .item');

          languageName = language.getAttribute('data-name');
          languageValue = language.getAttribute('data-value');

          lavelValue = lavel.getAttribute('data-value');
          lavelName = lavel.getAttribute('data-name');
          // // запись значений в localStorage
          let value = languageName + ':' + languageValue + ';' + lavelName + ':' + lavelValue;
          allLanguage2[target.closest('.languages2').getAttribute('data-count')] = [value];
          localStorage.setItem('mainFilter-languages-value', JSON.stringify(allLanguage2));
          addLanguageLevel(target)
        }
        // // запись значений в localStorage
        let value = languageName + ':' + languageValue + ';' + lavelName + ':' + lavelValue + ':' + languageDataCount;
        allLanguage2[target.closest('.languages2').getAttribute('data-count')] = [value];
        localStorage.setItem('mainFilter-languages-value', JSON.stringify(allLanguage2));
      }

      // нажатие кнопки добавить еще язык
      if (target == addLanguageBtn) {

        let languageClone = document.querySelector('.languages__list2 .languages2').cloneNode(true);
        languageClone.querySelector('.select-language2 .header2 .item').textContent = 'Выберите язык';
        languageClone.querySelector('.select-language2 .header2 .item').setAttribute('data-name', '');
        languageClone.querySelector('.select-language2 .header2 .item').setAttribute('data-value', '');
        languageClone.querySelector('.select-lavel2 .header2 .item').textContent = 'Выберите уровень';
        languageClone.querySelector('.select-lavel2 .header2 .item').setAttribute('data-name', '');
        languageClone.querySelector('.select-lavel2 .header2 .item').setAttribute('data-value', '');
        languageClone.querySelector('.select-lavel2').classList.add('dont-click');
        target.before(languageClone);
        addLanguageBtn.classList.add('dont-click');

        // скрывать кнопку добавть еще язык если кол-во полей равно кол-ву языков
        let countLanguages = document.querySelectorAll('.languages__list2 .languages2').length;
        let countLanguageValue = document.querySelector('.languages__list2 .languages2 .select-language2 .list2').querySelectorAll('.item').length;
        if (countLanguages !== countLanguageValue) {
          addLanguageBtn.classList.add('dont-click');
        } else {
          addLanguageBtn.classList.add('hide');
        }

        // изменение индекса для поля с языком
        let allLanguagesItem = document.querySelectorAll('.languages__list2 .languages2');
        for (let index = 0; index < allLanguagesItem.length; index++) {
          allLanguagesItem[index].setAttribute('data-count', index);
        }

        // если языков больше одного убирать класс one
        if (allLanguagesItem.length > 1) {
          allLanguagesItem.forEach(elem => {
            elem.classList.remove('one');
          })
        }
      }

      // удаление языка
      if (target.closest('.remove-language2')) {
        let languagesLoadArray = JSON.parse(localStorage.getItem('mainFilter-languages-value'));
        let languagesDataName = target.parentNode.parentNode.querySelector('.select-language2 .header2 .item').getAttribute('data-name');
        let languagesDataValue = target.parentNode.parentNode.querySelector('.select-language2 .header2 .item').getAttribute('data-value');
        let lavelDataName = target.parentNode.parentNode.querySelector('.select-lavel2 .header2 .item').getAttribute('data-name');
        let lavelDataValue = target.parentNode.parentNode.querySelector('.select-lavel2 .header2 .item').getAttribute('data-value');
        let languageDataCount = target.parentNode.parentNode.getAttribute('data-count');
        let languageString = languagesDataName + ":" + languagesDataValue + ";" + lavelDataName + ":" + lavelDataValue + ":" + languageDataCount;
        languagesLoadArray.map(function (event, i) {
          if (event[0] == languageString) {
            languagesLoadArray.splice(i, 1);
          }
        })
        allLanguage2.map(function (event, i) {
          if (event[0] == languageString) {
            allLanguage2.splice(i, 1);
          }
        })
        target.parentNode.parentNode.remove();

        // удаления фильтра языка
        document.querySelectorAll('.choosen-filters__filter-items .language-filter-item').forEach(item => {

          if (target.closest('.languages2').getAttribute('data-count') == item.closest('.filter-items__item').getAttribute('data-count')) {
            item.remove()
          }
        })
        setTimeout(() => {
          document.querySelectorAll('.filter-items__item').forEach((item, index) => {
            item.setAttribute('data-count', index)
          })
        }, 10)

        // если последний элемент не заполнен, не разблокировать кнопку добавить еще язык
        let lastItem = document.querySelectorAll('.languages__list2 .languages2')[document.querySelectorAll('.languages__list2 .languages2').length - 1]
        if (lastItem.querySelector('.select-language2 .header2 .item').getAttribute('data-value') != '') {
          addLanguageBtn.classList.remove('dont-click');
        }

        // если удалился последний элемент показывать кнопку добавить еще
        if (addLanguageBtn.classList.contains('hide')) {
          addLanguageBtn.classList.remove('hide');
        }

        let allLanguagesItem = document.querySelectorAll('.languages__list2 .languages2');
        for (let index = 0; index < allLanguagesItem.length; index++) {
          allLanguagesItem[index].setAttribute('data-count', index);
        }
        // если языков больше одного убирать класс one
        if (allLanguagesItem.length == 1) {
          allLanguagesItem.forEach(elem => {
            elem.classList.add('one');
          })
        }

        localStorage.setItem('mainFilter-languages-value', JSON.stringify(languagesLoadArray));
      }
      // нажатие на сбросить
      if (target.closest('.clear-language2')) {

        target.parentNode.parentNode.setAttribute('data-count', '0')

        target.parentNode.parentNode.querySelector('.select-language2 .header2 .item').textContent = 'Выберите язык';
        target.parentNode.parentNode.querySelector('.select-language2 .header2 .item').setAttribute('data-name', '');
        target.parentNode.parentNode.querySelector('.select-language2 .header2 .item').setAttribute('data-value', '');
        target.parentNode.parentNode.querySelector('.select-lavel2 .header2 .item').textContent = 'Выберите уровень';
        target.parentNode.parentNode.querySelector('.select-lavel2 .header2 .item').setAttribute('data-name', '');
        target.parentNode.parentNode.querySelector('.select-lavel2 .header2 .item').setAttribute('data-value', '');
        let languagesList = target.parentNode.parentNode.querySelectorAll('.select-language2 .list2 .item');
        languagesList.forEach(elem => {
          elem.classList.remove('hide');
        })
        let filtersLanguagesList = document.querySelectorAll('.choosen-filters__filter-items .language-filter-item')
        filtersLanguagesList.forEach(item => {
          item.remove()
        })

        target.parentNode.parentNode.querySelector('.select-lavel2').classList.add('dont-click');
        addLanguageBtn.classList.add('dont-click');

        allLanguage2.length = 0;
        localStorage.removeItem('mainFilter-languages-value')

      }
    }
    clickLanguages();

  });


  // получение данных фильтра "Языки"
  const filterLanguagesLoad = () => {
    if (localStorage.getItem('mainFilter-languages-value') != undefined) {
      allLanguage2 = JSON.parse(localStorage.getItem('mainFilter-languages-value'));
      if (allLanguage2.length != 0) {
        let languageName = allLanguage2[0][0].split(';')[0];
        let lavelName = allLanguage2[0][0].split(';')[1];
        let languageNameArr = languageName.split(':');
        let lavelNameArr = lavelName.split(':');
        let languageItem = document.querySelector('.languages__list2 .languages2');
        languageItem.querySelector('.select-language2 .header2 .item').textContent = languageNameArr[0];
        languageItem.querySelector('.select-language2 .header2 .item').setAttribute('data-name', languageNameArr[0]);
        languageItem.querySelector('.select-language2 .header2 .item').setAttribute('data-value', languageNameArr[1]);
        languageItem.querySelector('.select-lavel2 .header2 .item').textContent = lavelNameArr[0];
        languageItem.querySelector('.select-lavel2 .header2 .item').setAttribute('data-name', lavelNameArr[0]);
        languageItem.querySelector('.select-lavel2 .header2 .item').setAttribute('data-value', lavelNameArr[1]);

        if (languageItem.querySelector('.select-lavel2 .header2 .item').getAttribute('data-name') != '') {
          languageItem.querySelector('.select-lavel2').classList.remove('dont-click')
        }
        // создание элементов в выбранных фильтрах
        for (let index = 0; index < allLanguage2.length; index++) {
          let languageName = allLanguage2[index][0].split(';')[0];
          let lavelName = allLanguage2[index][0].split(';')[1];
          let languageNameArr = languageName.split(':');
          let lavelNameArr = lavelName.split(':');
          let languageDataCount = lavelNameArr[2]

          // создание элемента
          let filterItem = document.createElement('div')
          filterItem.classList.add('filter-items__item')
          filterItem.classList.add('language-filter-item')
          filterItem.setAttribute('data-count', languageDataCount)
          filterItem.textContent = languageNameArr[0]
          let p = document.createElement('p')
          p.classList.add('language-filter-level')
          p.textContent = `: ${lavelNameArr[1]}`
          filterItem.appendChild(p);
          // добавление иконки "очистить"
          let pic = document.createElement("IMG");
          pic.src = "../responses/img/filter-del.svg";
          pic.classList.add('img-close-choosen')
          filterItem.appendChild(pic);
          // добавление элемента в список выбранных фильтров
          document.querySelector('.choosen-filters__filter-items').append(filterItem)

          pic.onclick = () => {
            let languagesLoadArray = JSON.parse(localStorage.getItem('mainFilter-languages-value'));
            languagesLoadArray.splice(pic.closest('.filter-items__item').getAttribute('data-count'), 1);
            localStorage.setItem('mainFilter-languages-value', JSON.stringify(languagesLoadArray));

            // если удалился последний элемент показывать кнопку добавить еще
            if (addLanguageBtn.classList.contains('hide')) {
              addLanguageBtn.classList.remove('hide');
            }

            document.querySelectorAll('.languages__list2 .languages2').forEach(item => {

              if (pic.closest('.filter-items__item').getAttribute('data-count') == item.getAttribute('data-count')) {
                if (document.querySelectorAll('.language-filter-item').length == 1) {
                  item.parentNode.setAttribute('data-count', '0')

                  item.parentNode.querySelector('.select-language2 .header2 .item').textContent = 'Выберите язык';
                  item.parentNode.querySelector('.select-language2 .header2 .item').setAttribute('data-name', '');
                  item.parentNode.querySelector('.select-language2 .header2 .item').setAttribute('data-value', '');
                  item.parentNode.querySelector('.select-lavel2 .header2 .item').textContent = 'Выберите уровень';
                  item.parentNode.querySelector('.select-lavel2 .header2 .item').setAttribute('data-name', '');
                  item.parentNode.querySelector('.select-lavel2 .header2 .item').setAttribute('data-value', '');
                  let languagesList = item.parentNode.querySelectorAll('.select-language2 .list2 .item');
                  languagesList.forEach(elem => {
                    elem.classList.remove('hide');
                  })
                  item.parentNode.querySelector('.select-lavel2').classList.add('dont-click');
                  addLanguageBtn.classList.add('dont-click');

                  allLanguage2.length = 0;
                  localStorage.removeItem('mainFilter-languages-value')

                } else {
                  item.remove()
                }
              }
            })
            setTimeout(() => {
              document.querySelectorAll('.filter-items__item').forEach((item, index) => {
                item.setAttribute('data-count', index)
              })
            }, 10)

          }
        }

        for (let index = 1; index < allLanguage2.length; ++index) {
          let languageName = allLanguage2[index][0].split(';')[0];
          let lavelName = allLanguage2[index][0].split(';')[1];
          let languageNameArr = languageName.split(':');
          let lavelNameArr = lavelName.split(':');


          countLanguage++;
          let languageClone = languageItem.cloneNode(true);
          languageClone.querySelector('.select-language2 .header2 .item').textContent = languageNameArr[0];
          languageClone.querySelector('.select-language2 .header2 .item').setAttribute('data-name', languageNameArr[0]);
          languageClone.querySelector('.select-language2 .header2 .item').setAttribute('data-value', languageNameArr[1]);
          languageClone.querySelector('.select-lavel2 .header2 .item').textContent = lavelNameArr[0];
          languageClone.querySelector('.select-lavel2 .header2 .item').setAttribute('data-name', lavelNameArr[0]);
          languageClone.querySelector('.select-lavel2 .header2 .item').setAttribute('data-value', lavelNameArr[1]);

          if (languageClone.querySelector('.select-lavel2 .header2 .item').getAttribute('data-name') != '') {
            languageClone.querySelector('.select-lavel2').classList.remove('dont-click')
          }
          languageClone.setAttribute('data-count', countLanguage);
          addLanguageBtn.before(languageClone);
        }


        let filterLanguagesItem = document.querySelectorAll('.languages__list2 .languages2');
        if (filterLanguagesItem.length == 1) {
          filterLanguagesItem.forEach(elem => {
            elem.classList.add('one');
          })
        } else if (filterLanguagesItem.length > 1) {
          filterLanguagesItem.forEach(elem => {
            elem.classList.remove('one');
          })
        }

        // скрывать кнопку добавть еще язык если кол-во полей равно кол-ву языков
        let countLanguages = document.querySelectorAll('.languages__list2 .languages2').length;
        let countLanguageValue = document.querySelector('.languages__list2 .languages2 .select-language2 .list2').querySelectorAll('.item').length;
        if (countLanguages !== countLanguageValue) {
          addLanguageBtn.classList.add('dont-click');
        } else {
          addLanguageBtn.classList.add('hide');
        }

        // если последний элемент не заполнен, не разблокировать кнопку добавить еще язык
        let lastItem = document.querySelectorAll('.languages__list2 .languages2')[document.querySelectorAll('.languages__list2 .languages2').length - 1]
        if (lastItem.querySelector('.select-language2 .header2 .item').getAttribute('data-value') != '') {
          addLanguageBtn.classList.remove('dont-click');
        }
      }
    }
  };
  window.addEventListener('load', function load() {
    filterLanguagesLoad();
  }, false);
})