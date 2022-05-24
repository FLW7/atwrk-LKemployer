document.addEventListener("DOMContentLoaded", () => {
  const controlBtns = document.querySelectorAll('.control-btn')
  const controlLists = document.querySelectorAll('.control-list')

  const sexModal = document.querySelector('.sex-modal-control')
  const ageModal = document.querySelector('.age-modal')
  const sortModal = document.querySelector('.sort-modal')
  const typeinvModal = document.querySelector('.typeinv-modal')
  const viewModal = document.querySelector('.view-modal')

  // открытие при кликах на кнопки
  controlBtns.forEach(function (controlBtn) {
    controlBtn.onclick = (e) => {
      const target = e.target;
      if (target.closest('.control') != null) {
        if (target.closest('.control').querySelector('.control-modal') != null) {
          let controlModal = target.closest('.control').querySelector('.control-modal')
          controlModal.classList.toggle('closed')
        }
      }
    }
  })

  // добавление класса active-li к выбранному элементу модального окна
  controlLists.forEach(function (controlList) {
    controlList.onclick = (e) => {
      const target = e.target;
      let li = controlList.querySelectorAll('li')
      li.forEach(function (event) {
        if (target.textContent == event.textContent) {
          event.classList.add('active-li');
          target.closest('.control').querySelector('.control-btn').textContent = event.textContent;
          let modals = target.closest('.control').querySelectorAll('.control-modal')
          modals.forEach(function (modal) {
            modal.classList.add('closed')
          })
        } else {
          event.classList.remove('active-li')
        }
      })
    }
  })

  // закрытие модальных окон
  // sex modal
  // document.addEventListener('click', function (event) {
  //   const target = event.target;
  //   const its_btn = target == document.querySelector('.sex-btn-control')
  //   const its_modal = target == sexModal || sexModal.contains(target);
  //   const is_active = sexModal.classList.contains('closed')

  //   if (!its_btn && !its_modal && !is_active) {
  //     sexModal.classList.toggle('closed')
  //   }
  // })
  // age modal
  // document.addEventListener('click', function (event) {
  //   const target = event.target;
  //   const its_btn = target == document.querySelector('.age-btn')
  //   const its_modal = target == ageModal || ageModal.contains(target);
  //   const is_active = ageModal.classList.contains('closed')

  //   if (!its_btn && !its_modal && !is_active) {
  //     ageModal.classList.toggle('closed')
  //   }
  // })
  // sort modal
  document.addEventListener('click', function (event) {
    const target = event.target;
    const its_btn = target == document.querySelector('.sort-btn')
    const its_modal = target == sortModal || sortModal.contains(target);
    const is_active = sortModal.classList.contains('closed')

    if (!its_btn && !its_modal && !is_active) {
      sortModal.classList.toggle('closed')
    }
  })
  // typeinv moodal
  document.addEventListener('click', function (event) {
    const target = event.target;
    const its_btn = target == document.querySelector('.typeinv-btn')
    const its_modal = target == typeinvModal || typeinvModal.contains(target);
    const is_active = typeinvModal.classList.contains('closed')

    if (!its_btn && !its_modal && !is_active) {
      typeinvModal.classList.toggle('closed')
    }
  })
  // view moodal
  document.addEventListener('click', function (event) {
    // закрытие
    const target = event.target;
    const its_btn = target == document.querySelector('.view-control-btn')
    const its_modal = target == viewModal || viewModal.contains(target);
    const is_active = viewModal.classList.contains('closed')

    if (!its_btn && !its_modal && !is_active) {
      viewModal.classList.toggle('closed')
    }

    // чекбоксы и пункты в отклике
    let checkboxes = document.querySelector('.view-list').querySelectorAll('.item')
    checkboxes.forEach((item) => {
      item.onclick = () => {
        let curr_atr = item.querySelector('input').getAttribute('data-value')
        let cards = document.querySelectorAll('.response-card')
        cards.forEach((card) => {
          if (item.querySelector('input').checked == true) {
            card.querySelector(`.${curr_atr}`).classList.remove('closed')
          } else {
            card.querySelector(`.${curr_atr}`).classList.add('closed')
          }
        })
      }
    })
    document.querySelector('.view-cancel').onclick = () => {
      checkboxes.forEach((item) => {
        let curr_atr = item.querySelector('input').getAttribute('data-value')
        let cards = document.querySelectorAll('.response-card')
        if (item.classList.contains('not-def')) {
          item.querySelector('input').checked = false
          cards.forEach((card) => {
            if (item.querySelector('input').checked == false) {
              card.querySelector(`.${curr_atr}`).classList.add('closed')
            } else {
              card.querySelector(`.${curr_atr}`).classList.remove('closed')
            }
          })
        } else {
          item.querySelector('input').checked = true
          cards.forEach((card) => {
            card.querySelector(`.${curr_atr}`).classList.remove('closed')
          })
        }
      })
    }
  })

  document.querySelector('.view-done').onclick = () => {
    document.querySelector('.view-modal').classList.add('closed')
  }

  // открытие и зкартытие input'а
  document.addEventListener('click', function (e) {
    let target = e.target;
    if (target == document.querySelector('.input-btn')) {
      target.closest('.input-control').classList.toggle('input-btn-active')
      target.closest('.input-control').querySelector('input').classList.toggle('closed')
    }
  })

  // смена текста и икноки при клике item в typeinvModal
  typeinvModal.onclick = (e) => {
    const target = e.target;
    let item = typeinvModal.querySelectorAll('.typeinv-item')
    item.forEach(function (event) {
      if (target.textContent == event.textContent) {
        let controlBtn = target.closest('.control').querySelector('.control-btn')

        let controlBtnImg = controlBtn.querySelector('img')
        // замена текста в кнопке
        controlBtn.innerHTML = event.innerHTML;
        // получем значение картинки в кнопке
        let itemImg = event.querySelector('img').getAttribute('src')
        // записываем значение
        controlBtnImg.setAttribute('src', itemImg)

        let modals = target.closest('.control').querySelectorAll('.control-modal')
        modals.forEach(function (modal) {
          modal.classList.add('closed')
        })
      } else {
        event.classList.remove('active-li')
      }
    })
  }
})