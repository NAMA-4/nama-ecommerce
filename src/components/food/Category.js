import React from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  return (
    <>
      <div className="food-category-box">
        {data.map((icon) => (
          <Link to={`/nama-food/${icon.shopState}`}>
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
    shopState: 'drink',
    img: './img/7.png',
  },
  {
    shopState: 'C',
    img: './img/8.png',
  },
  {
    shopState: 'D',
    img: './img/9.png',
  },
  {
    shopState: 'noodle',
    img: './img/10.png',
  },
  {
    shopState: 'F',
    img: './img/11.png',
  },
]
