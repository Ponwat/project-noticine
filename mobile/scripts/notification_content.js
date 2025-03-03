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
  notificationSortTimeDate(day, month, year);
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
    notificationSortTimeDate(day, month, year);
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
    notificationSortTimeDate(day, month, year);
  });

  $("#add-medicine").click(function () {
    window.location.href = "add_medicine.html";
  });
});
//----------------------------------------------------------------------------------
function notificationSortTimeDate(day, month, year) {
  let formattedDate = `${day}-${month}-${year}`;
  // console.log(JSON.parse(localStorage.getItem("Medicine")));
  let datafromLS = JSON.parse(localStorage.getItem("Medicine"));
  if (datafromLS == null) {
    $("#content").empty();
    $("#content").append(
      `<div class="notification-content"><h4 id="notification-text">You don't have events to notify.<br>Please add your medicine</h4></div>`
    );
    return;
  }
  let dayselect = new Date(year, month, day);
  let daystart;
  let timeSets = new Set();
  let timeArray = [];
  //get time
  for (let i = 0; i < datafromLS.Medicine.length; i++) {
    let dateArray = datafromLS.Medicine[i].Start_date.split(" ");
    let startdate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
    if (dayselect >= startdate) {
      for (let j = 0; j < datafromLS.Medicine[i].time_dose.length; j++) {
        timeSets.add(datafromLS.Medicine[i].time_dose[j].time);
      }
    }
  }
  //sort time
  timeSets.forEach((i) => timeArray.push(i));
  timeArray = timeArray.sort();
  let notificationSortTimeDate = JSON.parse(
    `{"${formattedDate}" : [${timeArray.map((i) => `{"${i}":[]}`).join(",")}]}`
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
        } else if (frequencyMed[2] == "Weeks") {
          frequencyCheck = countDay % (frequencyMed[1] * 7);
        } else if (frequencyMed[2] == "Months") {
          frequencyCheck = countDay % (frequencyMed[1] * 30);
        }
      }
      if (durationCheck > 0 && frequencyCheck == 1) {
        if (dayselect >= startdate) {
          for (let j = 0; j < datafromLS.Medicine[i].time_dose.length; j++) {
            let time = datafromLS.Medicine[i].time_dose[j].time;
            notificationSortTimeDate[formattedDate][
              timeArray.findIndex((i) => i == time)
            ][time].push(datafromLS.Medicine[i].medicine_name);
          }
        }
      }
    }
  }
  // console.log(notificationSortTimeDate);
  // console.log(timeArray);
  // console.log(datafromLS);
  if (timeArray == 0) {
    $("#content").empty();
    $("#content").append(
      `<div class="notification-content"><h4 id="notification-text">You don't have to take medicine today.</h4></div>`
    );
    return;
  } else {
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
    let c = 0;
    time[i][e].forEach((e) => {
      let d = data["Medicine"].find((t) => t.medicine_name === e);
      let q = d.time_dose.find((t) => t.time === tm);
      card += AddNotificationCard(d.image, d.medicine_name, q.dose, d.note, tm);
      c++;
    });
    if (c > 0) {
      $("#content").append(
        `<div class="notification-content"><h4 id="notification-time">${e}</h4>${card}</div>`
      );
    }
  });
}

function AddNotificationCard(
  medicine_img,
  medicine_title,
  medicine_quentity,
  medicine_note,
  time
) {
  let actionField = "";
  if (localStorage.getItem(medicine_title) != "true") {
    actionField = `<button class="arrow-btn" id="medicine-true" value='{"value1":"${medicine_title}","value2":"${time}"}' onclick="checkboxTrue(this)"><img src="/icons/checkbox_true.svg" alt="arrow_right" class="icon"></button>`;
  }
  let formattedDate = `${day}-${month}-${year}`;
  if (localStorage.getItem(medicine_title) != "true") {
    if(localStorage.getItem(medicine_title + "check") != null){
      let datacheck = JSON.parse(localStorage.getItem(medicine_title + "check"));
      if(datacheck[formattedDate]){
        if((datacheck[formattedDate].find(t => t == time))){
          actionField = `<button class="arrow-btn action-true" id="medicine-true" value='{"value1":"${medicine_title}","value2":"${time}"}' onclick="checkboxTrue(this)"><img src="/icons/checkbox_true.svg" alt="arrow_right" class="icon"></button>`;      
        }
      }
    }
  }
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
            <div class="select-button">${actionField}</div>
        </div>`;
}

//----------------------------------------------------------------------------------
function checkboxTrue(targetmedicine) {
  let formattedDate = `${day}-${month}-${year}`;
  let v = JSON.parse(targetmedicine.value)
  if (localStorage.getItem(v.value1 + "check") == null) {
    let datacheck = JSON.parse(`{"${formattedDate}" : ["${v.value2}"]}`);
    localStorage.setItem(v.value1 + "check", JSON.stringify(datacheck));
  }else if (localStorage.getItem(v.value1 + "check") != null) {
    let datacheck = JSON.parse(localStorage.getItem(v.value1 + "check"));
    
    if(datacheck[formattedDate]){
      if (!(datacheck[formattedDate].find(t => t == v.value2))){
        datacheck[formattedDate].push(v.value2);
        console.log(datacheck[formattedDate]);
        localStorage.setItem(v.value1 + "check", JSON.stringify(datacheck));
      }else if (datacheck[formattedDate].find(t => t == v.value2)) {
        datacheck[formattedDate].splice(datacheck[formattedDate].indexOf(v.value2), 1)
        localStorage.setItem(v.value1 + "check", JSON.stringify(datacheck));
      }
    }else if (!datacheck[formattedDate]){
      datacheck[formattedDate] = [v.value2];
      console.log(datacheck)
      localStorage.setItem(v.value1 + "check", JSON.stringify(datacheck));
    }
  }
  $(targetmedicine).toggleClass("action-true");
}
