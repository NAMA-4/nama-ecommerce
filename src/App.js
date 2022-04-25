import './App.css'
import Navbar from './components/Navbar'
// import Imageslider from './components/Imageslider'
// import ScrollableTabsButtonForce from './components/category'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import ShopInfo from './components/ShopInfo'
// import ContentProduct from './components/ContentProduct'
import AddProducts from './components/AddProducts'
import Home from './components/Home'

import AddProductTest from './components/AddProductTest'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar className="navbar-app" />
        {/* <Imageslider /> */}
        {/* <ScrollableTabsButtonForce className="category" /> */}
        <Routes>
          <Route path="/" element={<Home shopTitle="NAMA" />} />

          <Route path="/4" element={<AddProducts />} />
          <Route
            path="/14"
            element={
              <AddProductTest
                shopTitle="NAMA-Nwe Moe Saung"
                productCollection="Products"
              />
            }
          />
          <Route
            path="/24"
            element={
              <AddProductTest shopTitle="NAMA-Vape&Pod" productCollection="2" />
            }
          />
          <Route
            path="/test"
            element={
              <AddProductTest shopTitle="NAMA-Test" productCollection="10" />
            }
          />

          <Route
            path="/1"
            element={
              <ShopInfo
                shopImg="./img/shop1.jpg"
                shopName="Nwe Moe Saung Korean Cosmetics Paradise"
                shopTitle="NAMA-Nwe Moe Saung"
                productCollection="Products"
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
                productCollection="2"
                productType={['vape', 'pod', 'ဆက်စပ်ပစ္စည်း']}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
