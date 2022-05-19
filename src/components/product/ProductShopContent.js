import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { secFirestore } from '../../config/firebase'

import { Link } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'

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
      <Card sx={{ maxWidth: 400 }}>
        {shops.map((shop) => (
          <>
            <Link to={`/nama-product/shop/${shop.shopId}`}>
              <CardMedia
                component="img"
                height="300"
                image={shop.shopImg}
                alt="Paella dish"
              />
            </Link>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <div
                  className="font-family
          "
                >
                  {shop.shopName}
                </div>
              </Typography>
            </CardContent>
            <CardActions disableSpacing></CardActions>
          </>
        ))}
      </Card>
    </div>
  )
}

export default ProductShopContent
