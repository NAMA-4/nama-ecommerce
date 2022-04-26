// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import './styles.css'
import data from './ImageSlide.json'

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
        {data.map((val) => (
          <SwiperSlide>
            <img src={val.img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
