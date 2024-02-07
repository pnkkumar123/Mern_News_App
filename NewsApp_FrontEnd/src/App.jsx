
import {Routes,Route} from 'react-router-dom'
import NavBar from './pages/NavBar';
import Home from './pages/Home';
import ForexNews from './pages/ForexNews';
import CryptoNews from './pages/CryptoNews';
import WorldNews from './pages/WorldNews';
import WorldSlide from './pages/WorldSlide';

function App() {
 

  return (
    <>
      <NavBar/>
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route path='/worldslide' element={<WorldSlide/>}/>
        <Route  path='/forexnews' element={<ForexNews/>}/>
        <Route  path='/cryptonews' element={<CryptoNews/>}/>
        <Route  path='/worldnews' element={<WorldNews/>}/>
      </Routes>
    </>
  )
}

export default App
