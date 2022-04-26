import React from 'react'
import Imageslider from './Imageslider'
// import ContentProduct from './ContentProduct'

const Home = (props) => {
  document.title = props.shopTitle
  return (
    <div>
      <Imageslider />
      <FoodProductCategory />
      {/* <ContentProduct productCollection="Products" /> */}
    </div>
  )
}

const FoodProductCategory = () => {
  return (
    <>
      <div className="food-product-box">
        <div className="food">
          <img className="food-img" src="./img/food-logo.png" alt="" />
          <span> အစားအသောက်</span>
        </div>
        <div className="product">
          <img className="product-img" src="./img/product-logo.png" alt="" />
          <span> ကုန်ပစ္စည်း</span>
        </div>
      </div>
    </>
  )
}

export default Home
