import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
