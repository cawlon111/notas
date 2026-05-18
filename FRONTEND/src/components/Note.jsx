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

export default Note;