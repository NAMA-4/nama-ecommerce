// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import './styles.css'
import { mainslide } from './ImageSlide'
import { firestore } from '../config/firebase'
import { collection, orderBy, onSnapshot, query } from 'firebase/firestore'
import { useState, useEffect } from 'react'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper'

function ImagesliderMain() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {mainslide.map((val) => (
          <SwiperSlide>
            <img src={val.img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

function ImagesliderFood() {
  const [slideImages, setSlideImages] = useState([])

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
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slideImages.map((val) => (
          <SwiperSlide>
            <img src={val.Img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
export { ImagesliderMain, ImagesliderFood }
