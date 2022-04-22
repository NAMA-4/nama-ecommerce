import React from 'react'
import { storage, firestore } from '../config/firebase'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

import {
  onSnapshot,
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  serverTimestamp,
  orderBy,
  updateDoc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ImageIcon from '@mui/icons-material/Image'

const AddProducts = () => {
  const [imageUpload, setImageUpload] = useState(null)
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

  const addProduct = () => {
    var ProductName = document.getElementById('productName').value
    var ProductPrice = document.getElementById('productPrice').value
    var ProductReview = document.getElementById('productReview').value

    const collectionRef = collection(firestore, 'Products')

    if (imageUpload == null) return
    const imageRef = ref(storage, `images/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then(async (url) => {
        const payload = {
          ProductName: ProductName,
          ProductPrice: ProductPrice,
          ProductReview: ProductReview,
          ProductImg: url,
          timestamp: serverTimestamp(),
        }
        await addDoc(collectionRef, payload)
        document.getElementById('productName').value = ''
        document.getElementById('productPrice').value = ''
        document.getElementById('productImg').value = ''
        document.getElementById('productReview').value = ''
      })
    })
  }

  const handleEdit = async (id) => {
    const docRef = doc(firestore, 'Products', id)
    const ProductName = prompt('Edit product name')
    const ProductPrice = prompt('Edit product price')

    const payload = { ProductName, ProductPrice }
    updateDoc(docRef, payload)
  }

  const handleDelete = async (dbid, img) => {
    const docRef = doc(firestore, 'Products', dbid)
    const imgRef = ref(storage, img)
    await deleteDoc(docRef)
    await deleteObject(imgRef)
    console.log(img)
  }

  return (
    <div>
      <div className="example">
        <div className="addproduct-form">
          <label className="title-addproduct">Add New Product</label>
          <input
            className="input"
            id="productName"
            placeholder="Name"
            type="text"
          />
          <input
            className="input"
            id="productPrice"
            placeholder="Price"
            type="number"
          />
          <textarea
            className="review-text"
            name="review"
            id="productReview"
            placeholder="Write Review"
            cols="30"
            rows="10"
          ></textarea>
          <label className="fileUpload">
            <ImageIcon fontSize="large" />
            <input
              type="file"
              placeholder="select file"
              id="productImg"
              onChange={(event) => {
                setImageUpload(event.target.files[0])
              }}
            />
          </label>
          {/* <button>Upload File</button> */}
          <button className="addproduct-btn" onClick={addProduct}>
            Add Product
          </button>
        </div>
        {/* {imageList.map((url) => {
          return <img style={{ width: '14rem' }} src={url} alt="" />
        })} */}

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
                  <button
                    className="btn-addproduct"
                    onClick={() => handleDelete(product.id, product.ProductImg)}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                  <button
                    className="btn-addproduct"
                    onClick={() => handleEdit(product.id)}
                  >
                    <EditIcon fontSize="small" className="icon" />
                  </button>

                  {/* <button className="btn btn3">Review</button> */}
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AddProducts

/* <div className="item-card" key={product.id}>
            <div>
              <img className="item-img" src={product.ProductImg} alt="" />
            </div>
            <div className="item-info">
              <h3 className="iteminfo item-name">{product.ProductName}</h3>
              <h5 className="iteminfo item-price">{product.ProductPrice}</h5>
            </div>
            <button
              className="iteminfo itembutton"
              onClick={() => handleEdit(product.id)}
            >
              Edit
            </button>
            <button
              className="iteminfo itembutton"
              onClick={() => handleDelete(product.id, product.ProductImg)}
            >
              Delete
            </button>
          </div> */
