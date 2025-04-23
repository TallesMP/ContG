import React from 'react';
import { FaCog } from 'react-icons/fa';
import styles from './SidebarItem.module.css';

const SettingsItem = () => {
  return (
    <li className={styles.menuItem}>
      <FaCog />
      <span>Configurações</span>
    </li>
  );
};

export default SettingsItem;
