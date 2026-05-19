import { createSlice } from '@reduxjs/toolkit';
import noteService from '../services/notes';

const initialState = [];

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes(state, action) {
      return action.payload;
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    updateNote(state, action) {
      const updatedNote = action.payload;
      const index = state.findIndex(note => note.id === updatedNote.id);
      if (index !== -1) {
        state[index] = updatedNote;
      }
    },
    deleteNote(state, action) {
      const id = action.payload;
      return state.filter(note => note.id !== id);
    }
  },
});

export const { setNotes, appendNote, updateNote, deleteNote } = noteSlice.actions;

// Action creators asíncronos (thunks)
export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = {
      content,
      important: false
    };
    const savedNote = await noteService.create(newNote);
    dispatch(appendNote(savedNote));
  };
};

export const toggleImportanceOf = (id) => {
  return async (dispatch, getState) => {
    const note = getState().notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };
    const updatedNote = await noteService.update(id, changedNote);
    dispatch(updateNote(updatedNote));
  };
};

export const removeNote = (id) => {
  return async (dispatch) => {
    await noteService.deleteNote(id);
    dispatch(deleteNote(id));
  };
};

export default noteSlice.reducer;
