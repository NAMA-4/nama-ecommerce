import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded'

import ReviewModal from './ReviewModal'

const ProductCard = (props) => {
  return (
    <div>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea>
          <CardMedia
            className="item-img"
            component="img"
            image={props.productImg}
            alt="green iguana"
          />
          <CardContent className="card-content">
            <Typography
              className="card-text text1"
              gutterBottom
              component="div"
            >
              {props.productName} | {props.productPrice} MMK
            </Typography>

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
                  productReview={props.productReview}
                  productName={props.productName}
                />
              </button>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default ProductCard
