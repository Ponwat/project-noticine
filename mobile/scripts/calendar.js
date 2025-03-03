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
const events = {
  "2025-01-01": [
    {
      time: "08:00",
      description: [
        "Medicine name 1, 1 pill, Take after m...",
        "Medicine name 1, 1 pill, Take after m...",
        "Medicine name 1, 1 pill, Take after m...",
      ],
    },
    {
      time: "12:00",
      description: "Medicine name 1, 1 pill, Take after m...",
    },
    {
      time: "16:00",
      description: "Medicine name 1, 1 pill, Take after m...",
    },
  ],
  "2025-01-05": [
    { time: "10:00", description: "Meeting with team" },
    { time: "14:00", description: "Project presentation" },
  ],
};

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  const selectedDate = new Date(year, month, day);

  $("#date").text(`${months[month]} ${year}`);
  $(".days").empty();

  for (let x = day; x > 0; x--) {
    $(".days").append(`<div class="day prev-date">${prevDays - x + 1}</div>`);
  }

  for (let i = 1; i <= lastDate; i++) {
    const formattedDate = `${selectedDate.getFullYear()}-${(
      selectedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${i.toFixed(0).padStart(2, "0")}`;
    if (events[formattedDate]) {
      //   if (events[formattedDate].check == true) {
      //     $(".days").append(`<div class="day true">${i}</div>`);
      //   } else if (events[formattedDate].check == false) {
      //     $(".days").append(`<div class="day false">${i}</div>`);
      //   } else {
      //     $(".days").append(`<div class="day event">${i}</div>`);
      // }
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
  const formattedDate = `${selectedDate.getFullYear()}-${(
    selectedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;

  $("#event-date").text(`${months[month]} ${day} ${year}`);
  $("#event-list").empty();
  if (events[formattedDate]) {
    events[formattedDate].forEach((event) => {
      let description = "";
      if (Array.isArray(event.description)) {
        event.description.forEach((desc) => {
          description += `<div>${desc}</div>`;
        });
      } else {
        description += `<div>${event.description}</div>`;
      }
      $("#event-list").append(
        `<div class="event">${event.time}<hr><span id="list">${description}</span></div>`
      );
    });
  } else {
    $("#event-list").append(`<hr><div>No events for this day.</div>`);
  }
}

function getAllMedicine() {
  let medicine = [];

  // วนลูปทุกวันใน events
  Object.keys(events).forEach((date) => {
    events[date].forEach((event) => {
      if (Array.isArray(event.description)) {
        event.description.forEach((desc) => {
          if (desc.toLowerCase().includes("medicine")) {
            medicine.push({ date, time: event.time, description: desc });
          }
        });
      } else {
        if (event.description.toLowerCase().includes("medicine")) {
          medicine.push({ date, time: event.time, description: event.description });
        }
      }
    });
  });

  return medicine;
}

function displayMedicine() {
  const medicine = getAllMedicine();
  $("#medicine-list").empty(); // เคลียร์ข้อมูลเก่า

  if (medicine.length > 0) {
    medicine.forEach((med) => {
      $("#medicine-list").append(
        `<div class="medicine-item">
          <strong>${med.date} ${med.time}</strong>: ${med.description}
        </div>`
      );
    });
  } else {
    $("#medicine-list").append(`<div>No medicine found.</div>`);
  }
}

// เรียกใช้เมื่อโหลดหน้าเว็บ
$(document).ready(function () {
  displayMedicine();
});

// เรียกใช้ฟังก์ชัน
console.log(getAllMedicine());

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
