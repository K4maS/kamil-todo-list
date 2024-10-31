import { useCallback, useEffect } from 'react';
import { useStoreHooks } from '../../../hooks/storeHooks';
import { Button } from '../../ui/button/button';
import { Input } from '../../ui/input/input';
import { ToDoListItem } from './toDoListItem/toDoListItem';
import styles from './toDoListPage.module.css';
import { ListType, useSelectList } from '../../../hooks/useSelectList';
import { getItemFromLocalStorage } from '../../../util/localStorage';
import { useInput } from '../../../hooks/inputHook';

export const ToDoListPage = () => {
  const { addToList, setDone, setDelete, setDeleteAll, getFromBasket, setBasketList, setTodoList } = useStoreHooks();

  const { onInput, value, setValue } = useInput();

  const { list, listType, btnsList } = useSelectList();

  useEffect(() => {
    const localBasket = getItemFromLocalStorage('basket') || [];
    const localList = getItemFromLocalStorage('todoList') || [];
    setTodoList(localList);
    setBasketList(localBasket);
  }, []);

  const addElem = () => {
    if (value) {
      addToList(value);
    }
    setValue('');
  };

  const handleSetDone = useCallback((id: number) => setDone(id), [setDone]);
  const handleSetDelete = useCallback((id: number) => setDelete(id), [setDelete]);
  const handleGetFromBasket = useCallback((id: number) => getFromBasket(id), [getFromBasket]);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Мои задачи</h1>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <Input value={value} placeholder='Моя задача' onInput={onInput} />
          <Button onClick={addElem} text={'Добавить'} />
          <Button onClick={setDeleteAll} text={'Переместить все в корзину'} color='red' />
        </div>
        <div className={styles.topRight}>{btnsList}</div>
      </div>

      {list.length > 0 ? (
        <ul className={styles.list}>
          {list.map((elem) => {
            return (
              <ToDoListItem
                id={elem.id}
                key={elem.id}
                done={elem.done}
                text={elem.text}
                onDone={() => handleSetDone(elem.id)}
                onDelete={() => handleSetDelete(elem.id)}
                onBasket={() => handleGetFromBasket(elem.id)}
                basket={listType === ListType.basketList}
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

export default ToDoListPage;
