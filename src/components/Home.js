import React from 'react'
import { ImagesliderMain } from './Imageslider'
import { Link } from 'react-router-dom'
// import ContentProduct from './ContentProduct'

const Home = (props) => {
  document.title = props.shopTitle
  return (
    <div>
      <ImagesliderMain />
      <FoodProductCategory />
      <RecentlyAdded />
      <EditorChoice />
      <JustForYou />
      {/* <ContentProduct productCollection="Products" /> */}
    </div>
  )
}

const FoodProductCategory = () => {
  return (
    <>
      <div className="food-product-box">
        <Link className="link" to="/nama-food">
          <div className="food">
            <img className="food-img" src="./img/food-logo.png" alt="" />
            <span> အစားအသောက်</span>
          </div>
        </Link>

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

const EditorChoice = () => {
  return (
    <>
      <h3 className="category-label">Editor's Choice</h3>
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

const JustForYou = () => {
  return (
    <>
      <h3 className="category-label">Just For You</h3>
      <div className="foryou-box">
        <div className="first-column">
          <img className="product-img" src="./img/1 (5).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="second-column">
          <img className="product-img" src="./img/1 (5).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="second-column">
          <img className="product-img" src="./img/1 (5).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="second-column">
          <img className="product-img" src="./img/1 (5).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="second-column">
          <img className="product-img" src="./img/1 (5).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="second-column">
          <img className="product-img" src="./img/1 (5).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="second-column">
          <img className="product-img" src="./img/1 (5).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="second-column">
          <img className="product-img" src="./img/1 (5).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="second-column">
          <img className="product-img" src="./img/1 (5).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
        <div className="second-column">
          <img className="product-img" src="./img/1 (5).png" alt="" />
          <span>P Name</span>
          <span>P Price</span>
        </div>
      </div>
    </>
  )
}

export default Home
