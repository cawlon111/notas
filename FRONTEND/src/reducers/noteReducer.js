// Estado inicial con notas de ejemplo en español
const initialState = [
  {
    content: 'El reducer define cómo funciona el store de Redux',
    important: true,
    id: 1,
  },
  {
    content: 'El estado del store puede contener cualquier tipo de datos',
    important: false,
    id: 2,
  },
];

// Action creators
export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: Number((Math.random() * 1000000).toFixed(0))
    }
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  };
};

// Reducer
const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload];
    case 'TOGGLE_IMPORTANCE':
      return state.map(note =>
        note.id === action.payload.id
          ? { ...note, important: !note.important }
          : note
      );
    default:
      return state;
  }
};

export default noteReducer;
