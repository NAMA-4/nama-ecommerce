import React from 'react'
import { useState, useEffect } from 'react'
import { firestore, storage } from '../../config/firebase'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  // deleteObject,
} from 'firebase/storage'
import {
  collection,
  query,
  // getDocs,
  serverTimestamp,
  doc,
  setDoc,
  // where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore'
import { v4 } from 'uuid'
import ImageIcon from '@mui/icons-material/Image'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import Typography from '@mui/material/Typography'

const AddFoodShop = () => {
  const [shops, setShops] = useState([
    { shopName: 'Loading...', shopId: 'initial' },
  ])
  const [imageUpload, setImageUpload] = useState(null)

  useEffect(() => {
    const collectionRef = collection(firestore, 'Product')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setShops(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return unsub
  }, [])

  const addFoodShop = () => {
    var shopName = document.getElementById('shopName').value
    // var shopOpentime = document.getElementById('shopOpentime').value
    // var shopType = document.getElementById('shopType').value

    const collectionRef = doc(firestore, 'Product', shopName)

    if (imageUpload == null) return
    const imageRef = ref(storage, `Product/shopImg/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then(async (url) => {
        const payload = {
          shopId: v4(),
          shopName: shopName,
          // shopOpentime: shopOpentime,
          // shopType: shopType,
          shopImg: url,
          timestamp: serverTimestamp(),
        }
        await setDoc(collectionRef, payload)
        document.getElementById('shopName').value = ''
        // document.getElementById('shopOpentime').value = ''
        // document.getElementById('shopType').value = ''
        //   document.getElementById('shopImg').value = ''
      })
    })
    // props.setVisible(true)
  }

  return (
    <div>
      <div className="addfood-form">
        <input
          className="input"
          id="shopName"
          placeholder="Shop Name"
          type="text"
        />
        {/* <input
          className="input"
          id="shopOpentime"
          placeholder="Open Time"
          type="text"
        /> */}
        {/* <input
          className="input"
          id="shopType"
          placeholder="Shop Type"
          type="text"
        /> */}
        <label className="fileUpload">
          <ImageIcon fontSize="large" />
          <input
            type="file"
            placeholder="select file"
            id="shopImg"
            onChange={(event) => {
              setImageUpload(event.target.files[0])
            }}
          />
        </label>
        <button className="addproduct-btn" onClick={addFoodShop}>
          Add Product Shop
        </button>
      </div>

      <div>
        <Card sx={{ maxWidth: 400 }}>
          {shops.map((shop) => (
            <>
              <Link to={`/nama-product/shop/${shop.shopId}`}>
                <CardMedia
                  component="img"
                  height="300"
                  image={shop.shopImg}
                  alt="Paella dish"
                />
              </Link>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <div
                    className="font-family
          "
                  >
                    {shop.shopName}
                  </div>
                </Typography>
              </CardContent>
              <CardActions disableSpacing></CardActions>
            </>
          ))}
        </Card>
      </div>
    </div>
  )
}

const AddFood = () => {
  // const [visible, setVisible] = useState(false)
  return (
    <div>
      <AddFoodShop />
      {/* {visible === true ? (
        <AddShopMenu />
      ) : (
        <AddFoodShop setVisible={setVisible} />
      )} */}
    </div>
  )
}

export default AddFood
