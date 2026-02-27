import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAZEsW_nVYDEWhg8vVI6anSREZVLqycaA4",
  authDomain: "va-sparks-library.firebaseapp.com",
  databaseURL: "https://va-sparks-library-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "va-sparks-library",
  storageBucket: "va-sparks-library.firebasestorage.app",
  messagingSenderId: "659824240080",
  appId: "1:659824240080:web:3d574cb134403f35b845d5"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
