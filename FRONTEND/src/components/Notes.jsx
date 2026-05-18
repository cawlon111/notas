import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';

const Note = ({ note, handleClick }) => {
  return (
    <li
      onClick={handleClick}
      className={`note ${note.important ? 'note-important' : ''}`}
    >
      <span className="note-content">{note.content}</span>
      {note.important && <strong> ⭐</strong>}
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state);

  return (
    <ul>
      {notes.map(note => (
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
