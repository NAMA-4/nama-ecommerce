import React from 'react'

const Category = () => {
  return (
    <div className="food-category-box">
      <div className="cat1">
        <img className="food-icon" src="./img/breakfast-logo.png" alt="" />
        <h5>မနက်စာ</h5>
      </div>
      <div className="cat2">
        <img className="food-icon" src="./img/lunch-logo.png" alt="" />
        <h5>နေ့လည်စာ</h5>
      </div>
      <div className="cat3">
        <img className="food-icon" src="./img/dinner-logo.png" alt="" />
        <h5>ညနေစာ</h5>
      </div>
    </div>
  )
}

export default Category
