//----------------------------------IMAGE SECTION ---------------------------------------------
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    document.getElementById('medImage').src = URL.createObjectURL(file);
    // if (file) {
    //     const reader = new FileReader();
    //     reader.onload = function(e) {
    //         newSrc = downscaleImage(e.target.result, 200, "image/jpeg");
    //         console.log(newSrc)
    //         document.getElementById('medImage').src = newSrc;
    //     }
    //     reader.readAsDataURL(file);
    // }
});

// Take an image URL, downscale it to the given width, and return a new image URL.
function downscaleImage(dataUrl, newWidth, imageType, imageArguments) {
    "use strict";
    var image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl;

    // Provide default values
    imageType = imageType || "image/jpeg";
    imageArguments = imageArguments || 0.7;

    // Create a temporary image so that we can compute the height of the downscaled image.
    image = new Image();
    image.src = dataUrl;
    oldWidth = image.width;
    oldHeight = image.height;
    newHeight = Math.floor(oldHeight / oldWidth * newWidth)

    // Create a temporary canvas to draw the downscaled image on.
    canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the downscaled image on the canvas and return the new data URL.
    ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    newDataUrl = canvas.toDataURL(imageType, imageArguments);
    return newDataUrl;
}

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
    let duration = document.getElementById("durationSelect").value;
    let interval = document.getElementById("durationIntervalSelect").value;
    let durationInput = document.getElementById("durationInput");

    if (duration === "X Days" || duration === "X Weeks" || duration === "X Months") {
        durationInput.value = duration.replace("X", interval);
    } else {
        durationInput.value = duration;
    }
    
    closeDurationModal();
}

function checkDuration() {
    const durationSelect = document.getElementById('durationSelect');
    const durationIntervalContainer = document.getElementById('durationIntervalContainer');

    if (durationSelect.value === 'X Days' || durationSelect.value === 'X Weeks' || durationSelect.value === 'X Months') {
        durationIntervalContainer.style.display = 'block';
    } else {
        durationIntervalContainer.style.display = 'none';
        document.getElementById('durationIntervalSelect').value = '';
    }
}

function updateDuration() {
    const durationInterval = document.getElementById('durationIntervalSelect').value;
    const durationSelect = document.getElementById('durationSelect');

    if (durationInterval >= 1 && durationInterval <= 365) { 
        durationSelect.options[durationSelect.selectedIndex].text = `Every ${durationInterval} ${durationSelect.value.replace('X ', '')}`;
    }
}


function handleDurationChange() {
    let selectedDuration = document.getElementById("durationSelect").value;
    let intervalContainer = document.getElementById("durationIntervalContainer");
    
    if (selectedDuration === "X Days") {
        updateDurationIntervalOptions(2, 30);
        intervalContainer.classList.remove("hidden");
    } else if (selectedDuration === "X Weeks") {
        updateDurationIntervalOptions(2, 21);
        intervalContainer.classList.remove("hidden");
    } else if (selectedDuration === "X Months") {
        updateDurationIntervalOptions(2, 12);
        intervalContainer.classList.remove("hidden");
    } else {
        intervalContainer.classList.add("hidden");
    }
}

function updateDurationIntervalOptions(min, max) {
    let select = document.getElementById("durationIntervalSelect");
    select.innerHTML = "";
    for (let i = min; i <= max; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
}

function openDurationModal() {
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
    // console.log(data_medicine_list);
    // localStorage.setItem("Medicine", JSON.stringify(data_medicine_list));
    localStorage.setItem("Medicine", JSON.stringify(data));
}
localStorage.getItem("Medicine");
// //name dose note date time
// function JSONsaveEventList(data) {
//     let data_event_list = {};
//     if (data["medicine-list"]){ 
//         data["medicine-list"].forEach((i) => {
            
//           });
//     }
// }

// {{date : [{time: [name, dose, note]}, {time: [name, dose, note]}]}}

onload = function () {
    if (localStorage.getItem("Medicine") != null) {
        datafromLS = JSON.parse(localStorage.getItem("Medicine"));
        // alert(datafromLS);
    }
}

const param = new URLSearchParams(window.location.search);
const id = param.get("id");
console.log(id);

//-------------------------------------- SAVE CANCEL RESET SECTION --------------------------------
function cancelForm() { 
    if (id) {
        window.location.href = "./template.html?id=" + id;
        return;
    }
    window.location.href = "./home.html";
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
    console.log("Time List:", timeDoseList);
    let data = `{
      "medicine-name": "${medName}",
      "time-dose": [
        ${timeDoseList.map(item => `{"time": "${item.time}", "dose": "${item.dose}"}`).join(",")}
      ],
      "frequency": "${frequency}",
      "duration": "${duration}",
      "note": "${note}",
      "image": "${document.getElementById("medImage").src}",
      "Start-date": "${today.getDate()} ${today.getMonth()} ${today.getFullYear()}",
      "unit": "${unit}"
    }`;

    JSONsaveMedicineList(data);
    localStorage.setItem("Medicine", data);
    // alert("Data saved successfully!");

    if (id) {
        localStorage.setItem("addMedicine", JSON.stringify(data));
        console.log(data);
        // alert("data saved")
        window.location.href = "./template.html?id=" + id;
        return;
    }
    window.location.href = "./home.html";
}

