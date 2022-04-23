import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

import ContentProduct from './ContentProduct'

export default function ShopInfo(props) {
  document.title = props.shopTitle
  return (
    <>
      <Card className="shop-info" sx={{ maxWidth: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="320"
            image={props.shopImg}
            alt="green iguana"
          />
          <CardContent className="shop-name">
            <Typography gutterBottom variant="h5" component="div">
              <div className="name">{props.shopName}</div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <ContentProduct />
    </>
  )
}
