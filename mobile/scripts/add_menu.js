$(document).ready(function () {
  $("#add-button").click(function () {
    $("#add-menu-overlay").toggle();
    $(".menu-toggle").toggle();
    $("#add-button").toggleClass("open");
  });
  $("#add-menu-overlay").click(function () {
    $("#add-menu-overlay").toggle();
    $(".menu-toggle").toggle();
    $("#add-button").toggleClass("open");
  });

  $("#scan-template").click(async function () {
    if (AppInventor) {
      AppInventor.setWebViewString("scan");
    }
    // await scanResult("1000");
  });
});

function scanResult(value) {
  // await getTemplate(value);
  getId(value)
  .then((template) => {
    alert(`this is the scan result [${value}]`);
    if(confirm(template.Name)){
      console.log("good");
    }else {
      console.log("cancel");
    }

  })
// async function scanResult(value) {
//   try {
//     const template = await getId(value);
//     if (template.message) {
//       alert(template.message);
//       throw new Error(template.message);
//     }
//     template.medications.forEach(medication => {
//       alert(medication.Name)
//     });
//   } catch {
//     alert("Scan failed");
//   }
//   alert(template.Name);
//   // alert(`this is the scan result [${value}]`);
}

function AddMedicine() {
  const medicine_img = $("#medicine-img").val();
  const medicine_title = $("#medicine-title").val();
  const medicine_quentity = $("#medicine-quentity").val();
  const medicine_note = $("#medicine-note").val();

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
  $("#add-menu").toggleClass("open");
}
