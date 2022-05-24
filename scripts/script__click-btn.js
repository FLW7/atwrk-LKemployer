let sectionStep = document.querySelectorAll('.left__content .section-step');
let stepValueItem = document.querySelectorAll('.step .step__value');
let stepValue = 1;


// document.addEventListener('click', (event) => {
//    let target = event.target
//    if (target == btnNext) {
//       clickBtnNext()
//    }
//    if (target == btnBack) {
//       clickBtnBack()
//    }
// })

// нажатие на кнопку назад
export function clickBtnBack() {
  stepValue--;

  sectionStep.forEach(section => {
    if (section.getAttribute('data-value') == stepValue) {
      section.classList.remove('hide');
    } else {
      section.classList.add('hide');
    }
  })

  // if (stepValue == 1) {
  //    btnBack.classList.add('hide');
  //    btnSection.classList.add('one-btn');
  // }

  // // скрыть кнопку опубликовать и показать кнопку вперед
  // if (stepValue !== sectionStep.length) {
  //    btnPublish.classList.add('hide');
  //    btnNext.classList.remove('hide');
  // }
  stepDone();
}

// нажатие на кнопку вперёд
export function clickBtnNext() {
  stepValue++;
  // let stepNow
  // let stepPrev

  sectionStep.forEach(section => {
    if (section.getAttribute('data-value') == stepValue) {
      section.classList.remove('hide')
    } else {
      section.classList.add('hide');
    }
    // if (section.getAttribute('data-value') == stepValue) {
    //    stepNow = section
    // }
    // if (section.getAttribute('data-value') == stepValue - 1) {
    //    stepPrev = section
    // }
  })

  // stepNow.classList.remove('hide');
  // stepPrev.classList.add('hide');

  // if (stepValue > 1) {
  //    btnBack.classList.remove('hide');
  //    // btnSection.classList.add('one-btn');
  // }

  // if (stepValue == sectionStep.length) {
  //    // скрыть кнопку вперед и показать кнопку опубликовать на последнем шаге 
  //    btnNext.classList.add('hide');
  //    btnPublish.classList.remove('hide');
  // } else {
  //    // скрыть кнопку назад на первом шаге
  //    btnBack.classList.remove('hide');
  //    btnSection.classList.remove('one-btn');
  // }
  stepDone();
}

// переключение индикатора шагов
function stepDone() {
  stepValueItem.forEach(item => {
    item.classList.remove('now');
    item.classList.remove('done');
  })
  stepValueItem.forEach(item => {
    if (item.getAttribute('data-value') == stepValue) {
      item.classList.add('now');
    } else if (item.getAttribute('data-value') < stepValue) {
      item.classList.add('now');
      item.classList.add('done');
    }
  })
}
