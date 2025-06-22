import  { BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  

  return (
    <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/products' element={<Products/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
