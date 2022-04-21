import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

export default function ActionAreaCard() {
  return (
    <Card className="shop-info" sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="320"
          image="./img/shop.jpg"
          alt="green iguana"
        />
        <CardContent className="shop-name">
          <Typography gutterBottom variant="h5" component="div">
            <div className="name">Nwe Moe Saung Korean</div>
            <dive className="name">Cosmetics Paradise</dive>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
