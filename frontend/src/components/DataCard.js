
import React from 'react';
import styles from './DataCard.module.css';

function DataCard({ children, width, height }) {
  return (
    <div
      className={styles.dataCard}
      style={{
        width: width || 'auto',
        height: height || 'auto',
      }}
    >
      {children}
    </div>
  );
}

export default DataCard;
