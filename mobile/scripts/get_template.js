const serverURL = "https://project-noticine-backend.vercel.app";

function getTemplate(id) {
  const url = `${serverURL}/getTemplate/${id}`;
  const data = fetch(url) //1
  .then((response) => 
    // response.json()
    alert(response)
  ) //2
  // .then(() => {

  //  return user; //3
  // });
  // let dataToStorage = () => {
  //   data.then((a) => {
  //     alert(a)
  //     localStorage.setItem("getTemplate", JSON.stringify(a))
  //   })
  // };
  // dataToStorage()
}


function setTemplate(id) {
  let template = getTemplate(id);
  alert(template);
  //   let today = new Date();
  //   $("#title").text(template.Name);
  //   $("#description").text(template.Description);
  //   $("#medicine-detail-template").append(medicineDetailTemplate());
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
