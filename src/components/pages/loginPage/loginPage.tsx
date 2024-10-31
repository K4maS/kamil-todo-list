import { Button } from '../../ui/button/button';
import { Input } from '../../ui/input/input';
import styles from './loginPage.module.css';
import { useInput } from '../../../hooks/inputHook';
import { useUserStoreHooks } from '../../../hooks/storeUserHooks';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const loginInput = useInput();
  const passwordInput = useInput();

  const navigate = useNavigate();

  const { login, isAuth } = useUserStoreHooks();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ userName: loginInput.value, password: passwordInput.value });
  };

  useLayoutEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, login]);

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Авторизация </h1>

      <form className={styles.form} action='POST' onSubmit={onSubmit}>
        <Input type={'text'} placeholder='Логин' onInput={loginInput.onInput} value={loginInput.value} />
        <Input type={'password'} placeholder='Пароль' onInput={passwordInput.onInput} value={passwordInput.value} />

        <Button text='Войти' type={'submit'} />
      </form>
    </div>
  );
};

export default LoginPage;
