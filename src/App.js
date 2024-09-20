import './App.css';
import React from 'react'; 
import Registers from './Registers';
import User from './User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Escortdetails from './Escortdetails';
// import Example from './Example';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Example />} /> */}
        <Route path="/" element={<User />} />
        <Route path="/escortdetails/:EscortName" element={<Escortdetails />} />
        <Route path="/registers" element={<Registers/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
