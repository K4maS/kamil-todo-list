import React from 'react';
import styles from './layoutComponent.module.css';

interface LayoutType {
  children: JSX.Element;
}

export const Layout: React.FC<LayoutType> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
