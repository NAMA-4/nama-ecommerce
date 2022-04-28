import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../config/firebase'
import { useState } from 'react'
import {
  collection,
  onSnapshot,
  // getDoc,
  // doc,
  // where,
  // query,
  // orderBy,
} from 'firebase/firestore'

const ProductDetail = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState([])

  // let id = productId
  // useEffect(() => {
  //   const q = query(collectionRef, where('ProductId', '==', String(id)))
  //   setProduct(q)
  //   console.log(q)
  // }, [id])

  // const docRef = doc(firestore, '2')

  // getDoc(docRef).then((doc) => {
  //   console.log(doc.data(), doc.id)
  // })
  useEffect(() => {
    const collectionRef = collection(firestore, '2')

    onSnapshot(collectionRef, (snapshot) => {
      setProduct(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, [])
  const filterResult = product.find((prod) => prod.ProductId === productId)
  // const ProductName = filterResult.ProductName
  console.log(filterResult)

  // const product = collectionRef.find((prod) => prod.ProductId == productId)
  return (
    <>
      {/* <h1>{ProductName}</h1> */}
      <h1>Hi World</h1>
    </>
  )
}
export default ProductDetail
