document.addEventListener("DOMContentLoaded", () => {
  const mainFilterBtn = document.querySelector('.filter-control')
  const mainFilterModal = document.querySelector('.filter-block')

  const currFilterList = document.querySelector('.choosen-filters__filter-items')
  const citizenshipList = document.querySelector('.citizenship__filter-list_wrapper')
  const citizenshipBtn = document.querySelector('.citizenship__dropdown_btn')

  const checksList = document.querySelectorAll('.checks__list')

  const sexModal = document.querySelector('.filters__sex')
  const sexItems = sexModal.querySelectorAll('.item')

  const regionDropdownBtn = document.querySelector('.region__dropdown_btn')
  const regionDropdown = document.querySelector('.region__dropdown-modal_wrapper')
  const regionDropdownList = document.querySelector('.region__dropdown-list')
  const regionItems = regionDropdownList.querySelectorAll('.item')

  // открытие\закрытие окна фильтров
  mainFilterBtn.onclick = () => {
    document.querySelector('.filter-btn').classList.toggle('active')
    mainFilterModal.classList.toggle('active')
    document.querySelector('.filters').classList.toggle('active')
  }


  // появление и скрытие кнопки "очистить фильтр" если filterCounter больше нуля
  // document.addEventListener('click', function () {
  //   if (mainFilterCounter > 0) {
  //     document.querySelector('.mainFilters-clear').classList.remove('closed')
  //   } else {
  //     document.querySelector('.mainFilters-clear').classList.add('closed')
  //   }
  // })
  // window.addEventListener('load', function () {
  //   if (readCookie('filter-sex') != undefined) {
  //     mainFilterCounter++
  //   }
  //   if (readCookie('wageFilterFrom') != undefined) {
  //     mainFilterCounter += 0.5
  //   }
  //   if (readCookie('wageFilterTo') != undefined) {
  //     mainFilterCounter += 0.5
  //   }

  //   if (mainFilterCounter > 0) {
  //     document.querySelector('.mainFilters-clear').classList.remove('closed')
  //   } else {
  //     document.querySelector('.mainFilters-clear').classList.add('closed')
  //   }
  // })
  // Удаление при клике на крестик выбранных фильтров
  function closeFilterItem(target) {
    let closeItems = document.querySelectorAll('.img-close-choosen');
    // проходимся по всем иконкам
    closeItems.forEach(function (closeItem) {
      if (target == closeItem) {
        currFilterList.querySelectorAll('.filter-items__item').forEach((item) => {
          if (closeItem.closest('.filter-items__item').textContent == item.textContent) {
            item.remove()
            // удаление значение из localstorage
            popupRegionArr.forEach(elemArr => {
              if (elemArr == target.parentNode.textContent) {
                popupRegionArr.splice((popupRegionArr.indexOf(elemArr)), 1);
                localStorage.setItem('region-value', JSON.stringify(popupRegionArr));
              }
            })
            mainFilterCounter--

            // if (mainFilterCounter > 0) {
            //   document.querySelector('.mainFilters-clear').classList.remove('closed')
            // } else {
            //   document.querySelector('.mainFilter-clear').classList.add('closed')
            // }
          }
        })
        // проходимся по всем полям с чекбоксами
        checksList.forEach((checks) => {
          let checkLi = checks.querySelectorAll('label')
          // проходимся по всем чекбоксам
          checkLi.forEach(function (check) {
            // сравниваем элемент на который нажали с чекбоксами
            if (closeItem.closest('.filter-items__item').textContent == check.querySelector('p').textContent) {

              // ДЛЯ ФОРМАТА РАБОТЫ
              if (target.closest('.mainFilter-citizenship') != null) {
                spliceCitizenship(check, closeItem)
              }

              // ДЛЯ ОПЫТА РАБОТЫ
              if (target.closest('.mainFilter-experience') != null) {
                spliceExperience(check, closeItem)
              }

              // ДЛЯ АВТО И КАТЕГОРИИ ПРАВ
              if (target.closest('.mainFilter-driver') != null) {
                spliceDriverLicense(check, closeItem)
              }
            }
          })
        })

      }
    })
  }

  // удаление фильтра пола
  function sexFilterRemove() {
    document.querySelectorAll('.mainFilter-sex-item-clear').forEach((item) => {
      item.onclick = (event) => {
        delete_cookie('filter-sex')
        event.target.closest('.sex-item').remove()
        sexModal.querySelectorAll('.item').forEach((elem) => {
          sexItems[0].querySelector('input').checked = true
        })
        mainFilterCounter--
      }
    })
  }
  // удаление фильтра региона
  function regionFilterRemove() {
    document.querySelectorAll('.mainFilter-region-item-clear').forEach((item) => {
      item.onclick = (event) => {
        delete_cookie('filter-region')
        event.target.closest('.region-item').remove()
        document.querySelector('.region__dropdown_btn').textContent = regionItems[0].textContent
        regionDropdownList.querySelectorAll('.item').forEach((elem) => {
          regionItems[0].querySelector('input').checked = true
        })
        mainFilterCounter--
      }
    })
  }




  // ===================ПОЛ==========================
  // создаем блок в выбранных фильтрах
  sexModal.onclick = (e) => {
    // удаляемы ранее созданный блок 
    let sexFilterRemove = function () {
      let sexItems = document.querySelector('.choosen-filters__filter-items').querySelectorAll('.sex-item')
      sexItems.forEach(element => {
        element.remove()
        mainFilterCounter--
      });
    }
    // создаем новый
    let sexFilterAdd = function (event) {
      document.querySelector('.choosen-filters__filter-items').insertAdjacentHTML('beforeend', `
          <div class = "filter-items__item sex-item">
            ${event.querySelector('p').textContent}
            <img class = "mainFilter-sex-item-clear" src="./img/filter-del.svg" alt="">
          </div>
          `)
      writeCookie('filter-sex', `${event.querySelector('p').textContent}`, 30)
      mainFilterCounter++
    }

    // при клике на пункт устанавливаем кнопке текст пункта и скрываем попап пола
    const target = e.target;
    const sexItem = [].slice.call(sexItems);
    sexItem.forEach(function (event) {
      if (target.closest('.item') != null) {
        if (target.closest('.item').querySelector('p').textContent == event.querySelector('p').textContent) {
          sexFilterRemove()
          if (target.closest('.item') != sexItems[0]) {
            sexFilterAdd(event)
          } else {
            delete_cookie('filter-sex')
          }
        }
      }
    });
  }
  // удаление фильтра пола при клике на крестик
  document.addEventListener('click', function () {
    sexFilterRemove()
  })
  // вывод значений пола из куки
  window.addEventListener('load', function load() {
    if (readCookie('filter-sex') != undefined) {
      document.querySelectorAll('.filters__sex .item').forEach((item) => {
        if (readCookie('filter-sex') == item.querySelector('p').textContent) {
          item.querySelector('input').checked = true
        }
      })
      document.querySelector('.choosen-filters__filter-items').insertAdjacentHTML('beforeend', `
        <div class = "filter-items__item sex-item">
          ${readCookie('filter-sex')}
          <img class = "mainFilter-sex-item-clear" src="./img/filter-del.svg" alt="">
        </div>
        `)
    } else {
      sexItems[0].querySelector('input').checked = true
    }
  }, false)

  // РЕГИОН
  regionDropdownBtn.onclick = () => {
    regionDropdown.classList.toggle('closed')
    regionDropdownBtn.classList.toggle('rotate-after')
  }
  document.addEventListener('click', function (e) {
    let target = e.target
    let its_btn = target == regionDropdownBtn;
    let its_regionDropdown = target == regionDropdown || regionDropdown.contains(target)
    let its_its_regionDropdownList = target == regionDropdownList || regionDropdownList.contains(target)
    let is_active = regionDropdown.classList.contains('closed')
    if (!its_btn && !its_regionDropdown && !its_its_regionDropdownList && !is_active) {
      regionDropdown.classList.toggle('closed')
    }
  })

  // ===================РЕГИОН==========================
  // создаем блок в выбранных фильтрах
  regionDropdownList.onclick = (e) => {
    // удаляемы ранее созданный блок 
    let regionFilterRemove = function () {
      let regionItems = document.querySelector('.choosen-filters__filter-items').querySelectorAll('.region-item')
      regionItems.forEach(element => {
        element.remove()
        mainFilterCounter--
      });
    }
    // создаем новый
    let regionFilterAdd = function (event) {
      document.querySelector('.choosen-filters__filter-items').insertAdjacentHTML('beforeend', `
          <div class = "filter-items__item region-item">
            ${event.querySelector('p').textContent}
            <img class = "mainFilter-region-item-clear" src="./img/filter-del.svg" alt="">
          </div>
          `)
      writeCookie('filter-region', `${event.querySelector('p').textContent}`, 30)
      mainFilterCounter++
    }

    // при клике на пункт устанавливаем кнопке текст пункта и скрываем попап региона
    const target = e.target;
    const regionItem = [].slice.call(regionItems);
    regionItem.forEach(function (event) {
      if (target.closest('.item') != null) {
        if (target.closest('.item').querySelector('p').textContent == event.querySelector('p').textContent) {
          regionDropdownBtn.textContent = event.querySelector('p').textContent
          regionFilterRemove()
          if (target.closest('.item') != regionItems[0]) {
            regionFilterAdd(event)
          } else {
            delete_cookie('filter-region')
          }
        }
      }
    });
  }
  // удаление фильтра региона при клике на крестик
  document.addEventListener('click', function () {
    regionFilterRemove()
  })
  // вывод значений региона из куки
  window.addEventListener('load', function load() {
    if (readCookie('filter-region') != undefined) {
      document.querySelectorAll('.region__dropdown-list .item').forEach((item) => {
        if (readCookie('filter-region') == item.querySelector('p').textContent) {
          item.querySelector('input').checked = true
          regionDropdownBtn.textContent = readCookie('filter-region')
        }
      })
      document.querySelector('.choosen-filters__filter-items').insertAdjacentHTML('beforeend', `
        <div class = "filter-items__item region-item">
          ${readCookie('filter-region')}
          <img class = "mainFilter-region-item-clear" src="./img/filter-del.svg" alt="">
        </div>
        `)
    } else {
      regionItems[0].querySelector('input').checked = true
    }
  }, false)


  // ГРАЖДАНСТВО
  // открытие попапа
  citizenshipBtn.onclick = () => {
    citizenshipList.classList.toggle('closed')
    citizenshipBtn.classList.toggle('rotate-after')
  }
  // закрытие попапа
  document.addEventListener('click', function (e) {
    let target = e.target
    const its_btn = target == citizenshipBtn
    const its_popup = target == citizenshipList || citizenshipList.contains(target)
    const is_active = citizenshipList.classList.contains('closed')

    if (!its_btn && !its_popup && !is_active) {
      citizenshipList.classList.toggle('closed')
    }
  })

  // АВТО И КАТЕГОРИИ ПРАВ
  document.querySelector('.driver-show-more').onclick = () => {
    document.querySelector('.driver-license__filter-hidden').classList.toggle('closed')
    if (document.querySelector('.driver-license__filter-hidden').classList.contains('closed')) {
      document.querySelector('.driver-show-more').textContent = 'Ещё 10'
    } else {
      document.querySelector('.driver-show-more').textContent = 'Скрыть'
    }
  }

  // удаление при клике на крестик
  document.addEventListener('click', function (e) {
    let target = e.target
    closeFilterItem(target)
  })

  // вырезаем значение из куки при клике на крестик выбранного элемента
  function spliceCitizenship(check, closeItem) {
    if (readCookie('filter-citizenship') != undefined) {
      let checkValue = check.getAttribute('data-value');
      // вырезаем совпавщий эллемент из куки
      let arrayCitizenship = readCookie('filter-citizenship').split(',');
      let arrayElem = arrayCitizenship.indexOf(checkValue)
      arrayCitizenship.splice(arrayElem, 1)
      writeCookie('filter-citizenship', arrayCitizenship, 30)
      // снимаем с вырезанного элемента чекбокс
      if (closeItem.closest('.filter-items__item').textContent == check.querySelector('p').textContent) {
        check.querySelector('input').checked = false
        check.closest('.item').classList.remove('active')
      }
    }
  }
  function spliceExperience(check, closeItem) {
    if (readCookie('filter-experience') != undefined) {
      let checkValue = check.getAttribute('data-value');
      // вырезаем совпавщий эллемент из куки
      let arrayExperience = readCookie('filter-experience').split(',');
      let arrayElem = arrayExperience.indexOf(checkValue)
      arrayExperience.splice(arrayElem, 1)
      writeCookie('filter-experience', arrayExperience, 30)
      // снимаем с вырезанного элемента чекбокс
      if (closeItem.closest('.filter-items__item').textContent == check.querySelector('p').textContent) {
        check.querySelector('input').checked = false
      }
    }
  }
  function spliceDriverLicense(check, closeItem) {
    if (readCookie('filter-driverLicense') != undefined) {
      let checkValue = check.getAttribute('data-value');
      // вырезаем совпавщий эллемент из куки
      let arrayDriverLicense = readCookie('filter-driverLicense').split(',');
      let arrayElem = arrayDriverLicense.indexOf(checkValue)
      arrayDriverLicense.splice(arrayElem, 1)
      writeCookie('filter-driverLicense', arrayDriverLicense, 30)
      // снимаем с вырезанного элемента чекбокс
      if (closeItem.closest('.filter-items__item').textContent == check.querySelector('p').textContent) {
        check.querySelector('input').checked = false
      }
    }
  }

})
