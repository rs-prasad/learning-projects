import { useEffect, useRef, useState } from "react";
import { addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { colRef, db } from "./firebase";

const ModifyData = () => {
  //hooks
  const addData = useRef();
  const deleteData = useRef();
  const [addBook, setAddBook] = useState({ title: "", author: "" });
  const [deleteBook, setDeleteBook] = useState({ id: "" });

  //UseEffects
  //useEffect(() => console.log(addBook), [addBook]);

  //Event listeners
  const handleAddDataChange = (e) => {
    setAddBook({ ...addBook, [e.target.name]: e.target.value });
  };

  const handleDeleteDataChange = (e) => {
    setDeleteBook({ ...deleteBook, [e.target.name]: e.target.value });
  };
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
    </>
  );
};

export default ModifyData;
