//----------------------------------IMAGE SECTION ---------------------------------------------
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('medImage').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

//---------------------------------- UNIT SECTION ---------------------------------------------

let UnitselectedValue = "";

function setUnit(){
    UnitselectedValue = document.getElementById("unitSelect").value;
    document.getElementById("unitInput").value = UnitselectedValue;
    document.getElementById("unitModal").style.display = "none";
    closeUnitModal();
}

function openUnitModal() {
    document.getElementById('unitModal').style.display = 'block';
    document.getElementById("modalOverlay").style.display = "block";
}

function closeUnitModal() {
    document.getElementById("unitModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
}


//---------------------------------- ADD TIME & DOSE SECTION ---------------------------------------------
function addTimeDose() {
    const time = document.getElementById('timeInput').value;
    const dose = document.getElementById('doseInput').value;

    if (time) {
        const list = document.getElementById('timeList');
        const item = document.createElement('div');
        item.classList.add('time-item');
        item.innerHTML = `
            <div class="time-dose-container">
                <div class="time">${time}</div>
                <div class="dose">${dose} ${UnitselectedValue}</div>
                <button class="delete" onclick="this.parentElement.parentElement.remove()">
                    <img src="../icons/delete.svg" alt="delete" class="icon">
                </button>
            </div>
        `;
        list.appendChild(item);
    }else {
        alert("Please select a unit before adding time and dose!");
    }
    closeModal('timeModal');
}

function openModaltime() {
    document.getElementById('timeModal').style.display = 'block';
    document.getElementById("modalOverlay").style.display = "block";
}

function closeTimeModal() {
    document.getElementById("timeModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
}

//---------------------------------- FREQUENCY SECTION --------------------------------------------
// ตั้งค่า Frequency และปิด Modal
function setFrequency() {
    let frequency = document.getElementById("frequencySelect").value;
    let interval = document.getElementById("intervalSelect").value;
    let frequencyInput = document.getElementById("frequencyInput");

    if (frequency === "Every X Day" || frequency === "Every X Week" || frequency === "Every X Month") {
        let interval = intervalSelect.value || "2";
        frequencyInput.value = frequency.replace("X", interval);
    } else {
        frequencyInput.value = frequency;
    }

    closeFrequencyModal();
}

function checkFrequency() {
    const frequencySelect = document.getElementById('frequencySelect');
    const xDayInput = document.getElementById('xDayInput');
    if (frequencySelect.value === 'every_x_day') {
        xDayInput.style.display = 'block';
    } else {
        xDayInput.style.display = 'none';
        xDayInput.value = '';
    }
}

function updateFrequency() {
    const xDayInput = document.getElementById('xDayInput');
    if (xDayInput.value >= 2 && xDayInput.value <= 100) {
        document.getElementById('frequencySelect').options[1].text = `Every ${xDayInput.value} Day`;
    }
}

function handleFrequencyChange() {
    let selectedFrequency = document.getElementById("frequencySelect").value;
    let intervalContainer = document.getElementById("intervalContainer");
    let intervalSelect = document.getElementById("intervalSelect");

    if (selectedFrequency === "Every X Day") {
        updateIntervalOptions(2, 100);
        intervalContainer.classList.remove("hidden");
    } else if (selectedFrequency === "Every X Week") {
        updateIntervalOptions(2, 21);
        intervalContainer.classList.remove("hidden");
    } else if (selectedFrequency === "Every X Month") {
        updateIntervalOptions(2, 12);
        intervalContainer.classList.remove("hidden");
    } else {
        intervalContainer.classList.add("hidden");
    }
}

// เติมค่าในช่อง Set Interval
function updateIntervalOptions(min, max) {
    let select = document.getElementById("intervalSelect");
    select.innerHTML = "";
    for (let i = min; i <= max; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
}

function closeFrequencyModal() {
    document.getElementById("frequencyModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
}


//-------------------------------------- DURATION SECTION --------------------------------
function setDuration() {
    let selectedValue = document.getElementById("durationSelect").value;
    document.getElementById("durationInput").value = selectedValue + " days";
    document.getElementById("durationModal").style.display = "none";
    closeDurationModal();
}

function populateDurationOptions() {
    let durationSelect = document.getElementById("durationSelect");
    durationSelect.innerHTML = "";
    for (let i = 2; i <= 100; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i + " days";
        durationSelect.appendChild(option);
    }
}

function openDurationModal() {
    populateDurationOptions();
    document.getElementById("durationModal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";    
}


function closeDurationModal() {
    document.getElementById("durationModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
}

//---------------------------------- FOR ALL -----------------------------
function openModal(modalId) {
    if (modalId === "durationModal") populateDurationOptions();
    document.getElementById(modalId).style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
}

//-------------------------------------- JSON --------------------------------
let today = new Date();
let datafromLS = {};
function JSONsaveMedicineList(data) {
    // let data_medicine_list = `{"medicine-list": [${data}]}`;
    let data_medicine_list = "";
    // console.log(dataList["Medicine"]);
    if (dataList === "") {
        data_medicine_list = `{"Medicine":[${data}]}`;
    }else {
        data_medicine_list = `{"Medicine":[${dataList},${data}]}`;
    }
    localStorage.setItem("Medicine", data_medicine_list);
    // localStorage.setItem("Medicine", JSON.stringify(data));
}

// {{date : [{time: [name, dose, note]}, {time: [name, dose, note]}]}}

onload = function () {
    if (localStorage.getItem("Medicine") != null) {
        datafromLS = JSON.parse(localStorage.getItem("Medicine"));
        for (let i = 0; i < datafromLS.Medicine.length; i++) {
            console.log(datafromLS.Medicine[i]);
            dataList = JSON.stringify(datafromLS.Medicine[i]); 
            console.log(dataList);
        }
    }
}

//-------------------------------------- SAVE CANCEL RESET SECTION --------------------------------
function cancelForm() {
    window.location.href = "home.html";
}

function resetForm() {
    document.getElementById("medName").value = "";
    document.getElementById("unitInput").value = "";
    document.getElementById("timeList").value = "";
    document.getElementById("frequencyInput").value = "";
    document.getElementById("durationInput").value = "";
    document.getElementById("noteInput").value = "";

    document.getElementById("timeList").innerHTML = "";

    document.getElementById("medImage").src = "../images/add_image.png";

    document.getElementById("imageInput").value = "";
}

function saveData() {
    let medName = document.getElementById("medName").value.trim();
    let unit = document.getElementById("unitInput").value.trim();
    let timeList = document.getElementById("timeList").children;
    let frequency = document.getElementById("frequencyInput").value.trim();
    let duration = document.getElementById("durationInput").value.trim();
    let note = document.getElementById("noteInput").value.trim();

    if (medName === "" || unit === "" || timeList.length === 0 || frequency === "" || duration === "") {
        alert("Please fill in all fields before saving.");
        return; 
    }

    let timeDoseList = [];
    for (let item of timeList) {
        let time = item.querySelector(".time").textContent;
        let dose = item.querySelector(".dose").textContent;
        timeDoseList.push({ time, dose });
    }
    let data = `{
      "medicine_name": "${medName}",
      "time_dose": [
        ${timeDoseList.map(item => `{"time": "${item.time}", "dose": "${item.dose}"}`).join(",")}
      ],
      "frequency": "${frequency}",
      "duration": "${duration}",
      "note": "${note}",
      "image": "${document.getElementById("medImage").src}",
      "Start_date": "${today.getDate()} ${today.getMonth()} ${today.getFullYear()}"
    }`;

    JSONsaveMedicineList(data);
    // localStorage.setItem("Medicine", data);
    alert("Data saved successfully!");

    window.location.href = "home.html";
}

