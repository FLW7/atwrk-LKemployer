let ageCount = [300, 60, 380, 122];

let sum = 0;
ageCount.map(i => sum += i);
let percents = ageCount.map(item => Math.round(item / sum * 100));
let percentsNotRound = ageCount.map(item => item / sum * 100);

document.querySelectorAll('.age-params .age-item__count').forEach((item, index) => {
  item.textContent = ageCount[index]
});


document.querySelectorAll('.age-params .age-item__percent').forEach((item, index) => {
  item.textContent = percents[index] + '%'
});

document.querySelectorAll('.age-graph div').forEach((elem, index) => {
  document.querySelectorAll('.age-item').forEach(item => {
    if (elem.getAttribute('data-color') == item.getAttribute('data-color')) {
      elem.style.width = percentsNotRound[index] + '%';
    }
  })

})

document.addEventListener('mouseover', (e) => {
  let target = e.target
  if (target.closest('.age-graph') != null) {
    document.querySelectorAll('.age-graph div').forEach(elem => {
      elem.style.opacity = 0.5
      target.closest('div').style.opacity = 1;
    })
    document.querySelectorAll('.age-item').forEach(item => {
      item.style.opacity = '0.5'
      if (target.getAttribute('data-color') == item.getAttribute('data-color')) {
        item.style.opacity = '1'
      }

    })
  }
})
document.addEventListener('mouseout', (e) => {
  let target = e.target
  if (target.closest('.age-graph') != null) {
    document.querySelectorAll('.age-graph div').forEach(elem => {
      elem.style.opacity = 1
    })
    document.querySelectorAll('.age-item').forEach(item => {
      item.style.opacity = '1'
    })
  }
})
