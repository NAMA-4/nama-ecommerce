import React from 'react'
import { useState, useEffect } from 'react'
import { firestore } from '../../config/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { Link } from 'react-router-dom'

// import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import Typography from '@mui/material/Typography'

export default function FoodShopp() {
  const [shops, setShops] = useState([
    { shopName: 'Loading...', shopId: 'initial' },
  ])

  useEffect(() => {
    const collectionRef = collection(firestore, 'Food')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    onSnapshot(q, (snapshot) => {
      setShops(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, [])

  return (
    <div>
      <Card sx={{ maxWidth: 400 }}>
        {shops.map((shop) => (
          <>
            <Link to={`/nama-food/shop/${shop.shopId}`} target="_blank">
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
                <div
                  className="font-family
          "
                >
                  ဆိုင်ဖွင့်ချိန် | {shop.shopOpentime}
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
