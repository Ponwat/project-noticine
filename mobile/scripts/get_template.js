const serverURL = "https://project-noticine-backend.vercel.app";

function getTemplate(id) {
  const url = `${serverURL}/getTemplate/${id}`;
  const data = fetch(url) //1
    .then((response) => response.json()) //2
    .then((user) => {
      return user; //3
    });
  let dataToStorage = () => {
    data.then((a) => {
      console.log("1");
      localStorage.setItem("getTemplate", JSON.stringify(a));
      if (localStorage.getItem("getTemplate")) {
        window.location.href = "scan_template.html";

        // setTemplate();
      }
    });
  };
  dataToStorage();
}

function setTemplate() {
  let templatedata = localStorage.getItem("getTemplate");
  templatedata = JSON.parse(templatedata);
  console.log(templatedata)
  console.log(templatedata.Name)
  console.log(templatedata.medications[0])
  
  let today = new Date();
  let date = `${today.getDate()} ${today.getMonth() + 1} ${today.getFullYear()}`;
  $("#title").text(templatedata.Name);
  $("#description").text(templatedata.Description);
  let qwer = "";
  templatedata.medications.forEach(e => {
    qwer += medicineDetailTemplate(e.Name,e.note,e.frequency,e.duration,e.times,e.Unit,date);
  })
  $("#medicine-detail-template").append(qwer);
}

function cancelTemplate() {
  window.location.href = "home.html";
}

function saveTemplate() {
  window.location.href = "home.html";
}

function medicineDetailTemplate(
  medicine_title,
  medicine_note,
  medicine_frequency,
  medicine_duration,
  medicine_time_dose,
  medicine_unit,
  medicine_startdate
) {
  let time_dose = "";
  medicine_time_dose.forEach((i) => {
    time_dose += `<span class="block-text">${i.time} - ${i.dose} ${medicine_unit}</span>`;
  });

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
  let startdate = medicine_startdate.split(" ");
  startdate[1] = months[startdate[1]];

  return `<div class="medicine-detail">
            <div class="info-block">
                <img class="medicine-img"
                    src="../icons/pill.svg"
                    alt="medicine_img">
                <div class="info">
                    <span class="title" id="medicine-detail-title">${medicine_title}</span>
                    <div class="row">
                        <span class="title-label">Note: </span>
                        <span class="normal-text" id="medicine-detail-note">${medicine_note}</span>
                    </div>
                </div>
            </div>
            <hr>
            <div class="info-block">
                <div class="info">
                    <div class="row" id="medicine-detail-time">
                        <span class="title-label">time-dose: </span>
                        <span class="column">
                        ${time_dose}
                        </span>
                    </div>
                    <div class="row">
                        <span class="title-label">Frequency: </span>
                        <span class="normal-text" id="medicine-detail-frequency">${medicine_frequency}</span>
                    </div>
                    <div class="row">
                        <span class="title-label">Duration: </span>
                        <span class="normal-text" id="medicine-detail-duration">${medicine_duration}</span>
                    </div>
                    <div class="row">
                        <span class="title-label">Start Date: </span>
                        <span class="normal-text" id="medicine-detail-startdate">${startdate[0]} ${startdate[1]} ${startdate[2]}</span>
                    </div>
                </div>
            </div>
        </div>`;
}
