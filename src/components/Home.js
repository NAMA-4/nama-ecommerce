import React from 'react'
import Imageslider from './Imageslider'
// import ContentProduct from './ContentProduct'

const Home = (props) => {
  document.title = props.shopTitle
  return (
    <div>
      <Imageslider />
      <FoodProductCategory />
      <RecentlyAdded />
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

const RecentlyAdded = () => {
  return (
    <>
      <h3 className="category-label">Recently Added</h3>
      <div className="recently-added-box">
        <div className="card-box">
          <img src="./img/1 (3).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/1 (6).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/1 (4).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/1 (1).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/1 (2).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
      </div>
    </>
  )
}

export default Home
