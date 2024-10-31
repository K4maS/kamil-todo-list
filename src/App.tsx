import { Header } from './components/layouts/header/header';
import { Layout } from './components/layouts/layoutComponent/layoutComponent';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './styles/App.css';
import { Suspense, useEffect } from 'react';
import React from 'react';
import { useUserStoreHooks } from './hooks/storeUserHooks';
import { getItemFromLocalStorage } from './util/localStorage';

const LazyListPage = React.lazy(() => import('./components/pages/toDoListPage/toDoListPage'));
const LazyLoginPage = React.lazy(() => import('./components/pages/loginPage/loginPage'));

function App() {
  const navigate = useNavigate();
  const { isAuth, setName, setAuth } = useUserStoreHooks();

  useEffect(() => {
    const localIsAuth = getItemFromLocalStorage('isAuth') || '';
    const localName = getItemFromLocalStorage('userName') || '';
    setName(localName);
    setAuth(localIsAuth);
  }, [setAuth, setName]);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [navigate, isAuth]);

  return (
    <div>
      <Layout>
        <>
          <Header />

          <Routes>
            <Route
              path='/'
              element={
                <Suspense fallback={'Загрузка...'}>
                  <LazyListPage />
                </Suspense>
              }
            />
            <Route
              path='/login'
              element={
                <Suspense fallback={'Загрузка...'}>
                  <LazyLoginPage />
                </Suspense>
              }
            />
          </Routes>
        </>
      </Layout>
    </div>
  );
}

export default App;
