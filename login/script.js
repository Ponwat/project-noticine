document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ตรวจสอบ username และ password
    const validUsers = {
        "Pikulkaew": "narukteesud",
        "kanechin": "adminkub",
        "spyhere": "nahn45gosud",
        "buddy": "chonbureeboy",
        "armin49": "Inumarai595"
    };

    if (validUsers[username] === password) {
        // เปลี่ยนเส้นทางไปยังหน้า hello_world.html
        window.location.href = "hello_world.html";
    } else {
        // แสดงข้อความผิดพลาด
        alert("Invalid username or password");
    }
});