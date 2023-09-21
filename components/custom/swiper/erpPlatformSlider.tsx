import React, { useContext } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import _ from "lodash";

import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import BlockDiv from "@/components/common/block/blockDiv";
import RenderAtom from "@/components/common/atom/renderAtom";
import Image from "next/image";
import Link from "next/link";

export default function ErpSlider() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);

  const options = widgetnemgooReady?.options;

  const content = (item: any) => {
    switch (options?.cardType) {
      case "card":
        return (
          <BlockDiv customClassName="flex flex-col bg-white cursor-pointer">
            <RenderAtom
              item={
                item?.position12 || {
                  value: item?.imgurl,
                }
              }
              renderType="image"
              customClassName={"w-full h-[195px] object-cover"}
            />
            <BlockDiv customClassName="flex flex-col p-5 h-[214px] justify-between gap-[10px]">
              <RenderAtom
                renderType="title"
                item={
                  item?.position1 || {
                    value: item?.title,
                  }
                }
                customProps={{
                  truncateRow: 2,
                }}
                customClassName={
                  "text-[20px] font-bold leading-[26px] text-[#3C3C3C]"
                }
              />
              <RenderAtom
                renderType="text"
                item={
                  item?.position3 || {
                    value: item?.descr,
                  }
                }
                customClassName={
                  "text-[16px] leading-[26px] text-[#67748E] line-clamp-2"
                }
              />
              <Link
                href={item?.url}
                className="px-0 mx-0 font-semibold text-[16px] flex-row-reverse gap-x-2 text-[#0C529D] hover:underline">
                {item?.buttonname || item?.buttonname}{" "}
                <i className="fa-regular fa-arrow-right -rotate-45"></i>
              </Link>
            </BlockDiv>
          </BlockDiv>
        );

      case "card2":
        return (
          <BlockDiv customClassName="flex flex-col p-[30px] border-t-8 border-transparent rounded-t-[5px] rounded-b-[10px] hover:border-interactive hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] my-5 space-y-5 cursor-pointer">
            <RenderAtom
              item={
                item?.position12 || {
                  value: item?.imgurl,
                }
              }
              renderType="image"
              customClassName={"w-[60px] h-[60px] object-cover rounded-[10px]"}
            />
            <RenderAtom
              renderType="title"
              item={
                item?.position1 || {
                  value: item?.title,
                }
              }
              customProps={{
                truncateRow: 2,
              }}
              customClassName={
                "text-[22px] font-bold leading-[30px] text-[#3C3C3C] h-[60px]"
              }
            />
            <RenderAtom
              renderType="text"
              item={
                item?.position3 || {
                  value: item?.descr,
                }
              }
              customClassName={
                "text-[18px] leading-[30px] text-[#67748E] line-clamp-2"
              }
            />
            <Link
              href={item?.url}
              className="px-0 mx-0 font-medium text-[18px] flex-row-reverse gap-x-2 text-[#3C3C3C] hover:text-[#0E6FFF]">
              {item?.buttonname || item?.buttonname}{" "}
              <i className="fa-light fa-arrow-right -rotate-45"></i>
            </Link>
          </BlockDiv>
        );

      case "platformCard":
        return (
          <div className="flex flex-col justify-center items-center text-center cursor-pointer">
            <RenderAtom
              item={
                item?.position12 || {
                  value: item?.iconImage,
                }
              }
              renderType="image"
              customClassName={"w-auto h-[70px] object-cover"}
            />
            <BlockDiv customClassName="flex flex-col p-5 justify-between gap-[10px]">
              <RenderAtom
                renderType="title"
                item={
                  item?.position1 || {
                    value: item?.title,
                  }
                }
                customProps={{
                  truncateRow: 2,
                }}
                customClassName={
                  "text-[22px] font-bold leading-[26px] text-[#3C3C3C]"
                }
              />
              <RenderAtom
                renderType="text"
                item={
                  item?.position3 || {
                    value: item?.descr,
                  }
                }
                customClassName={"text-[16px] leading-[26px] text-[#67748E]"}
              />
            </BlockDiv>
          </div>
        );

      default:
        return (
          <BlockDiv customClassName="relative w-[406px] h-[506px] bg-white">
            <Image src={item?.mainimage} alt="" fill />

            <BlockDiv customClassName="z-5 absolute w-full h-full p-5 flex flex-col items-start">
              <RenderAtom
                item={{
                  value: item?.title,
                }}
                renderType="title"
                customClassName={"text-[#2C2C51] text-[40px] font-medium"}
              />
              <RenderAtom
                item={{
                  value: item?.button,
                }}
                renderType="button"
                customClassName={`px-0 mx-0 font-medium text-[18px] ${
                  "Internet of </br>Things" == item?.title
                    ? "text-white"
                    : "text-[#0E6FFF]"
                }  flex-row-reverse gap-x-2`}
                customProps={{
                  type: "icon",
                  icon: "fa-light fa-arrow-right -rotate-45",
                }}
              />
            </BlockDiv>
          </BlockDiv>
        );
    }
  };

  return (
    <div className="flex flex-row justify-center items-center relative z-30 emergeny">
      <div className=" md:inline-block xs:hidden">
        <div className=" flex bg-[#F2F2F2] flex-none justify-center items-center  w-20 h-20 hover:text-interactive cursor-pointer rounded-full prevPlatformSlider">
          <i className="fa-regular fa-arrow-left text-[25px]" />
        </div>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        navigation={{
          nextEl: ".nextPlatformSlider",
          prevEl: ".prevPlatformSlider",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          410: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper">
        {readyDatasrc?.map((item: any, index: number) => {
          return (
            <SwiperSlide className="" key={item?.id || index}>
              {content(item)}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="md:inline-block xs:hidden">
        <div className="flex bg-[#F2F2F2] flex-none justify-center items-center  w-20 h-20 hover:text-interactive cursor-pointer rounded-full nextPlatformSlider">
          <i className="fa-regular fa-arrow-right text-[25px] flex text-center justify-center items-center" />
        </div>
      </div>
      <style>
        {`
            .emergeny {
              opacity: 0;
              transform: translateY(-10px);
              animation: emerge 2s forwards;
            }

            @keyframes emerge {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            `}
      </style>
    </div>
  );
}
