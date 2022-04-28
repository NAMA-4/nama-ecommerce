import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { firestore } from '../config/firebase'
import { useState } from 'react'
import {
  collection,
  onSnapshot,
  // getDoc,
  // doc,
  // where,
  // query,
  // orderBy,
} from 'firebase/firestore'

const ProductDetail = () => {
  const { productId } = useParams()
  const productCollection = useLocation().state.from
  const [product, setProduct] = useState([])

  window.scrollTo(0, 0)
  useEffect(() => {
    const collectionRef = collection(firestore, productCollection)

    onSnapshot(collectionRef, (snapshot) => {
      const snap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const filterProduct = snap.find((prod) => prod.ProductId === productId)
      setProduct(filterProduct)
    })
  }, [productCollection, productId])

  return (
    <>
      <div className="product-detail">
        <img className="product-img" src={product.ProductImg} alt="" />
        <div className="product-info">
          <h4>{product.ProductName}</h4>
          <h5>{product.ProductPrice}MMK</h5>
        </div>
        <div className="product-review">
          <p>{product.ProductReview}</p>
        </div>
      </div>
    </>
  )
}
export default ProductDetail
