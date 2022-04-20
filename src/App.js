import './App.css'
import Navbar from './components/Navbar'
import Imageslider from './components/Imageslider'
import ScrollableTabsButtonForce from './components/category'
import RecipeReviewCard from './components/ContentProduct'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import ActionAreaCard from './components/ShopInfo'

import AddProducts from './components/AddProducts'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar className="navbar-app" />
        <Imageslider />
        <ActionAreaCard />
        <ScrollableTabsButtonForce className="category" />
        <Routes>
          <Route path="/addproducts" element={<AddProducts />} />
        </Routes>
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
        <RecipeReviewCard />
      </BrowserRouter>
    </div>
  )
}

export default App
