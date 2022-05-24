const menuLinks = document.querySelectorAll('.menu__item-link');
const menuSlider = document.querySelector('.menu-slider');


//перключение меню
function showBlock(link) {
  menuLinks.forEach(function (menuLink) {
    const idElement = menuLink.id;
    const block = document.querySelector(`.${idElement}`);

    // устанавливаем id текущей вкладки в controls
    document.querySelector('.controls').setAttribute('data-value', link.getAttribute('id'))
    document.querySelector('.auto-sort-btn').setAttribute('data-value', link.getAttribute('id'))
    document.querySelector('.controls-left').setAttribute('data-value', link.getAttribute('id'))
    document.querySelector('.controls-right').setAttribute('data-value', link.getAttribute('id'))

    if (link !== menuLink) {
      menuLink.classList.remove('menu__item-link--active');
      block.classList.add('disabled');
    } else {
      menuLink.classList.add('menu__item-link--active');
      block.classList.remove('disabled');
    }
  })


}

menuLinks.forEach(function (menuLink) {
  menuLink.addEventListener('click', () => showBlock(menuLink))
})

//передвижение подчеркивания
menuLinks.forEach(function (menuLink) {
  menuLink.addEventListener('click', () => {
    menuSlider.style.width = `${menuLink.offsetWidth}px`
    menuSlider.style.left = `${menuLink.offsetLeft}px`
  })
})

// МЕНЮ
const menu = document.querySelector('.menu');
const menuBox = document.querySelector('.menu-box');

menu.addEventListener('click', (evt) => {
  let target = evt.target;
  menuBox.scrollLeft = target.offsetLeft - 150;
});