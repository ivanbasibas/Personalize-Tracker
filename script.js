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
    if (e.target.classList.contains("modal-overlay"))
      document.querySelector(".modal-overlay").classList.add("hidden");
    document.body.classList.remove("no-scroll");
  });
};

overlayCheck();

const expenses = [-200, -500, -2000, -1000, -600];

const totalExpense = function () {
  return Math.abs(expenses.reduce((acc, expense) => acc + expense));
};

const expenseEl = document.querySelector(".title");

expenseEl.textContent = totalExpense();
