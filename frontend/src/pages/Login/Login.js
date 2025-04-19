import React from 'react';
import LoginForm from '../../components/LoginForm';
import Card from '../../components/Card';
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.body}>
      <Card>
        <header className={styles.header}>
          <h1 className={styles.title}>ContG</h1>
          <h3 className={styles.subtitle}>Faça login para continuar</h3>
        </header>
        <LoginForm />
      </Card>
    </div>
  );
}

export default Login;

