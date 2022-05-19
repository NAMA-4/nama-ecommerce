import React from 'react'
import { useParams } from 'react-router-dom'
import { secFirestore } from '../../config/firebase'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  onSnapshot,
  collection,
  where,
  query,
  orderBy,
} from 'firebase/firestore'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

const ProductShopDetails = () => {
  const { shopId } = useParams()
  const [shop, setShop] = useState([])
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])
  document.title = `NAMA-${shop.shopName}`

  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // window.scrollTo(0, 0)
  useEffect(() => {
    const collectionRef = collection(secFirestore, 'Product')

    onSnapshot(collectionRef, (snapshot) => {
      const snap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const filterShop = snap.find((shop) => shop.shopId === shopId)
      setShop(filterShop)

      const collectionCategory = collection(
        secFirestore,
        `Product/${shop.shopName}/category`,
      )
      onSnapshot(collectionCategory, (snapshot) => {
        setCategory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    })

    const collectionRefProduct = collection(
      secFirestore,
      `Product/${shop.shopName}/products`,
    )
    const q = query(collectionRefProduct, orderBy('timestamp', 'desc'))
    onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, [shopId, shop.shopName])

  const handleCategory = (type) => {
    const collectionRef = collection(
      secFirestore,
      `Product/${shop.shopName}/products`,
    )
    const q = query(
      collectionRef,
      where('productType', '==', type),
      orderBy('timestamp', 'desc'),
    )
    onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    window.scrollTo(0, 600)
  }

  return (
    <>
      <div className="shop-profile">
        <img className="shop-profile-img" src={shop.shopImg} alt="" />
        <div className="shop-info">
          <h1 className="shop-profile-name">{shop.shopName}</h1>
          <h3 className="shop-profile-info">{shop.shopOpentime}</h3>
        </div>
      </div>
      {category ? (
        <div>
          <Box
            className="categoryBox"
            sx={{ maxWidth: { xs: 400, sm: 480 }, bgcolor: 'background.paper' }}
          >
            <Tabs
              className="categoryBar"
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              {category.map((cat) => (
                <Tab
                  onClick={() => {
                    handleCategory(cat.productType)
                  }}
                  label={cat.productType}
                />
              ))}
            </Tabs>
          </Box>

          <div>
            {products.map((product) => (
              <ProductCard
                shopId={shopId}
                product={product}
                productName={product.productName}
                productPrice={product.productPrice}
                productImg={product.productImg}
                productReview={product.productReview}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {products.map((product) => (
            <ProductCard
              shopId={shopId}
              product={product}
              productName={product.productName}
              productPrice={product.productPrice}
              productImg={product.productImg}
              productReview={product.productReview}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default ProductShopDetails

const ProductCard = (props) => {
  const {
    shopId,
    product,
    productName,
    productPrice,
    // productReview,
    productImg,
  } = props
  return (
    <div>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea>
          <Link
            to={`/nama-product/shop/${shopId}/${product.productId}`}
            target="_blank"
          >
            <CardMedia
              className="item-img"
              component="img"
              image={productImg}
              alt="green iguana"
            />
          </Link>

          <CardContent className="card-content">
            <Typography
              className="card-text text1"
              gutterBottom
              component="div"
            >
              {productName} | {productPrice} MMK
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
