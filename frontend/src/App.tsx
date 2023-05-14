import HomePage from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Main from './components/Main/Main';


function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>} />
        </Routes>
      </Router>
  
    </div>
  );
}

export default App;
