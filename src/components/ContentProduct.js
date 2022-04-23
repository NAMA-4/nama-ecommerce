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

// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'
// import Typography from '@mui/material/Typography'
// import { CardActionArea } from '@mui/material'
// import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
// import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded'

// import ReviewModal from './ReviewModal'
import ProductCard from './ProductCard'
import Imageslider from './Imageslider'

const ContentProduct = (props) => {
  const [products, setProducts] = useState([
    { ProductName: 'Loading...', id: 'initial' },
  ])

  let productCollection = props.productCollection

  useEffect(() => {
    const collectionRef = collection(firestore, productCollection)
    const q = query(
      collectionRef,
      orderBy('timestamp', 'desc'),
      // where('ProductPrice', '==', '7500'),
    )
    const unsub = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return unsub
  }, [productCollection])

  return (
    <div>
      <Imageslider />
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
