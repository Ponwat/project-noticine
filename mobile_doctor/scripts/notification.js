console.log("notification.js loaded");

if ('Notification' in window && 'serviceWorker' in navigator) {
    alert("Push notifications are supported!");
} else {
    alert("Push notifications are NOT supported.");
}

navigator.serviceWorker.register('./scripts/sw.js')
    .then(reg => console.log('Service Worker Registered!', reg))
    .catch(err => console.log('Service Worker Registration Failed!', err));


const requsetButton = document.getElementById("request-permission-button");
requsetButton.onclick = () => {
    if(typeof(Notification) == "undefined"){
        console.error("Notification not supported");
    }
    var promise = Notification.requestPermission();
    promise.then((permission) => {
        if(permission !="granted"){
            alert("Permission not granted");
            return;
        }
        alert("Permission granted");
    })
}


const button = document.getElementById("notification-button");
button.onclick = function() {
    const notification = new Notification("Hello, World!");
    console.log(notification);
}