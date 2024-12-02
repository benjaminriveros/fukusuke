import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Header from './components/header/Header';
import Footer from "./components/Footer/Footer";
import { CartProvider } from "./components/Carrito/Carrito";

import Home from './pages/home/Home';
import Compra from './pages/Compra/Compra';
import Admin from './pages/Admin/Admin';
import Despacho from "./pages/Despacho/Despacho";





function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compra" element={<Compra />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/despacho" element={<Despacho />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>

  );
}

export default App;
