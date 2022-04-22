import React from 'react'
import { useEffect, useState } from 'react'
import { firestore } from '../config/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
// import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded'

import ReviewModal from './ReviewModal'

const ContentProduct = () => {
  const [products, setProducts] = useState([
    { ProductName: 'Loading...', id: 'initial' },
  ])

  useEffect(() => {
    const collectionRef = collection(firestore, 'Products')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return unsub
  }, [])

  return (
    <div>
      {products.map((product) => (
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea>
            <CardMedia
              className="item-img"
              component="img"
              image={product.ProductImg}
              alt="green iguana"
            />
            <CardContent className="card-content">
              <div>
                {product.ProductName} | {product.ProductPrice} MMK
              </div>

              <div className="call-action">
                <button className="btn btn1">
                  <a
                    href="https://www.messenger.com/t/108286378398611/?messaging_source=source%3Apages%3Amessage_shortlink"
                    class="btn btn-primary action"
                  >
                    <LocalGroceryStoreRoundedIcon
                      fontSize="small"
                      className="icon"
                    />
                  </a>
                </button>
                <button className="btn btn2">
                  <a href="tel:09455406870">
                    <PhoneRoundedIcon fontSize="small" />
                  </a>
                </button>
                <button className="btn btn3">
                  <ReviewModal
                    productReview={product.ProductReview}
                    productName={product.ProductName}
                  />
                </button>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  )
}

export default ContentProduct
