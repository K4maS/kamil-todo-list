import { Header } from './components/layouts/header/header';
import { Layout } from './components/layouts/layoutComponent/layoutComponent';
import { ToDoListPage } from './components/pages/toDoListPage/toDoListPage';
import './styles/App.css';

function App() {
  return (
    <div>
      <Layout>
        <>
          <Header />
          <ToDoListPage />
        </>
      </Layout>
    </div>
  );
}

export default App;
