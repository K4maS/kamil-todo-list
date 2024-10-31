import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store'; 
import { addToDo, clearList, getBackFromBasket, removeToDo, setBasket, setStatus, setToDo, ToDoType } from '../store/toDoSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useStoreHooks = () => {
    const dispatch = useAppDispatch();
    
    const toDoList = useAppSelector(state => state.todo.todoList);
    const doneList = useAppSelector(state => state.todo.todoList.filter(elem=> elem.done));
    
    const basketList = useAppSelector(state => state.todo.basket);
    const inProcessList = useAppSelector(state => state.todo.todoList.filter(elem=> !elem.done));

    const addToList = (text: string)  => dispatch(addToDo(text));
    const setDone = (id: number)  => dispatch(setStatus(id));
    const setDelete= (id: number)  => dispatch(removeToDo(id));
    
    const setDeleteAll = ()  => dispatch(clearList());
    const getFromBasket = (id: number) => dispatch(getBackFromBasket(id));
    
    const setTodoList = (list: ToDoType[]) => dispatch(setToDo(list));
    const setBasketList = (list: ToDoType[]) => dispatch(setBasket(list));

    return {
        toDoList, 
        basketList, 
        inProcessList,
        doneList,
        setTodoList,
        setBasketList, 
        addToList, 
        setDone, 
        setDelete,
        setDeleteAll,
        getFromBasket
    }
}