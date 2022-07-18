import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  colRef,
  db,
  auth,
  unsubDocument,
  unsubqRef,
  unsubAuth,
} from "./firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const ModifyData = () => {
  //hooks
  const addData = useRef();
  const deleteData = useRef();
  const [addBook, setAddBook] = useState({ title: "", author: "" });
  const [deleteBook, setDeleteBook] = useState({ id: "" });
  const [updateDocId, setUpdateDocId] = useState("");

  //UseEffects
  //useEffect(() => console.log(addBook), [addBook]);

  //Change Event listeners
  const handleAddDataChange = (e) => {
    setAddBook({ ...addBook, [e.target.name]: e.target.value });
  };

  const handleDeleteDataChange = (e) => {
    setDeleteBook({ ...deleteBook, [e.target.name]: e.target.value });
  };

  const handleUpdateDocChange = (e) => {
    setUpdateDocId(e.target.value);
  };

  // Submit Event listeners
  const handleAddDataSubmit = (e) => {
    e.preventDefault();
    addDoc(colRef, { ...addBook, createdAt: serverTimestamp() })
      .then(() => {
        setAddBook({ title: "", author: "" });
        alert("new book added");
      })
      .catch((err) => console.error(err));
  };

  const handelDeleteDataSubmit = (e) => {
    e.preventDefault();
    const docRef = doc(db, "Books", deleteBook.id);
    deleteDoc(docRef)
      .then(() => {
        setDeleteBook({ id: "" });
        alert("Book deleted");
      })
      .catch((err) => console.error(err));
  };

  const handelUpdateDocSubmit = (e) => {
    e.preventDefault();
    const docRef = doc(db, "Books", updateDocId);
    updateDoc(docRef, { title: "updated title for test" }).then(() => {
      alert("doc updated");
      setUpdateDocId("");
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        alert("user signed in with: " + cred.user);
        console.log(cred.user);
        e.target.reset();
      })
      .catch((err) => console.log(err.message));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => alert("user signed out"))
      .catch((err) => console.log(err.message));
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        alert("you are signed in");
        console.log(cred.user);
      })
      .catch((err) => console.log(err));
  };

  const handleUnsubscribeClick = () => {
    console.log("unsubscribing all");
    unsubAuth();
    unsubDocument();
    unsubqRef();
  };
  return (
    <>
      <form
        className="add-data"
        ref={addData}
        onSubmit={(e) => handleAddDataSubmit(e)}
      >
        <h4>Add Data</h4>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          required
          value={addBook.title}
          onChange={(e) => handleAddDataChange(e)}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          required
          value={addBook.author}
          onChange={(e) => handleAddDataChange(e)}
        />
        <br />
        <button type="submit">Add book</button>
      </form>
      <form
        className="delete-data"
        ref={deleteData}
        onSubmit={(e) => handelDeleteDataSubmit(e)}
      >
        <h4>Delete data</h4>
        <label htmlFor="id">Document ID</label>
        <input
          type="text"
          name="id"
          value={deleteBook.id}
          onChange={(e) => handleDeleteDataChange(e)}
        />
        <br />
        <button type="submit">Delete book</button>
      </form>
      <form className="update-doc" onSubmit={(e) => handelUpdateDocSubmit(e)}>
        <h4>Update Doc</h4>
        <label htmlFor="id">Document ID</label>
        <input
          type="text"
          name="id"
          value={updateDocId}
          onChange={(e) => handleUpdateDocChange(e)}
        />
        <br />
        <button type="submit">UpdateDoc</button>
      </form>
      <form className="signup" onSubmit={(e) => handleSignupSubmit(e)}>
        <h4>SignUp</h4>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <br />
        <button type="submit">SignUp</button>
      </form>
      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <form className="sign-in" onSubmit={(e) => handleSignInSubmit(e)}>
        <h4>SignUp</h4>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <br />
        <button type="submit">SignIn</button>
      </form>
      <button onClick={handleUnsubscribeClick}> unsubscribe </button>
    </>
  );
};

export default ModifyData;
