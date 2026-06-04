// ─────────────────────────────────────────────
//  填入你在 Firebase Console 拿到的設定
//  console.firebase.google.com → 你的專案 → 設定齒輪 → 一般 → 你的應用程式
// ─────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "FILL_IN_YOUR_API_KEY",
  authDomain:        "FILL_IN.firebaseapp.com",
  projectId:         "FILL_IN_YOUR_PROJECT_ID",
  storageBucket:     "FILL_IN.appspot.com",
  messagingSenderId: "FILL_IN_SENDER_ID",
  appId:             "FILL_IN_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth      = firebase.auth();
const db        = firebase.firestore();
const functions = firebase.functions();
