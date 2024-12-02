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
import Dueno from "./pages/Dueno/Dueno";






function App() {
  return (
    <Router>
      <CartProvider>
        <div id="root">
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/compra" element={<Compra />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/despacho" element={<Despacho />} />
              <Route path="/Dueno" element={<Dueno />} />
              <Route path="/compra" element={<Compra />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </Router>

  );
}

export default App;
