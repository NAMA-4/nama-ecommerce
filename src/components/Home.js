import React from 'react'
// import Imageslider from './Imageslider'
import ContentProduct from './ContentProduct'

const Home = (props) => {
  document.title = props.shopTitle
  return (
    <div>
      <ContentProduct productCollection="Products" />
    </div>
  )
}

export default Home
