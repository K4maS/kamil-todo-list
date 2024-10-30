import { useCallback, useMemo, useState } from 'react';
import { useStoreHooks } from '../../../hooks/storeHooks';
import { Button } from '../../ui/button/button';
import { Input } from '../../ui/input/input';
import { ToDoListItem } from './toDoListItem/toDoListItem';
import styles from './toDoListPage.module.css';

export const ToDoListPage = () => {
  const { toDoList, addToList, setDone, setDelete, setDeleteAll } = useStoreHooks();
  const [toDoText, setTodoText] = useState<string>('');

  const id = Math.max(...toDoList.map((elem) => elem.id)) + 1;

  const addElem = () => {
    if (toDoText) {
      addToList(toDoText);
    }
    setTodoText('');
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    console.log(target.value);
    if (e) setTodoText(target.value);
  };

  const handleSetDone = useCallback((id: number) => setDone(id), [setDone]);
  const handleSetDelete = useCallback((id: number) => setDelete(id), [setDelete]);
  const listMemo = useMemo(() => toDoList, [toDoList]);

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <Input value={toDoText} placeholder='Моя задача' onInput={onInput} />
        <Button onClick={addElem} text={'Добавить'} />
        <Button onClick={setDeleteAll} text={'Удалить все'} color='red' />
      </div>
      {listMemo.length > 0 ? (
        <ul className={styles.list}>
          {listMemo.map((elem) => {
            return (
              <ToDoListItem
                id={elem.id}
                key={elem.id}
                done={elem.done}
                text={elem.text}
                onDone={() => handleSetDone(elem.id)}
                onDelete={() => handleSetDelete(elem.id)}
              />
            );
          })}
        </ul>
      ) : (
        <h2>Пусто</h2>
      )}
    </div>
  );
};
