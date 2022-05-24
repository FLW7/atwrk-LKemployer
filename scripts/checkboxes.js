document.addEventListener("DOMContentLoaded", () => {

  // функция для склонения слов
  function declOfNum(number, words) {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
  }

  // выбрать всё
  let checkboxAll = document.querySelector('.all-checkboxes');
  let checkAll = function (event) {
    let target = event.target;
    let checkboxes = document.querySelectorAll('.card-check')

    if (checkboxAll.checked == true) {
      // добавление disabled у кнопки приглашения
      document.querySelector('.invite-btn').disabled = false

      if (target == checkboxAll) {

        let item = document.querySelectorAll('.page__item:not(.disabled) .response-card');

        if (checkboxAll.checked == true) {

          // изменаем слово "выбран"
          document.querySelector('.word-choosen').textContent = declOfNum(document.querySelectorAll('.page__item:not(.disabled) .response-card').length, ['Выбран', 'Выбраны', 'Выбрано']);
          // изменаем слово "отклик"
          document.querySelector('.word-response').textContent = declOfNum(document.querySelectorAll('.page__item:not(.disabled) .response-card').length, ['отклик', 'отклика', 'откликов']);

          item.forEach(elem => {
            elem.querySelector('.card-check').checked = true;
            // при изменении counter'a присваиваем его значение в кол-во выбранных и показываем блок
            document.querySelector('.responses-counter').textContent = document.querySelectorAll('.page__item:not(.disabled) .response-card').length;
            document.querySelector('.choosen-responses').classList.remove('closed')
          })

        }
      }
    }
    else {
      // удаление disabled у кнопки приглашения
      document.querySelector('.invite-btn').disabled = true

      checkboxes.forEach(function (elem) {
        elem.checked = false;

        // при изменении counter'a присваиваем его значение в кол-во выбранных и показываем блок
        document.querySelector('.responses-counter').textContent--
        document.querySelector('.choosen-responses').classList.add('closed')
      })
    }
  }

  // счетчик выбранных чекбоксов
  let checkCheckCount = function (e) {
    let target = e.target;
    let counter = 0;
    if (counter == 0) {
      // добавление disabled у кнопки приглашения
      document.querySelector('.invite-btn').disabled = true
      document.querySelector('.choosen-responses').classList.add('closed')
    }
    if (target.closest('.card-check') && target.closest('.response-card')) {

      let item = document.querySelectorAll('.page__item:not(.disabled) .response-card');

      item.forEach(elem => {
        if (elem.querySelector('.card-check').checked == true) {
          counter++;
          // изменаем слово "выбран"
          document.querySelector('.word-choosen').textContent = declOfNum(counter, ['Выбран', 'Выбраны', 'Выбрано'])
          // изменаем слово "отклик"
          document.querySelector('.word-response').textContent = declOfNum(counter, ['отклик', 'отклика', 'откликов'])
          // при изменении counter'a присваиваем его значение в кол-во выбранных и показываем блок
          document.querySelector('.responses-counter').textContent = counter;
          document.querySelector('.choosen-responses').classList.remove('closed')

          // удаление disabled у кнопки приглашения
          document.querySelector('.invite-btn').disabled = false

        } else {
          // при изменении counter'a присваиваем его значение в кол-во выбранных и показываем блок
          document.querySelector('.responses-counter').textContent = counter;
        }
      })
      // если выбраны все
      if (counter == item.length) {
        checkboxAll.checked = true;
      } else {
        checkboxAll.checked = false;
      }
    }
  }


  // при клике на чекбокc во вкладке
  document.addEventListener('click', function (e) {
    let target = e.target
    let checkboxes = document.querySelectorAll('.card-check')
    checkboxes.forEach(function (checkbox) {
      if (target == checkbox) {
        checkCheckCount(e);
      }
    })
  })

  // клик по "выбрать всё"
  checkboxAll.addEventListener('click', function (event) {

    checkAll(event);
  })

  // сброс при переходе
  document.addEventListener('click', function (event) {
    let target = event.target
    if (target.classList.contains('menu__item-link')) {
      checkboxAll.checked = false
    }
  })

})