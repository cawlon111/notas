import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';

const App = () => {
  return (
    <div className="app-container">
      <div className="header">
        <h1>📝 Notas</h1>
        <p>Organiza tus ideas de manera fácil y rápida</p>
      </div>
      
      <div className="content">
        <NoteForm />
        <VisibilityFilter />
        <Notes />
      </div>
    </div>
  );
};

export default App;
