import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RSVP from './pages/RSVP';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<RSVP />}></Route>
          <Route path='/signin' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>
          <Route path='/admin' element={<AdminPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
