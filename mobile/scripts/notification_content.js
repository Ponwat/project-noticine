$(document).ready(function () {
  $("#add-medicine").click(function () {
    window.location.href = "add_medicine.html";
  });
});

onload = function () {
  if (localStorage.getItem("Medicine") != null) {
    datafromLS = JSON.parse(localStorage.getItem("Medicine"));
    for (let i = 0; i < datafromLS.Medicine.length; i++) {
        dataList = datafromLS.Medicine[i]; 
        console.log(dataList);
    }
}
};


function AddNotificationCard(medicine_img, medicine_title, medicine_quentity, medicine_note) {
  $(".notification-content").append(
    `<div class="notification-card">
            <div class="info-block">
                <img class="medicine-img"
                    src="${medicine_img}"
                    alt="medicine_img">
                <div class="info">
                    <span class="title" id="medicine-detail-title">${medicine_title}</span>
                    <div class="row">
                        <span class="title-label">Quantity: </span>
                        <span class="quantity" id="medicine-detail-quentity">${medicine_quentity} pill</span>
                    </div>
                    <div class="row">
                        <span class="title-label">Note: </span>
                        <span class="note" id="medicine-detail-note">${medicine_note}</span>
                    </div>
                </div>
            </div>
            <div class="select-button">
                <button class="arrow-btn" id="medicine-detail-true"><img src="/icons/checkbox_true.svg" alt="arrow_right"
                        class="icon"></button>
                <button class="arrow-btn" id="medicine-detail-false"><img src="/icons/checkbox_false.svg" alt="arrow_right"
                        class="icon"></button>
            </div>
        </div>`
  );
}
