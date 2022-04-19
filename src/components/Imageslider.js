// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import './styles.css'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper'

export default function Imageslider() {
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
        <SwiperSlide>
          <img src="./img/1 (1).png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/1 (2).png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/1 (3).png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/1 (4).png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/1 (5).png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/1 (6).png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/1 (7).png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/1 (8).png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./img/1 (9).png" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
