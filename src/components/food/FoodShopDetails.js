import React from 'react'
import { useParams } from 'react-router-dom'
import { firestore, storage } from '../../config/firebase'
import { useState, useEffect } from 'react'
import {
  onSnapshot,
  collection,
  where,
  // getDoc,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import ImageIcon from '@mui/icons-material/Image'
import { v4 } from 'uuid'

const FoodShopDetails = () => {
  const { shopId } = useParams()
  const [shop, setShop] = useState([])
  const [shopMenus, setShopMenus] = useState([])
  const [imageUpload, setImageUpload] = useState(null)

  window.scrollTo(0, 0)
  useEffect(() => {
    const collectionRef = collection(firestore, 'Food')

    onSnapshot(collectionRef, (snapshot) => {
      const snap = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const filterShop = snap.find((shop) => shop.shopId === shopId)
      setShop(filterShop)
    })

    const collectionRefMenu = collection(
      firestore,
      `Food/${shop.shopName}/shopMenus`,
    )
    const q = query(collectionRefMenu, orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      setShopMenus(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return unsub
  }, [shopId, shop.shopName])

  const addShopMenu = async () => {
    var menuName = document.getElementById('menuName').value
    var menuPrice = document.getElementById('menuPrice').value
    var menuType = document.getElementById('menuType').value

    console.log(shopId)

    const q = query(
      collection(firestore, 'Food'),
      where('shopId', '==', shopId),
    )
    const querySnapShot = await getDocs(q)
    const queryData = querySnapShot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }))
    // console.log(queryData)
    if (imageUpload == null) return
    const imageRef = ref(storage, `Food/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then(async (url) => {
        const payload = {
          menuId: v4(),
          menuName: menuName,
          menuPrice: menuPrice,
          menuType: menuType,
          menuImg: url,
          timestamp: serverTimestamp(),
        }
        queryData.map(async (v) => {
          const docRef = doc(firestore, `Food/${v.id}/shopMenus`, menuName)
          await setDoc(docRef, payload)
        })
        document.getElementById('menuName').value = ''
        document.getElementById('menuPrice').value = ''
        document.getElementById('menuType').value = ''
        //   document.getElementById('shopImg').value = ''
      })
    })
  }

  return (
    <>
      <div>
        <input type="text" id="menuName" placeholder="Menu name" />
        <input type="number" id="menuPrice" placeholder="Menu Price" />
        <input type="text" id="menuType" placeholder="Menu Type" />
        <label className="fileUpload">
          <ImageIcon fontSize="large" />
          <input
            type="file"
            placeholder="select file"
            id="menuImg"
            onChange={(event) => {
              setImageUpload(event.target.files[0])
            }}
          />
        </label>
        <button type="submit" onClick={() => addShopMenu(shop.shopId)}>
          Add Menu
        </button>
      </div>
      <h1>{shop.shopName}</h1>
      <h3>{shop.shopOpentime}</h3>
      <img style={{ width: '15rem' }} src={shop.shopImg} alt="" />
      <div className="shopMenus">
        {shopMenus.map((menu) => (
          <>
            <h2>{menu.menuName}</h2>
            <h3>{menu.menuPrice}</h3>
            <img style={{ width: '10rem' }} src={menu.menuImg} alt="" />
          </>
        ))}
      </div>
    </>
  )
}

export default FoodShopDetails
