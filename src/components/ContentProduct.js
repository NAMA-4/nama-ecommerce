import React from 'react'
import { useEffect, useState } from 'react'
import { firestore } from '../config/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const ContentProduct = () => {
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

  return (
    <div>
      {products.map((product) => (
        <div className="item-card" key={product.id}>
          <div>
            <img className="item-img" src={product.ProductImg} alt="" />
          </div>
          <div className="item-info">
            <h3 className="iteminfo item-name">{product.ProductName}</h3>
            <h5 className="iteminfo item-price">{product.ProductPrice}</h5>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContentProduct
