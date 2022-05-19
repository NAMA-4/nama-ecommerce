import './App.css'
import Navbar from './components/Navbar'
// import Imageslider from './components/Imageslider'
// import ScrollableTabsButtonForce from './components/category'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import ShopInfo from './components/ShopInfo'
// import ContentProduct from './components/ContentProduct'
import AddProducts from './components/AddProducts'
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'

import AddProductTest from './components/AddProductTest'
import Food from './components/food/Food'
import Food4 from './components/food/Food4'
import FoodShop from './components/food/FoodShop'
import AddFood from './components/food/AddFood'
import FoodShopDetails4 from './components/food/FoodShopDetails4'
import FoodShopDetails from './components/food/FoodShopDetails'
import FoodCategoryDetails from './components/food/FoodCategoryDetails'
import Product from './components/product/Product'
import AddProduct from './components/product/AddProduct'
import ProductShopDetails4 from './components/product/ProductShopDetails4'
import Product4 from './components/product/Product4'
import ProductShopDetails from './components/product/ProductShopDetails'
import ProductDetails from './components/product/ProductDetails'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar className="navbar-app" />
        {/* <Imageslider /> */}
        {/* <ScrollableTabsButtonForce className="category" /> */}
        <Routes>
          <Route path="/nama-food" element={<Food />} />
          {/* 4 */}
          <Route path="/nama-food/4" element={<Food4 />} />
          <Route
            path="/nama-food/:shopState/*"
            element={<FoodCategoryDetails />}
          />

          <Route path="/nama-food/shop" element={<FoodShop />} />
          {/* 4 */}
          <Route path="/nama-food/shop/4" element={<AddFood />} />

          <Route
            path="/nama-food/shop/:shopId/*"
            element={<FoodShopDetails />}
          />
          {/* 4 */}
          <Route
            path="/nama-food/shop/:shopId/4"
            element={<FoodShopDetails4 />}
          />

          <Route path="/nama-product" element={<Product />} />
          {/* 4 */}
          <Route path="/nama-product/4" element={<Product4 />} />

          {/* 4 */}
          <Route path="/nama-product/shop/4" element={<AddProduct />} />
          <Route
            path="/nama-product/shop/:shopId/*"
            element={<ProductShopDetails />}
          />
          {/* 4 */}
          <Route
            path="/nama-product/shop/:shopId/4"
            element={<ProductShopDetails4 />}
          />
          <Route
            path="/nama-product/shop/:shopId/:productId/*"
            element={<ProductDetails />}
          />

          <Route path="/" element={<Home shopTitle="NAMA" />} />
          <Route path="/products/:productId/" element={<ProductDetail />} />

          <Route path="/4" element={<AddProducts />} />

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
                // productType={[]}
              />
            }
          />
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
          <Route
            path="/24"
            element={
              <AddProductTest shopTitle="NAMA-Vape&Pod" productCollection="2" />
            }
          />

          <Route
            path="/3"
            element={
              <ShopInfo
                shopImg="./img/shop3.jpg"
                shopName="Myst Perfume"
                shopTitle="NAMA-Myst Perfume"
                productCollection="3"
                productType={['woman', 'man']}
              />
            }
          />
          <Route
            path="/34"
            element={
              <AddProductTest
                shopTitle="NAMA-Myst Perfume"
                productCollection="3"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
