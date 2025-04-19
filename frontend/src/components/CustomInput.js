import React from 'react';
import styles from './CustomInput.module.css';

function CustomInput({ type = 'text', icon, placeholder, value, onChange }) {
  return (
    <div className={styles.inputContainer}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default CustomInput;
