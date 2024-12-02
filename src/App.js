import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Header from './components/header/Header';

import Home from './pages/home/Home';

import { CartProvider } from "./pages/Carrito/Carrito";


function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>

  );
}

export default App;
