import './App.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import RSVP from './pages/RSVP';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RSVP />} />
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
