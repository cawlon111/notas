const STORAGE_KEY = 'loggedNoteAppUser';

const saveUser = (user) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

const getUser = () => {
  const userJson = localStorage.getItem(STORAGE_KEY);
  if (!userJson) return null;
  return JSON.parse(userJson);
};

const removeUser = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export default { saveUser, getUser, removeUser };
