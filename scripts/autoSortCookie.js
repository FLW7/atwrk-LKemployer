document.addEventListener("DOMContentLoaded", () => {
  const checksList = document.querySelectorAll('.auto-sort__checks');
  const currFilterList = document.querySelector('.filter-items');
  // Делаем массив с data-value выбранных элементов
  let fromatWork = document.querySelector('.autoSort-format-work')
  fromatWork.addEventListener('click', (e) => {
    let target = e.target;

    if (target.closest('.item input')) {

      if (target.checked == true) {
        // пушим в массив если true
        arrayFormatWork.push(target.closest('.item').getAttribute('data-value'))
        writeCookie('autoSort-format-work', arrayFormatWork, 30)
      } else {
        // вырезаем из массив если false
        arrayFormatWork.forEach(elemArr => {
          if (elemArr == (target.closest('.item').getAttribute('data-value'))) {
            arrayFormatWork.splice((arrayFormatWork.indexOf(elemArr)), 1);
            writeCookie('autoSort-format-work', arrayFormatWork, 30)
          }
        })
      }
    }
  })

  // Делаем массив с data-value выбранных элементов
  let experience = document.querySelector('.autoSort-experience')

  experience.addEventListener('click', (e) => {
    let target = e.target;

    if (target.closest('.item input')) {

      if (target.checked == true) {
        // пушим в массив если true
        arrayExperience.push(target.closest('.item').getAttribute('data-value'))
        writeCookie('autoSort-experience', arrayExperience, 30)
      } else {
        // вырезаем из массив если false
        arrayExperience.forEach(elemArr => {
          if (elemArr == (target.closest('.item').getAttribute('data-value'))) {
            arrayExperience.splice((arrayExperience.indexOf(elemArr)), 1);
            writeCookie('autoSort-experience', arrayExperience, 30)
          }
        })
      }
    }
  })


  // заполняем массив данными из cookie и выделяем отмеченные чекбоксы
  window.addEventListener('load', function load() {

    // для Формата
    if (readCookie('autoSort-format-work') != undefined) {

      let items = document.querySelectorAll('.autoSort-format-work .item ')
      arrayFormatWork = readCookie('autoSort-format-work').split(',');
      // удаляем из массива все повторные значения
      const uniqueArray = new Set(arrayFormatWork)
      const arrayFormatWorkUnique = [...uniqueArray]

      arrayFormatWorkUnique.forEach(elemArr => {
        items.forEach(item => {
          if (elemArr == item.getAttribute('data-value')) {
            item.querySelector('input').checked = true;
            // создание элемента
            let filterItem = document.createElement('div')
            filterItem.classList.add('filter-item')
            filterItem.classList.add('sort-format-work')
            filterItem.textContent = item.closest('.item').querySelector('p').textContent
            // -------------------------------------------------
            let itemValue = item.closest('.item').getAttribute('data-value')
            filterItem.setAttribute('data-value', itemValue)
            // -------------------------------------------------
            // добавление иконки "очистить"
            let pic = document.createElement("IMG");
            pic.src = "../responses/img/filter-del.svg";
            pic.classList.add('img-close-current')
            filterItem.appendChild(pic);
            // добавление элемента в список выбранных фильтров
            currFilterList.append(filterItem)
            filterCounter++
          }
        })
      });
    }

    // для опыта работы
    if (readCookie('autoSort-experience') != undefined && readCookie('autoSort-experience') != '') {

      let items = document.querySelectorAll('.autoSort-experience .item ')
      arrayExperience = readCookie('autoSort-experience').split(',');
      // удаляем из массива все повторные значения
      const uniqueArray = new Set(arrayExperience)
      const arrayExperienceUnique = [...uniqueArray]

      arrayExperienceUnique.forEach(elemArr => {
        items.forEach(item => {
          if (elemArr == item.getAttribute('data-value')) {
            item.querySelector('input').checked = true;
            // создание элемента
            let filterItem = document.createElement('div')
            filterItem.classList.add('filter-item')
            filterItem.classList.add('sort-experience')
            filterItem.textContent = item.closest('.item').querySelector('p').textContent
            // -------------------------------------------------
            let itemValue = item.closest('.item').getAttribute('data-value')
            filterItem.setAttribute('data-value', itemValue)
            // -------------------------------------------------
            // добавление иконки "очистить"
            let pic = document.createElement("IMG");
            pic.src = "../responses/img/filter-del.svg";
            pic.classList.add('img-close-current')
            filterItem.appendChild(pic);
            // добавление элемента в список выбранных фильтров
            currFilterList.append(filterItem)
            filterCounter++
          }
        })
      });
    }
  }, false)
})