let today = new Date();
let day = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


function thisDay(day, month, year) {
  const selectedDate = new Date(year, month, day);
  let dayweek = selectedDate.getDay();
  
  $("#date").text(`${days[dayweek]}, ${months[month]} ${day} ${year}`);
}

onload = function () {
  thisDay(day, month, year);
};

$(document).ready(function () {
  $("#prevDay").click(function () {
    day--;
    if (day == 0) {
      month--;
      const lastDayprevMonth = new Date(year, month + 1, 0);
      day = lastDayprevMonth.getDate();
    }
    if (month < 0) {
      month = 11;
      year--;
    }
    thisDay(day, month, year);
  });
  
  $("#nextDay").click(function () {
    const lastDay = new Date(year, month + 1, 0);
    day++;
    if (day > lastDay.getDate()) {
      month++;
      day = 1;
    }
    if (month > 11) {
      month = 0;
      year++;
    }
    thisDay(day, month, year);
  });
});


