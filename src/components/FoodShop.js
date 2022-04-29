import React from 'react'
import { ImagesliderFood } from './Imageslider'
import Category from './foodshop/Category'

const FoodShop = () => {
  console.log('HIdosjf')
  return (
    <div>
      <ImagesliderFood />
      <Category />
      <RecentlyAdded />
      <EditorChoice />
    </div>
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
      <h3 className="category-label">EditorChoice</h3>
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

export default FoodShop
