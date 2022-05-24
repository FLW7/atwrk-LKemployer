import './autoSort/age_inputs.js'
import './autoSort/choosen-filters.js'
import './autoSort/reject-massage.js'
import './autoSortLanguages.js'
import './autoSortCookie.js'
import './mainFilterCookie.js'
import './mainFilterLanguages.js'
import './menu-controls.js'
import './checkboxes.js'
import './onlyNew.js'
import './popups.js'
import './mainFilter/category_n_region.js'
import './autoSort/autoSort.js'
import './mainFilter/mainFilter.js'
import './mainFilter/mainFilter-age.js'
import './mainFilter/mainFilter-wage.js'
import './mainFilter/mainFilter-checksLists.js'
import './statistics/barChart.js'
import './statistics/radialChart.js'
import './statistics/viewsChart.js'

document.addEventListener("DOMContentLoaded", () => {

  // открытие и закрытие окна опций в карточке
  document.addEventListener('click', function (e) {
    let target = e.target
    let moreModal = document.querySelectorAll('.more-modal');
    if (target.classList.contains('status-more')) {
      moreModal.forEach(item => {
        item.classList.add('closed')
      })
      target.closest('.response-card').querySelector('.more-modal').classList.toggle('closed')
    } else {
      moreModal.forEach(item => {
        item.classList.add('closed')
      })
    }
  })
  // функционал "отказать" у карточек
  let cardRejectBtnFunc = function (rejectBtn) {
    document.querySelector('.popup-reject').classList.add('active')
    let parent = rejectBtn.closest('.response-card')
    // клик по кнопке отказать в попапе
    document.querySelector('.popup-reject .modal-btns .modal-primary-btn').onclick = () => {
      parent.querySelector('.status-more').className = 'status-control status-more reject'
      document.querySelector('.popup-reject').classList.remove('active')
      parent.querySelectorAll('.status-controls .status-control').forEach(btn => {
        btn.disabled = true
      })
    }
  }
  let rejectBtns = document.querySelectorAll('.status-reject')
  rejectBtns.forEach(function (rejectBtn) {
    // клик по кнопке в меню
    rejectBtn.onclick = () => {
      cardRejectBtnFunc(rejectBtn)
    }
  })
  // disabled кнопки "отказать"
  document.addEventListener('click', function () {
    let counter = 0;
    document.querySelectorAll('.page__item:not(.disabled) .card-check').forEach(check => {
      if (check.checked == true) {
        counter++
      }
    })
    if (counter > 0) {
      document.querySelector('.reject-btn').disabled = false
    } else {
      document.querySelector('.reject-btn').disabled = true
    }
  })
  // функционал отказать у controls
  let rejectBtnFunc = function () {
    let card_data_arr = [];
    document.querySelectorAll('.page__item:not(.disabled) .response-card').forEach(item => {
      if (item.querySelector('.card-check').checked == true) {
        let card_data = item.getAttribute('data-value');
        card_data_arr.push(card_data)
        let rejectPopupBtn = document.querySelector('.popup-reject .modal-primary-btn');
        rejectPopupBtn.onclick = () => {
          document.querySelector('.popup-reject').classList.remove('active');
          card_data_arr.forEach(data => {
            document.querySelectorAll('.page__item:not(.disabled) .response-card').forEach(elem => {
              if (elem.getAttribute('data-value') == data) {
                elem.querySelector('.status-more').classList.add('reject')
                elem.querySelectorAll('.status-controls .status-control').forEach(btn => {
                  btn.disabled = true
                })
              }
            })
          })
        }
      }
    })
  }

  // открытие окна отказать
  let rejectBtn = document.querySelector('.reject-btn')
  rejectBtn.onclick = () => {
    document.querySelector('.popup-reject').classList.add('active');
    rejectBtnFunc()
  }
  document.addEventListener('click', function (e) {
    let target = e.target;
    let its_btn = target == document.querySelector('.reject-btn')
    let its_btn_card = target.closest('.status-reject')
    let its_modal = target.closest('.popup-modal')
    let modal_is_active = document.querySelector('.popup-reject').classList.contains('active')
    if (!its_btn && !its_btn_card && !its_modal && modal_is_active) {
      document.querySelector('.popup-reject').classList.remove('active');
    }
  })

  // открытие окна неявки
  let noShowBtns = document.querySelectorAll('.status-no-show')
  noShowBtns.forEach(function (noShowBtn) {
    noShowBtn.onclick = () => {
      document.querySelector('.popup-no-show').classList.add('active')

      let parent = noShowBtn.closest('.response-card')
      // клик по кнопке отказать в попапе
      document.querySelector('.popup-no-show .modal-btns .modal-primary-btn').onclick = () => {
        parent.querySelector('.status-more').className = 'status-control status-more no-show'
        document.querySelector('.popup-no-show').classList.remove('active')
      }
    }
  })
  document.addEventListener('click', function (e) {
    let target = e.target;
    let ita_btn = target.closest('.status-no-show')
    let its_modal = target.closest('.popup-modal')
    let modal_is_active = document.querySelector('.popup-no-show').classList.contains('active')
    if (!ita_btn && !its_modal && modal_is_active) {
      document.querySelector('.popup-no-show').classList.remove('active');
    }
  })


  // открытие окна пожаловаться
  let complainBtns = document.querySelectorAll('.status-complain')
  complainBtns.forEach(function (complainBtn) {
    complainBtn.onclick = () => {
      document.querySelector('.popup-complain').classList.add('active')
      let parent = complainBtn.closest('.response-card')
      // клик по кнопке в попапе
      document.querySelector('.popup-complain .modal-btns .modal-primary-btn').onclick = () => {
        parent.querySelector('.status-more').className = 'status-control status-more report'
        document.querySelector('.popup-complain').classList.remove('active')
      }
    }
  })
  document.addEventListener('click', function (e) {
    let target = e.target;
    let ita_btn = target.closest('.status-complain')
    let its_modal = target.closest('.popup-modal')
    let modal_is_active = document.querySelector('.popup-complain').classList.contains('active')
    if (!ita_btn && !its_modal && modal_is_active) {
      document.querySelector('.popup-complain').classList.remove('active');
    }
  })

  // закрытие окон
  let closeIcons = document.querySelectorAll('.popup-modal-close')
  let cancelBtns = document.querySelectorAll('.modal-cancel-btn')
  // на крестик
  closeIcons.forEach(function (closeIcon) {
    closeIcon.onclick = () => {
      closeIcon.closest('.popup-wrapper').classList.remove('active')
    }
  })
  // на отменить
  cancelBtns.forEach(function (cancelBtn) {
    cancelBtn.onclick = () => {
      cancelBtn.closest('.popup-wrapper').classList.remove('active')
    }
  })

    // открытие dropdown'a два последних места работы в карточке отклика
  document.querySelectorAll('.responses-wrapper .job-item').forEach((jobItem) => {
    jobItem.onclick = (e) => {
      let target = e.target
      document.querySelectorAll('.card-dropdown').forEach((dropLink) => {
        if (target == dropLink) {
          dropLink.classList.toggle('active')
          dropLink.closest('.job-item').querySelector('.job-description').classList.toggle('closed')
        }
      })

    }
  })

  // открытие и закрытие окна с письмом из отклика
  let messageModalWrapper = document.querySelector('.responses-wrapper .message-popup-wrapper')
  let messageModal = messageModalWrapper.querySelector('.responses-wrapper .message-popup')

  // * Показываем кнопку "развернуть" у сопроводительного, если больше n - кол-во символов
  function showMessageToggleButton() {
    let messages = document.querySelectorAll(".responses-wrapper .massage-text p");
    messages.forEach((item) => {
      let itmWidth = item.offsetWidth
      let itmTextWidth = item.querySelector('span').offsetWidth
      if (itmWidth > itmTextWidth) {
        item.closest('.message-block').querySelector('.message-show').classList.add('closed')
      } else {
        item.closest('.message-block').querySelector('.message-show').classList.remove('closed')
      }
    })
  }
  window.addEventListener('load', showMessageToggleButton())
  window.addEventListener('resize', function () {
    showMessageToggleButton()
  })

  document.addEventListener('click', function (e) {
    let target = e.target
    let messageBtns = document.querySelectorAll('.responses-wrapper .message-show')
    messageBtns.forEach(function (btn) {
      // открытие модального окна и передача в него текста
      if (target == btn) {
        showMessageToggleButton()
        messageModalWrapper.classList.add('active')
        messageModal.querySelector('.full-message').textContent = btn.closest('.person-massage').querySelector('.massage-text').textContent
      }
    })
  })
  // закрытие окна
  document.querySelector('.message-close').onclick = () => {
    messageModalWrapper.classList.remove('active')
  }
  document.addEventListener('click', function (e) {
    let target = e.target;

    let its_btn = target.closest('.message-show')
    let its_modal = target.closest('.message-popup')
    let is_active = messageModalWrapper.classList.contains('active')

    if (!its_btn && !its_modal && is_active) {
      messageModalWrapper.classList.remove('active')
    }
  })

  // Сохранить резюме
  document.querySelectorAll('.response-card .save').forEach(item => {
    item.onclick = () => {
      item.classList.toggle('active')
    }
  })

  document.addEventListener('click', function (e) {
    let target = e.target;
    if (target.closest('.popup-reject')) {
      if (document.querySelector('.without-message').checked == true) {
        document.getElementById('reject-input').setAttribute('disabled', "true")
      } else {
        document.getElementById('reject-input').removeAttribute('disabled')
      }
    }
  })

  // история откликов
  document.addEventListener('click', function (e) {
    let target = e.target
    if (target.classList.contains('showAll-history')) {
      target.closest('.response-history').querySelector('.response-info-wrapper').classList.toggle('active')
      target.closest('.response-history').querySelector('.response-info-wrapper').style.overflowY = "hidden"
      let func = function () {
        if (target.closest('.response-history').querySelector('.response-info-wrapper').classList.contains('active')) {
          target.closest('.response-history').querySelector('.response-info-wrapper').style.overflowY = "scroll"
        }
      }
      window.setTimeout(func, 300)
      if (target.closest('.response-history').querySelector('.response-info-wrapper').classList.contains('active')) {
        target.closest('.response-history').querySelector('.showAll-history').textContent = "Скрыть"
      } else {
        target.closest('.response-history').querySelector('.showAll-history').textContent = "Показать всю историю"
        target.closest('.response-history').querySelector('.response-info-wrapper').scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    }
  })
  // показать кнопу "показать всю историю"
  window.addEventListener('load', function () {
    document.querySelectorAll('.page__item:not(.disabled) .response-card .response-info-list').forEach(item => {
      if (item.offsetHeight > 177) {
        item.closest('.response-history').querySelector('.showAll-history').classList.remove('closed')
      }
    })
  })
})


// РЯДОМ
const choiceBtn = document.querySelectorAll('.nearby .content-header-btn button');
const choiceSlider = document.querySelector('.nearby .content-header-btn__slide');

//кнопка слайдер
const switchBtn = (buttons, slide) => {
  buttons.forEach(elem => {
    elem.addEventListener('click', () => {
      if (elem.id == "view-map") {
        document.getElementById('map').classList.add('active')
      } else {
        document.getElementById('map').classList.remove('active')
      }
      buttons.forEach(elem => {
        elem.classList.remove('btn-active');
      })
      elem.classList.add('btn-active');
      slide.style.width = `${elem.offsetWidth}px`;
      slide.style.left = `${elem.offsetLeft}px`;
    })
  })
}
switchBtn(choiceBtn, choiceSlider);


let distanceBtns = document.querySelectorAll('.distance-btn')
document.addEventListener('click', (e) => {
  let target = e.target;
  if (target.classList.contains('distance-btn')) {
    distanceBtns.forEach(elem => elem.classList.remove('active'))
    target.classList.add('active')
  }
})
