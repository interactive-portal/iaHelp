import React, { useContext } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import BlockDiv from "@/components/common/block/blockDiv";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import _ from "lodash";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

export default function ErpCarousel() {
  const { config, readyDatasrc, positionConfig, widgetnemgooReady } =
    useContext(WidgetWrapperContext);

  const breakPoints = widgetnemgooReady?.options?.breakpoints;
  const isActive = widgetnemgooReady?.options?.isActive;

  const selectdata = _.filter(readyDatasrc, (data) => data.isactive === 0);

  // console.log("dsadsa dasd as das d", selectdata);

  const renderData = isActive ? selectdata : readyDatasrc;

  return (
    <BlockDiv
      customClassName="flex flex-row container mx-auto gap-5 w-full items-center justify-center py-[20px]"
      divNumber="SwiperOutter">
      <BlockDiv customClassName="flex prev">
        <RenderAtom
          renderType="icon"
          item={{ value: "fa-solid fa-angle-left" }}
          customClassName="text-lg"
        />
      </BlockDiv>

      <Swiper
        navigation={{ nextEl: ".next", prevEl: ".prev" }}
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        centeredSlides={true}
        roundLengths={true}
        className="mySwiper"
        breakpoints={
          // ...breakPoints,
          {
            "390": {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            "1024": {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            "1280": {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            "1300": {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }
        }
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}>
        {renderData?.map((row: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <BlockDiv customClassName="flex items-center justify-center">
                <RenderAtom
                  renderType="image"
                  item={{ value: row.imgurl || row.mainimage }}
                  customClassName="w-[204px] h-auto"
                />
              </BlockDiv>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <BlockDiv customClassName="flex next">
        <RenderAtom
          renderType="icon"
          item={{ value: "fa-solid fa-angle-right" }}
          customClassName="text-lg"
        />
      </BlockDiv>
    </BlockDiv>
  );
}
