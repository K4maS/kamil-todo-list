import clsx from 'clsx';
import styles from './button.module.css';

interface ButtonType {
  onClick?: () => void;
  text: string;
  color?: 'green' | 'red';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
}

export const Button: React.FC<ButtonType> = ({ onClick, text, color = 'green', active, type, disabled }) => {
  const styleColor = color === 'red' ? styles.red : '';
  const styleActive = active ? styles.active : '';
  const styleDisbaled = disabled ? styles.disabled : '';
  return (
    <button
      className={clsx(styles.btn, styleColor, styleActive, styleDisbaled)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};
