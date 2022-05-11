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
    shopState: 'hamburger',
    img: './img/8.png',
  },
  {
    shopState: 'pizza',
    img: './img/9.png',
  },
  {
    shopState: 'noodle',
    img: './img/10.png',
  },
  {
    shopState: 'malarshankaw',
    img: './img/11.png',
  },
  {
    shopState: 'rice',
    img: './img/15.png',
  },
  {
    shopState: 'myayo',
    img: './img/16.png',
  },
  {
    shopState: 'steak',
    img: './img/17.png',
  },
]
