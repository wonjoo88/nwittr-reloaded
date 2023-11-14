
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

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
