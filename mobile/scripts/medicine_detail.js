$(document).ready(function () {
  $("#medicine-detail-overlay").click(function () {
    $("#medicine-detail").css({ display: "none" });
    $(".medicine-detail").remove();
  });
  $("#medicine-detail-close").click(function () {
    $("#medicine-detail").css({ display: "none" });
    $(".medicine-detail").remove();
  });
  $("#medicine-title").click(function (e) {
    $("#medicine-detail").css({ display: "flex" });
    if (e.target && e.target.matches("#medicine-title")) {
    //   let medicine = JSON.parse(GetDataFromLocalStorage("Medicine"));
      let medicine = GetDataFromLocalStorage("Medicine");
      console.log(medicine);
      //   let medicine = data.find((i) => i.medicine_name === e.target.textContent);
      // console.log(typeof(medicine));
      medicine = medicine.Medicine.find((i) => i.medicine_name === e.target.textContent);  
      console.log(medicine.medicine_name);
      console.log(medicine);
      ShowMedicineDetail(
        medicine.image,
        medicine.medicine_name,
        medicine.time_dose,
        medicine.frequency,
        medicine.duration,
        medicine.startdate,
        medicine.note
      );
    }
  });
});

function GetDataFromLocalStorage() {
  let data = localStorage.getItem("Medicine");
  if (data != null) {
    console.log(JSON.parse(data));
    return JSON.parse(data);
  }
  return [];
}

function ShowMedicineDetail(
  medicine_img,
  medicine_title,
  medicine_time_dose,
  medicine_frequency,
  medicine_duration,
  medicine_startdate,
  medicine_note
) {
  let time_dose = "";
  medicine_time_dose.forEach((i) => {
    time_dose += `<span class="block-text">${i.time} - ${i.dose}</span>`;
  });
  $("#medicine-detail").append(
    `<div class="medicine-detail">
          <img src="/icons/bold_plus.svg" id="medicine-detail-close" class="close-button">
          <div class="info-block">
              <img class="medicine-img"
                  src="${medicine_img}"
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
                      ${time_dose}
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
                      <span class="normal-text" id="medicine-detail-startdate">${medicine_startdate}</span>
                  </div>
              </div>
          </div>
      </div>`
  );
}
