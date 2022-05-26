import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { secFirestore } from '../../config/firebase'

import { Link } from 'react-router-dom'

const ProductShopContent = () => {
  const [shops, setShops] = useState([])

  useEffect(() => {
    const collectionRef = collection(secFirestore, 'Product')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    onSnapshot(q, (snapshot) => {
      const snap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setShops(snap)
    })
  }, [])
  return (
    <div>
      {shops.map((shop) => (
        <div className="shop">
          <div className="shop-info">
            <Link to={`/nama-product/shop/${shop.shopId}`} target="_blank">
              <img src={shop.shopImg} alt="" />
            </Link>
            <Link
              className="link"
              to={`/nama-product/shop/${shop.shopId}`}
              target="_blank"
            >
              <span className="shopName">{shop.shopName}</span>
            </Link>
          </div>
          <ShopItem shopId={shop.shopId} />
        </div>
      ))}
    </div>
  )
}

const ShopItem = (props) => {
  const { shopId } = props
  const [shop, setShop] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    const collectionRef = collection(secFirestore, 'Product')
    onSnapshot(collectionRef, (snapshot) => {
      const snap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const filterShop = snap.find((shop) => shop.shopId === shopId)
      setShop(filterShop)
    })

    const colletionProductRef = collection(
      secFirestore,
      `Product/${shop.shopName}/products`,
    )
    const q = query(colletionProductRef, orderBy('timestamp', 'desc'))
    onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, [shopId, shop.shopName])
  return (
    <div className="shop-item-box">
      {products.slice(0, 6).map((product) => (
        <>
          <div className="shop-item" key={product.id}>
            <Link
              to={`/nama-product/shop/${shopId}/${product.productId}`}
              target="_blank"
            >
              <img src={product.productImg} alt="" />
            </Link>
            <span>{product.productPrice}ks</span>
          </div>
        </>
      ))}
      <Link
        className="to-more link"
        style={{ backgroundColor: 'rgb(89, 175, 251)' }}
        to={`/nama-product/shop/${shop.shopId}`}
        target="_blank"
      >
        <h3 className="more-text">More>>></h3>
      </Link>
    </div>
  )
}

export default ProductShopContent
