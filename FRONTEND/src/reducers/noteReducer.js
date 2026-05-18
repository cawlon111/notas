import { createSlice, current } from '@reduxjs/toolkit';

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

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload;
      console.log('📝 Creando nota:', content);
      state.push({
        content,
        important: false,
        id: generateId(),
      });
      console.log('📋 Estado actual de notas:', current(state));
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      console.log('🔄 Cambiando importancia de nota con id:', id);
      console.log('📋 Estado ANTES del cambio:', current(state));
      
      const noteToChange = state.find(n => n.id === id);
      if (noteToChange) {
        noteToChange.important = !noteToChange.important;
      }
      
      console.log('📋 Estado DESPUÉS del cambio:', current(state));
    }
  },
});

export const { createNote, toggleImportanceOf } = noteSlice.actions;
export default noteSlice.reducer;
