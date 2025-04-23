import React from 'react';
import styles from './Sidebar.module.css';
import CategoryItem from './sidebarModules/CategoryItem';
import DashboardItem from './sidebarModules/DashboardItem';
import ExpenseItem from './sidebarModules/ExpenseItem';
import SettingsItem from './sidebarModules/SettingsItem';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.menu}>
        <DashboardItem />
        <ExpenseItem />
        <CategoryItem />
        <SettingsItem />
      </ul>
    </div>
  );
};

export default Sidebar;

