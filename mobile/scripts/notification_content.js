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
  JSONSortTimeDate(day, month, year);
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
    JSONSortTimeDate(day, month, year);
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
    JSONSortTimeDate(day, month, year);
  });

  $("#add-medicine").click(function () {
    window.location.href = "add_medicine.html";
  });

  
});
//----------------------------------------------------------------------------------
function JSONSortTimeDate(day, month, year) {
  let formattedDate = `${day}-${month}-${year}`;
  let datafromLS = JSON.parse(localStorage.getItem("Medicine"));
  if(datafromLS == null){
    $("#content").empty();
    $("#content").append(`<div class="notification-content"><h4 id="notification-text">You don't have events to notify.<br>Please add your medicine</h4></div>`);
    return;
  }
  let dayselect = new Date(year, month, day);
  let daystart;
  let timeSets = new Set();
  let timeArray = [];
  for (let i = 0; i < datafromLS.Medicine.length; i++) {
    let dateArray = datafromLS.Medicine[i].Start_date.split(" ");
    let startdate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
    if (dayselect >= startdate) {
      for (let j = 0; j < datafromLS.Medicine[i].time_dose.length; j++) {
        timeSets.add(datafromLS.Medicine[i].time_dose[j].time);
      }
    }
  }
  timeSets.forEach((i) => timeArray.push(i));
  timeArray = timeArray.sort();
  let notificationSortTimeDate = JSON.parse(
    `{"${formattedDate}" : [${timeArray.map((i) => `{"${i}":[]}`).join(",")}]}`
  );

  for (let i = 0; i < datafromLS.Medicine.length; i++) {
    let dateArray = datafromLS.Medicine[i].Start_date.split(" ");
    let startdate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
    if (dayselect >= startdate) {
      for (let j = 0; j < datafromLS.Medicine[i].time_dose.length; j++) {
        let time = datafromLS.Medicine[i].time_dose[j].time;
        notificationSortTimeDate[formattedDate][
          timeArray.findIndex((i) => i == time)
        ][time].push(datafromLS.Medicine[i].medicine_name);
      }
    }
  }
  console.log(notificationSortTimeDate);
  console.log(timeArray);
  // console.log(datafromLS);
  if(timeArray == 0){
    $("#content").empty();
    $("#content").append(`<div class="notification-content"><h4 id="notification-text">You don't have to take medicine today.</h4></div>`);
    return;
  }else {
    AddNotification(
      notificationSortTimeDate[formattedDate],
      timeArray,
      datafromLS
    );
  }
}
//----------------------------------------------------------------------------------

function AddNotification(time, medtime, data) {
  $("#content").empty();
  medtime.forEach((e, i) => {
    let tm = e;
    let card = "";
    time[i][e].forEach((e) => {
      let d = data["Medicine"].find((t) => t.medicine_name === e);
      let q = d.time_dose.find((t) => t.time === tm);
      card += AddNotificationCard(d.image, d.medicine_name, q.dose, d.note);
    });
    $("#content").append(
      `<div class="notification-content"><h4 id="notification-time">${e}</h4>${card}</div>`
    );
  });
  }

function AddNotificationCard(
  medicine_img,
  medicine_title,
  medicine_quentity,
  medicine_note
) {
  return `<div class="notification-card">
            <button class="info-block" id="medicine-detail-open" value="${medicine_title}" onclick="OpenMedicineDetail(value)">
                <img  class="medicine-img" src="${medicine_img}" alt="medicine_img">
                <div class="info"><span class="title" id="medicine-title">${medicine_title}</span>
                    <div class="row"><span class="title-label">Quantity: </span><span class="quantity"
                            id="medicine-quentity">${medicine_quentity}</span></div>
                    <div class="row"><span class="title-label">Note: </span><span class="note"
                            id="medicine-note">${medicine_note}</span></div>
                </div>
            </button>
            <div class="select-button"><button class="arrow-btn" id="medicine-true"><img
                        src="/icons/checkbox_true.svg" alt="arrow_right" class="icon"></button><button class="arrow-btn"
                    id="medicine-false"><img src="/icons/checkbox_false.svg" alt="arrow_right"
                        class="icon"></button></div>
        </div>`;
}
