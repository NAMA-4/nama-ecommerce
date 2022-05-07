import React, { useEffect } from 'react'
import { useState } from 'react'
import { firestore, storage } from '../../config/firebase'
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
// import { async } from '@firebase/util'

const Food4 = () => {
  const [imageUpload, setImageUpload] = useState([])
  const [slideImages, setSlideImages] = useState([])
  // const [menuName, setMenuName] = useState('')
  // const [menuPrice, setMenuPrice] = useState('')

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

  useEffect(() => {
    const collectionRef = collection(firestore, 'SlideImages-Food')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setSlideImages(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      )
    })

    return unsub
  }, [])

  const handleDelete = async (id, img) => {
    const docRef = doc(firestore, 'SlideImages-Food', id)
    const imgRef = ref(storage, img)
    await deleteDoc(docRef)
    await deleteObject(imgRef)
  }

  // const addMenuRecently = () => {
  //   const collectionRef = collection(firestore, 'Recently-Added-Food')

  //   if (imageUpload == null) return
  //   const imageRef = ref(storage, `Food/RecentlyAdded/${imageUpload.name}`)
  //   uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
  //     await getDownloadURL(snapshot.ref).then(async (url) => {
  //       const payload = {
  //         menuId: v4(),
  //         menuName: menuName,
  //         menuPrice: menuPrice,
  //         menuImg: url,
  //         timestamp: serverTimestamp(),
  //       }
  //       await addDoc(collectionRef, payload)
  //       setImageUpload([])
  //     })
  //   })
  // }

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

export default Food4
