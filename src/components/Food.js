import React from 'react'
import { ImagesliderFood } from './Imageslider'
import Category from './food/Category'
import { Link } from 'react-router-dom'

const Food = () => {
  console.log('HIdosjf')
  return (
    <div>
      <ImagesliderFood />
      <Category />
      <FoodShopBox />
      <RecentlyAdded />
      <EditorChoice />
    </div>
  )
}

const FoodShopBox = () => {
  return (
    <>
      <h3 className="category-label">အစားအသောက်ဆိုင်များ</h3>

      <div className="food-shop-box">
        <div className="shop-card">
          <img className="shopimg" src="./img/shop.jpg" alt="" />
          <span className="shopname">Shop Name</span>
        </div>
        <div className="shop-card">
          <img className="shopimg" src="./img/shop.jpg" alt="" />
          <span className="shopname">Shop Name</span>
        </div>
        <div className="shop-card">
          <img className="shopimg" src="./img/shop.jpg" alt="" />
          <span className="shopname">Shop Name</span>
        </div>
        <div className="shop-card">
          <img className="shopimg" src="./img/shop.jpg" alt="" />
          <span className="shopname">Shop Name</span>
        </div>
        <div className="shop-card">
          <img className="shopimg" src="./img/shop.jpg" alt="" />
          <span className="shopname">Shop Name</span>
        </div>
        <Link className="to-more link" to="/nama-food/shop">
          <div className="more-text">ဆိုင်များသို့>>></div>
        </Link>
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
          <img src="./img/9 (1).jpg" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/9 (2).jpg" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/9 (3).jpg" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/15 (8).jpg" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/15 (9).jpg" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
      </div>
    </>
  )
}

const EditorChoice = () => {
  return (
    <>
      <h3 className="category-label">Editor's Choice</h3>
      <div className="recently-added-box">
        <div className="card-box">
          <img src="./img/9 (1).jpg" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/9 (2).jpg" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/9 (3).jpg" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/15 (8).jpg" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="card-box">
          <img src="./img/15 (9).jpg" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
      </div>
    </>
  )
}

export default Food
