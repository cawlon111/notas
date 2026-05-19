import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import noteService from '../services/notes';
import storage from '../utils/storage';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    }
  },
});

export const { setUser, clearUser } = userSlice.actions;

// Thunks para autenticación
export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      noteService.setToken(user.token);
      storage.saveUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Usuario o contraseña incorrectos' };
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(clearUser());
    noteService.setToken(null);
    storage.removeUser();
  };
};

export const initializeUser = () => {
  return async (dispatch) => {
    const user = storage.getUser();
    if (user) {
      dispatch(setUser(user));
      noteService.setToken(user.token);
    }
  };
};

export default userSlice.reducer;
