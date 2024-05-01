import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  where,
  query,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCa7mu-ClfFH2x6JTJsULWUF-VsQyuTJDo",
  authDomain: "bookify-f8482.firebaseapp.com",
  projectId: "bookify-f8482",
  storageBucket: "bookify-f8482.appspot.com",
  messagingSenderId: "43757742952",
  appId: "1:43757742952:web:ca57c8ffca7289a6c6c4dd",
};

const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();
const firebaseauth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
  const [user, setuser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseauth, (user) => {
      if (user) setuser(user);
      else setuser(null);
    });
  }, []);
  const signup = (email, password) => {
    createUserWithEmailAndPassword(firebaseauth, email, password);
  };
  const signinwithgoogle = () => signInWithPopup(firebaseauth, google);

  console.log(user);
  const hadleCreatenewListing = async (name, isbn, price, coverpic) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverpic.name}`
    );
    const res = await uploadBytes(imageRef);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: res.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };
  const listallBooks = () => {
    return getDocs(collection(firestore, "books"));
  };
  const getImageURl = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  const getBookbyId = async (id) => {
    const docRef = doc(firestore, "books", id);
    const res = await getDoc(docRef);
    return res;
  };
  const SignInUser = (email, password) => {
    signInWithEmailAndPassword(firebaseauth, email, password);
  };
  const placeOrder = async (bookID, qty) => {
    const collectionRef = collection(firestore, "books", bookID, "orders");
    const res = await addDoc(collectionRef, {
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    return res;
  };
  const fetchMyOrders = async () => {
    if (user) {
      const collectionRef = collection(firestore, "books");
      const q = query(collectionRef, where("userID", "==", user.uid));
      const res = await getDocs(q);
      console.log(res);
    } else {
      console.log("User is not logged in");
    }
  };
  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signup,
        SignInUser,
        signinwithgoogle,
        isLoggedIn,
        hadleCreatenewListing,
        listallBooks,
        getImageURl,
        placeOrder,
        fetchMyOrders,
        getBookbyId,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
