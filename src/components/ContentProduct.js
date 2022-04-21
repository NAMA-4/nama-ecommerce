import React from 'react'
import { useEffect, useState } from 'react'
import { firestore } from '../config/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

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
              <Typography
                className="card-text text1"
                gutterBottom
                component="div"
              >
                {product.ProductName} | {product.ProductPrice} MMK
              </Typography>
              {/* <Typography className="card-text " variant="body2">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography> */}
              <div className="call-action">
                <button className="btn btn1">မှာယူရန်</button>
                <button className="btn btn2">ဖုန်း</button>
                <button className="btn btn3">Review</button>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  )
}

export default ContentProduct
