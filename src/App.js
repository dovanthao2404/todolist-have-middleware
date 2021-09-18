import logo from './logo.svg';
import './App.css';
import ToDoList from './components';
import "bootstrap/dist/css/bootstrap.min.css"
import ToDoListSaga from './components/Saga';


function App() {
  return (
    <>
      {/* <ToDoList /> */}
      <ToDoListSaga />
    </>
  );
}

export default App;
