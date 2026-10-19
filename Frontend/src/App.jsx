import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [notes, setNotes] = React.useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.note);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const data = { title, description };

    if (editingNoteId) {
      axios
        .patch(`http://localhost:3000/api/notes/${editingNoteId}`, {
          title,
          description,
        })
        .then((res) => {
          setNotes((prevNotes) =>
            prevNotes.map((note) =>
              note._id === editingNoteId ? res.data.note : note,
            ),
          );

          console.log("Updated note:", res.data.note);
          fetchNotes();
          setTitle("");
          setDescription("");
          setEditingNoteId(null);
        });
    } else {
      //-------X-post (create new Note)-X------
      axios
        .post("http://localhost:3000/api/notes", {
          //object form use to send data {title,descripiton}
          title,
          description,
        })
        .then((res) => {
          fetchNotes();
          setTitle("");
          setDescription("");
        });
    }
  }

  function handeleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((req) => {
      console.log(req.data);
      fetchNotes();
    });
  }

  function handleUpdateNote(noteId) {}

  //how to call the api in react to get backend notes data
  //--> we use axios for this
  //"error : "" has been blocked by CORS policy"  can be handle by configuring the server to accept the traffic from another websites --> in server.js install npm i cros -> require and call cros "
  //use effect -> run only one time after Render and then stop

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>
          {editingNoteId ? "save change" : "submit"}
          Submit
        </button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>

              <button
                onClick={() => {
                  handeleDeleteNote(note._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setTitle(note.title);
                  setDescription(note.description);
                  setEditingNoteId(note._id);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
