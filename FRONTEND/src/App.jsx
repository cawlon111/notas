import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import storage from './utils/storage'

const Footer = () => {
  return (
    <div className="footer">
      <em>Aplicación de Notas, Departamento de Ciencias de la Computación, Universidad de Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Cargar usuario guardado en localStorage al iniciar la app
    const loggedUser = storage.getUser()
    if (loggedUser) {
      setUser(loggedUser)
      noteService.setToken(loggedUser.token)
    }
    
    // Cargar notas
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
      .catch(() => {
        setErrorMessage('Error al cargar las notas')
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      noteService.setToken(loggedUser.token)
      storage.saveUser(loggedUser)
      setSuccessMessage(`Bienvenido ${loggedUser.username}`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      setErrorMessage('Usuario o contraseña incorrectos')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(null)
    storage.removeUser()
    setSuccessMessage('Sesión cerrada correctamente')
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    if (!note) return

    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(`La nota '${note.content}' ya fue eliminada del servidor`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const deleteNote = (id) => {
    const note = notes.find(n => n.id === id)
    if (!note) return

    const confirmDelete = window.confirm(`¿Eliminar la nota "${note.content}"?`)
    if (!confirmDelete) return

    noteService
      .deleteNote(id)
      .then(() => {
        setNotes(notes.filter(n => n.id !== id))
        setSuccessMessage(`Nota "${note.content}" eliminada correctamente`)
        setTimeout(() => setSuccessMessage(null), 3000)
      })
      .catch(() => {
        setErrorMessage(`Error al eliminar la nota "${note.content}"`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    if (!newNote.trim()) {
      setErrorMessage('La nota no puede estar vacía')
      setTimeout(() => setErrorMessage(null), 3000)
      return
    }

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        setSuccessMessage(`Nota "${newNote}" agregada correctamente`)
        setTimeout(() => setSuccessMessage(null), 3000)
      })
      .catch(() => {
        setErrorMessage(`Error al agregar la nota "${newNote}"`)
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  // Si no hay usuario logueado, mostrar formulario de login
  if (!user) {
    return (
      <div className="app-container">
        <div className="header">
          <h1>📝 Notas</h1>
          <p>Inicia sesión para continuar</p>
        </div>
        <div className="content">
          {errorMessage && <Notification message={errorMessage} type="error" />}
          {successMessage && <Notification message={successMessage} type="success" />}
          <LoginForm handleLogin={handleLogin} />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>📝 Notas</h1>
        <p>Organiza tus ideas de manera fácil y rápida</p>
        
        {/* Barra de usuario con avatar y botón de cerrar sesión */}
        <div className="user-bar">
          <div className="user-info">
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span className="user-name">{user.username}</span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        </div>
      </div>
      
      <div className="content">
        {errorMessage && <Notification message={errorMessage} type="error" />}
        {successMessage && <Notification message={successMessage} type="success" />}

        <button className="toggle-button" onClick={() => setShowAll(!showAll)}>
          {showAll ? '⭐ Mostrar solo importantes' : '📋 Mostrar todas'}
        </button>

        <ul>
          {notesToShow.map(note => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </ul>

        <form className="note-form" onSubmit={addNote}>
          <h3>✏️ Agregar nueva nota</h3>
          <div className="form-group">
            <input
              value={newNote}
              onChange={handleNoteChange}
              placeholder="Escribe tu nota aquí..."
            />
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  )
}

export default App