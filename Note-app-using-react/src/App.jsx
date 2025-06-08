import { useState } from 'react'
import './App.css'
import EditableNote from '../components/EditableNote';
function App() {
  const[Notes,setNotes]=useState([]);
  const [newNote, setNewNote] = useState({ title: "", text: "" });
  const [adding,setAdding] = useState(false);
  const addNote =()=>{
    if (newNote.title) //ensures that title and content is filled
    {
      const newId = Date.now().toString(); //id for the note
      setNotes([...Notes, { ...newNote, id: newId }]); //addnote to the array
      setNewNote({ title: "", text: "" }); //restore the new note state for future
      setAdding(false);
    }
  }

  const deleteNote = (id) =>{
    const updatedNotes =Notes.filter((note)=>note.id!== id);
    setNotes(updatedNotes);
  }

  const initateAdd = () =>{
    setAdding(true);
  }

  const abortAdd = () =>{
    setAdding(false);
    setNewNote({title:"",text:""});
  }

  return (
    <div id='App'>
      <h1 id='main-head'>NOTE APP</h1>
    {adding?(
        <div id="note-form">
          <input id='title-input'
            type="text"
            placeholder="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <textarea id='text-input'
            rows="4"
            cols="30"
            placeholder="Text"
            value={newNote.text}
            onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
          />
          <div id='buttons'>
            <button onClick={addNote} id='Save'>Save</button>
            <button onClick={abortAdd}  id='Cancel'>Cancel</button>
          </div>
        </div>
    ):(
      <div id='add-button-div'>
        <button id='add-button' onClick={initateAdd}>
          <img id='add-button-img' src=".\assets\note_add_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt=""/>
          <h3>Add Note</h3>
        </button>
        
      </div>
    )
  }
    <div className="note-list">
      {(Notes.length===0)?
        (
          <h2 id='noteless'>There Are No Notes</h2>
        ):
        (
          <div>
            {Notes.map((note) => (
            <EditableNote id={note.id} note={note} onDelete={deleteNote} />
          ))}
          </div>
        )
      }
      </div>
      <div id='footer'>
        <p id='footer-text'>©Made by Ansh Kumar Singh - 2025</p>
      </div>
    </div>
  )
}

export default App
