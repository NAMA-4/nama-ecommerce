import React from 'react'
import { storage, firestore } from '../config/firebase'
import {
  ref,
  uploadBytes,
  // listAll,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
// import { v4 } from 'uuid'
import {
  onSnapshot,
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  // where,
  // getDocs,
  serverTimestamp,
  orderBy,
  updateDoc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

const AddProducts = () => {
  const [imageUpload, setImageUpload] = useState(null)
  // const [imageList, setImageList] = useState([])
  const [products, setProducts] = useState([
    { ProductName: 'Loading...', id: 'initial' },
  ])

  //   const imageListRef = ref(storage, 'images/')
  // const upLoadImage = () => {
  //   if (imageUpload == null) return
  //   const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
  //   uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
  //     await getDownloadURL(snapshot.ref).then((url) => {
  //       setImageList((prev) => [...prev, url])
  //     })
  //   })
  // }

  // useEffect(() => {
  //   const imageListRef = ref(storage, 'images/')
  //   listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         // setImageList((prev) => [...prev, url])
  //       })
  //     })
  //   })
  // }, [])

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

    const collectionRef = collection(firestore, 'Products')
    // const payload = { ProductName, ProductPrice, timestamp: serverTimestamp() } //also {ProductName: ProductName, ProductPrice: ProductPrice}
    // await addDoc(collectionRef, payload)
    // document.getElementById('productName').value = ''
    // document.getElementById('productPrice').value = ''

    if (imageUpload == null) return
    const imageRef = ref(storage, `images/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then(async (url) => {
        const payload = {
          ProductName: ProductName,
          ProductPrice: ProductPrice,
          ProductImg: url,
          timestamp: serverTimestamp(),
        }
        await addDoc(collectionRef, payload)
        document.getElementById('productName').value = ''
        document.getElementById('productPrice').value = ''
        document.getElementById('productImg').value = ''
        // setImageList([])

        // setImageList((prev) => [...prev, url])
      })
    })
  }

  // const handleNew = async () => {
  //   var ProductName = document.getElementById('productName').value
  //   var ProductPrice = document.getElementById('productPrice').value

  //   const collectionRef = collection(firestore, 'Products')
  //   const payload = { ProductName, ProductPrice, timestamp: serverTimestamp() } //also {ProductName: ProductName, ProductPrice: ProductPrice}
  //   await addDoc(collectionRef, payload)
  //   document.getElementById('productName').value = ''
  //   document.getElementById('productPrice').value = ''
  // }

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

  // const handleQueryDelete = async () => {
  //   const ProductName = prompt('Enter product name to delete')

  //   const collectionRef = collection(firestore, 'Products')
  //   const q = query(collectionRef, where('ProductName', '==', ProductName))

  //   const snapshot = await getDocs(q)
  //   const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //   results.forEach(async (result) => {
  //     const docRef = doc(firestore, 'Products', result.id)
  //     await deleteDoc(docRef)
  //   })
  // }

  return (
    <div>
      <div className="example">
        {/* <button className="button" onClick={handleQueryDelete}>
          Query Delete
        </button> */}
        <div className="addproduct-form">
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
          <input
            type="file"
            id="productImg"
            onChange={(event) => {
              setImageUpload(event.target.files[0])
            }}
          />
          {/* <button>Upload File</button> */}
          <button onClick={addProduct}>Add Product</button>
        </div>
        {/* {imageList.map((url) => {
          return <img style={{ width: '14rem' }} src={url} alt="" />
        })} */}

        {products.map((product) => (
          <div className="item-card" key={product.id}>
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddProducts
