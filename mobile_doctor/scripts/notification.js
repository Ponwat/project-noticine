console.log("notification.js loaded");

// const requsetButton = document.getElementById("request-permission-button");
// requsetButton.onclick = () => {
//     if(typeof(Notification) == "undefined"){
//         console.error("Notification not supported");
//     }
//     var promise = Notification.requestPermission();
//     promise.then((permission) => {
//         if(permission !="granted"){
//             alert("Permission not granted");
//             return;
//         }
//         alert("Permission granted");
//     })
// }


const label = document.getElementById("label");

const time_input = document.getElementById("input");

const button = document.getElementById("notification-button");
button.onclick = function() {
    time = time_input.value.split(":");
    console.log(time)
    if (Android) {
        alert(Android);
        // Android.hello("Hello");
        time = time_input.value.split(":");

        Android.log_time(parseInt(time[0]), parseInt(time[1]));
    }
}
