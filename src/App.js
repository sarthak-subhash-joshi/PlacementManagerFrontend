import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Profiles from './pages/Profiles';
import Page404 from './pages/Page404';
import Footer from './components/Footer'
import ScrollToTop from './pages/ScrollToTop';

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/profiles' element={<Profiles/>} />
          <Route path='/*' element={<Page404/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
} 

export default App;
