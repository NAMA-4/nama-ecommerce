import './App.css'
import Navbar from './components/Navbar'
import Imageslider from './components/Imageslider'
import ScrollableTabsButtonForce from './components/category'
import RecipeReviewCard from './components/ContentProduct'
import { Routes, BrowserRouter, Route } from 'react-router-dom'

import AddProducts from './components/AddProducts'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar className="navbar-app" />
        <Imageslider />
        <ScrollableTabsButtonForce className="category" />
        <RecipeReviewCard />

        <Routes>
          <Route path="/addproducts" element={<AddProducts />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
