import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { doLogaut, doLogin, setIsAuth, setUserName, UserType } from '../store/userSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useUserStoreHooks = () => {
    const dispatch = useAppDispatch();
     
    const isAuth = useAppSelector(state => state.user.isAuth);
    const userName = useAppSelector(state => state.user.userName);
    const error =  useAppSelector(state => state.user.error);
    

    const logout = () => {dispatch (doLogaut())}
    const login = (data: UserType) => {dispatch (doLogin(data))}
    const setName = (data: string) => {dispatch (setUserName(data) )}
    const setAuth = (data: boolean) => {dispatch (setIsAuth(data) )}

    return { isAuth, userName, login, error, logout, setName, setAuth}
}