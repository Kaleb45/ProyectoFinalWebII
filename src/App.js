import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Novedades from './components/Novedades';
import Ebooks from './components/Ebooks';
import ImpresionBajoDemanda from './components/ImpresionBajoDemanda';
import Libros from './components/Libros';
import Ayuda from './components/Ayuda';
import SobreNosotros from './components/SobreNosotros';
import Account from './components/Account';
import Favourites from './components/Favourites';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Menu />

          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/libros" element={<Libros />} />
              <Route path="/novedades" element={<Novedades />} />
              <Route path="/ebooks" element={<Ebooks />} />
              <Route path="/impresion-bajo-demanda" element={<ImpresionBajoDemanda />} />
              <Route path="/ayuda" element={<Ayuda />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/account" element={<Account />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
