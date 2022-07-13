import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded'

// import { Link } from 'react-router-dom'

import ReviewModal from './ReviewModal'

const ProductCard = (props) => {
  const {
    // productId,
    productName,
    productPrice,
    productReview,
    productImg,
    // productCollection,
  } = props
  return (
    <div>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea>
          {/* <Link
            to={`/products/${productId}`}
            state={{ from: productCollection }}
          > */}
          <CardMedia
            className="item-img"
            component="img"
            image={productImg}
            alt="green iguana"
          />
          {/* </Link> */}

          <CardContent className="card-content">
            <Typography
              className="card-text text1"
              gutterBottom
              component="div"
            >
              {productName} | {productPrice} MMK
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
                <a href="tel:09981466100">
                  <PhoneRoundedIcon fontSize="small" />
                </a>
              </button>
              <button className="btn btn3">
                <ReviewModal
                  productReview={productReview}
                  productName={productName}
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
