import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div className="filter-buttons">
      <button 
        className="filter-button"
        onClick={() => dispatch(setFilter('ALL'))}
      >
        Todas
      </button>
      <button 
        className="filter-button"
        onClick={() => dispatch(setFilter('IMPORTANT'))}
      >
        Importantes
      </button>
      <button 
        className="filter-button"
        onClick={() => dispatch(setFilter('NONIMPORTANT'))}
      >
        No importantes
      </button>
    </div>
  );
};

export default VisibilityFilter;
