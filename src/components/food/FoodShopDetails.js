import React from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../../config/firebase'
import { useState, useEffect } from 'react'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'

import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded'

const FoodShopDetails = () => {
  const { shopId } = useParams()
  const [shop, setShop] = useState([])
  const [shopMenus, setShopMenus] = useState([])

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

  return (
    <>
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
              <div className="col1">
                <img style={{ width: '5rem' }} src={menu.menuImg} alt="" />
              </div>
              <div className="col2">
                <h2>{menu.menuName}</h2>
                <h3>{menu.menuPrice}MMK</h3>
              </div>
              <div className="col3">
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
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default FoodShopDetails
