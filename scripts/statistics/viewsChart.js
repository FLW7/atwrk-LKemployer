let weekArrW = [20, 250, 150, 300, 250, 392, 10],
  twoWeekArrW = [20, 250, 150, 300, 250, 392, 20, 250, 150, 300, 250, 392,],
  monthArrW = [20, 250, 150, 300, 250, 392, 20, 250, 150, 300, 250, 392, 20, 250, 150, 300, 250, 392, 20, 250, 150, 300, 250, 392, 0],
  allArrW = [20, 250, 150, 300, 250, 392, 20, 250, 150, 300, 250, 392, 20, 250, 150, 300, 250, 392, 20, 250, 150, 300, 250, 392, 20, 250, 150, 300, 250, 392,],
  weekArrR = [10, 25, 100, 50, 200, 300, 0],
  twoWeekArrR = [10, 250, 150, 300, 250, 392, 10, 8, 9, 10, 11, 12, 13, 14],
  monthArrR = [10, 250, 150, 300, 250, 392, 10, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  allArrR = [10, 250, 150, 300, 250, 392, 10, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 250, 150, 300, 250, 392, 10, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];


let viewsArr = weekArrW;
let responsesArr = weekArrR;
let labels = [];

const choiceBtn = document.querySelectorAll('.statistics .content-header-btn button');
const choiceSlider = document.querySelector('.statistics .content-header-btn__slide');

//кнопка слайдер
const switchBtn = (buttons, slide) => {
  buttons.forEach(elem => {
    elem.addEventListener('click', (e) => {
      let target = e.target
      if (target.id == "week") {
        updateCh(weekArrW, weekArrR)
      }
      if (target.id == "two-week") {
        updateCh(twoWeekArrW, twoWeekArrR)
      }
      if (target.id == "month") {
        updateCh(monthArrW, monthArrR)
      }
      if (target.id == "all-time") {
        updateCh(allArrW, allArrR)
      }
      buttons.forEach(elem => {
        elem.classList.remove('btn-active');
      })
      elem.classList.add('btn-active');
      slide.style.width = `${elem.offsetWidth + 10}px`;
      slide.style.left = `${elem.offsetLeft - 5}px`;
    })
  })
}
switchBtn(choiceBtn, choiceSlider);

// вывод дня
// увеличение и уменьшение дня
function date(count = 0) {
  var date = new Date()
  const MONTHS = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря",]
  let curDate = date.setDate(date.getDate() - count);
  let curMonth = MONTHS[date.getMonth()];
  let dateDay = new Date(curDate).toLocaleDateString().split(".")[0];
  let curDayMonth = `${dateDay} ${curMonth}`;
  return curDayMonth;
}
function dateMonth(count = 0) {
  var date = new Date()
  const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",]
  let curDate = date.setDate(date.getDate() - count);
  let curDay = new Date(curDate).toLocaleDateString().split(".")[0]
  let curYear = new Date(curDate).toLocaleDateString().split(".")[2]
  let curMonth = MONTHS[date.getMonth()];
  return curDay + '/' + curMonth + '/' + curYear;
}
function daysCount() {
  labels.length = 0;
  let daysArr = [];
  for (let index = 0; index < viewsArr.length; index++) {
    labels.push(date(index))
    daysArr.push(dateMonth(index))
    document.querySelector('.line-chart__month .month-start').textContent = daysArr[daysArr.length - 1].split('/')[1] + ' ' + daysArr[0].split('/')[2]
    document.querySelector('.line-chart__month .month-end').textContent = daysArr[0].split('/')[1] + ' ' + daysArr[0].split('/')[2]
  }
  labels.reverse()
}
daysCount()


// вертикальная линия ховер
const lines = {
  id: 'lines',
  beforeDatasetsDraw(chart) {
    const { ctx, tooltip, scales: { x, y }, chartArea: { top, bottom, left, right, width,
      height } } = chart;

    // Hover line
    if (tooltip._active[0]) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(35, 32, 86, 1)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([1, 5]);
      ctx.moveTo(tooltip._active[0].element.x, top);
      ctx.lineTo(tooltip._active[0].element.x, bottom);
      ctx.stroke();
      ctx.restore();
      ctx.setLineDash([1, 0]);
    }
  }
}

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Просмотров',
      data: viewsArr,
      backgroundColor: 'rgba(96, 100, 131, 1)',
      borderColor: 'rgba(96, 100, 131, 1)',
      fill: false,
    },
    {
      label: 'Откликов',
      data: responsesArr,
      backgroundColor: '#FFA438',
      borderColor: '#FFA438',
      fill: false,
    }
  ]
};
const config = {
  type: 'line',
  data: data,
  options: {
    pointHitRadius: 2,
    interaction: {
      mode: 'x',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        caretPadding: 10,
        titleAlign: false,
        usePointStyle: true,
        backgroundColor: 'rgba(35, 39, 44, 1)',
        padding: 8,
        titleFont: {
          weight: 400,
        },
        bodyFont: {
          family: 'inter',
        },
        bodySpacing: 6,
        displayColors: true,
        boxWidth: 7,
        boxPadding: 5,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          color: '#e5e5e5',
          display: false,
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: 'rgba(0, 32, 51, 0.6)',
          beginAtZero: true,
          callback: function (value, index, values) {
            if (index === values.length - 1) return Math.max.apply(this, viewsArr);
            else if (index === 0) return Math.min.apply(this, responsesArr);
            else return '';
          }
        }
      }
    },
  },
  plugins: [lines]
};

const myChart = new Chart(document.getElementById('vnr-chart'), config);
function updateCh(arrW, arrR) {
  viewsArr = arrW;
  responsesArr = arrR;
  myChart.data.datasets[0].data = viewsArr;
  myChart.data.datasets[1].data = responsesArr;
  daysCount()
  myChart.update();
}