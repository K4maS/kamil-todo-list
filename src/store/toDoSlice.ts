import { createSlice} from '@reduxjs/toolkit';
import { setItemToLocalStorage } from '../util/localStorage';

export interface ToDoType {id: number,   text: string, done: boolean};

interface initialStateType {
    todoList: Array <ToDoType>;
    basket: Array <ToDoType>;
};

const initialState: initialStateType = {
    todoList: [],
    basket: [],
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addToDo: (state, action: {
            payload: string;
        }) => {

            const maxId = Math.max(...[...state.basket, ...state.todoList].map((elem) => elem.id));
            const id = maxId >= 0 ? maxId + 1 : 0;

            console.log(id)
            state.todoList.push({id,   text: action.payload, done: false});
            setItemToLocalStorage('todoList', state.todoList);
            
        },

        setToDo: (state, action: {
            payload: ToDoType[];
        }) => {
            state.todoList = action.payload;
        },

  

        removeToDo: (state, action: {
            payload: number;
        }) => {
            state.basket= [...state.basket, ...state.todoList.filter((elem)=> elem.id === action.payload)];
            state.todoList= state.todoList.filter((elem)=> elem.id !== action.payload);
            setItemToLocalStorage('todoList', state.todoList);
            setItemToLocalStorage('basket', state.basket);
        },
        clearList: (state) => {
            state.basket= [...state.basket, ...state.todoList];
            state.todoList = [];
            setItemToLocalStorage('todoList', state.todoList);
            setItemToLocalStorage('basket', state.basket);
        },
        setStatus: (state, action: {
            payload: number;
        }) => {
            state.todoList= state.todoList.map((elem)=> {
                if(elem.id === action.payload) {
                  elem.done = !elem.done;
                }
                return elem;
            })
            setItemToLocalStorage('todoList', state.todoList);
        },
        getBackFromBasket: (state, action: {
            payload: number;
        }) =>  {
            state.todoList = [...state.basket.filter((elem)=> elem.id === action.payload), ...state.todoList];
            state.basket = state.basket.filter((elem)=> elem.id !== action.payload);
            setItemToLocalStorage('todoList', state.todoList);
            setItemToLocalStorage('basket', state.basket);
        },

        setBasket: (state, action: {
            payload: ToDoType[];
        }) => {
            state.basket = action.payload;
        },

    }
})

export const {addToDo, removeToDo, setStatus, clearList, getBackFromBasket, setToDo, setBasket} = todoSlice.actions;

export default todoSlice.reducer;
