// Firebase web SDK configuration for fYtchk
// 1) In Firebase Console: Project Settings -> General -> Your apps -> SDK setup and configuration -> "Config"
// 2) Paste your actual values below. Keep these public keys client-side; they are not secrets.
// 3) Ensure databaseURL points to your RTDB instance: https://fytchk-2025-default-rtdb.firebaseio.com

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBNR5D4bw3bh0yTztC6hrONJEQqcVWslMw",
  authDomain: "fytchk-2025.firebaseapp.com",
  databaseURL: "https://fytchk-2025-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fytchk-2025",
  storageBucket: "fytchk-2025.firebasestorage.app",
  messagingSenderId: "1098128359964",
  appId: "1:1098128359964:web:022b0d320e88ede772d5d9",
  measurementId: "G-FBDJTZBKFN"
};

// Optional: sanity check in dev
(function(){
  var cfg = window.FIREBASE_CONFIG || {};
  var missing = [];
  ["apiKey","authDomain","databaseURL","projectId","appId"].forEach(function(k){
    if(!cfg[k] || String(cfg[k]).indexOf("REPLACE_WITH_") === 0) missing.push(k);
  });
  if (missing.length) {
    console.warn("Firebase config placeholders detected. Update firebase-config.js before using auth.", { missing });
  }
})();
