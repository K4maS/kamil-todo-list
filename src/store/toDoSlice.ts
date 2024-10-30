import { createSlice} from '@reduxjs/toolkit';

export interface ToDoType {id: number,   text: string, done: boolean};

interface initialStateType {
    todoList: Array <ToDoType>;
    basket: Array <ToDoType>;
};

const initialState: initialStateType = {
    todoList: [{id: 0,   text: 'лорем ипсум и тд', done: false},],
    basket: [],
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addToDo: (state, action) => {
            const id = Math.max(...[...state.basket, ...state.todoList].map((elem) => elem.id)) + 1;
            state.todoList.push({id,   text: action.payload, done: false})
        },
        removeToDo: (state, action) => {
            state.basket= [...state.basket, ...state.todoList.filter((elem)=> elem.id === action.payload)]
            state.todoList= state.todoList.filter((elem)=> elem.id !== action.payload)
        },
        clearList: (state) => {
            state.basket= [...state.basket, ...state.todoList]
            state.todoList = [];
        },
        setStatus: (state, action ) => {
            state.todoList= state.todoList.map((elem)=> {
                if(elem.id === action.payload) {
                  elem.done = !elem.done
                }
                return elem
            })
        }   
    }
})

export const {addToDo, removeToDo, setStatus, clearList} = todoSlice.actions;

export default todoSlice.reducer;
