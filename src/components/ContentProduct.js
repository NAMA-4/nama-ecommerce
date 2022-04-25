import React from 'react'
import { useEffect, useState } from 'react'
import { firestore } from '../config/firebase'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
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

  const handleCategory = (type) => {
    const collectionRef = collection(firestore, '2')
    const q = query(
      collectionRef,
      where('ProductType', '==', type),
      orderBy('timestamp', 'desc'),
    )
    onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    // const filterResult = products.filter((product) => {
    //   return product.productType === type
    // })
    // setData(filterResult)
  }

  const isProductType = props.productType

  if (isProductType) {
    return (
      <div>
        <div className="categoryBar">
          {props.productType.map((productType) => (
            <label
              className="categoryItem"
              type="button"
              onClick={() => {
                handleCategory(productType)
              }}
            >
              {productType}
            </label>
          ))}
        </div>

        {products.map((product) => (
          <>
            <ProductCard
              productName={product.ProductName}
              productPrice={product.ProductPrice}
              productImg={product.ProductImg}
              productReview={product.ProductReview}
            />
          </>
        ))}
      </div>
    )
  } else {
    return (
      <>
        {products.map((product) => (
          <>
            <ProductCard
              productName={product.ProductName}
              productPrice={product.ProductPrice}
              productImg={product.ProductImg}
              productReview={product.ProductReview}
            />
          </>
        ))}
      </>
    )
  }
}

export default ContentProduct
