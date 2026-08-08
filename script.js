"use strict";
import { expenseIcons } from "./icon.js";
import { renderChart, renderChart2 } from "./chart.js";

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

//get element
const getEl = function (classIdElement) {
  return document.querySelector(classIdElement);
};

const element = {
  expenseAmount: getEl(".total-figure"),
  addExpenseButton: getEl("#addExpense"),
  overlay: getEl(".modal-overlay"),
  income: getEl(".income-figure"),
  saving: getEl(".savings-figure"),
  budgetLeft: getEl(".budget-figure"),
  budgetTitle: getEl(".budget-title"),
  modalExpense: getEl(".modal-expense"),
  modalConfirm: getEl(".modal-confirmation"),
  confirmationCancel: getEl(".confirm-cancel"),
  confirmationButtonContainer: getEl(".confirmation-button-container"),
  tableBody: getEl("tbody"),
  expenseButtonContainer: getEl(".form-button-container"),
  statusMsg: getEl(".status-msg"),
  statusMsgContainer: getEl(".status-msg-container"),
  form: getEl(".form"),
  remainingBudget: getEl(".remaining-budget"),
  curExpenseAmount: getEl(".expense-amount"),
  budgetAfter: getEl(".budget-after"),
};

const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const exValue = {};

//Make overlay and modal visible
element.addExpenseButton.addEventListener("click", function (e) {
  e.preventDefault();
  element.overlay.classList.remove("hidden");
  element.modalExpense.classList.remove("hidden");
  document.body.classList.add("no-scroll");
});

//Make overlay and modal hidden
const hideModal = function () {
  element.overlay.classList.add("hidden");
  document.body.classList.remove("no-scroll");
};

const closeModal = function () {
  element.overlay.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal-overlay")) {
      hideModal();
    }
  });
};
closeModal();

const toggleConfirmModal = function () {
  element.modalExpense.classList.toggle("hidden");
  element.modalConfirm.classList.toggle("hidden");
};

//msg color
const msgRed = function (el) {
  el.classList.remove("positive");
  el.classList.add("negative");
};

const msgGreen = function (el) {
  el.classList.remove("negative");
  el.classList.add("positive");
};

const addExpense = function (iconIndex, amount, category, description, date) {
  expenses.push({
    icon: iconIndex,
    amount: amount,
    category: category,
    description: description,
    date: date,
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));
};

//Total Expense Computation
const totalExpense = function () {
  return Math.abs(expenses.reduce((acc, expense) => acc + expense.amount, 0));
};

//Total Income
const totalIncome = 15000;

//Budget Left computation
const budgetLeft = function () {
  return totalIncome - totalExpense();
};

//Savings Rate
const savingsRate = function () {
  return Math.floor((budgetLeft() / totalIncome) * 100);
};

//UPDATE DASHBOARD
const updateDashboard = function () {
  element.expenseAmount.textContent = `₱${totalExpense().toFixed(2)}`;
  element.budgetLeft.textContent = `₱${budgetLeft().toFixed(2)}`;
  element.saving.textContent = `${savingsRate()}%`;
  element.income.textContent = `₱${totalIncome.toFixed(2)}`;

  if (budgetLeft() < 0) {
    element.budgetLeft.classList.add("negative");
    element.budgetTitle.textContent = "Budget Deficit";
    element.budgetTitle.classList.add("negative");
  }

  if (savingsRate() < 0) {
    element.saving.classList.add("negative");
  }
};

updateDashboard();

const renderExpense = function () {
  element.tableBody.innerHTML = "";
  expenses.forEach((expense) => {
    const html = `<tr class="expense-body-column">
                  <td>
                    ${expenseIcons[expense.icon]}
                    <span>${expense.category}</span>
                  </td>
                  <td>${expense.description}</td>
                  <td>${expense.date}</td>
                  <td>${Math.abs(expense.amount)}</td>
                </tr>
                `;

    element.tableBody.insertAdjacentHTML("beforeend", html);
  });
};

renderExpense();

//Render Message function
const renderStatus = function (msg, color) {
  if (color === "green") {
    msgGreen(element.statusMsg);
  }
  if (color === "red") {
    msgRed(element.statusMsg);
  }
  element.statusMsg.textContent = msg;
  element.statusMsgContainer.classList.remove("invisible");
  setTimeout(() => {
    element.statusMsgContainer.classList.add("invisible");
  }, 2500);
};

const addExpenseSuccessful = function () {
  addExpense(
    exValue.iconIndex,
    exValue.amount,
    exValue.category,
    exValue.description,
    exValue.date,
  );

  renderExpense();
  updateDashboard();
  setTimeout(hideModal, 1000);
  element.form.reset();
  renderChart(expenses);
  renderChart2(expenses);
  renderStatus("Added", "green");
};

element.expenseButtonContainer.addEventListener("click", function (e) {
  e.preventDefault();

  const buttonClicked = e.target.closest(".form-button");

  if (!buttonClicked) return;

  if (buttonClicked.classList.contains("cancel")) {
    hideModal();
  }

  if (buttonClicked.classList.contains("add")) {
    const iconOptions = [
      "Food and Drinking",
      "Transportation",
      "Shopping",
      "Bill and Utilities",
      "Entertainnment",
      "Others",
    ];
    const form = e.target.closest(".form");
    exValue.category = form.category.value;
    exValue.iconIndex = iconOptions.indexOf(exValue.category);
    exValue.amount = -+form.amount.value;
    exValue.description = form.description.value;
    exValue.date = form.date.value;

    if (
      !exValue.category ||
      !exValue.amount ||
      !exValue.description ||
      !exValue.date
    ) {
      renderStatus("Invalid Input", "red");
      return;
    }

    if (Math.abs(exValue.amount) > budgetLeft()) {
      element.remainingBudget.textContent = budgetLeft();
      element.curExpenseAmount.textContent = Math.abs(exValue.amount);
      element.budgetAfter.textContent = budgetLeft() - Math.abs(exValue.amount);
      toggleConfirmModal();
      return;
    }

    addExpenseSuccessful();

    form.reset();
  }
});

//Canceling the confirmation modal
element.confirmationButtonContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".confirmation-button");
  if (!clicked) return;

  if (clicked.classList.contains("confirm-cancel")) toggleConfirmModal();
  if (clicked.classList.contains("confirm-add")) {
    addExpenseSuccessful();
    element.modalConfirm.classList.add("hidden");
  }
});

renderChart(expenses);
renderChart2(expenses);
