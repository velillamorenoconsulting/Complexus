import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVo6-zFaIK54uf55uFGrPsT9RBGjIALag",
  authDomain: "complexus-8d558.firebaseapp.com",
  projectId: "complexus-8d558",
  storageBucket: "complexus-8d558.appspot.com",
  messagingSenderId: "569663669505",
  appId: "1:569663669505:web:b2238765d72a1ac43ac700",
  measurementId: "G-V1925D4E5T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
