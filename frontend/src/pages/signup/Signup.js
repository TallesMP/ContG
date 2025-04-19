import React from 'react';
import LoginForm from '../../components/LoginForm';
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>ContG</h1>
          <h3 className={styles.subtitle}>Faça login para continuar</h3>
        </header>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;

