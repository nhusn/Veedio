import './App.css';
import Footer from './Component/Footer';
import Header from './Component/Header';
import Home from './Pages/Home';
import LandingPage from './Pages/LandingPage';
import WatchHistory from './Pages/WatchHistory';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/watch-history' element={<WatchHistory/>}/>   
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
