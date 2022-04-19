import React from 'react'
import { storage } from '../config/firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import {
  onSnapshot,
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  orderBy,
  updateDoc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../config/firebase'

const AddProducts = () => {
  const [imageUpload, setImageUpload] = useState(null)
  const [imageList, setImageList] = useState([])
  const [products, setProducts] = useState([
    { ProductName: 'Loading...', id: 'initial' },
  ])

  const imageListRef = ref(storage, 'images/')
  const upLoadImage = () => {
    if (imageUpload == null) return
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })
    })
  }

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url])
        })
      })
    })
  }, [])

  useEffect(() => {
    const collectionRef = collection(firestore, 'Products')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return unsub
  }, [])

  const handleNew = async () => {
    const ProductName = prompt('Enter Product Name')
    const ProductPrice = prompt('Enter Product Price')

    const collectionRef = collection(firestore, 'Products')
    const payload = { ProductName, ProductPrice, timestamp: serverTimestamp() } //also {ProductName: ProductName, ProductPrice: ProductPrice}
    await addDoc(collectionRef, payload)
  }

  const handleEdit = async (id) => {
    const docRef = doc(firestore, 'Products', id)
    const ProductName = prompt('Edit product name')
    const ProductPrice = prompt('Edit product price')

    const payload = { ProductName, ProductPrice }
    updateDoc(docRef, payload)
  }

  const handleDelete = async (id) => {
    const docRef = doc(firestore, 'Products', id)
    await deleteDoc(docRef)
  }

  const handleQueryDelete = async () => {
    const ProductName = prompt('Enter product name to delete')

    const collectionRef = collection(firestore, 'Products')
    const q = query(collectionRef, where('ProductName', '==', ProductName))

    const snapshot = await getDocs(q)
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    results.forEach(async (result) => {
      const docRef = doc(firestore, 'Products', result.id)
      await deleteDoc(docRef)
    })
  }

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0])
        }}
      />
      <button onClick={upLoadImage}>Upload File</button>
      {imageList.map((url) => {
        return <img style={{ width: '14rem' }} src={url} alt="" />
      })}

      <div className="example">
        <button className="button" onClick={handleNew}>
          New
        </button>
        <button className="button" onClick={handleQueryDelete}>
          Query Delete
        </button>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.ProductName}</h3>
              <h5>{product.ProductPrice}</h5>
              <a href="#" onClick={() => handleEdit(product.id)}>
                Edit
              </a>
              <a href="#" onClick={() => handleDelete(product.id)}>
                Delete
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AddProducts
