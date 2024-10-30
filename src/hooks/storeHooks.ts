import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store'; // импортируйте ваши типы состояния и dispatch
import { addToDo, clearList, removeToDo, setStatus, ToDoType } from '../store/toDoSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useStoreHooks = () => {
    const dispatch = useAppDispatch();

    const toDoList = useAppSelector(state => state.todo.todoList);

    const addToList = (text: string)  => dispatch(addToDo(text));
    const setDone = (id: number)  => dispatch(setStatus(id));
    const setDelete= (id: number)  => dispatch(removeToDo(id));
    const setDeleteAll = ()  => dispatch(clearList());

    return {toDoList, addToList, setDone, setDelete, setDeleteAll}
}