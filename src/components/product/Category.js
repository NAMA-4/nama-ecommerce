import React from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  return (
    <>
      <div className="food-category-box">
        {data.map((icon) => (
          <Link to={`/nama-product/${icon.shopState}`} target="_blank">
            <img className="food-icon" src={icon.img} alt="" />
          </Link>
        ))}
      </div>
    </>
  )
}

export default Category

const data = [
  {
    shopState: 'perfume',
    img: './img/12.png',
  },
  {
    shopState: 'cosmetics',
    img: './img/13.png',
  },
  // {
  //   shopState: 'D',
  //   img: './img/14.png',
  // },
]
