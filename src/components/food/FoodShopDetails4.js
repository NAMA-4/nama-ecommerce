import React from 'react'
import { useParams } from 'react-router-dom'
import { firestore, storage } from '../../config/firebase'
import { useState, useEffect } from 'react'
import {
  onSnapshot,
  collection,
  where,
  updateDoc,
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

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const FoodShopDetails4 = () => {
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
    // var menuType = document.getElementById('menuType').value

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
    if (imageUpload == null) {
      const payload = {
        menuId: v4(),
        menuName: menuName,
        menuPrice: menuPrice,
        // menuImg: url,
        timestamp: serverTimestamp(),
      }
      queryData.map(async (v) => {
        const docRef = doc(firestore, `Food/${v.id}/shopMenus`, menuName)
        await setDoc(docRef, payload)
      })
      document.getElementById('menuName').value = ''
      document.getElementById('menuPrice').value = ''
    } else {
      const imageRef = ref(storage, `Food/${imageUpload.name}`)
      uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          const payload = {
            menuId: v4(),
            menuName: menuName,
            menuPrice: menuPrice,
            // menuType: menuType,
            menuImg: url,
            timestamp: serverTimestamp(),
          }
          queryData.map(async (v) => {
            const docRef = doc(firestore, `Food/${v.id}/shopMenus`, menuName)
            await setDoc(docRef, payload)
          })
          document.getElementById('menuName').value = ''
          document.getElementById('menuPrice').value = ''
          setImageUpload([])
          // document.getElementById('menuType').value = ''
        })
      })
    }
  }

  const handleEdit = async (id, menu) => {
    const docRef = doc(firestore, 'Food', `${shop.shopName}`, 'shopMenus', menu)
    const menuName = prompt('Edit menu name')
    const menuPrice = prompt('Edit menu price')

    const payload = { menuName, menuPrice }
    await updateDoc(docRef, payload)
  }

  return (
    <>
      <div className="addmenu-box">
        <input
          className="input"
          type="text"
          id="menuName"
          placeholder="Menu name"
        />
        <input
          className="input"
          type="text"
          id="menuPrice"
          placeholder="Menu Price"
        />
        {/* <input
          className="input"
          type="text"
          id="menuType"
          placeholder="Menu Type"
        /> */}
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
        <button
          className="addproduct-btn"
          type="submit"
          onClick={() => addShopMenu(shop.shopId)}
        >
          Add Menu
        </button>
      </div>
      <div className="shop-profile">
        <img className="shop-profile-img" src={shop.shopImg} alt="" />
        <div className="shop-info">
          <h1 className="shop-profile-name">{shop.shopName}</h1>
          <h3 className="shop-profile-info">{shop.shopOpentime}</h3>
        </div>
      </div>
      <div className="shopMenus">
        {shopMenus.map((menu) => (
          <>
            <div className="menu-box">
              {menu.menuImg == null ? null : (
                <div className="col1">
                  <img style={{ width: '5rem' }} src={menu.menuImg} alt="" />
                </div>
              )}
              <div className="col2">
                <h2>{menu.menuName}</h2>
                <h3>{menu.menuPrice} MMK</h3>
              </div>
              {/* <div className="col3">
                <button className="btn btn1">
                  <a
                    href="https://www.messenger.com/t/108286378398611/?messaging_source=source%3Apages%3Amessage_shortlink"
                    class="btn btn-primary action"
                  >
                    <LocalGroceryStoreRoundedIcon
                      fontSize="small"
                      className="icon"
                    />
                  </a>
                </button>
                <button className="btn btn2">
                  <a href="tel:09455406870" class="btn btn-primary action">
                    <PhoneRoundedIcon fontSize="small" />
                  </a>
                </button>
              </div> */}
              <div className="call-action col3">
                <button
                  className="btn btn1"
                  // onClick={() => handleDelete(menu.menuId, menu.menuImg)}
                >
                  <DeleteIcon fontSize="small" />
                </button>
                <button
                  className="btn btn2"
                  onClick={() => handleEdit(menu.menuId, menu.menuName)}
                >
                  <EditIcon fontSize="small" className="icon" />
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default FoodShopDetails4
