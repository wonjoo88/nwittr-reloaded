
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCIrNzugabBc9XgZtVQxUlMCmJXd5jkxto",
  authDomain: "nwitter-reloaded-9921f.firebaseapp.com",
  projectId: "nwitter-reloaded-9921f",
  storageBucket: "nwitter-reloaded-9921f.appspot.com",
  messagingSenderId: "980237972135",
  appId: "1:980237972135:web:cb9eb6f66b1dfea6d26182"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


// 스토리지에 대한 엑세스 권한
export const storage = getStorage(app)
// 데이터베이스에 대한 엓스 권한
export const db = getFirestore(app)