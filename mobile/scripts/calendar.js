// โค้ดส่วนนี้เป็นส่วนของการสร้างปฏิทินและเหตุการณ์ที่ต้องทำในแต่ละวัน
// โดยจะแสดงเหตุการณ์ที่ต้องทำในแต่ละวันของเดือนปัจจุบัน

let today = new Date();
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

// ตัวอย่างข้อมูลเหตุการณ์ (สามารถปรับเปลี่ยนได้ตามต้องการ)
// const events = {
//   "2025-01-01": [
//     {
//       time: "08:00",
//       description: [
//         "Medicine name 1, 1 pill, Take after m...",
//         "Medicine name 1, 1 pill, Take after m...",
//         "Medicine name 1, 1 pill, Take after m...",
//       ],
//     },
//     {
//       time: "12:00",
//       description: "Medicine name 1, 1 pill, Take after m...",
//     },
//     {
//       time: "16:00",
//       description: "Medicine name 1, 1 pill, Take after m...",
//     },
//   ],
//   "2025-01-05": [
//     { time: "10:00", description: "Meeting with team" },
//     { time: "14:00", description: "Project presentation" },
//   ],
// };

let events = {};

function getMedicineEvent(n) {
  events = {};
  if (localStorage.getItem("Medicine") != null) {
    let datafromLS = JSON.parse(localStorage.getItem("Medicine"));
    for (let x = 1; x <= n; x++) {
      let formattedDate = `${x}-${month + 1}-${year}`;
      let dayselect = new Date(year, month, x);
      let timeSets = new Set();
      let timeArray = [];
      //get time
      for (let i = 0; i < datafromLS.Medicine.length; i++) {
        let dateArray = datafromLS.Medicine[i].Start_date.split(" ");
        let startdate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
        let durationMed = datafromLS.Medicine[i].duration;
        let frequencyMed = datafromLS.Medicine[i].frequency;
        let durationCheck = 0;
        let frequencyCheck = 0;
        let countDay = (dayselect - startdate) / (24 * 60 * 60 * 1000) + 1;
        if (countDay >= 0) {
          if (
            durationMed == "For a full course" ||
            durationMed == "Until symptoms resolve" ||
            durationMed == "Until next follow-up" ||
            durationMed == "Long-term"
          ) {
            durationCheck = 1;
          } else {
            durationMed = durationMed.split(" ");
            durationMed[0] = parseInt(durationMed[0], 10);
            if (durationMed[1] == "Days") {
              durationCheck = durationMed[0] - countDay;
            } else if (durationMed[1] == "Weeks") {
              durationCheck = durationMed[0] * 7 - countDay;
            } else if (durationMed[1] == "Months") {
              durationCheck = durationMed[0] * 30 - countDay;
            }
          }

          if (frequencyMed == "Everyday" || frequencyMed == "Only as needed") {
            frequencyCheck = 1;
          } else {
            frequencyMed = frequencyMed.split(" ");
            frequencyMed[1] = parseInt(frequencyMed[1], 10);
            if (frequencyMed[2] == "Day") {
              frequencyCheck = countDay % frequencyMed[1];
            } else if (frequencyMed[2] == "Week") {
              frequencyCheck = countDay % (frequencyMed[1] * 7);
            } else if (frequencyMed[2] == "Month") {
              frequencyCheck = countDay % (frequencyMed[1] * 30);
            }
          }
          if (durationCheck > 0 && frequencyCheck == 1) {
            if (dayselect >= startdate) {
              for (
                let j = 0;
                j < datafromLS.Medicine[i].time_dose.length;
                j++
              ) {
                timeSets.add(datafromLS.Medicine[i].time_dose[j].time);
              }
            }
          }
        }
      }
      //sort time
      timeSets.forEach((i) => timeArray.push(i));
      timeArray = timeArray.sort();
      let notificationSortTimeDate = [];
      timeArray.forEach((i) =>
        notificationSortTimeDate.push(JSON.parse(`{"${i}":[]}`))
      );
      //sort med
      for (let i = 0; i < datafromLS.Medicine.length; i++) {
        let dateArray = datafromLS.Medicine[i].Start_date.split(" ");
        let startdate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
        let durationMed = datafromLS.Medicine[i].duration;
        let frequencyMed = datafromLS.Medicine[i].frequency;
        let durationCheck = 0;
        let frequencyCheck = 0;
        let countDay = (dayselect - startdate) / (24 * 60 * 60 * 1000) + 1;
        if (countDay >= 0) {
          if (
            durationMed == "For a full course" ||
            durationMed == "Until symptoms resolve" ||
            durationMed == "Until next follow-up" ||
            durationMed == "Long-term"
          ) {
            durationCheck = 1;
          } else {
            durationMed = durationMed.split(" ");
            durationMed[0] = parseInt(durationMed[0], 10);
            if (durationMed[1] == "Days") {
              durationCheck = durationMed[0] - countDay;
            } else if (durationMed[1] == "Weeks") {
              durationCheck = durationMed[0] * 7 - countDay;
            } else if (durationMed[1] == "Months") {
              durationCheck = durationMed[0] * 30 - countDay;
            }
          }

          if (frequencyMed == "Everyday" || frequencyMed == "Only as needed") {
            frequencyCheck = 1;
          } else {
            frequencyMed = frequencyMed.split(" ");
            frequencyMed[1] = parseInt(frequencyMed[1], 10);
            if (frequencyMed[2] == "Day") {
              frequencyCheck = countDay % frequencyMed[1];
            } else if (frequencyMed[2] == "Week") {
              frequencyCheck = countDay % (frequencyMed[1] * 7);
            } else if (frequencyMed[2] == "Month") {
              frequencyCheck = countDay % (frequencyMed[1] * 30);
            }
          }
          if (durationCheck > 0 && frequencyCheck == 1) {
            if (dayselect >= startdate) {
              for (
                let j = 0;
                j < datafromLS.Medicine[i].time_dose.length;
                j++
              ) {
                let time = datafromLS.Medicine[i].time_dose[j].time;
                notificationSortTimeDate[timeArray.findIndex((i) => i == time)][
                  time
                ].push(datafromLS.Medicine[i].medicine_name);
              }
            }
          }
        }
      }
      events[formattedDate] = notificationSortTimeDate;
    }
  }
}

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  const selectedDate = new Date(year, month, day);
  getMedicineEvent(lastDate);
  // console.log(events);

  $("#date").text(`${months[month]} ${year}`);
  $(".days").empty();

  for (let x = day; x > 0; x--) {
    $(".days").append(`<div class="day prev-date">${prevDays - x + 1}</div>`);
  }

  for (let i = 1; i <= lastDate; i++) {
    let formattedDate = `${i}-${month + 1}-${year}`;
    if (events[formattedDate].length != 0) {
      $(".days").append(`<div class="day event">${i}</div>`);
    } else {
      $(".days").append(`<div class="day">${i}</div>`);
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    $(".days").append(`<div class="day next-date">${j}</div>`);
  }

  $(".day").click(function (e) {
    $(".day").removeClass("active");
    $(e.target).addClass("active");
    showEvents(e.target.textContent);
  });

  $(".prev-date").click(prevMonth);
  $(".next-date").click(nextMonth);
}

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

function showEvents(day) {
  const selectedDate = new Date(year, month, day);
  let formattedDate = `${day}-${
    selectedDate.getMonth() + 1
  }-${selectedDate.getFullYear()}`;
  $("#event-date").text(`${months[month]} ${day} ${year}`);
  $("#event-list").empty();
  if (events[formattedDate]) {
    events[formattedDate].forEach((event) => {
      // console.log(event);
      let time = Object.keys(event)[0];
      // console.log(time, event[time][0]);
      let description = "";
      event[time].forEach((desc) => {
        description += `<div>${desc}</div>`;
      });
      if (event[time].length != 0) {
        $("#event-list").append(
          `<div class="event">${time}<hr><span id="list">${description}</span></div>`
        );
      }
    });
  } else {
    $("#event-list").append(`<hr><div>No events for this day.</div>`);
  }
}

onload = function () {
  initCalendar();
};

$(document).ready(function () {
  $("#home").click(function () {
    window.location.href = "home.html";
  });
  $("#calender").click(function () {
    window.location.href = "calender.html";
  });
  $("#prev-month").click(prevMonth);
  $("#next-month").click(nextMonth);
});
