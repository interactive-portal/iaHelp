import { useContext } from "react";
import WidgetWrapperContext from "@engineBox/Wrapper/WidgetUniversalWrapper";
import { SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import { AtomTitle, AtomText, AtomImage } from "@components/common/Atom";

export default function Banner3() {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  // console.log("Banner3 config", config);
  //console.log("Banner3 readyDatasrc", readyDatasrc);
  // console.log("Banner3 widgetnemgooReady", widgetnemgooReady);
  //console.log("Banner3 positionConfig", positionConfig);
  const pagination: any = {
    clickable: true,
    type: "bullets",
    renderBullet: (index: number, className: any) => {
      return `<span index-number="${index}" class="${className} cursor-pointer text-white mx-2 w-4 h-4 inline-block rounded-full"> </span>`;
    },
  };
  return (
    <>
      <Swiper
        slidesPerView={1}
        centeredSlides={false}
        modules={[Pagination, Autoplay]}
        pagination={pagination}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {readyDatasrc &&
          readyDatasrc.map((item: any, index: number) => {
            return (
              <SwiperSlide key={item?.id || index}>
                <div key={item?.id || index} className="relative">
                  <AtomImage
                    item={item.mainimage}
                    customClassName="hidden md:block object-center object-cover w-full rounded-lg h-[500px]"
                    alt="background-img"
                  />
                  <AtomImage
                    item={item.logo}
                    customClassName="md:hidden object-center object-fill w-full h-48 md:h-full"
                    alt="background-img"
                  />
                  <div className="absolute w-full flex flex-col justify-center h-full inset-0 px-4 md:px-10 lg:px-24">
                    <AtomTitle
                      item={item.title}
                      customClassName="text-xl md:text-3xl lg:text-4xl leading-5 md:leading-7 lg:leading-9 font-semibold text-white"
                    />
                    <AtomText
                      item={item.description}
                      customClassName="w-11/12 text-base md:text-xl lg:text-2xl leading-6 md:leading-5 font-normal lg:leading-6 text-white mt-2"
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <style>
        {`
          .swiper-pagination-bullet-active {
              opacity:1 !important;
              background:white!important;
          }
          .swiper-pagination-bullet {
              opacity:0.4;
          }
          .swiper-pagination {
              position: absolute;
              bottom: 20px;
              z-index: 5000;
              margin: 0 auto;
              // transform: translate(-20%, 0);
              left: 21%;
          }
          .swiper-slide {
              width: unset;
          }
        `}
      </style>
    </>
  );
}
