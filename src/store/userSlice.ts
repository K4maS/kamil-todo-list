import { createSlice} from '@reduxjs/toolkit';
import { setItemToLocalStorage } from '../util/localStorage';


export interface ToDoType {id: number,   text: string, done: boolean};
export interface UserType {
    userName: string,
    password: string,
}

interface initialStateType {
    userName: string;
    isAuth: boolean;
    users: UserType[];
    error: string;
};

const initialState: initialStateType = {
    users: [{
        userName: 'admin',
        password: 'admin',
    }],
    userName: '',
    isAuth: false,
    error: '',
}

const userSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        doLogin: (state, action: {
            payload: UserType;
        }) => {
          const currentUser = state.users.find((elem)=> elem.userName === action.payload.userName);
          if(currentUser?.password === action.payload.password) {
            state.isAuth = true;
            state.error = '';
            state.userName = currentUser.userName;
            setItemToLocalStorage('isAuth', state.isAuth);
            setItemToLocalStorage('userName', state.userName);
          }
          else {
            state.error = 'По секрету скажу что Login: admin, Password: admin'
            }
        },

        doLogaut: (state) => {
            state.isAuth = false;
            state.userName = '';
            setItemToLocalStorage('isAuth','');
            setItemToLocalStorage('userName', '');
        },
        setUserName: (state, action:  {
            payload: string;
        }) => {
            state.userName = action.payload;
        },
        setIsAuth: (state, action:  {
            payload: boolean;
        }) => {
            state.isAuth = action.payload;
        },
    }
})

export const {doLogin, doLogaut, setUserName, setIsAuth } = userSlice.actions;

export default userSlice.reducer;
