self.addEventListener('push', function(event) {
    const options = {
        body: 'This is a push notification!',
        vibrate: [200, 100, 200],
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});