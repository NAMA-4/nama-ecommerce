import React from 'react'
import { useState } from 'react'
import { firestore, storage } from '../../config/firebase'
import {
  //   doc,
  addDoc,
  collection,
  //   orderBy,
  //   onSnapshot,
  serverTimestamp,
  //   query,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import ImageIcon from '@mui/icons-material/Image'
import { v4 } from 'uuid'

const Food4 = () => {
  const [imageUpload, setImageUpload] = useState([])
  const [menuName, setMenuName] = useState('')
  const [menuPrice, setMenuPrice] = useState('')

  const addSliderImage = () => {
    const collectionRef = collection(firestore, 'SlideImages-Food')

    if (imageUpload == null) return
    const imageRef = ref(storage, `Food/SlideImages/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then(async (url) => {
        const payload = {
          imgId: v4(),
          Img: url,
          timestamp: serverTimestamp(),
        }
        await addDoc(collectionRef, payload)
        setImageUpload([])
      })
    })
  }

  const addMenuRecently = () => {
    const collectionRef = collection(firestore, 'Recently-Added-Food')

    if (imageUpload == null) return
    const imageRef = ref(storage, `Food/RecentlyAdded/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then(async (url) => {
        const payload = {
          menuId: v4(),
          menuName: menuName,
          menuPrice: menuPrice,
          menuImg: url,
          timestamp: serverTimestamp(),
        }
        await addDoc(collectionRef, payload)
        setImageUpload([])
      })
    })
  }

  return (
    <>
      <div className="add-slider-image">
        <h3>Add Slide Images</h3>
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
        <img src={imageUpload} alt="" />
        <button className="addproduct-btn" onClick={addSliderImage}>
          Add Image
        </button>
      </div>

      <div className="recently-added">
        <h3>Add Recently Added Menu</h3>
        <input
          type="text"
          placeholder="Menu Name"
          onChange={(e) => {
            setMenuName(e.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Menu Price"
          onChange={(e) => {
            setMenuPrice(e.target.value)
          }}
        />
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
        <img src={imageUpload} alt="" />
        <button className="addproduct-btn" onClick={addMenuRecently}>
          Add Image
        </button>
      </div>
    </>
  )
}

export default Food4
