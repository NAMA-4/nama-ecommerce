// import React from 'react'
// import { useState, useEffect } from 'react'

// import { firestore } from '../config/firebase'
// import {
//   onSnapshot,
//   orderBy,
//   collection,
//   query,
//   where,
// } from 'firebase/firestore'

// import ProductCard from './ProductCard'

// const Category = (props) => {
//   const [data, setData] = useState([])

//   useEffect(() => {
//     const collectionRef = collection(firestore, '2')
//     const q = query(collectionRef, orderBy('timestamp', 'desc'))
//     const unsub = onSnapshot(q, (snapshot) => {
//       setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//     })

//     return unsub
//   }, [])

//   const handleCategory = (type) => {
//     const collectionRef = collection(firestore, '2')
//     const q = query(
//       collectionRef,
//       where('ProductType', '==', type),
//       orderBy('timestamp', 'desc'),
//     )
//     onSnapshot(q, (snapshot) => {
//       setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//     })
//     // const filterResult = products.filter((product) => {
//     //   return product.productType === type
//     // })
//     // setData(filterResult)
//   }

//   return (
//     <div>
//       {props.productType.map((productType) => (
//         <button
//           onClick={() => {
//             handleCategory(productType)
//           }}
//         >
//           {productType}
//         </button>
//       ))}

//       {data.map((product) => (
//         <>
//           <h3>Product Type:{product.ProductType}</h3>
//           <ProductCard
//             productImg={product.ProductImg}
//             productName={product.ProductName}
//             productPrice={product.ProductPrice}
//             productReview={product.ProductReview}
//           />
//           {/* <h3>Product Type:{val.ProductType}</h3>
//           <h2>Product Name:{val.ProductName}</h2> */}
//         </>
//       ))}
//     </div>
//   )
// }

// export default Category

// // const products = [
// //   {
// //     id: '1',
// //     productName: 'Vape00',
// //     productType: 'vape',
// //   },
// //   {
// //     id: '2',
// //     productName: 'Vape01',
// //     productType: 'vape',
// //   },
// //   {
// //     id: '3',
// //     productName: 'Vape02',
// //     productType: 'vape',
// //   },
// //   {
// //     id: '4',
// //     productName: 'Pod00',
// //     productType: 'pod',
// //   },
// //   {
// //     id: '5',
// //     productName: 'Pod01',
// //     productType: 'pod',
// //   },
// //   {
// //     id: '6',
// //     productName: 'Pod02',
// //     productType: 'pod',
// //   },
// // ]

// // import * as React from 'react'
// // import Tabs from '@mui/material/Tabs'
// // import Tab from '@mui/material/Tab'
// // import Box from '@mui/material/Box'

// // import { firestore } from '../config/firebase'
// // import { useState } from 'react'

// // import {
// //   collection,
// //   // onSnapshot,
// //   // orderBy,
// //   // query,
// //   // where,
// // } from 'firebase/firestore'
// // // import ProductCard from './ProductCard'
// // import Test from './test'

// // export default function Category(props) {
// //   const [value, setValue] = useState(0)
// //   const [products, setProducts] = useState([])
// //   // let productCollection = '2'

// //   const handleChange = (event, newValue) => {
// //     setValue(newValue)
// //   }

// //   const handleCategory = (productType) => {
// //     console.log(productType)

// //     const collectionRef = collection(firestore, '2')
// //     const result = collectionRef.filter((product) => {
// //       return product.ProductType === productType
// //     })
// //     setProducts(result)

// //     // const q = query(collectionRef, where('ProductType', '==', productType))
// //     // const unsub = onSnapshot(q, (snapshot) => {
// //     //   setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
// //     // })

// //     // unsub()
// //   }

// //   return (
// //     <>
// //       <Box
// //         className="category-box"
// //         sx={{ maxWidth: { xs: 390, sm: 480 }, bgcolor: 'background.paper' }}
// //       >
// //         <Tabs
// //           value={value}
// //           onChange={handleChange}
// //           variant="scrollable"
// //           scrollButtons
// //           allowScrollButtonsMobile
// //           aria-label="scrollable force tabs example"
// //         >
// //           {props.productType.map((productType) => (
// //             <div key={productType.index}>
// //               <Tab
// //                 onClick={() => handleCategory(productType)}
// //                 label={productType}
// //               />
// //             </div>
// //           ))}
// //         </Tabs>
// //       </Box>
// //       <Test />
// //       {/* <div>
// //         {products.map((product) => (
// //           <Test productName={product.ProductName} />
// //         ))}
// //       </div> */}
// //     </>
// //   )
// // }
