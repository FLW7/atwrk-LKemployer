// document.addEventListener("DOMContentLoaded", () => {
//   const rejectMassageinput = document.querySelector('.reject-massage__area')

//   document.addEventListener('click', function () {
//     let variables = document.querySelector('.textarea-variables').querySelectorAll('.variable-item')
//     variables.forEach(function (variable) {
//       variable.onclick = () => {
//         rejectMassageinput.value += variable.getAttribute('data-value')
//       }
//     })
//   })
// })

document.addEventListener("DOMContentLoaded", () => {
  let leftContentStep6 = document.querySelector('.step-6')
  // поле ввод для описания вакансии
  function descriptionChange() {
    var Delta = Quill.import('delta');
    // инициализация области
    let quill = new Quill('.notification__applicant-editor', {
      theme: 'snow'
    });
    let notificationText,
      notificationCount = leftContentStep6.querySelector('.notification__text-count span'),
      notificationLength,
      notificationLimitValue = 1000,
      cursorPosition,
      variablesNotification = document.querySelector('.notification__applicant .variables');

    // ввод текста в область
    quill.on('text-change', function (delta, old, source) {
      // выводить количество символов в тесксте
      notificationLength = quill.getLength();
      notificationCount.textContent = notificationLength - 1;

      // удалять текст если он больше определённого количества
      if (notificationLength > notificationLimitValue) {
        quill.deleteText(notificationLimitValue, notificationLength);
      }
    });

    // нажатие на кнопку очистить
    document.querySelector('.notification__applicant-clear').addEventListener('click', () => {
      delete_cookie('notification__applicant')
      quill.setContents()
    })

    // нажатие на кнопку сохранить
    document.querySelector('.auto-sort__btns .primary-btn').addEventListener('click', () => {
      notificationText = quill.getContents();
      writeCookie('notification__applicant', encodeURIComponent(JSON.stringify(notificationText)), 30);
    })

    // получение позиции курсора
    document.querySelector('body').addEventListener('click', () => {
      cursorPosition = quill.getSelection();
    })

    // вставка переменных
    function pastVariables(variablesClassName) {
      variablesNotification.querySelector(variablesClassName).addEventListener('click', () => {
        if (cursorPosition) {
          if (cursorPosition.length == 0) {
            quill.insertText(cursorPosition.index, variablesNotification.querySelector(variablesClassName).getAttribute('data-value'))
          } else {
            quill.updateContents(new Delta()
              .retain(cursorPosition.index)
              .delete(cursorPosition.length)
              .insert(variablesNotification.querySelector(variablesClassName).getAttribute('data-value'))
            );
          }
        }
      })
    }
    pastVariables('.variables__name')
    pastVariables('.variables__vacancy')
    pastVariables('.variables__name-contact')
    pastVariables('.variables__phone')
    pastVariables('.variables__email')
    pastVariables('.variables__name-company')

    // возращать значение при загрузке страници 
    window.addEventListener('load', function load() {
      if (readCookie('notification__applicant') != undefined) {
        quill.setContents(JSON.parse(decodeURIComponent(readCookie('notification__applicant'))))
        notificationCount.textContent = notificationLength - 1;
      } else {
        quill.setContents([
          {
            insert: `Пример: Здравствуйте, [Name]!  Благодарим Вас за отклик. Компания AT-WORK рассмотрит Ваше резюме на вакансию  [Company] и позже сообщит Вам о своем решении.
    
С уважением, [HRName]`
          }
        ])
      }

      notificationLength = quill.getLength();
      notificationCount.textContent = notificationLength - 1;
    }, false);
  }
  descriptionChange();
})