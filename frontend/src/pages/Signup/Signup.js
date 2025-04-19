import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaKey, FaArrowLeft } from 'react-icons/fa';
import CustomInput from '../../components/CustomInput';
import Card from '../../components/Card';
import api from '../../services/api';
import styles from './Signup.module.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setUsername] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const isFormValid = () => name.trim() && isValidEmail(email) && password.trim() && code.length === 6;

  const handleSendCode = async () => {
    try {
      const response = await api.post('/email', { email });
      alert(response.data.message || 'Código enviado com sucesso!');
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || 'Ocorreu um erro inesperado. Tente novamente.';
      alert(errorMessage);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user', {
        name,
        email,
        password,
        code,
      });
      alert(response.data.message || `Bem-vindo, ${name}!`);
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className={styles.body}>
      {/* Botão no canto superior esquerdo */}
      <button
        type="button"
        className={styles.navigateButton} // Classe para posicionamento no canto esquerdo
        onClick={() => navigate('/login')}
      >
        <FaArrowLeft /> Login
      </button>

      <Card>
        <header className={styles.header}>
          <h1 className={styles.title}>Criar Conta</h1>
          <h3 className={styles.subtitle}>Preencha os campos abaixo</h3>
        </header>
        <form className={styles.form} onSubmit={handleSignup}>
          <CustomInput
            type="text"
            icon={<FaUser />}
            placeholder="Nome de Usuário"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <div className={styles.codeContainer}>
            <CustomInput
              type="text"
              icon={<FaKey />}
              placeholder="Código"
              value={code}
              onChange={(e) => {
                const inputCode = e.target.value;
                if (/^\d*$/.test(inputCode) && inputCode.length <= 6) {
                  setCode(inputCode);
                }
              }}
              required
            />
            <button
              type="button"
              className={styles.codeButton}
              onClick={handleSendCode}
              disabled={!isValidEmail(email)}
            >
              Enviar Código
            </button>
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={!isFormValid()}
          >
            Cadastrar
          </button>
        </form>
      </Card>
    </div>
  );
}

export default Signup;

