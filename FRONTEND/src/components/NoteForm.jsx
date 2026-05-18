import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

const NoteForm = () => {
  const dispatch = useDispatch();
  const [newNoteContent, setNewNoteContent] = useState('');

  const addNote = (event) => {
    event.preventDefault();
    if (!newNoteContent.trim()) return;
    
    dispatch(createNote(newNoteContent));
    setNewNoteContent('');
  };

  return (
    <form onSubmit={addNote} className="note-form">
      <div className="form-group">
        <input
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Escribe tu nota aquí..."
        />
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
};

export default NoteForm;
