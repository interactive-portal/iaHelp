import RenderAtom from "@/components/common/atom/renderAtom";
import Scroll from "@/components/common/scroll/scroll";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { url } from "inspector";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { useWindowScroll, useWindowSize } from "react-use";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import AtomImage from "@/components/common/atom/atomImage";
import Link from "next/link";
import BlockDiv from "@/components/common/block/blockDiv";
import { useTranslation } from "next-i18next";

export default function ErpBanner({
  pDataSrc,
  pOptions,
}: {
  pDataSrc: any;
  pOptions: any;
}) {
  const { config, readyDatasrc, positionConfig, widgetnemgooReady } =
    useContext(WidgetWrapperContext);

  const data = readyDatasrc || pDataSrc;
  const staticItem1 = readyDatasrc[0] || (pDataSrc && pDataSrc[0]);
  const options = widgetnemgooReady?.options || (pOptions && pOptions);
  const { height } = useWindowSize();
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const { t } = useTranslation("translate");

  // console.log("ene bol hatuu data", data);

  const content = (item: any) => {
    switch (options?.contentStyle) {
      case "imageBanner":
        const ddd = process.env.IMAGEROOTURL || "https://dev.veritech.mn/";

        let imgSrc = item?.imgurl;
        if (imgSrc?.startsWith("storage/")) {
          imgSrc = `${ddd}${imgSrc}`;
        }
        return (
          <BlockDiv customClassName="w-full bg">
            <div className=" absolute w-full md:h-screen sm:h-[300px] xs:h-[300px] flex flex-col gap-y-[35px]  items-center justify-center">
              <div className="container  h-full text-center flex">
                <div className="flex w-full mt-5 xl:h-[600px]   md:h-[600px] relative sm:h-[300px]  xs:h-[80px]   ">
                  <div className="flex justify-items-center mx-auto align-middle items-center">
                    <RenderAtom
                      item={item?.position1 || { value: item?.title }}
                      renderType="title"
                      customClassName={
                        "md:text-[36px] z-50  xs:text-lg text-white md:w-[800px] md:leading-[70px]  text-left  md:pt-0 xs:pt-10  flex  font-medium bn-title animetad text-center"
                      }
                    />
                  </div>
                </div>
              </div>

              {item?.button && (
                <div className="flex items-center justify-center w-[220px] h-[50px] bg-opacity-0 rounded border-[2px] border-white">
                  <RenderAtom
                    item={item?.position9 || { value: item?.button }}
                    renderType="button"
                    customClassName={
                      "text-[18px]  xs:text-sm text-white bg-opacity-0 font-bold"
                    }
                  />
                </div>
              )}
            </div>
            <RenderAtom
              renderType="image"
              item={{ value: item?.imgurl }}
              customClassName="w-full h-auto pt-5 bg-cover"
              customStyle={{ objectFit: "cover" }}
            />

            {/* <Image
              src={imgSrc}
              alt=""
              fill={true}
              object-fit="cover"
              style={{ objectFit: "cover" }}
            /> */}
            <style>
              {`
            .bn-title {
              opacity: 0;
              transform: translateY(-10px);
              animation: emerge 1s forwards;
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
          </BlockDiv>
        );

      case "left":
        return (
          <div
            className={`md:h-[600px] relative sm:h-[300px]  xs:h-[250px]  ${options?.className}`}>
            <AtomImage
              item={item?.position2 || { value: item.imgurl }}
              alt="banner image"
              // options={"fill":true})}
              customClassName="xs:object-cover md:object-cover xs:object-cover"
            />
            <div className="z-5 absolute  w-full h-full flex flex-col gap-y-[35px] items-center justify-center ">
              <div className="container mx-auto">
                {item?.mainlogo && (
                  <Image
                    src={item?.mainlogo}
                    alt=""
                    width={400}
                    height={60}
                    className="pb-1 md:mb-20"
                  />
                )}
                <RenderAtom
                  item={item?.position1 || { value: item?.title }}
                  renderType="title"
                  customClassName={
                    "lg:text-[40px] md:text-[22px] sm:text-[16px] xs:text-[11px] md:w-[500px] xs:w-full md:leading-[46px] items-center text-left xs:h-[25px] 2xl:h-[85px] xl:h-[100px] lg:h-[80px] md:h-[40px] flex  md:font-bold xs:font-semibold text-white"
                  }
                />

                <RenderAtom
                  item={item?.position3 || { value: item?.description || "" }}
                  renderType="text"
                  customClassName={`md:text-[18px] xs:text-[9px] xs:w-full md:w-[700px] md:leading-[28px] items-center text-left xs:h-[80] md:h-[120px] xs:w-[210px] flex  font-medium  ${options?.classNameDesc}`}
                />

                {item?.buttonname && (
                  <div className="md:flex  xs:hidden items-center justify-start transition duration-150 ease-in-out  mt-4">
                    {/* <link rel="stylesheet" href="" />lin */}
                    <RenderAtom
                      item={{ value: t("WPD_0001") }}
                      renderType="button"
                      customClassName={`lg:text-[18px] md:text-[16px] sm:text-[14px] xs:text-[8px] text-black md:px-10 xs:px-[8px] xl:mt-0 lg:mt-2 xs:mt-3 rounded-full hover:opacity-80 transition bg-white font-medium  ${options?.classNamebutton} `}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "right":
        return (
          <div className={`md:h-[600px] sm:h-[300px ${options?.className}`}>
            <Image
              src={staticItem1?.mainimage}
              alt=""
              fill
              className="xs:object-contain md:object-cover"
            />
            <div className="z-5 absolute w-full h-full flex flex-col gap-y-[35px] items-center justify-center bg">
              <div className="container mx-auto">
                <RenderAtom
                  item={{ value: staticItem1?.title }}
                  renderType="title"
                  customClassName={
                    "text-[50px]  w-[700px] leading-[59px] items-center text-right h-[100px] flex  font-bold "
                  }
                />
                <RenderAtom
                  item={{ value: staticItem1?.description }}
                  renderType="text"
                  customClassName={
                    "text-[18px]  w-[700px] leading-[28px] items-center text-left h-[210px] flex  font-medium "
                  }
                />
                {staticItem1?.button && (
                  <div className="flex items-center justify-start transition duration-150 ease-in-out">
                    <RenderAtom
                      item={{ value: staticItem1?.button }}
                      renderType="button"
                      customClassName={
                        "text-[18px] text-black px-10 rounded-full hover:opacity-80 transition"
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={` md:h-[700px] sm:h-[300px] xs:h-[200px]`}>
            {/* <Image src={item?.mainimage} alt="" fill /> */}
            <AtomImage
              item={item?.position2}
              alt="banner image"
              // options={"fill":true})}
            />
            <div className="z-40 absolute w-full md:-top-16  md:h-screen sm:h-[300px] xs:h-[300px] flex flex-col gap-y-[35px] bg items-center justify-center">
              <RenderAtom
                item={item?.position1 || { value: item?.title }}
                renderType="title"
                customClassName={
                  "md:text-[50px] xs:text-lg text-white md:w-[800px] md:leading-[70px] items-center text-left  md:pt-0 xs:pt-10 md:h-[210px] flex  font-medium"
                }
              />

              {item?.button && (
                <div className="flex items-center justify-center w-[220px] h-[50px] bg-opacity-0 rounded border-[2px] border-white">
                  <RenderAtom
                    item={item?.position9 || { value: t("WPD_0001") }}
                    renderType="button"
                    customClassName={
                      "text-[18px]  xs:text-sm text-white bg-opacity-0 font-bold"
                    }
                  />
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative w-full emergeny`}>
      <Swiper
        slidesPerView={1}
        // spaceBetween={20}
        // loopFillGroupWithBlank={true}
        loop
        pagination={{
          clickable: true,
        }}
        autoHeight={true}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        // autoplay={{
        //   delay: 15000,
        //   disableOnInteraction: false,
        // }}
        // navigation={true}
        modules={[Navigation, Pagination]}
        className="banner">
        {data?.map((item: any, index: number) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <SwiperSlide className="" key={item?.id || index}>
              {content(item)}
            </SwiperSlide>
          );
        })}
        <div
          ref={navigationPrevRef}
          className="absolute -left-10 border top-1/2  w-10 h-10 hover:border-interactive hover:text-interactive cursor-pointer rounded-full flex justify-center justify-items-center">
          <i className="fa-light fa-arrow-left-long text-[25px]"></i>
        </div>
        <div
          ref={navigationNextRef}
          className="absolute -right-10 border top-1/2  w-10 h-10 hover:border-interactive hover:text-interactive cursor-pointer rounded-full flex justify-center justify-items-center">
          <i className="fa-light fa-arrow-right-long text-[25px]"></i>
        </div>
      </Swiper>
      <style>
        {`
            .emergeny {
              opacity: 0;
              transform: translateY(-10px);
              animation: emerge 3s forwards;
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
