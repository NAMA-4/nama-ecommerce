import './App.css'
import Navbar from './components/Navbar'
import Imageslider from './components/Imageslider'
// import ScrollableTabsButtonForce from './components/category'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import ActionAreaCard from './components/ShopInfo'
import ContentProduct from './components/ContentProduct'
import AddProducts from './components/AddProducts'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar className="navbar-app" />
        <Imageslider />
        <ActionAreaCard />
        {/* <ScrollableTabsButtonForce className="category" /> */}
        <Routes>
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/" element={<ContentProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
