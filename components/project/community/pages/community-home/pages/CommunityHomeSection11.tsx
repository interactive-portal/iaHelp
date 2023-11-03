import { useState, useContext } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { Navigation, Pagination } from "swiper/modules";

export default function CommunityHomeSection11() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const UsersData = [
    {
      imgUrl:
        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_1_o4cfnt.png",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1674119133/cld-sample.jpg",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_mqwegp.png",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1666839868/interactive.mn/infor/Partners/1004712452_webinars_800x800_larc6z.jpg",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1661740331/cloudnew/blog-1-3_lb0ykt.jpg",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_1_o4cfnt.png",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_mqwegp.png",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_mqwegp.png",
    },
    {
      imgUrl:
        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_mqwegp.png",
    },
  ];

  return (
    <BlockDiv
      divNumber="ProlianceHero03Outer"
      customClassName="bg-white flex flex-col"
    >
      <BlockDiv customClassName="flex flex-col sm:mx-auto sm:container sm:py-10 py-5 items-center space-y-5">
        <RenderAtom
          item={{ value: "Таньдаг байж болох" }}
          renderType="text"
          customClassName={
            "lg:text-[34px] text-[20px] text-[#585858] font-medium"
          }
        />
        <BlockDiv customClassName="flex flex-row gap-5 w-full items-center justify-center">
          <Swiper
            navigation={{ nextEl: ".next", prevEl: ".prev" }}
            // autoHeight={true}
            modules={[Navigation, Pagination]}
            autoplay={{ delay: 1000 }}
            loop={true}
            centeredSlides={true}
            className="flex justify-center items-center"
            breakpoints={{
              default: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1300: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
          >
            {UsersData.map((row: any, index: number) => {
              return (
                <SwiperSlide>
                  <UserCard key={index} imgUrl={row.imgUrl} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </BlockDiv>
        <BlockDiv customClassName="flex py-5 w-full justify-between ">
          <RenderAtom
            item={{ value: "Дахин харуулахгүй" }}
            renderType="text"
            customClassName={
              "text-[#585858] lg:text-[16px] text-[14px] font-medium"
            }
          />
          <BlockDiv customClassName="flex justify-center items-center py-2 px-4 border border-[#FFAE00] rounded-[10px] space-x-3">
            <RenderAtom
              item={{ value: "Бүгдийг үзэх" }}
              renderType="text"
              customClassName={
                "text-[#FFAE00] lg:text-[16px] text-[12px] font-medium"
              }
            />
            <RenderAtom
              item={{ value: "fa-regular fa-arrow-right" }}
              renderType="icon"
              customClassName={
                "flex text-[#FFAE00] lg:text-[16px] text-[12px] font-medium "
              }
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}

const UserCard = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <BlockDiv
      customClassName="flex flex-col gap-[10px] items-center justify-center"
      divNumber="UserCardOuter"
    >
      <RenderAtom
        renderType="image"
        item={{
          value:
            imgUrl ||
            "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_1_o4cfnt.png",
        }}
        customClassName="flex rounded-full h-[150px] w-[150px] object-cover"
      />
      <RenderAtom
        renderType="text"
        item={{ value: "М.Дэлгэрмаа" }}
        customClassName={"text-[#585858] text-[16px] font-bold"}
      />
    </BlockDiv>
  );
};
