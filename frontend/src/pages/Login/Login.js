
import React, { useState } from 'react';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleForgotPassword = () => {
    alert('Redirecionando para "Esqueci a senha"...');
  };

  const handleSignUp = () => {
    alert('Redirecionando para "Criar conta"...');
  };

  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>ContG</h1>
          <h3 className={styles.subtitle}>Faça login para continuar</h3>
        </header>
        <form className={styles.form} onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
        <div className={styles.linkContainer}>
          <button className={styles.linkButton} onClick={handleForgotPassword}>
            Esqueci a senha
          </button>
          <button className={styles.linkButton} onClick={handleSignUp}>
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

