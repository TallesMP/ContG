import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleForgotPassword = () => {
    navigate('/password');
  };

  const handleSignUp = () => {
    navigate('/signup')
  };


  return (
    <>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.icon} />
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Senha"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
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
    </>
  );
}

export default LoginForm;


