
import './App.css';
import Board from './pages/Board/Board';
import Header from './components/Header/Header';
import Backlog from './pages/Backlog/Backlog';

function App() {
  return (
    <div className='App'>
      <Header />
      <Board />
      <Backlog />
    </div>
  );
}

export default App;