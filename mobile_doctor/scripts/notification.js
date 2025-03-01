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
    console.log(time_input)
    if (Android) {
        alert(Android);
        Android.hello("Hello");
    }
}
