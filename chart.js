//Total per Category
let expenseChartRight;
let expenseChartLeft;

export const renderChart = function (expenses) {
  const chart = document.querySelector("#expenseChartRight");
  if (expenses.length === 0) {
    chart.classList.add("hidden");

    const html = `<h2 class="no-data component">No Data Available</h2>`;

    chart.parentElement.insertAdjacentHTML("beforeend", html);

    return;
  }

  chart.classList.remove("hidden");
  const noData = document.querySelector(".no-data");

  if (noData) {
    noData.remove();
  }

  const total = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }

    acc[[expense.category]] += Math.abs(expense.amount);
    return acc;
  }, {});

  const allValues = Object.values(total);
  const allLabels = Object.keys(total);

  console.log(allValues);
  console.log(allLabels);

  if (!expenseChartRight) {
    expenseChartRight = new Chart(chart, {
      type: "doughnut",
      data: {
        labels: allLabels,
        datasets: [
          {
            label: "Category Breakdown",
            data: allValues,
            backgroundColor: [
              "#F87171",
              "#4F6EF7",
              "#36D399",
              "#FBBF24",
              "#A78BFA",
              "#94A3B8",
            ],
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return;
  }

  expenseChartRight.data.labels = allLabels;
  expenseChartRight.data.datasets[0].data = allValues;
  expenseChartRight.update();
};

export const renderChart2 = function (expenses) {
  const buyDates = expenses.reduce((acc, expense) => {
    if (!acc[expense.date]) {
      acc[expense.date] = 0;
    }
    acc[expense.date] += Math.abs(expense.amount);
    return acc;
  }, {});

  const dateList = Object.keys(buyDates);
  const amountList = Object.values(buyDates);

  console.log(buyDates);

  const canvasLeft = document.querySelector("#expenseChartLeft");
  if (!expenseChartLeft) {
    expenseChartLeft = new Chart(canvasLeft, {
      type: "line",
      data: {
        labels: dateList,
        datasets: [
          {
            label: "Spending Trend",
            data: amountList,
            borderColor: "#4F6EF7",
            backgroundColor: "rgba(79,110,247,.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return;
  }

  expenseChartLeft.data.labels = dateList;
  expenseChartLeft.data.datasets[0].data = amountList;
  expenseChartLeft.update();
};
