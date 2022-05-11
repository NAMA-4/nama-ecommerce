import React from 'react'
import { useParams } from 'react-router-dom'
import { firestore, storage } from '../../config/firebase'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  onSnapshot,
  collection,
  where,
  updateDoc,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import ImageIcon from '@mui/icons-material/Image'
import { v4 } from 'uuid'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

const ProductShopDetails4 = () => {
  const { shopId } = useParams()
  const [shop, setShop] = useState([])
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])
  const [imageUpload, setImageUpload] = useState(null)

  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // window.scrollTo(0, 0)
  useEffect(() => {
    const collectionRef = collection(firestore, 'Product')

    onSnapshot(collectionRef, (snapshot) => {
      const snap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const filterShop = snap.find((shop) => shop.shopId === shopId)
      setShop(filterShop)

      const collectionCategory = collection(
        firestore,
        `Product/${shop.shopName}/category`,
      )
      onSnapshot(collectionCategory, (snapshot) => {
        setCategory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    })

    const collectionRefProduct = collection(
      firestore,
      `Product/${shop.shopName}/products`,
    )
    const q = query(collectionRefProduct, orderBy('timestamp', 'desc'))
    onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, [shopId, shop.shopName])

  const addShopMenu = async () => {
    const productName = document.getElementById('productName').value
    const productPrice = document.getElementById('productPrice').value
    const productReview = document.getElementById('productReview').value

    const q = query(
      collection(firestore, 'Product'),
      where('shopId', '==', shopId),
    )
    const querySnapShot = await getDocs(q)
    const queryData = querySnapShot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }))
    if (imageUpload == null) {
      const payload = {
        productId: v4(),
        productName: productName,
        productPrice: productPrice,
        productReview: productReview,
        // menuImg: url,
        timestamp: serverTimestamp(),
      }
      queryData.map(async (v) => {
        const docRef = doc(firestore, `Product/${v.id}/products`, productName)
        await setDoc(docRef, payload)
      })
      document.getElementById('productName').value = ''
      document.getElementById('productPrice').value = ''
      document.getElementById('productReview').value = ''
    } else {
      const imageRef = ref(
        storage,
        `Product/${shop.shopName}/${imageUpload.name}`,
      )
      uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          const payload = {
            productId: v4(),
            productName: productName,
            productPrice: productPrice,
            productImg: url,
            productReview: productReview,
            timestamp: serverTimestamp(),
          }
          queryData.map(async (v) => {
            const docRef = doc(
              firestore,
              `Product/${v.id}/products`,
              productName,
            )
            await setDoc(docRef, payload)
          })
          document.getElementById('productName').value = ''
          document.getElementById('productPrice').value = ''
          document.getElementById('productReview').value = ''
          setImageUpload('')
        })
      })
    }
  }

  const handleCategory = (type) => {
    const collectionRef = collection(
      firestore,
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

  const handleEdit = async (id, editproductName, editproductPrice) => {
    const docRef = doc(firestore, `Product/${shop.shopName}/products`, id)

    const payload = {
      productName: editproductName,
      productPrice: editproductPrice,
    }
    await updateDoc(docRef, payload)
  }

  const handleDelete = async (id, img) => {
    const docRef = doc(firestore, `Product/${shop.shopName}/products`, id)
    const imgRef = ref(storage, img)
    await deleteDoc(docRef)
    await deleteObject(imgRef)
  }

  return (
    <>
      <div className="addmenu-box">
        <input
          className="input"
          type="text"
          id="productName"
          placeholder="Product Name"
        />
        <input
          className="input"
          type="text"
          id="productPrice"
          placeholder="Product Price"
        />
        <textarea
          id="productReview"
          cols="30"
          rows="10"
          placeholder="Write Review"
        ></textarea>
        <label className="fileUpload">
          <ImageIcon fontSize="large" />
          <input
            type="file"
            placeholder="select file"
            id="menuImg"
            onChange={(event) => {
              setImageUpload(event.target.files[0])
            }}
          />
        </label>
        <button
          className="addproduct-btn"
          type="submit"
          onClick={() => addShopMenu(shop.shopId)}
        >
          Add Product
        </button>
      </div>
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
                handleDelete={handleDelete}
                handleEdit={handleEdit}
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
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default ProductShopDetails4

const EditModal = (props) => {
  const [openModal, setOpenModal] = useState(false)
  const [editProductName, setEditProductName] = useState('')
  const [editProductPrice, setEditProductPrice] = useState('')
  const { productName, productPrice, handleEdit, product } = props

  return (
    <>
      <EditIcon onClick={() => setOpenModal(!openModal)}>Edit</EditIcon>
      {openModal && (
        <div className="modal-box">
          <input
            type="text"
            defaultValue={productName}
            onChange={(e) => setEditProductName(e.target.value)}
          />
          <input
            type="text"
            defaultValue={productPrice}
            onChange={(e) => setEditProductPrice(e.target.value)}
          />
          <button
            className="edit"
            onClick={() => {
              handleEdit(product.id, editProductName, editProductPrice)
              setOpenModal(!openModal)
            }}
          >
            Edit
          </button>
          <button
            className="close"
            onClick={() => {
              setOpenModal(false)
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  )
}

const ProductCard = (props) => {
  const {
    shopId,
    product,
    productName,
    productPrice,
    // productReview,
    productImg,
    handleDelete,
    handleEdit,
  } = props
  return (
    <div>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea>
          <Link to={`/nama-product/shop/${shopId}/${product.productId}`}>
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

            <div className="call-action col3">
              <button
                className="btn btn1"
                onClick={() => handleDelete(product.id, product.productImg)}
              >
                <DeleteIcon fontSize="small" />
              </button>

              <button className="btn btn1" id={product.id}>
                <EditModal
                  product={product}
                  productName={product.productName}
                  productPrice={product.productPrice}
                  handleEdit={handleEdit}
                />
              </button>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
