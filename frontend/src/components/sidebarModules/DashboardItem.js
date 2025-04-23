import React from 'react';
import { FaThLarge } from 'react-icons/fa';
import styles from './SidebarItem.module.css';

const DashboardItem = () => {
  return (
    <li className={styles.menuItem}>
      <FaThLarge />
      <span>Dashboard</span>
    </li>
  );
};

export default DashboardItem;
