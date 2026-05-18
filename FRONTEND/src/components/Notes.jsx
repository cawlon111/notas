import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';
import Note from './Note';

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes);
  const filter = useSelector(state => state.filter);

  const filterNotes = () => {
    if (filter === 'IMPORTANT') {
      return notes.filter(note => note.important);
    }
    if (filter === 'NONIMPORTANT') {
      return notes.filter(note => !note.important);
    }
    return notes;
  };

  const filteredNotes = filterNotes();

  return (
    <ul>
      {filteredNotes.map(note => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

export default Notes;