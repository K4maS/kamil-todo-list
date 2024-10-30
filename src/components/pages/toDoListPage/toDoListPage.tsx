import { useCallback, useEffect, useState } from 'react';
import { useStoreHooks } from '../../../hooks/storeHooks';
import { Button } from '../../ui/button/button';
import { Input } from '../../ui/input/input';
import { ToDoListItem } from './toDoListItem/toDoListItem';
import styles from './toDoListPage.module.css';
import { ListType, useSelectList } from '../../../hooks/useSelectList';
import { getItemFromLocalStorage } from '../../../util/localStorage';

export const ToDoListPage = () => {
  const { addToList, setDone, setDelete, setDeleteAll, getFromBasket, setBasketList, setTodoList } = useStoreHooks();
  const [toDoText, setTodoText] = useState<string>('');

  const { list, setListType, listType } = useSelectList();

  useEffect(() => {
    const localBasket = getItemFromLocalStorage('basket') || [];
    const localList = getItemFromLocalStorage('todoList') || [];
    setTodoList(localList);
    setBasketList(localBasket)
  }, []);

  const addElem = () => {
    if (toDoText) {
      addToList(toDoText);
    }
    setTodoText('');
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e) setTodoText(target.value);
  };

  const onSelectMainList = useCallback(() => {
    setListType(ListType.list);
  }, [setListType]);
  const onSelectDoneList = useCallback(() => {
    setListType(ListType.doneList);
  }, [setListType]);
  const onSelectInProgressList = useCallback(() => {
    setListType(ListType.inProcessList);
  }, [setListType]);
  const onSelectBasketList = useCallback(() => {
    setListType(ListType.basketList);
  }, [setListType]);

  const handleSetDone = useCallback((id: number) => setDone(id), [setDone]);
  const handleSetDelete = useCallback((id: number) => setDelete(id), [setDelete]);
  const handleGetFromBasket = useCallback((id: number) => getFromBasket(id), [getFromBasket]);

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <Input value={toDoText} placeholder='Моя задача' onInput={onInput} />
          <Button onClick={addElem} text={'Добавить'} />
          <Button onClick={setDeleteAll} text={'Переместить все в корзину'} color='red' />
        </div>
        <div className={styles.topRight}>
          <Button active={listType === ListType.list} onClick={onSelectMainList} text={'Все'} />
          <Button active={listType === ListType.doneList} onClick={onSelectDoneList} text={'Готовые'} />
          <Button active={listType === ListType.inProcessList} onClick={onSelectInProgressList} text={'В процессе'} />
          <Button active={listType === ListType.basketList} onClick={onSelectBasketList} text={'Корзина'} />
        </div>
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
