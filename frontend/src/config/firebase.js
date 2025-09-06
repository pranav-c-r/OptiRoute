// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhIt5a4syd9xvhZAn8wgS3AJlZa6gMiwo",
  authDomain: "optiroute-430f1.firebaseapp.com",
  projectId: "optiroute-430f1",
  storageBucket: "optiroute-430f1.firebasestorage.app",
  messagingSenderId: "11436955731",
  appId: "1:11436955731:web:bf07ca192e04b7ef9e0ea6",
  measurementId: "G-7QVSNXYR0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app); // optional

// Auth + Firestore
export const auth = getAuth(app);
export const database = getFirestore(app);

// Google provider setup
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");

// Auth helpers
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signOutUser = () => signOut(auth);

// ✅ Fixed: wrapper for auth state change
export const onAuthStateChange = (callback) => onAuthStateChanged(auth, callback);

// Firestore helpers
export const createUserDocument = async (user, additionalData = {}) => {
  if (!user) return;

  const userRef = doc(database, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  }

  return userRef;
};
