console.log("notification.js loaded");

if ('Notification' in window && 'serviceWorker' in navigator) {
    alert("Push notifications are supported!");
} else {
    alert("Push notifications are NOT supported.");
}


const requsetButton = document.getElementById("request-permission-button");
requsetButton.onclick = () => {
    if(typeof(Notification) == "undefined"){
        console.error("Notification not supported");
    }
    var promise = Notification.requestPermission();
    promise.then((permission) => {
        alert(permission);
        // if(permission !="granted"){
        //     alert("Permission not granted");
        //     return;
        // }
        // alert("Permission granted");
    })
}


const button = document.getElementById("notification-button");
button.onclick = function() {
    const notification = new Notification("Hello, World!");
    console.log("Notification sent");
}