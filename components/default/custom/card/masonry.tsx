import { FC, useState } from "react";
import React from 'react';
import _ from "lodash";
import { jsonParse } from "@/utils/helper";
import CardItem from "./item";
import CardData from "./data";
import CardSlider from "./slider";
import RenderAtom from "@/components/common/atom/renderAtom";
import AtomImage from "@/components/common/atom/atomImage";
import CardMasonry from "./cardMasonry";
import { log } from "console";
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Grid } from "swiper";
type PropsType = {
  options?: any;
  data?: any;
};

const Masonry: FC<PropsType> = ({ options, data }) => {
    
  let newArr = _.map(data, (o) => _.pick(o, ["categorydesc"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "categorydesc")));
  const [active, setActive] = useState(0);
  const [filterItem, setFilterItem]: any = useState("Бүгд");
 
  let filtered: any = [];
  grouped.forEach((x) => {
    if (!x.includes("null")) filtered.push(x);
  });
  console.log(filterItem);
  

  const onFilterEvent = (e: any, item: any) => {
    e.preventDefault();
    setFilterItem(item);
  };

  const selectdata = _.filter(data, {
    categorydesc: filterItem,
  });
   

  let dataSrc: any = filterItem !== "Бүгд" ? selectdata : data;
  
  const settings = options?.custom;

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const content = () => {
    switch (settings?.style) {
        case "masonrySlider":
            return (
                <>
                {grouped && (
                    <div className="w-full block   col-span-12 container  px-2 pb-4 pt-16">
                        <div className="w-full block col-span-12 container xl:overflow-hidden lg:overflow-hidden xs:overflow-scroll">
                            {" "}
                            <div className="flex justify-between items-center self-stretch">
                                <ul className="xs:flex md:gap-6 sm:gap-3 sm:text-justify xs:text-center items-center w-max text-[#67748E] xl:overflow-hidden lg:overflow-hidden xs:overflow-scroll">
                                    {grouped.map((item: any, index: any) => {
                                        return (
                                        <li
                                            key={index}
                                            className={`w-auto list-item cursor-pointer hover:border-b-2 font-[700] md:text-[18px] sm:text-[16px] xs:text-[14px] py-2 border-b-2 ${
                                            active === index ? "border-interactive text-interactive" : "hover:text-interactive border-transparent"
                                            }`}
                                            onClick={(e: any) => {
                                            onFilterEvent(e, item);
                                            }}
                                        >
                                            <span onClick={() => setActive(index)}>
                                            {item === "undefined" ? "" : item}
                                            </span>
                                        </li>
                                        );
                                    })}
                                </ul>
                                <div className="flex">
                                    <div ref={navigationPrevRef} className="w-10 h-10 hover:text-interactive cursor-pointer flex justify-center items-center">
                                        <i className="fa-regular fa-arrow-left text-[15px]" />
                                    </div>
                                    <div ref={navigationNextRef} className="w-10 h-10 hover:text-interactive cursor-pointer flex justify-center items-center">
                                        <i className="fa-regular fa-arrow-right text-[15px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='relative lg:pb-28 pb-5'>    
                    <Swiper
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        breakpoints={{
                            320: {
                            slidesPerView: 1,
                            spaceBetween:20,
                            grid:{
                                rows:1,
                                fill:"row"
                            }
                            },
                            640: {
                            slidesPerView: 1,
                            spaceBetween:20,
                            grid:{
                                rows:1,
                                fill:"row"
                            }
                            },
                            768: {
                            slidesPerView: 1,
                            spaceBetween:20,
                            grid:{
                                rows:1,
                                fill:"row"
                            }
                            },
                            1024: {
                            slidesPerView: 2,
                            spaceBetween:20,
                            grid:{
                                rows:2,
                                fill:"row"
                            }
                            },
                            1280: {
                            slidesPerView: 2,
                            spaceBetween:20,
                            grid:{
                                rows:2,
                                fill:"row"
                            }
                            },
                        }}
                        modules={[Autoplay, Grid, Navigation, Pagination]}
                        className="mySwiper"
                        >

                        {selectdata?.map((item: any, index: number) => {
                            return (
                                <div key={index} className='pb-10'>
                                    <SwiperSlide>
                                        <div  className="flex flex-col xl:min-w-auto w-full min-w-full h-auto  md:flex-row bg-white rounded-[10px] cursor-pointer hover:shadow-lg">
                                            <div className="flex-none w-full md:w-[202.703px] h-full">
                                                <div>
                                                    <RenderAtom
                                                        renderType="image"
                                                        customClassName={"w-full md:min-h-[167px]  h-full rounded-t-lg md:rounded-l-lg"}
                                                        item={{
                                                        value: item?.mainimage,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-5 p-5">
                                                <RenderAtom
                                                    item={data?.position3 || { value: item?.title || "title" }}
                                                    renderType="title"
                                                    customClassName={
                                                    "lg:text-[16px] sm:text-[14px] xs:text-[12px] lg:font-semibold sm:font-medium xs:font-normal leading-[120%] text-[#3C3C3C]"
                                                    }
                                                /> 
                                                <RenderAtom
                                                    item={data?.position3 || { value: item?.description || "description" }}
                                                    renderType="title"
                                                    customClassName={
                                                    "lg:text-[14px] sm:text-[14px] xs:text-[10px] text-[#67748E] leading-[140%] line-clamp-2"
                                                    }
                                                /> 
                                                <div className="flex items-center gap-6">
                                                    <div className="flex-none">
                                                        <RenderAtom
                                                            renderType="image"
                                                            customClassName={"w-auto h-full"}
                                                            item={{
                                                            value: item?.iconImage,
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <RenderAtom
                                                            item={{value: item?.label}}
                                                            renderType="text"
                                                            customClassName={
                                                            "lg:text-[14px] sm:text-[14px] xs:text-[12px] text-[#3C3C3C] leading-[120%]"
                                                            }
                                                        /> 
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </div>
                            );
                            })
                        }
                    </Swiper>
                </div> 
                </>
              );
      default:
        return (
            <>
              {grouped && (
                <div className="w-full block col-span-12 container  px-2 pt-10 pb-[30px]">
                    <div className="sm:w-fit block bg-[#F7F7F7] rounded-[20px] sm:m-auto"> 
                    {/* flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll */}
                    <ul className="text-[#67748E] flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll">
                    {/* flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll */}
                        <li
                            key={""}
                            className={`cursor-pointer w-auto py-2 px-5 font-[800] md:text-[18px] sm:text-[16px] xs:text-[14px] rounded-[30px] text-[#67748E] ${
                                filterItem == "Бүгд"
                                ? "bg-[#35CC61] text-white"
                                : ""
                            }`}
                            onClick={() => setFilterItem("Бүгд")}
                            >
                            <span onClick={() => setActive(96)}>
                                Бүгд
                            </span>
                            </li>
                        {grouped.map((item: any, index: any) => {
                        return (
                            <li
                            key={index}
                            className={`cursor-pointer w-auto py-2 px-5 font-[800] md:text-[18px] sm:text-[16px] xs:text-[14px] rounded-[30px] text-[#67748E] ${
                                filterItem == item && "bg-[#35CC61] text-white"
                            }`}
                            onClick={(e: any) => {
                                onFilterEvent(e, item);
                            }}
                            >
                            <span onClick={() => setActive(index)}>
                                {item === "undefined" ? "" : item}
                            </span>
                            </li>
                        );
                        })}
                    </ul>
                    </div>
                </div>
              )}
                <div className="grid 8xl:grid-cols-4 grid-cols-1 gap-6 z-10 8xl:px-0 lg:px-2 xs:px-2 pb-16">
                    <CardData data={dataSrc} />
                </div>
            </>
        );
    }
  };
  

  return <>{content()}</>;
};

export default Masonry;







