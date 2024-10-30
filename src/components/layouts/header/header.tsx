import { Button } from '../../ui/button/button';
import styles from './header.module.css';
import { SiTodoist } from 'react-icons/si';

export const Header = () => {
  return (
    <header className={styles.header}>
      <SiTodoist className={styles.logo} />
      <Button onClick={() => {}} text='Добавить' />
    </header>
  );
};
