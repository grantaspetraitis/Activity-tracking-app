import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppContextProvider from './Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <AppContextProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
