import React, { useState, useEffect } from 'react'
import { ImagesliderFood } from './Imageslider'
import Category from './food/Category'
import { Link } from 'react-router-dom'
import { firestore } from '../config/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

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
  const [shops, setShops] = useState([
    { shopName: 'Loading...', shopId: 'Initial' },
  ])

  useEffect(() => {
    const collectionRef = collection(firestore, 'Food')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    onSnapshot(q, (snapshot) => {
      setShops(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, [])

  return (
    <>
      <h3 className="category-label">အစားအသောက်ဆိုင်များ</h3>
      <div className="food-shop-box">
        {shops.slice(0, 4).map((shop) => (
          <div>
            <div className="shop-card">
              <Link to={`/nama-food/shop/${shop.shopId}`} target="_blank">
                <img className="shopimg" src={shop.shopImg} alt="" />
              </Link>
              <span className="shopname">{shop.shopName}</span>
            </div>
          </div>
        ))}
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
