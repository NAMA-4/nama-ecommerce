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
// import { async } from '@firebase/util'
// import { AddShoppingCart } from '@mui/icons-material'
import { Link } from 'react-router-dom'

// const AddShopMenu = () => {
//   const [imageUpload, setImageUpload] = useState(null)

//   const addShopMenu = async () => {
//     var menuName = document.getElementById('menuName').value
//     var menuPrice = document.getElementById('menuPrice').value
//     var menuType = document.getElementById('menuType').value

//     const q = query(
//       collection(firestore, 'Food'),
//       where('shopId', '==', '02ebd36d-bb12-483d-a2ed-23559fd59044'),
//     )
//     const querySnapShot = await getDocs(q)
//     const queryData = querySnapShot.docs.map((detail) => ({
//       ...detail.data(),
//       id: detail.id,
//     }))
//     // console.log(queryData)
//     if (imageUpload == null) return
//     const imageRef = ref(storage, `Food/${imageUpload.name}`)
//     uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
//       await getDownloadURL(snapshot.ref).then(async (url) => {
//         const payload = {
//           menuId: v4(),
//           menuName: menuName,
//           menuPrice: menuPrice,
//           menuType: menuType,
//           menuImg: url,
//           timestamp: serverTimestamp(),
//         }
//         queryData.map(async (v) => {
//           const docRef = doc(firestore, `Food/${v.id}/shopMenus`, menuName)
//           await setDoc(docRef, payload)
//         })
//         document.getElementById('menuName').value = ''
//         document.getElementById('menuPrice').value = ''
//         document.getElementById('menuType').value = ''
//         //   document.getElementById('shopImg').value = ''
//       })
//     })
//   }
//   return (
//     <div>
//       <input type="text" id="menuName" placeholder="Menu name" />
//       <input type="text" id="menuPrice" placeholder="Menu Price" />
//       <input type="text" id="menuType" placeholder="Menu Type" />
//       <label className="fileUpload">
//         <ImageIcon fontSize="large" />
//         <input
//           type="file"
//           placeholder="select file"
//           id="menuImg"
//           onChange={(event) => {
//             setImageUpload(event.target.files[0])
//           }}
//         />
//       </label>
//       <button type="submit" onClick={addShopMenu}>
//         Add Menu
//       </button>
//     </div>
//   )
// }

const AddFoodShop = () => {
  const [shops, setShops] = useState([
    { shopName: 'Loading...', shopId: 'initial' },
  ])
  const [imageUpload, setImageUpload] = useState(null)

  useEffect(() => {
    const collectionRef = collection(firestore, 'Food')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setShops(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return unsub
  }, [])

  const addFoodShop = () => {
    var shopName = document.getElementById('shopName').value
    var shopOpentime = document.getElementById('shopOpentime').value
    var shopType = document.getElementById('shopType').value

    const collectionRef = doc(firestore, 'Food', shopName)

    if (imageUpload == null) return
    const imageRef = ref(storage, `Food/shopImg/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then(async (url) => {
        const payload = {
          shopId: v4(),
          shopName: shopName,
          shopOpentime: shopOpentime,
          shopType: shopType,
          shopImg: url,
          timestamp: serverTimestamp(),
        }
        await setDoc(collectionRef, payload)
        document.getElementById('shopName').value = ''
        document.getElementById('shopOpentime').value = ''
        document.getElementById('shopType').value = ''
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
        <input
          className="input"
          id="shopOpentime"
          placeholder="Open Time"
          type="text"
        />
        <input
          className="input"
          id="shopType"
          placeholder="Shop Type"
          type="text"
        />
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
          Add Food Shop
        </button>
      </div>

      <div className="show-shop">
        {shops.map((shop) => (
          <>
            <div>{shop.shopName}</div>
            <h3>{shop.shopOpentime}</h3>
            <Link to={`/nama-food/shop/${shop.shopId}`} target="_blank">
              <img style={{ width: '15rem' }} src={shop.shopImg} alt="" />
            </Link>

            {/* <div>{shop.shopId}</div> */}
          </>
        ))}
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
