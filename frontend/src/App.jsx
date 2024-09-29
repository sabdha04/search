import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import About from './page/About'; 
import Search from './page/Search'; 
import Footer from './components/Footer';
import Navbar from './components/navbar';
import SearchNop from './page/SearchNop';

function App() {
  return (
    <>
    <Navbar/>
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} /> 
        <Route path='/search' element={<Search />} /> 
        <Route path='/searchN' element={<SearchNop />} /> 
      </Routes> 
    </ChakraProvider>
    <Footer/>
    </>
  );
}

export default App;
