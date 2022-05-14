import React, { useState, useEffect } from 'react'
import { ImagesliderFood } from '../Imageslider'
import Category from './Category'
import { Link } from 'react-router-dom'
import { firestore } from '../../config/firebase'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

const Food = () => {
  return (
    <div>
      <ImagesliderFood />
      <Category />
      <EditorChoice />
      <FoodShop />
    </div>
  )
}

export default Food

const EditorChoice = () => {
  const [shops, setShops] = useState([
    { shopName: 'Loading...', shopId: 'Initial' },
  ])

  useEffect(() => {
    const collectionRef = collection(firestore, 'Food')
    const q = query(
      collectionRef,
      // orderBy('timestamp', 'desc'),
      where('shopState', 'array-contains', 'A'),
    )
    onSnapshot(q, (snapshot) => {
      setShops(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, [])

  return (
    <>
      <h3 className="category-label">Editor's Choice</h3>
      <div className="food-shop-box">
        {shops.map((shop) => (
          <div>
            <div className="shop-card">
              <Link to={`/nama-food/shop/${shop.shopId}`} target="_blank">
                <img className="shopimg" src={shop.shopImg} alt="" />
              </Link>
              <span className="shopname">{shop.shopName}</span>
            </div>
          </div>
        ))}
        <Link
          className="to-more link shopimg"
          to="/nama-food/shop"
          target="_blank"
        >
          <div className="more-text">ဆိုင်များသို့>>></div>
        </Link>
      </div>
    </>
  )
}

const FoodShop = () => {
  const [shops, setShops] = useState([])

  useEffect(() => {
    const collectionRef = collection(firestore, 'Food')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setShops(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return unsub
  }, [])
  return (
    <>
      <h3 className="category-label">စားသောက်ဆိုင်များ</h3>
      <div className="recently-added-box">
        {shops.map((shop) => (
          <div className="card-box">
            <Link to={`/nama-food/shop/${shop.shopId}`} target="_blank">
              <img src={shop.shopImg} alt="" />
            </Link>

            <span>{shop.shopName}</span>
            {/* <span>{shop.shopOpentime}</span> */}
          </div>
        ))}
      </div>
    </>
  )
}
