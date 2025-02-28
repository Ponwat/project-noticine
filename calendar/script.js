const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prevMonthBtn = document.querySelector(".prev-month"),
    nextMonthBtn = document.querySelector(".next-month"),
    eventDate = document.getElementById("event-date"),
    eventList = document.getElementById("event-list");

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// ตัวอย่างข้อมูลเหตุการณ์ (สามารถปรับเปลี่ยนได้ตามต้องการ)
const events = {
    "2025-01-01": [
        { time: "08:00", description: "Medicine name 1, 1 pill, Take after m..." },
        { time: "12:00", description: "Medicine name 1, 1 pill, Take after m..." },
        { time: "16:00", description: "Medicine name 1, 1 pill, Take after m..." },
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

    date.innerHTML = `${months[month]} ${year}`;
    let days = "";

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        days += `<div class="day">${i}</div>`;
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;
    addDayClickListener();
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

prevMonthBtn.addEventListener("click", prevMonth);
nextMonthBtn.addEventListener("click", nextMonth);

function addDayClickListener() {
    document.querySelectorAll(".day").forEach(day => {
        day.addEventListener("click", (e) => {
            document.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
            e.target.classList.add("active");
            showEvents(e.target.textContent);
        });
    });
}

function showEvents(day) {
    const selectedDate = new Date(year, month, day);
    const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
    eventDate.textContent = `${months[month]} ${day}, ${year}`;
    eventList.innerHTML = "";
    if (events[formattedDate]) {
        events[formattedDate].forEach(event => {
            eventList.innerHTML += `<div>${event.time} - ${event.description}</div>`;
        });
    } else {
        eventList.innerHTML = "No events for this day.";
    }
}

initCalendar();