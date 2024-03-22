import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Profiles from './pages/Profiles';
import Page404 from './pages/Page404';
import Footer from './components/Footer'
import ListJobs from './pages/ListJobs';
import ScrollToTop from './pages/ScrollToTop';
import AddStudent from './components/AddStudent';
import ProfileDetails from './pages/ProfileDetails';
import UpdateStudentRecord from './pages/UpdateStudentRecord';

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/profiles' element={<Profiles/>} />
          <Route path='/add_student' element={<AddStudent/>} />
          <Route path='/opening' element={<ListJobs/>} />
          <Route path='/profile/:id' element={<ProfileDetails/>}/>
          <Route path='/update_student_record/:id' element={<UpdateStudentRecord/>} />
          <Route path='/*' element={<Page404/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
} 

export default App;
