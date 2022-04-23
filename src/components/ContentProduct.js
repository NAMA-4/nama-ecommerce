import React from 'react'
import { useEffect, useState } from 'react'
import { firestore } from '../config/firebase'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  // where,
} from 'firebase/firestore'

import ProductCard from './ProductCard'

const ContentProduct = (props) => {
  const [products, setProducts] = useState([
    { ProductName: 'Loading...', id: 'initial' },
  ])

  let productCollection = props.productCollection

  useEffect(() => {
    const collectionRef = collection(firestore, productCollection)
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return unsub
  }, [productCollection])

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          productName={product.ProductName}
          productPrice={product.ProductPrice}
          productImg={product.ProductImg}
          productReview={product.ProductReview}
        />
      ))}
    </div>
  )
}

export default ContentProduct
