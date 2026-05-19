import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await dispatch(loginUser(username, password));
    setIsLoading(false);
    if (!result.success) {
      setError(result.error);
      setTimeout(() => setError(''), 5000);
    } else {
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="login-form">
      <h2>Iniciar sesión</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario: </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña: </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
