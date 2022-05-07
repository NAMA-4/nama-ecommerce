import React from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../../config/firebase'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  where,
} from 'firebase/firestore'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import Typography from '@mui/material/Typography'

const FoodCategoryDetails = () => {
  const { shopState } = useParams()

  const [shops, setShops] = useState([
    { shopName: 'Loading...', shopId: 'initial' },
  ])

  useEffect(() => {
    const collectionRef = collection(firestore, 'Food')
    const q = query(
      collectionRef,
      where('shopState', 'array-contains', shopState),
      orderBy('timestamp', 'desc'),
    )
    onSnapshot(q, (snapshot) => {
      setShops(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, [shopState])

  return (
    <div>
      <Card sx={{ maxWidth: 400 }}>
        {shops.map((shop) => (
          <>
            <Link to={`/nama-food/shop/${shop.shopId}`}>
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

export default FoodCategoryDetails
