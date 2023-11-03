import { useContext } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { Navigation, Pagination } from "swiper/modules";

export default function CommunityHomeSection09() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  return (
    <BlockDiv
      divNumber="SalesInformationOuter"
      customClassName="bg-white flex flex-col"
    >
      <BlockDiv customClassName="flex flex-col sm:mx-auto sm:container sm:py-10 py-5 items-center space-y-5">
        <RenderAtom
          item={{ value: "Хямдрал, Урамшуулалын мэдээлэл" }}
          renderType="text"
          customClassName={
            "lg:text-[34px] text-[20px] text-[#585858] font-medium"
          }
        />

        <BlockDiv
          customClassName="flex flex-row gap-5 w-full items-center justify-center"
          divNumber="SwiperOutter"
        >
          <BlockDiv customClassName="flex prev">
            <RenderAtom
              renderType="icon"
              item={{ value: "fa-solid fa-angle-left" }}
              customClassName="h-10 w-10 bg-white rounded-full items-center justify-center text-center flex shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
            />
          </BlockDiv>

          <Swiper
            navigation={{ nextEl: ".next", prevEl: ".prev" }}
            autoHeight={true}
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
                slidesPerView: 1,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1300: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {readyDatasrc.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <PolygonCard
                    date={item?.date}
                    imgUrl={item?.imgUrl}
                    key={index}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <BlockDiv customClassName="flex next">
            <RenderAtom
              renderType="icon"
              item={{ value: "fa-solid fa-angle-right" }}
              customClassName="h-10 w-10 bg-white rounded-full items-center justify-center text-center flex shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
            />
          </BlockDiv>
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

const PolygonCard = ({ imgUrl, date }: { imgUrl: string; date: string }) => {
  return (
    <BlockDiv customClassName="flex flex-col items-center gap-[10px]">
      <BlockDiv
        customClassName="w-[260px] md:w-[335px] h-[160px] rounded-[10px] relative shadow-cozysmall"
        customStyle={{
          clipPath:
            "polygon(0 0,100% 0%,100% 43%,97% 50%,100% 57%,100% 100%,0 100%,0 57%,3% 50%,0 43%)",
          backgroundImage: `url(${imgUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "black",
          backgroundPosition: "center",
        }}
      />
      <RenderAtom
        renderType="text"
        item={{ value: date }}
        customClassName={"text-[#67748E] text-center text-[14px] font-medium"}
      />
    </BlockDiv>
  );
};
