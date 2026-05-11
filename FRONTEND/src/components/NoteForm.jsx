import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    if (!newNote.trim()) return
    
    createNote({
      content: newNote,
      important: true  // Por defecto importante
    })
    
    setNewNote('')
  }

  return (
    <form className="note-form" onSubmit={addNote}>
      <h3>✏️ Agregar nueva nota</h3>
      <div className="form-group">
        <input
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
          placeholder="Escribe tu nota aquí..."
        />
        <button type="submit">Guardar</button>
      </div>
    </form>
  )
}

export default NoteForm