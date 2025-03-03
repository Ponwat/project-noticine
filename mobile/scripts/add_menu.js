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
});