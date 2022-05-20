import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { secFirestore } from '../../config/firebase'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
// import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'

// import MoreVertIcon from '@mui/icons-material/MoreVert'

import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { Link } from 'react-router-dom'

const ProductDetails = () => {
  const { shopId, productId } = useParams()
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

  document.title = `NAMA-${shop.shopName}`

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

  return (
    <Card sx={{ maxWidth: 400 }}>
      {/* {shop.map((shop) => ( */}
      <>
        <Link className="link" to={`/nama-product/shop/${shopId}`}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                <img style={{ width: '3rem' }} src={shop.shopImg} alt="" />
              </Avatar>
            }
            title={shop.shopName}
            // subheader="September 14, 2016"
          />
        </Link>

        {product.map((p) => (
          <>
            <CardMedia
              component="img"
              height="350"
              image={p.productImg}
              alt="Paella dish"
            />
            <div className="call-actions">
              <div className="left">visit {shop.shopName}</div>
              <div className="right">
                <button className="btn">
                  <a href="tel:09455406870" className="btn">
                    <PhoneRoundedIcon fontSize="small" />
                  </a>
                </button>
                <button className="btn">
                  <a
                    // href="https://www.messenger.com/t/108286378398611/?messaging_source=source%3Apages%3Amessage_shortlink"
                    href="https://www.messenger.com/t/100081477392288/"
                    class="btn"
                  >
                    <LocalGroceryStoreRoundedIcon
                      fontSize="small"
                      className="icon"
                    />
                  </a>
                </button>
              </div>
            </div>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {p.productReview}
              </Typography>
            </CardContent>
          </>
        ))}
      </>
    </Card>
  )
}

export default ProductDetails
