document.addEventListener("DOMContentLoaded", () => {
  const currFilterList = document.querySelector('.choosen-filters__filter-items');

  // Делаем массив с data-value выбранных элементов
  let filterExperience = document.querySelector('.experience-filter')

  filterExperience.addEventListener('click', (e) => {
    let target = e.target;

    if (target.closest('.item input')) {

      if (target.checked == true) {
        // пушим в массив если true
        arrayFilterExperience.push(target.closest('.item').getAttribute('data-value'))
        writeCookie('filter-experience', arrayFilterExperience, 30)
      } else {
        // вырезаем из массив если false
        arrayFilterExperience.forEach(elemArr => {
          if (elemArr == (target.closest('.item').getAttribute('data-value'))) {
            arrayFilterExperience.splice((arrayFilterExperience.indexOf(elemArr)), 1);
            writeCookie('filter-experience', arrayFilterExperience, 30)
          }
        })
      }
    }
  })

  // Делаем массив с data-value выбранных элементов
  let driverLicense = document.querySelector('.driver-license-filter')

  driverLicense.addEventListener('click', (e) => {
    let target = e.target;

    if (target.closest('.item input')) {

      if (target.checked == true) {
        // пушим в массив если true
        arrayDriverLicense.push(target.closest('.item').getAttribute('data-value'))
        writeCookie('filter-driverLicense', arrayDriverLicense, 30)
      } else {
        // вырезаем из массив если false
        arrayDriverLicense.forEach(elemArr => {
          if (elemArr == (target.closest('.item').getAttribute('data-value'))) {
            arrayDriverLicense.splice((arrayDriverLicense.indexOf(elemArr)), 1);
            writeCookie('filter-driverLicense', arrayDriverLicense, 30)
          }
        })
      }
    }
  })

  // Делаем массив с data-value выбранных элементов
  let citizenship = document.querySelector('.citizenship__filter-list')

  citizenship.addEventListener('click', (e) => {
    let target = e.target;

    if (target.closest('.item input')) {
      if (target.checked == true) {
        // пушим в массив если true
        arrayCitizenship.push(target.closest('.item').getAttribute('data-value'))
        writeCookie('filter-citizenship', arrayCitizenship, 30)
      } else {
        // вырезаем из массив если false
        arrayCitizenship.forEach(elemArr => {
          if (elemArr == (target.closest('.item').getAttribute('data-value'))) {
            arrayCitizenship.splice((arrayCitizenship.indexOf(elemArr)), 1);
            writeCookie('filter-citizenship', arrayCitizenship, 30)
          }
        })
      }
    }
  })



  // заполняем массив данными из cookie и выделяем отмеченные чекбоксы
  window.addEventListener('load', function load() {
    // для опыта работы
    if (readCookie('filter-experience') != undefined) {

      let items = document.querySelectorAll('.filters__experience .item ')
      arrayFilterExperience = readCookie('filter-experience').split(',');
      // удаляем из массива все повторные значения
      const uniqueArray = new Set(arrayFilterExperience)
      const arrayFilterExperienceUnique = [...uniqueArray]

      arrayFilterExperienceUnique.forEach(elemArr => {
        items.forEach(item => {
          if (elemArr == item.getAttribute('data-value')) {
            item.querySelector('input').checked = true;
            // создание элемента
            let filterItem = document.createElement('div')
            filterItem.classList.add('filter-items__item')
            filterItem.classList.add('mainFilter-experience')
            filterItem.textContent = item.closest('.item').querySelector('p').textContent
            // -------------------------------------------------
            let itemValue = item.closest('.item').getAttribute('data-value')
            filterItem.setAttribute('data-value', itemValue)
            // -------------------------------------------------
            // добавление иконки "очистить"
            let pic = document.createElement("IMG");
            pic.src = "../responses/img/filter-del.svg";
            pic.classList.add('img-close-choosen')
            filterItem.appendChild(pic);
            // добавление элемента в список выбранных фильтров
            currFilterList.append(filterItem)
            mainFilterCounter++
          }
        })
      });
    }

    // для авто и категории
    if (readCookie('filter-driverLicense') != undefined) {

      let items = document.querySelectorAll('.driver-license__filter .item')
      arrayDriverLicense = readCookie('filter-driverLicense').split(',');

      // удаляем из массива все повторные значения
      const uniqueArray = new Set(arrayDriverLicense)
      const arrayDriverLicenseUnique = [...uniqueArray]

      arrayDriverLicenseUnique.forEach(elemArr => {
        items.forEach(item => {
          if (elemArr == item.getAttribute('data-value')) {
            item.querySelector('input').checked = true;
            // создание элемента
            let filterItem = document.createElement('div')
            filterItem.classList.add('filter-items__item')
            filterItem.classList.add('mainFilter-driver')
            filterItem.textContent = item.closest('.item').querySelector('p').textContent
            // -------------------------------------------------
            let itemValue = item.closest('.item').getAttribute('data-value')
            filterItem.setAttribute('data-value', itemValue)
            // -------------------------------------------------
            // добавление иконки "очистить"
            let pic = document.createElement("IMG");
            pic.src = "../responses/img/filter-del.svg";
            pic.classList.add('img-close-choosen')
            filterItem.appendChild(pic);
            // добавление элемента в список выбранных фильтров
            currFilterList.append(filterItem)
            mainFilterCounter++
          }
        })
      });
    }

    // для гражданства
    if (readCookie('filter-citizenship') != undefined) {

      let items = document.querySelectorAll('.citizenship__filter-list .item ')
      arrayCitizenship = readCookie('filter-citizenship').split(',');

      // удаляем из массива все повторные значения
      const uniqueArray = new Set(arrayCitizenship)
      const arrayCitizenshipUnique = [...uniqueArray]

      arrayCitizenshipUnique.forEach(elemArr => {
        items.forEach(item => {
          if (elemArr == item.getAttribute('data-value')) {
            item.querySelector('input').checked = true;
            item.classList.add('active')
            // создание элемента
            let filterItem = document.createElement('div')
            filterItem.classList.add('filter-items__item')
            filterItem.classList.add('mainFilter-citizenship')
            filterItem.textContent = item.closest('.item').querySelector('p').textContent
            // -------------------------------------------------
            let itemValue = item.closest('.item').getAttribute('data-value')
            filterItem.setAttribute('data-value', itemValue)
            // -------------------------------------------------
            // добавление иконки "очистить"
            let pic = document.createElement("IMG");
            pic.src = "../responses/img/filter-del.svg";
            pic.classList.add('img-close-choosen')
            filterItem.appendChild(pic);
            // добавление элемента в список выбранных фильтров
            currFilterList.append(filterItem)
            mainFilterCounter++
          }
        })
      });
    }
  }, false)
})