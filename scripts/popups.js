document.addEventListener("DOMContentLoaded", () => {

  let popupCategoriesWrap = document.querySelector('.popup-categories'),
    popupCategories = popupCategoriesWrap.querySelector('.popup__categories'),
    popupCategoriesItem,
    popupCategoriesClearBtn = popupCategories.querySelector('.clear'),
    popupCategoriesNextBtn = popupCategories.querySelector('.next');

  document.addEventListener('click', (event) => {
    let target = event.target;

    // нажатия в popup Категории
    function clickPopupCategories() {
      // нажатие на элементы из списка в popup Категории

      // нажатие на кнопку Сбросить
      if (target == popupCategoriesClearBtn) {
        popupCategoriesItem = popupCategories.querySelectorAll('li');
        popupCategoriesItem.forEach(item => {
          item.classList.remove('active');
        })

        popupCategoriesClearBtn.disabled = true
        popupCategoriesNextBtn.disabled = true

        delete_cookie('categories-value');
      }

      // нажатие на кнопку Далее
      if (target == popupCategoriesNextBtn) {
        popupCategories.classList.remove('active');
      }
    }
    clickPopupCategories();
  });


  // получение данных для popup категорий
  function loadPopupCategories() {
    if (readCookie('categories-value') != undefined) {
      popupCategoriesItem = popupCategories.querySelectorAll('li');
      categoryValueArr = readCookie('categories-value').split(',')
      categoryValueArr.forEach(elemArr => {
        popupCategoriesItem.forEach(item => {
          if (elemArr == item.getAttribute('data-value')) {
            item.classList.add('active')
          }
        })
      })
    }
  };

  window.addEventListener('load', function load() {
    loadPopupCategories();
  }, false);
})