import React from 'react'

const LoginForm = ({ 
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <div className="login-form">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario: </label>
          <input
            data-testid="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label>Contraseña: </label>
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default LoginForm