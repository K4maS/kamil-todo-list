import React from 'react';
import styles from './toDoListItem.module.css';
import { ToDoType } from '../../../../store/toDoSlice';
import { Button } from '../../../ui/button/button';
import clsx from 'clsx';

interface ItemType extends ToDoType {
  onDelete: () => void;
  onDone: () => void;
  onBasket: () => void;
  basket?: boolean;
}

const Item: React.FC<ItemType> = ({ text, done, onDelete, onDone, onBasket, basket = true }) => {
  return (
    <li className={clsx(styles.item, done ? styles.done : '')}>
      <h2 className={styles.text}>{text}</h2>

      <div className={styles.btns}>
        {!basket ? (
          <>
            <Button text={!done ? 'Выполнено' : 'Не выполнено'} onClick={onDone} />
            <Button text={'Удалить'} color={'red'} onClick={onDelete} />
          </>
        ) : (
          <Button text={'Восстановить'} onClick={onBasket} />
        )}
      </div>
    </li>
  );
};

export const ToDoListItem = React.memo(Item);
