import clsx from 'clsx';
import styles from './button.module.css';

interface ButtonType {
  onClick?: () => void;
  text: string;
  color?: 'green' | 'red';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

export const Button: React.FC<ButtonType> = ({ onClick, text, color = 'green', active, type }) => {
  const styleColor = color === 'red' ? styles.red : '';
  const styleActive = active ? styles.active : '';
  return (
    <button className={clsx(styles.btn, styleColor, styleActive)} onClick={onClick} type={type}>
      {text}
    </button>
  );
};
