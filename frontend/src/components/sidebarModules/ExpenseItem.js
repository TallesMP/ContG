import React from 'react';
import { FaListAlt, FaMoneyBill, FaMoneyBillWave } from 'react-icons/fa';
import styles from './SidebarItem.module.css';

const ExpenseItem = () => {
  return (
    <li className={styles.menuItem}>
      <FaMoneyBillWave />
      <span>Despesas</span>
    </li>
  );
};

export default ExpenseItem;
