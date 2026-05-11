import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    if (!newNote.trim()) return
    
    createNote({
      content: newNote,
      important: true
    })
    
    setNewNote('')
  }

  return (
    <div className="formDiv">
      <h3>✏️ Agregar nueva nota</h3>
      <form onSubmit={addNote}>
        <div className="form-group">
          <input
            value={newNote}
            onChange={handleChange}
            placeholder="Escribe tu nota aquí..."
          />
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  )
}

export default NoteForm