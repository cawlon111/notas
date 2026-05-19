import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import LoginForm from './components/LoginForm';
import { initializeNotes } from './reducers/noteReducer';
import { initializeUser, logoutUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const notes = useSelector(state => state.notes);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(initializeNotes());
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return (
      <div className="app-container">
        <div className="header">
          <h1>📝 Notas</h1>
          <p>Inicia sesión para continuar</p>
        </div>
        <div className="content">
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>📝 Notas</h1>
        <p>Organiza tus ideas de manera fácil y rápida</p>
        
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
        <NoteForm />
        <VisibilityFilter />
        {notes.length === 0 && <p className="no-notes">No hay notas. ¡Crea una!</p>}
        <Notes />
      </div>
    </div>
  );
};

export default App;
