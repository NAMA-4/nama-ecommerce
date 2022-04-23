import './App.css'
import Navbar from './components/Navbar'
// import Imageslider from './components/Imageslider'
// import ScrollableTabsButtonForce from './components/category'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import ShopInfo from './components/ShopInfo'
import ContentProduct from './components/ContentProduct'
import AddProducts from './components/AddProducts'

import AddProductTest from './components/AddProductTest'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar className="navbar-app" />
        {/* <Imageslider /> */}
        {/* <ScrollableTabsButtonForce className="category" /> */}
        <Routes>
          <Route path="/4" element={<AddProducts />} />
          <Route
            path="/test"
            element={
              <AddProductTest shopTitle="NAMA-Test" productCollection="2" />
            }
          />
          <Route
            path="/test10"
            element={
              <AddProductTest shopTitle="NAMA-Test" productCollection="10" />
            }
          />
          <Route path="/" element={<ContentProduct />} />
          <Route
            path="/1"
            element={
              <ShopInfo
                shopImg="./img/shop1.jpg"
                shopName="Nwe Moe Saung Korean Cosmetics Paradise"
                shopTitle="NAMA-Nwe Moe Saung"
              />
            }
          />
          <Route
            path="/2"
            element={
              <ShopInfo
                shopImg="./img/shop2.jpg"
                shopName="KT Vape & Pod Zone"
                shopTitle="NAMA-Vape&Pod"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
