// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyADqPdLvnFnoRoZ_qp-u73hf5jLuCiGxW0",
authDomain: "project-noticine.firebaseapp.com",
projectId: "project-noticine",
storageBucket: "project-noticine.firebasestorage.app",
messagingSenderId: "69070148037",
appId: "1:69070148037:web:871bdf76081af8711efbac",
measurementId: "G-VJ77KGNL15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);