import './styles/app/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 

import Join from './Components/Join/Join';
import Chat from './Components/Chat/Chat'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />}/>
        <Route path="/chat" element={<Chat />}/>
      </Routes>
    </Router>
  );
}

export default App;
