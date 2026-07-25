"use strict";

const renderCalendar = function () {
  const calendarEl = document.getElementById("calendar");

  if (!calendarEl) return;
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    //   height: "100%",
    headerToolbar: {
      left: "title",
      center: "prev,next,",
      right: "today",
    },

    contentHeight: "auto",
    //   fixedWeekCount: false,
  });

  calendar.render();
};

renderCalendar();

const addExpenseButton = document.querySelector("#addExpense");

addExpenseButton.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".modal-overlay").classList.remove("hidden");
  document.body.classList.add("no-scroll");
});

const overlay = document.querySelector(".modal-overlay");

const overlayCheck = function () {
  if (!overlay) return;
  overlay.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal-overlay")) {
      document.querySelector(".modal-overlay").classList.add("hidden");
      document.body.classList.remove("no-scroll");
    }
  });
};

overlayCheck();

const expenses = [
  {
    amount: -200,
    category: "Food and drinks",
    description: "Jollibee",
    date: "June 9, 1994",
  },
  {
    amount: -500,
    category: "Food and drinks",
    description: "Jollibee",
    date: "June 9, 1994",
  },
  {
    amount: -800,
    category: "Food and drinks",
    description: "Jollibee",
    date: "June 9, 1994",
  },
  {
    amount: -1100,
    category: "Food and drinks",
    description: "Jollibee",
    date: "June 9, 1994",
  },
  {
    amount: -600,
    category: "Food and drinks",
    description: "Jollibee",
    date: "June 9, 1994",
  },
];

//Total Expense Computation
const totalExpense = function () {
  return Math.abs(expenses.reduce((acc, expense) => acc + expense.amount, 0));
};

//Expense  figure
const expenseAmountEl = document.querySelector(".total-figure");
expenseAmountEl.textContent = `₱${totalExpense().toFixed(2, 0)}`;

//Total Income
const totalIncome = 6000;

//Total-figure
const incomeEl = document.querySelector(".income-figure");
incomeEl.textContent = `₱${totalIncome.toFixed(2, 0)}`;

//Budget Left computation
const budgetLeft = function (totalIncome) {
  return totalIncome - totalExpense();
};

//Budget figure
const budgetLeftEl = document.querySelector(".budget-figure");
budgetLeftEl.textContent = `₱${budgetLeft(totalIncome).toFixed(2, 0)}`;

//Savings Rate
const savingsRate = function () {
  return Math.floor((budgetLeft(totalIncome) / totalIncome) * 100);
};

//Saving figure
const savingEl = document.querySelector(".savings-figure");
savingEl.textContent = `${savingsRate()}%`;

const renderExpense = function () {
  expenses.forEach((expense) => {
    const html = `<tr class="expense-body-column">
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="icon-table icon-negative"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                      />
                    </svg>
                    <span>${expense.category}</span>
                  </td>
                  <td>${expense.description}</td>
                  <td>${expense.date}</</td>
                  <td>${Math.abs(expense.amount)}</</td>
                </tr>
                `;

    document.querySelector("tbody").insertAdjacentHTML("beforeend", html);
  });
};

renderExpense();
