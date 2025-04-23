import React from 'react';
import { FaListAlt } from 'react-icons/fa';
import styles from './SidebarItem.module.css';

const CategoryItem = () => {
  return (
    <li className={styles.menuItem}>
      <FaListAlt />
      <span>Categorias</span>
    </li>
  );
};

export default CategoryItem;
