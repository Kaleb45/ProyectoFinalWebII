import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
