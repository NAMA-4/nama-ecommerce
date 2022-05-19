import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { secFirestore } from '../../config/firebase'

import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
// import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { collection, onSnapshot, query, where } from 'firebase/firestore'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const ProductDetails = () => {
  const { shopId, productId } = useParams()
  const [expanded, setExpanded] = React.useState(false)
  const [shop, setShop] = useState([])
  const [product, setProduct] = useState([])

  useEffect(() => {
    const collectionRef = collection(secFirestore, 'Product')
    // const q = query(collectionRef, where('shopId', '==', shopId))
    onSnapshot(collectionRef, (snapshot) => {
      const snap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const filterShop = snap.find((shop) => shop.shopId === shopId)
      setShop(filterShop)
    })
  }, [shopId])
  useEffect(() => {
    const productCollectionRef = collection(
      secFirestore,
      `Product/${shop.shopName}/products`,
    )
    const productQ = query(
      productCollectionRef,
      where('productId', '==', productId),
    )
    onSnapshot(productQ, (snapshot) => {
      const snap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setProduct(snap)
    })
  }, [productId, shop.shopName])
  console.log(product)
  console.log(shop)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ maxWidth: 400 }}>
      {/* {shop.map((shop) => ( */}
      <>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <img style={{ width: '3rem' }} src={shop.shopImg} alt="" />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={shop.shopName}
          // subheader="September 14, 2016"
        />
        {product.map((p) => (
          <>
            <CardMedia
              component="img"
              height="194"
              image={p.productImg}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {p.productReview}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>

                <Typography paragraph>{p.productReview}</Typography>
              </CardContent>
            </Collapse> */}
          </>
        ))}
      </>
      {/* ))} */}
    </Card>
  )
}

export default ProductDetails
