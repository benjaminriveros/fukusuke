import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Header from './components/header/Header';

import Home from './pages/home/Home';
import Compra from './pages/Compra/Compra';
import Admin from './pages/Admin/Admin';

import { CartProvider } from "./pages/Carrito/Carrito";


function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compra" element={<Compra />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </CartProvider>
    </Router>

  );
}

export default App;
