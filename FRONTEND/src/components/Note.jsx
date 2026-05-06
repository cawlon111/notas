const Note = ({ note, toggleImportance, onDelete }) => {
  const label = note.important ? 'hacer no importante' : 'hacer importante'

  return (
    <li className={`note ${note.important ? 'note-important' : ''}`}>
      <span className="note-content">{note.content}</span>
      <div className="note-buttons">
        <button className="importance-button" onClick={toggleImportance}>
          {label}
        </button>
        <button className="delete-button" onClick={onDelete}>
          🗑️ eliminar
        </button>
      </div>
    </li>
  )
}

export default Note