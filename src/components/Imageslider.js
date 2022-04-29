// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import './styles.css'
import { foodslide, mainslide } from './ImageSlide'

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
        {foodslide.map((val) => (
          <SwiperSlide>
            <img src={val.img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
export { ImagesliderMain, ImagesliderFood }
