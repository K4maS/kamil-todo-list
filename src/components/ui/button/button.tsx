import clsx from 'clsx';
import styles from './button.module.css';

interface ButtonType {
  onClick: () => void;
  text: string;
  color?: 'green' | 'red';
}

export const Button: React.FC<ButtonType> = ({ onClick, text, color = 'green' }) => {
  const styleColor = color === 'red' ? styles.red : '';
  return (
    <button className={clsx(styles.btn, styleColor)} onClick={onClick}>
      {text}
    </button>
  );
};
