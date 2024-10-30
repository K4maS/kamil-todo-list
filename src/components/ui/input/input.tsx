import styles from './input.module.css';

interface InputType {
  onInput: React.FormEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
}

export const Input: React.FC<InputType> = ({ onInput, value, placeholder, ...rest }) => {
  return <input className={styles.input} onInput={onInput} placeholder={placeholder} value={value} {...rest} />;
};
