import React from 'react'
import { useState, useEffect } from 'react'
import { secFirestore, secStorage } from '../../config/firebase'
import {
  doc,
  addDoc,
  collection,
  orderBy,
  onSnapshot,
  serverTimestamp,
  query,
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

const Product4 = () => {
  const [imageUpload, setImageUpload] = useState([])
  const [slideImages, setSlideImages] = useState([])

  const addSliderImage = () => {
    const collectionRef = collection(secFirestore, 'SlideImages-Product')

    if (imageUpload == null) return
    const imageRef = ref(secStorage, `SlideImages/${imageUpload.name}`)
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

  useEffect(() => {
    const collectionRef = collection(secFirestore, 'SlideImages-Product')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setSlideImages(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      )
    })

    return unsub
  }, [])

  const handleDelete = async (id, img) => {
    const docRef = doc(secFirestore, 'SlideImages-Product', id)
    const imgRef = ref(secStorage, img)
    await deleteDoc(docRef)
    await deleteObject(imgRef)
  }
  return (
    <>
      <div className="add-slider-image">
        <h3 className="title">Add Slide Images</h3>
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

      {slideImages.map((image) => (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="slide-image"
          >
            <img style={{ width: '15rem' }} src={image.Img} alt="" />
          </div>
          <button
            onClick={() => handleDelete(image.id, image.Img)}
            className="btn food4-delete-btn"
          >
            Delete
          </button>
        </>
      ))}
    </>
  )
}

export default Product4
