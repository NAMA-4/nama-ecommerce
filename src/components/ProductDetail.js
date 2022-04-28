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
      <h1>{product.ProductName}</h1>
      <h1>{product.ProductPrice}</h1>
      <h1>{product.ProductId}</h1>
      <img style={{ width: '30rem' }} src={product.ProductImg} alt="" />
      <p>{product.ProductReview}</p>
    </>
  )
}
export default ProductDetail
