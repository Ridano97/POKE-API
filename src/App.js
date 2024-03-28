import './App.css';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonsPage from './Pages/PokemonsPage';
import GenerationsPage from './Pages/GenerationsPage';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import PokemonDetailPage from './Pages/PokemonDetailPage';
import PokemonByType from './Pages/PokemonByType';
import PokemonByVersion from './Pages/PokemonByVersion';

function App() {
  return <>
    <BrowserRouter>
      <NavBar />
      <div className='p-5'></div>
      <Container>
        <Routes>
          <Route path="/" element={<PokemonsPage />} />
          <Route path="/pokemons" element={<PokemonsPage />} />
          <Route path='/generations/:idGeneration' element={<GenerationsPage />} />
          <Route path='/types/:idType' element={<PokemonByType/>} />
          <Route path='/versions/:idVersion' element={<PokemonByVersion/>} />
          <Route path='/pokemon/:id' element={<PokemonDetailPage />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  </>;
}

export default App;
