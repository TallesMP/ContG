
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import styles from './LoginForm.module.css';
import CustomInput from './CustomInput';
import api from '../services/api';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.post('/user/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro de login:', error);
      alert(error.response?.data?.errors?.[0] || 'Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
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
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
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

