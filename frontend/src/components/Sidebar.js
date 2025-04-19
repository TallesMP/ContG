
import React from 'react';
import styles from './Sidebar.module.css';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <FaHome />
          <span>Home</span>
        </li>
        <li className={styles.menuItem}>
          <FaUser />
          <span>Perfil</span>
        </li>
        <li className={styles.menuItem}>
          <FaCog />
          <span>Configurações</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

