
import {Routes,Route} from 'react-router-dom'
import NavBar from './pages/NavBar';
import Home from './pages/Home';
import ForexNews from './pages/ForexNews';
import CryptoNews from './pages/CryptoNews';
import WorldNews from './pages/WorldNews';
import WorldSlide from './pages/WorldSlide';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Edit from './pages/Profile/Edit';
import SavedArticles from './pages/Profile/SavedArticles';
import Profile from './pages/Profile/Profile';
import SingleWorldNews from './pages/SingleWorldNews';

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
        <Route path='/worldnews/:title' element={<SingleWorldNews/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/edit' element={<Edit/>}/>
        <Route path='/savedarticles' element={<SavedArticles/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
