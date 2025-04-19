
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import styles from './LoginForm.module.css';
import CustomInput from './CustomInput';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleForgotPassword = () => {
    navigate('/password');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleLogin}>
        <CustomInput
          type="email"
          icon={<FaEnvelope />}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <CustomInput
          type="password"
          icon={<FaLock />}
          placeholder="Senha"
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
    </>
  );
}

export default LoginForm;

