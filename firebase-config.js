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

// 自動偵測是否已填入真實設定
const FIREBASE_READY = !firebaseConfig.apiKey.startsWith('FILL_IN');

let auth, db, functions;

if (FIREBASE_READY) {
  try {
    firebase.initializeApp(firebaseConfig);
    auth      = firebase.auth();
    db        = firebase.firestore();
    functions = firebase.functions();
  } catch (e) {
    console.warn('Firebase init failed:', e.message);
  }
}
