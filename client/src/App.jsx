import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppContextProvider from './Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ActivityAdder from './pages/ActivityAdder';
import Activities from './pages/Activities';
import Verify from './pages/Verify';
import NewActivity from './pages/NewActivity';

function App() {
  return (
    <AppContextProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/addactivity' element={<ActivityAdder />} />
          <Route path='/activities' element={<Activities />} />
          <Route path='/verify/:token' element={<Verify />} />
          <Route path='/addnewactivity' element={<NewActivity />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
