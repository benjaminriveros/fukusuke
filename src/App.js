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
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import Unauthorized from './components/Unauthorized/Unauthorized';
import Menu from "./pages/Menu/Menu";




function App() {
  return (
    <CartProvider>
      <Router>
        <div id="root">
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/compra" element={<Compra />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="administrador">
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="/despacho" element={<Despacho />} />
              <Route path="/Dueno" element={<Dueno />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>

  );
}

export default App;
