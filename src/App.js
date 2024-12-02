import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Header from './components/header/Header';

import Home from './pages/home/Home';
<<<<<<< HEAD
=======

import { CartProvider } from "./pages/Carrito/Carrito";
>>>>>>> 94187ec81535fd283eeef943e55a312cb2a2aa82


function App() {
  return (

    <Router>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
    </Router>

  );
}

export default App;
