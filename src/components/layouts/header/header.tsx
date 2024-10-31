import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button/button';
import styles from './header.module.css';
import { SiProtodotio } from 'react-icons/si';
import { useUserStoreHooks } from '../../../hooks/storeUserHooks';

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth, logout, userName } = useUserStoreHooks();
  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.logoBlock}>
        <SiProtodotio className={styles.logo} size={40} /> <strong>К списку</strong>
      </Link>

      {isAuth ? (
        <div className={styles.authBtn}>
          <h1 className={styles.userName}>{userName}</h1>
          <Button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            text={'Выйти'}
          />
        </div>
      ) : (
        <Button
          onClick={() => {
            navigate('/login');
          }}
          text={'Войти'}
        />
      )}
    </header>
  );
};
