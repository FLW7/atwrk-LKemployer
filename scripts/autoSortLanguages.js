document.addEventListener("DOMContentLoaded", () => {
  let addLanguageBtn = document.querySelector('.languages__list .add-language'),
    allLanguage = [],
    countLanguage = 0,
    languageDataCount,
    languageValue,
    languageName,
    lavelValue,
    lavelName;


  document.addEventListener('click', (event) => {
    if (document.querySelectorAll('.languages__list .languages').length == 1) {
      document.querySelectorAll('.languages__list .languages').forEach(item => {
        item.classList.add('one')
      })
    }
    let allLanguagesItem = document.querySelectorAll('.languages__list .languages');
    for (let index = 0; index < allLanguagesItem.length; index++) {
      allLanguagesItem[index].setAttribute('data-count', index);
    }
    let target = event.target;

    // Создаем элемент в фильтрах с выбранным языком
    function createLanguageFilter() {
      // создание элемента
      let filterItem = document.createElement('div')
      filterItem.classList.add('filter-item')
      filterItem.classList.add('language-autoSort-item')
      filterItem.setAttribute('data-count', target.closest('.languages').getAttribute('data-count'))
      filterItem.textContent = target.closest('.item').textContent
      let p = document.createElement('p')
      p.classList.add('language-autoSort-level')
      p.textContent = `: ${lavelValue}`
      filterItem.appendChild(p);
      // добавление иконки "очистить"
      let pic = document.createElement("IMG");
      pic.src = "./img/filter-del.svg";
      pic.classList.add('img-close-current')
      filterItem.appendChild(pic);
      // добавление элемента в список выбранных фильтров
      document.querySelector('.filter-items').append(filterItem)

      pic.onclick = () => {
        let languagesLoadArray = JSON.parse(localStorage.getItem('autoSort-languages-value'));
        languagesLoadArray.splice(pic.closest('.filter-item').getAttribute('data-count'), 1);
        localStorage.setItem('autoSort-languages-value', JSON.stringify(languagesLoadArray));

        // если удалился последний элемент показывать кнопку добавить еще
        if (addLanguageBtn.classList.contains('hide')) {
          addLanguageBtn.classList.remove('hide');
        }

        document.querySelectorAll('.languages__list .languages').forEach(item => {

          if (pic.closest('.filter-item').getAttribute('data-count') == item.getAttribute('data-count')) {
            if (document.querySelectorAll('.language-autoSort-item').length == 1) {
              item.parentNode.setAttribute('data-count', '0')

              item.parentNode.querySelector('.select-language .header .item').textContent = 'Выберите язык';
              item.parentNode.querySelector('.select-language .header .item').setAttribute('data-name', '');
              item.parentNode.querySelector('.select-language .header .item').setAttribute('data-value', '');
              item.parentNode.querySelector('.select-lavel .header .item').textContent = 'Выберите уровень';
              item.parentNode.querySelector('.select-lavel .header .item').setAttribute('data-name', '');
              item.parentNode.querySelector('.select-lavel .header .item').setAttribute('data-value', '');
              let languagesList = item.parentNode.querySelectorAll('.select-language .list .item');
              languagesList.forEach(elem => {
                elem.classList.remove('hide');
              })
              item.parentNode.querySelector('.select-lavel').classList.add('dont-click');
              addLanguageBtn.classList.add('dont-click');

              allLanguage.length = 0;
              localStorage.removeItem('autoSort-languages-value')

            } else {
              item.remove()
            }
          }
        })
        setTimeout(() => {
          document.querySelectorAll('.filter-item').forEach((item, index) => {
            item.setAttribute('data-count', index)
          })
        }, 10)
      }
    }
    // добавляем уровень языка при выборе
    function addLanguageLevel(target) {
      document.querySelectorAll('.filter-item').forEach(item => {
        if (target.closest('.languages').getAttribute('data-count') == item.getAttribute('data-count')) {
          item.querySelector('.language-autoSort-level').textContent = ':' + ' ' + target.getAttribute('data-value')
        }
      })

    }

    // выбор языков
    function clickLanguages() {
      // нажатие на селекты вобора языка и выбора уровня языка
      if (target.closest('.header') && target.closest('.languages__list')) {
        target.closest('.header').querySelector('.arrow-drop').classList.toggle('rotate-img')
        if (target.closest('.select-language')) {
          // если селект языка имеет класс hide 
          if (target.closest('.select-language').querySelector('.list_wrapper').classList.contains('hide')) {
            // удалить у открытых списков класс hide
            document.querySelectorAll('.languages__list .languages .list_wrapper').forEach(list => {
              if (!(list.classList.contains('hide'))) {
                list.classList.add('hide');
              }
            })
            // открыть тот по которому произошел клик
            target.closest('.select-language').querySelector('.list_wrapper').classList.remove('hide');

            // скрывать значения которые уже выбранны
            if (localStorage.getItem('autoSort-languages-value') != undefined) {
              // let languageList = document.querySelectorAll('.languages__list .select-language .list')
              let languageItems = document.querySelectorAll('.languages__list .select-language .list .item')
              let array = JSON.parse(localStorage.getItem('autoSort-languages-value'));
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
            target.closest('.select-language').querySelector('.list_wrapper').classList.add('hide');
          }
        }
        if (target.closest('.select-lavel')) {
          // если селект уровня языка имеет класс hide 
          if (target.closest('.select-lavel').querySelector('.list_wrapper').classList.contains('hide')) {
            // удалить у открытых списков класс hide
            document.querySelectorAll('.languages__list .languages .list_wrapper').forEach(list => {
              if (!(list.classList.contains('hide'))) {
                list.classList.add('hide');
              }
            })
            // открыть тот по которому произошел клик
            target.closest('.select-lavel').querySelector('.list_wrapper').classList.remove('hide');
          } else {
            target.closest('.select-lavel').querySelector('.list_wrapper').classList.add('hide');
          }
        }
      } else {
        // удалить у открытых списков класс hide
        document.querySelectorAll('.languages__list .languages .list_wrapper').forEach(list => {
          if (!(list.classList.contains('hide'))) {
            list.classList.add('hide');
          }
        })
      }

      // нажатие на элементы из выпадающего списка 
      if (target.closest('.item') && target.closest('.list') && target.closest('.languages')) {
        target.parentNode.parentNode.parentNode.querySelector('.header .item').textContent = target.closest('.item').textContent;
        target.parentNode.parentNode.parentNode.querySelector('.header .item').setAttribute('data-value', target.closest('.item').getAttribute('data-value'));
        target.parentNode.parentNode.parentNode.querySelector('.header .item').setAttribute('data-name', target.closest('.item').getAttribute('data-name'));

        // нажатие на элементы списка с языками
        if (target.closest('.select-language')) {
          let languageItem = target.closest('.select-language').querySelector('.header .item');
          let lavel = target.closest('.languages').querySelector('.select-lavel');
          let lavelItem = lavel.querySelector('.header .item');
          languageDataCount = target.closest('.languages').getAttribute('data-count');

          // разблокировать подле для ввода уровня языка и кнопку добавить еще язык
          if (languageItem.getAttribute('data-value') != '') {
            lavel.classList.remove('dont-click');
          } else {
            lavel.classList.add('dont-click');
          }

          // если последний элемент не заполнен, не разблокировать кнопку добавить еще язык
          let lastItem = document.querySelectorAll('.languages__list .languages')[document.querySelectorAll('.languages__list .languages').length - 1]
          if (lastItem.querySelector('.select-language .header .item').getAttribute('data-value') != '') {
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

          document.querySelector('.current-filters').querySelectorAll('.filter-item').forEach(item => {
            if (item.getAttribute('data-count') == target.closest('.languages').getAttribute('data-count')) {
              item.remove()
            }
          })
          createLanguageFilter()

        }
        // нажатие на элементы с уровнем языков
        if (target.closest('.select-lavel')) {
          let language = target.closest('.languages').querySelector('.select-language .header .item');
          let lavel = target.closest('.languages').querySelector('.select-lavel .header .item');

          languageName = language.getAttribute('data-name');
          languageValue = language.getAttribute('data-value');

          lavelValue = lavel.getAttribute('data-value');
          lavelName = lavel.getAttribute('data-name');
          // // запись значений в localStorage
          let value = languageName + ':' + languageValue + ';' + lavelName + ':' + lavelValue;
          allLanguage[target.closest('.languages').getAttribute('data-count')] = [value];
          localStorage.setItem('autoSort-languages-value', JSON.stringify(allLanguage));
          addLanguageLevel(target)
        }
        // // запись значений в localStorage
        let value = languageName + ':' + languageValue + ';' + lavelName + ':' + lavelValue + ':' + languageDataCount;
        allLanguage[target.closest('.languages').getAttribute('data-count')] = [value];
        localStorage.setItem('autoSort-languages-value', JSON.stringify(allLanguage));
      }

      // нажатие кнопки добавить еще язык
      if (target == addLanguageBtn) {

        let languageClone = document.querySelector('.languages__list .languages').cloneNode(true);
        languageClone.querySelector('.select-language .header .item').textContent = 'Выберите язык';
        languageClone.querySelector('.select-language .header .item').setAttribute('data-name', '');
        languageClone.querySelector('.select-language .header .item').setAttribute('data-value', '');
        languageClone.querySelector('.select-lavel .header .item').textContent = 'Выберите уровень';
        languageClone.querySelector('.select-lavel .header .item').setAttribute('data-name', '');
        languageClone.querySelector('.select-lavel .header .item').setAttribute('data-value', '');
        languageClone.querySelector('.select-lavel').classList.add('dont-click');
        target.before(languageClone);
        addLanguageBtn.classList.add('dont-click');

        // скрывать кнопку добавть еще язык если кол-во полей равно кол-ву языков
        let countLanguages = document.querySelectorAll('.languages__list .languages').length;
        let countLanguageValue = document.querySelector('.languages__list .languages .select-language .list').querySelectorAll('.item').length;
        if (countLanguages !== countLanguageValue) {
          addLanguageBtn.classList.add('dont-click');
        } else {
          addLanguageBtn.classList.add('hide');
        }

        // изменение индекса для поля с языком
        let allLanguagesItem = document.querySelectorAll('.languages__list .languages');
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
      if (target.closest('.remove-language')) {
        let languagesLoadArray = JSON.parse(localStorage.getItem('autoSort-languages-value'));
        let languagesDataName = target.parentNode.parentNode.querySelector('.select-language .header .item').getAttribute('data-name');
        let languagesDataValue = target.parentNode.parentNode.querySelector('.select-language .header .item').getAttribute('data-value');
        let lavelDataName = target.parentNode.parentNode.querySelector('.select-lavel .header .item').getAttribute('data-name');
        let lavelDataValue = target.parentNode.parentNode.querySelector('.select-lavel .header .item').getAttribute('data-value');
        let languageDataCount = target.parentNode.parentNode.getAttribute('data-count');
        let languageString = languagesDataName + ":" + languagesDataValue + ";" + lavelDataName + ":" + lavelDataValue + ":" + languageDataCount;
        languagesLoadArray.map(function (event, i) {
          if (event[0] == languageString) {
            languagesLoadArray.splice(i, 1);
          }
        })
        allLanguage.map(function (event, i) {
          if (event[0] == languageString) {
            allLanguage.splice(i, 1);
          }
        })
        target.parentNode.parentNode.remove();

        // удаления фильтра языка
        document.querySelectorAll('.filter-items .language-autoSort-item').forEach(item => {

          if (target.closest('.languages').getAttribute('data-count') == item.closest('.filter-item').getAttribute('data-count')) {
            item.remove()
          }
        })
        setTimeout(() => {
          document.querySelectorAll('.filter-item').forEach((item, index) => {
            item.setAttribute('data-count', index)
          })
        }, 10)

        // если последний элемент не заполнен, не разблокировать кнопку добавить еще язык
        let lastItem = document.querySelectorAll('.languages__list .languages')[document.querySelectorAll('.languages__list .languages').length - 1]
        if (lastItem.querySelector('.select-language .header .item').getAttribute('data-value') != '') {
          addLanguageBtn.classList.remove('dont-click');
        }

        // если удалился последний элемент показывать кнопку добавить еще
        if (addLanguageBtn.classList.contains('hide')) {
          addLanguageBtn.classList.remove('hide');
        }

        let allLanguagesItem = document.querySelectorAll('.languages__list .languages');
        for (let index = 0; index < allLanguagesItem.length; index++) {
          allLanguagesItem[index].setAttribute('data-count', index);
        }
        // если языков больше одного убирать класс one
        if (allLanguagesItem.length == 1) {
          allLanguagesItem.forEach(elem => {
            elem.classList.add('one');
          })
        }

        localStorage.setItem('autoSort-languages-value', JSON.stringify(languagesLoadArray));
      }
      // нажатие на сбросить
      if (target.closest('.clear-language')) {

        target.parentNode.parentNode.setAttribute('data-count', '0')

        target.parentNode.parentNode.querySelector('.select-language .header .item').textContent = 'Выберите язык';
        target.parentNode.parentNode.querySelector('.select-language .header .item').setAttribute('data-name', '');
        target.parentNode.parentNode.querySelector('.select-language .header .item').setAttribute('data-value', '');
        target.parentNode.parentNode.querySelector('.select-lavel .header .item').textContent = 'Выберите уровень';
        target.parentNode.parentNode.querySelector('.select-lavel .header .item').setAttribute('data-name', '');
        target.parentNode.parentNode.querySelector('.select-lavel .header .item').setAttribute('data-value', '');
        let languagesList = target.parentNode.parentNode.querySelectorAll('.select-language .list .item');
        languagesList.forEach(elem => {
          elem.classList.remove('hide');
        })
        let filtersLanguagesList = document.querySelectorAll('.filter-items .language-autoSort-item')
        filtersLanguagesList.forEach(item => {
          item.remove()
        })

        target.parentNode.parentNode.querySelector('.select-lavel').classList.add('dont-click');
        addLanguageBtn.classList.add('dont-click');

        allLanguage.length = 0;
        localStorage.removeItem('autoSort-languages-value')

      }
    }
    clickLanguages();

  });


  // получение данных фильтра "Языки"
  const filterLanguagesLoad = () => {
    if (localStorage.getItem('autoSort-languages-value') != undefined) {
      allLanguage = JSON.parse(localStorage.getItem('autoSort-languages-value'));
      if (allLanguage.length != 0) {
        let languageName = allLanguage[0][0].split(';')[0];
        let lavelName = allLanguage[0][0].split(';')[1];
        let languageNameArr = languageName.split(':');
        let lavelNameArr = lavelName.split(':');
        let languageItem = document.querySelector('.languages__list .languages');
        languageItem.querySelector('.select-language .header .item').textContent = languageNameArr[0];
        languageItem.querySelector('.select-language .header .item').setAttribute('data-name', languageNameArr[0]);
        languageItem.querySelector('.select-language .header .item').setAttribute('data-value', languageNameArr[1]);
        languageItem.querySelector('.select-lavel .header .item').textContent = lavelNameArr[0];
        languageItem.querySelector('.select-lavel .header .item').setAttribute('data-name', lavelNameArr[0]);
        languageItem.querySelector('.select-lavel .header .item').setAttribute('data-value', lavelNameArr[1]);

        if (languageItem.querySelector('.select-lavel .header .item').getAttribute('data-name') != '') {
          languageItem.querySelector('.select-lavel').classList.remove('dont-click')
        }
        // создание элементов в выбранных фильтрах
        for (let index = 0; index < allLanguage.length; index++) {
          let languageName = allLanguage[index][0].split(';')[0];
          let lavelName = allLanguage[index][0].split(';')[1];
          let languageNameArr = languageName.split(':');
          let lavelNameArr = lavelName.split(':');
          let languageDataCount = lavelNameArr[2]

          // создание элемента
          let filterItem = document.createElement('div')
          filterItem.classList.add('filter-item')
          filterItem.classList.add('language-autoSort-item')
          filterItem.setAttribute('data-count', languageDataCount)
          filterItem.textContent = languageNameArr[0]
          let p = document.createElement('p')
          p.classList.add('language-autoSort-level')
          p.textContent = `: ${lavelNameArr[1]}`
          filterItem.appendChild(p);
          // добавление иконки "очистить"
          let pic = document.createElement("IMG");
          pic.src = "./img/filter-del.svg";
          pic.classList.add('img-close-current')
          filterItem.appendChild(pic);
          // добавление элемента в список выбранных фильтров
          document.querySelector('.filter-items').append(filterItem)

          pic.onclick = () => {
            let languagesLoadArray = JSON.parse(localStorage.getItem('autoSort-languages-value'));
            languagesLoadArray.splice(pic.closest('.filter-item').getAttribute('data-count'), 1);
            localStorage.setItem('autoSort-languages-value', JSON.stringify(languagesLoadArray));

            // если удалился последний элемент показывать кнопку добавить еще
            if (addLanguageBtn.classList.contains('hide')) {
              addLanguageBtn.classList.remove('hide');
            }

            document.querySelectorAll('.languages__list .languages').forEach(item => {

              if (pic.closest('.filter-item').getAttribute('data-count') == item.getAttribute('data-count')) {
                if (document.querySelectorAll('.language-autoSort-item').length == 1) {
                  item.parentNode.setAttribute('data-count', '0')

                  item.parentNode.querySelector('.select-language .header .item').textContent = 'Выберите язык';
                  item.parentNode.querySelector('.select-language .header .item').setAttribute('data-name', '');
                  item.parentNode.querySelector('.select-language .header .item').setAttribute('data-value', '');
                  item.parentNode.querySelector('.select-lavel .header .item').textContent = 'Выберите уровень';
                  item.parentNode.querySelector('.select-lavel .header .item').setAttribute('data-name', '');
                  item.parentNode.querySelector('.select-lavel .header .item').setAttribute('data-value', '');
                  let languagesList = item.parentNode.querySelectorAll('.select-language .list .item');
                  languagesList.forEach(elem => {
                    elem.classList.remove('hide');
                  })
                  item.parentNode.querySelector('.select-lavel').classList.add('dont-click');
                  addLanguageBtn.classList.add('dont-click');

                  allLanguage.length = 0;
                  localStorage.removeItem('autoSort-languages-value')

                } else {
                  item.remove()
                }
              }
            })
            setTimeout(() => {
              document.querySelectorAll('.filter-item').forEach((item, index) => {
                item.setAttribute('data-count', index)
              })
            }, 10)

          }
        }

        for (let index = 1; index < allLanguage.length; ++index) {
          let languageName = allLanguage[index][0].split(';')[0];
          let lavelName = allLanguage[index][0].split(';')[1];
          let languageNameArr = languageName.split(':');
          let lavelNameArr = lavelName.split(':');


          countLanguage++;
          let languageClone = languageItem.cloneNode(true);
          languageClone.querySelector('.select-language .header .item').textContent = languageNameArr[0];
          languageClone.querySelector('.select-language .header .item').setAttribute('data-name', languageNameArr[0]);
          languageClone.querySelector('.select-language .header .item').setAttribute('data-value', languageNameArr[1]);
          languageClone.querySelector('.select-lavel .header .item').textContent = lavelNameArr[0];
          languageClone.querySelector('.select-lavel .header .item').setAttribute('data-name', lavelNameArr[0]);
          languageClone.querySelector('.select-lavel .header .item').setAttribute('data-value', lavelNameArr[1]);

          if (languageClone.querySelector('.select-lavel .header .item').getAttribute('data-name') != '') {
            languageClone.querySelector('.select-lavel').classList.remove('dont-click')
          }
          languageClone.setAttribute('data-count', countLanguage);
          addLanguageBtn.before(languageClone);
        }


        let filterLanguagesItem = document.querySelectorAll('.languages__list .languages');
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
        let countLanguages = document.querySelectorAll('.languages__list .languages').length;
        let countLanguageValue = document.querySelector('.languages__list .languages .select-language .list').querySelectorAll('.item').length;
        if (countLanguages !== countLanguageValue) {
          addLanguageBtn.classList.add('dont-click');
        } else {
          addLanguageBtn.classList.add('hide');
        }

        // если последний элемент не заполнен, не разблокировать кнопку добавить еще язык
        let lastItem = document.querySelectorAll('.languages__list .languages')[document.querySelectorAll('.languages__list .languages').length - 1]
        if (lastItem.querySelector('.select-language .header .item').getAttribute('data-value') != '') {
          addLanguageBtn.classList.remove('dont-click');
        }
      }
    }
  };
  window.addEventListener('load', function load() {
    filterLanguagesLoad();
  }, false);
})
