import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";

console.log("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyBKqNYklIYXcfHJYE1r0J-qzNFDWF6uRWk",
  authDomain: "fir-practice-57ef0.firebaseapp.com",
  projectId: "fir-practice-57ef0",
  storageBucket: "fir-practice-57ef0.appspot.com",
  messagingSenderId: "926773302529",
  appId: "1:926773302529:web:0860cca257d99ccdc5f700",
  measurementId: "G-SP9G6WV71Y",
};

// initializing app
initializeApp(firebaseConfig);

// initializing database
const db = getFirestore();

// collection ref
const colRef = collection(db, "Books");
// queries
const qRef = query(
  colRef,
  where("author", "==", "auth1"),
  orderBy("createdAt", "desc")
);

// get data
// getDocs(colRef)
//   .then((snapshot) => {
//     const docs = snapshot.docs;
//     const books = [];
//     docs.forEach((doc) => books.push({ ...doc.data(), id: doc.id }));
//     console.log(books);
//   })
//   .catch((err) => console.log(err));

// Realtime Data change listener
onSnapshot(qRef, (snapshot) => {
  const docs = snapshot.docs;
  const books = [];
  docs.forEach((doc) => books.push({ ...doc.data(), id: doc.id }));
  console.log(books);
});

// getting single document
const docRef = doc(db, "Books", "2yru3v9IN8pLPy1Sj7u5");
//getDoc(docRef).then((doc) => console.log(doc.data()));
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

export { db, colRef };
