import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import AllRoutes from './routes';

function App() {
  return (
    <div className="App">
      <Router>
        <AllRoutes/>
      </Router>
    </div>
  );
}

export default App;
