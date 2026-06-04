const firebaseConfig = {
  apiKey:            "AIzaSyCeLN0ov4mcSSRxZXBM64eqPWR8n_r0960",
  authDomain:        "shoca-b4e3e.firebaseapp.com",
  projectId:         "shoca-b4e3e",
  storageBucket:     "shoca-b4e3e.firebasestorage.app",
  messagingSenderId: "611466565952",
  appId:             "1:611466565952:web:07d0487eaa7307a38a82a5",
  measurementId:     "G-4EDD5W9EXF"
};

const FIREBASE_READY = true;

firebase.initializeApp(firebaseConfig);

const auth      = firebase.auth();
const db        = firebase.firestore();
const functions = firebase.functions();
const analytics = firebase.analytics();
