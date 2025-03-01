const medicine_img = "https://plus.unsplash.com/premium_photo-1668487826871-2f2cac23ad56?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDV8fG1lZGljaW5lfGVufDB8fHx8MTc0MDcyMDM0NHww&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450";
const medicine_title = "Paracetamol";
const medicine_quentity = 2;
const medicine_note = "Take after meal.";

$(document).ready(function () {
  $("#add-button").click(AddNotificationCard);
});


function AddNotificationCard() {
  $(".notification-content").append(
    `<div class="notification-card">
            <div class="info-block">
                <img class="medicine-img"
                    src="${medicine_img}"
                    alt="medicine_img">
                <div class="info">
                    <span class="title">${medicine_title}</span>
                    <div class="row">
                        <span class="title-label">Quantity: </span>
                        <span class="quantity">${medicine_quentity} pill</span>
                    </div>
                    <div class="row">
                        <span class="title-label">Note: </span>
                        <span class="note">${medicine_note}</span>
                    </div>
                </div>
            </div>
            <div class="action">
                <button class="arrow-btn"><img src="/icons/checkbox_true.svg" alt="arrow_right"
                        class="icon"></button>
                <button class="arrow-btn"><img src="/icons/checkbox_false.svg" alt="arrow_right"
                        class="icon"></button>
            </div>
        </div>`
  );
}
