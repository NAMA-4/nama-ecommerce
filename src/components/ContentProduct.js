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

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import ProductCard from './ProductCard'

const ContentProduct = (props) => {
  const [products, setProducts] = useState([
    { ProductName: 'Loading...', id: 'initial' },
  ])

  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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
    const collectionRef = collection(firestore, productCollection)
    const q = query(
      collectionRef,
      where('ProductType', '==', type),
      orderBy('timestamp', 'desc'),
    )
    onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    window.scrollTo(0, 300)
  }

  const isProductType = props.productType

  if (isProductType) {
    return (
      <div>
        <Box
          className="categoryBox"
          sx={{ maxWidth: { xs: 400, sm: 480 }, bgcolor: 'background.paper' }}
        >
          <Tabs
            className="categoryBar"
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            {props.productType.map((productType) => (
              <Tab
                onClick={() => {
                  handleCategory(productType)
                }}
                label={productType}
              />
            ))}
          </Tabs>
        </Box>

        {products.map((product) => (
          <>
            <ProductCard
              productId={product.ProductId}
              productName={product.ProductName}
              productPrice={product.ProductPrice}
              productImg={product.ProductImg}
              productReview={product.ProductReview}
              productCollection={productCollection}
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
