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
import Footer from "./components/Footer/Footer";

import { CartProvider } from "./components/Carrito/Carrito";


function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compra" element={<Compra />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>

  );
}

export default App;
