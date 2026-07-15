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

addExpenseButton.addEventListener("click", function () {
  document.querySelector(".modal").style.display = "block";
  document.querySelector(".main").classList.add("blur");
});
