
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
            <div className="container">
              <Routes >
                <Route path='/' exact element={<Home />} />
              </Routes>
            </div>
      </Router>
    </div>
  );
}

export default App;
