document.addEventListener("DOMContentLoaded", () => {

  const sortAdditToggle = document.querySelector('.addit__header')
  const sortAdditModal = document.querySelector('.addit__modal')

  const varIcon = document.querySelector('.var-icon')
  const varWrapper = document.querySelector('.var-massage-wrapper')
  const varStatusIcon = document.querySelector('.var-status-icon')
  const varStatusWrapper = document.querySelector('.var-status-reject')
  const rejectMassage = document.querySelector('.reject-massage')
  const rejectMassageToggle = document.querySelector('#add-reject-massage')

  const sexBtn = document.querySelector('.sex-btn')
  const sexModal = document.querySelector('.sex-modal-wrapper')
  const sexItems = sexModal.querySelectorAll('li')

  const autoSortBtn = document.querySelector('.auto-sort-btn')
  const autoSortDone = document.querySelector('.auto-sort-done')
  const autoSortModalWrapper = document.querySelector('.auto-sort-wrapper')
  const autoSortModal = document.querySelector('.auto-sort')

  const checkList = document.querySelector('.auto-sort__checks').querySelectorAll('.auto-sort__check')

  // вырезаем значение из куки при клике на крестик выбранного элемента
  function spliceFormatWork(check) {
    if (readCookie('autoSort-format-work') != undefined) {
      let checkValue = check.getAttribute('data-value');
      // вырезаем совпавщий эллемент из куки
      arrayFormatWork = readCookie('autoSort-format-work').split(',');
      let arrayElem = arrayFormatWork.indexOf(checkValue)
      arrayFormatWork.splice(arrayElem, 1)
      writeCookie('autoSort-format-work', arrayFormatWork, 30)
    }
  }
  function spliceExperience(check, closeItem) {
    if (readCookie('autoSort-experience') != undefined) {
      let checkValue = check.getAttribute('data-value');
      // вырезаем совпавщий эллемент из куки
      arrayExperience = readCookie('autoSort-experience').split(',');
      let arrayElem = arrayExperience.indexOf(checkValue)
      arrayExperience.splice(arrayElem, 1)

      writeCookie('autoSort-experience', arrayExperience, 30)

      // снимаем с вырезанного элемента чекбокс
      if (closeItem.closest('.filter-item').textContent == check.querySelector('p').textContent) {
        check.querySelector('input').checked = false
      }
    }
  }
  // удаляем фильтр пола
  function sexFilterRemove() {
    document.querySelectorAll('.sex-item-clear').forEach((item) => {
      item.onclick = (event) => {
        delete_cookie('autoSortSex')
        event.target.closest('.sex-item').remove()
        sexBtn.textContent = 'Не имеет значения';
        filterCounter--
      }
    })
  }

  // открытие и закрытие автосортировки
  autoSortBtn.onclick = () => {
    autoSortModalWrapper.classList.toggle('active')
  }
  autoSortDone.onclick = () => {
    autoSortModalWrapper.classList.toggle('active')
  }
  document.addEventListener('click', function (event) {
    const target = event.target;
    const its_btn = target == autoSortBtn
    const its_modal = target == autoSortModal || autoSortModal.contains(target);
    const is_active = autoSortModalWrapper.classList.contains('active')
    const close_choosen_icon = target.classList.contains('img-close-current')
    const del_language_item = target.classList.contains('remove-language')
    const del_sex_item = target.classList.contains('sex-item-clear')

    if (!its_btn && !its_modal && is_active && !close_choosen_icon && !del_language_item && !del_sex_item) {
      autoSortModalWrapper.classList.toggle('active')
    }
  })


  // появление и скрытие кнопки "очистить фильтр" если filterCounter больше нуля
  // document.addEventListener('click', function () {
  //   if (filterCounter > 0) {
  //     document.querySelector('.filters-clear').classList.remove('closed')
  //   } else {
  //     document.querySelector('.filters-clear').classList.add('closed')

  //     
  //   }
  // })

  // ===================ПОЛ==========================
  sexBtn.onclick = () => {
    sexModal.classList.toggle('closed')
    sexBtn.classList.toggle('rotate-after');
  }
  // закрытие
  document.addEventListener('click', function (event) {
    const target = event.target
    const its_sexBtn = target == sexBtn;
    const its_sexModal = target == sexModal || sexModal.contains(target);
    const sexModal_active = sexModal.classList.contains('closed');

    if (!its_sexBtn && !its_sexModal && !sexModal_active) {
      sexModal.classList.toggle('closed')
    }
  })

  // создаем блок в выбранных фильтрах
  sexModal.onclick = (e) => {
    // удаляемы ранее созданный блок 
    let sexFilterRemove = function () {
      let sexItems = document.querySelectorAll('.sex-item')
      sexItems.forEach(element => {
        element.remove()
        filterCounter--
      });
    }
    // создаем новый
    let sexFilterAdd = function () {
      document.querySelector('.filter-items').insertAdjacentHTML('beforeend', `
        <div class = "filter-item sex-item">
          ${target.textContent}
          <img class = "sex-item-clear" src="./img/filter-del.svg" alt="">
        </div>
        `)
      writeCookie('autoSortSex', `${target.textContent}`, 30)
      filterCounter++
    }
    // при клике на пункт устанавливаем кнопке текст пункта и скрываем попап пола
    const target = e.target;
    const sexItem = [].slice.call(sexItems);
    sexItem.forEach(function (event) {
      if (target.textContent == event.textContent) {
        sexFilterRemove()
        if (target != sexItems[0]) {
          sexFilterAdd()
        } else {
          delete_cookie('autoSortSex')
        }
        sexBtn.textContent = event.textContent;
        sexModal.classList.toggle('closed')
      }
    });
  }
  // при клике на "крестик" пола
  document.addEventListener('click', function () {
    sexFilterRemove()
  })

  // вывод значений пола из куки
  window.addEventListener('load', function load() {
    if (readCookie('autoSortSex') != undefined) {
      sexBtn.textContent = readCookie('autoSortSex')
      document.querySelector('.filter-items').insertAdjacentHTML('beforeend', `
        <div class = "filter-item sex-item">
          ${readCookie('autoSortSex')}
          <img class = "sex-item-clear" src="./img/filter-del.svg" alt="">
        </div>
        `)
      filterCounter++
    }
  }, false)
  // ================================================

  // открытие и закрытие окна "дополнительные фильтры"
  sortAdditToggle.onclick = () => {
    sortAdditModal.classList.toggle('closed')
    document.querySelector('.drop-arrow').classList.toggle('rotate-img');
  }
  // Var massages при наведении
  varIcon.onmouseover = () => {
    varWrapper.classList.remove('closed')
  }
  varIcon.onmouseout = () => {
    varWrapper.classList.add('closed')
  }
  varStatusIcon.onmouseover = () => {
    varStatusWrapper.classList.remove('closed')
  }
  varStatusIcon.onmouseout = () => {
    varStatusWrapper.classList.add('closed')
  }
  // открытие и зкртытие инпута с письмом отказа
  rejectMassageToggle.onchange = () => {
    if (rejectMassageToggle.checked) {
      document.querySelector('.notification__applicant-textarea').classList.remove('dont-click')
    } else {
      document.querySelector('.notification__applicant-textarea').classList.add('dont-click')
    }
  }

  // удаление при клике на крестик
  document.addEventListener('click', function (e) {
    let target = e.target
    let closeItems = document.querySelectorAll('.img-close-current');
    // проходимся по всем иконкам
    closeItems.forEach(function (closeItem) {
      if (target == closeItem) {
        // удаляем элемент в котором нажали на иконку
        closeItem.closest('.filter-item').remove()
        // проходимся по всем полям с чекбоксами
        checkList.forEach((checks) => {
          let checkLi = checks.querySelectorAll('label')
          // проходимся по всем чекбоксам
          checkLi.forEach(function (check) {
            // сравниваем элемент на который нажали с чекбоксами
            if (closeItem.closest('.filter-item').textContent == check.querySelector('p').textContent) {
              check.querySelector('input').checked = false
              // ДЛЯ ФОРМАТА РАБОТЫ
              if (target.closest('.sort-format-work') != null) {
                spliceFormatWork(check, closeItem)
              }

              // ДЛЯ ОПЫТА РАБОТЫ
              if (target.closest('.sort-experience') != null) {
                spliceExperience(check, closeItem)
              }

            }
          })
        })
        filterCounter--
        if (filterCounter > 0) {
          // document.querySelector('.filters-clear').classList.remove('closed')
        } else {
          // document.querySelector('.filters-clear').classList.add('closed')
        }
      }
    })
  })
})
