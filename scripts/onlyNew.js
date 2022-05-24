document.addEventListener("DOMContentLoaded", () => {
  let newCheck = document.querySelector('.only-new')

  newCheck.onclick = () => {
    // собираем коллекцию карточек текущей страницы
    let cards = document.querySelectorAll('.page__item:not(.disabled) .response-card')
    if (newCheck.checked == true) {
      // пробегаемся по коллекции
      cards.forEach(function (item) {
        // берем data-time
        let date1 = item.querySelector('.add-time').getAttribute('data-time');
        // дата с текущем временем
        let date2 = new Date();
        // переводим обе даты в миллисекунды
        let itemTime = Date.parse(date1);
        let nowTime = Date.parse(date2);
        // вычетаем дату добавленияя карточки из нынешней 
        let difTime = nowTime - itemTime;

        // если разница больше чем месяц
        if (difTime > 2592000000) {
          item.classList.add('closed')
        }
      })
    } else {
      cards.forEach(function (item) {
        item.classList.remove('closed')
      })

    }
  }

})
