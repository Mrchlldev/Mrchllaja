import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  validatePassword,
  updateProfile,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  deleteUser,
  reauthenticateWithCredential,
  signOut
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getDatabase, set, ref, get, child, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB85p06_QdLd_NXHyLhW7NUOM-8fhW6PJ8",
  authDomain: "xnew3-92e01.firebaseapp.com",
  databaseURL: "https://xnew3-92e01-default-rtdb.firebaseio.com",
  projectId: "xnew3-92e01",
  storageBucket: "xnew3-92e01.appspot.com",
  messagingSenderId: "188202141203",
  appId: "1:188202141203:web:8107a083b1ba12feaaa1e6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
