const data = {
  labels: ['Женский', 'Мужской'],
  datasets: [{
    label: '# of Votes',
    data: [50, 100],
    backgroundColor: [
      'rgba(255, 164, 56, 1)',
      'rgba(96, 100, 131, 1)',
    ],
    hoverBorderWidth: 2,
    borderColor: ['rgba(255, 164, 56, 1)', 'rgba(96, 100, 131, 1)'],
    borderWidth: 0,

  }]
};

let maleCount = data.datasets[0].data[1];
let femaleCount = data.datasets[0].data[0];

let malePercent = Math.round(maleCount / (maleCount + femaleCount) * 100)
let femalePercent = Math.round(femaleCount / (maleCount + femaleCount) * 100)

const labelTooltip = (tooltipItems) => {
  if (tooltipItems.dataIndex == 0) {
    return femalePercent + '%'
  }
  if (tooltipItems.dataIndex == 1) {
    return malePercent + '%'
  }
}

const config = {
  type: 'doughnut',
  data: data,
  options: {
    radius: 75,
    cutout: 85,
    scales: {
      y: {
        // beginAtZero: true,
        display: false,
      },
      x: {
        display: false,
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        yAlign: 'bottom',
        caretPadding: 5,
        backgroundColor: 'rgba(35, 39, 44, 1)',
        displayColors: false,
        padding: 10,
        bodyFont: {
          weight: 300,
          size: 18,
        },
        callbacks: {
          label: labelTooltip,
        }
      }
    }
  }
};

const myChart = new Chart(document.getElementById('gender-chart'), config);