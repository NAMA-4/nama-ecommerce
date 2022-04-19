import './App.css'
import Navbar from './components/Navbar'
import Imageslider from './components/Imageslider'
import ScrollableTabsButtonForce from './components/category'
import TitlebarBelowImageList from './components/ContentProduct'
function App() {
  return (
    <div className="App">
      <Navbar className="navbar-app" />
      <Imageslider />
      <ScrollableTabsButtonForce className="category" />
      <TitlebarBelowImageList />
    </div>
  )
}

export default App
