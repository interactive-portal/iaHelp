import { useContext } from "react";
import _ from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import useSwiperRef from "@/components/common/atom/useSwiperRef";
import BlockDiv from "@/components/common/block/blockDiv";
import RenderAtom from "@/components/common/atom/renderAtom";
import Image from "next/image";
import AtomImage from "@/components/common/atom/atomImage";
import moment from "moment";
export default function InteractiveWhatClientSaySwiper() {
  const { config, readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem1 = _.values(readyDatasrc[0]);
  const [nextEl, nextElRef]: any = useSwiperRef();
  const [prevEl, prevElRef]: any = useSwiperRef();
  return (
    <BlockDiv
      customClassName={`relative w-full  h-[650px] md:inline-block xs:hidden`}
    >
      {/* Swiper */}
      <>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[Autoplay, Navigation]}
          navigation={{
            prevEl,
            nextEl,
          }}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          // }}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {readyDatasrc?.map((item: any, index: number) => {
            return (
              <SwiperSlide className="" key={item?.id || index}>
                <BlockDiv customClassName="w-full h-[650px] z-0 relative">
                  {/* <RenderAtom
                    item={{ value: "position2" }}
                    renderType="image"
                    customClassName={
                      "absolute z-0 w-full h-full object-cover object-center"
                    }
                  /> */}

                  <BlockDiv customClassName="z-10 absolute w-full h-full">
                    <BlockDiv customClassName=" mx-auto xl:container lg:container w-full xl:h-full lg:h-auto xs:h-auto flex xl:flex-row lg:flex-col xs:flex-col gap-x-4">
                      <BlockDiv customClassName="w-1/2 h-full relative">
                        <RenderAtom
                          item={item.position2 || { value: item?.authorImage }}
                          renderType="image"
                          customClassName={
                            "z-0 absolute left-0 bottom-0 w-auto md:h-[570px] object-contain xl:block lg:hidden xs:hidden"
                          }
                        />

                        {/* <BlockDiv customClassName="absolute bottom-[325px] right-[150px] cursor-pointer w-[99px] h-[99px] bg-[#1f1658] group rounded-full flex items-center justify-center">
                          <BlockDiv customClassName="w-[69px] h-[69px] bg-white rounded-full flex items-center justify-center">
                            <RenderAtom
                              item={{ value: "fa-solid fa-play" }}
                              renderType="icon"
                              customClassName={
                                "text-xl text-[#009BDE] group-hover:animate-ping"
                              }
                            />
                          </BlockDiv>
                        </BlockDiv> */}
                      </BlockDiv>
                      <BlockDiv customClassName="xl:w-1/2 lg:w-[80%] justify-between xs:w-full h-full flex flex-col items-start gap-y-[35px] xl:pt-[80px] lg:pt-[20px] xs:pt-[20px] pb-[60px] relative">
                        <BlockDiv customClassName="flex flex-col pt-[15px] gap-[30px]">
                          <RenderAtom
                            item={item?.position1 || { value: "position1" }}
                            renderType="title"
                            customClassName={
                              "xl:text-[40px] lg:text-[36px] xs:text-[30px] text-white"
                            }
                          />
                          <RenderAtom
                            item={item.position50 || { value: item?.image }}
                            renderType="image"
                            customClassName={
                              "z-0  left-0 bottom-0 w-auto h-[45px] object-contain mt-10"
                            }
                          />
                          <RenderAtom
                            item={
                              item.position3 || {
                                value: "position3 description",
                              }
                            }
                            renderType="text"
                            customClassName={
                              "xl:text-[18px] lg:text-[16px] xs:text-[14px] text-white font-normal"
                            }
                          />
                        </BlockDiv>
                        <BlockDiv customClassName="flex flex-col pt-[15px] ">
                          <RenderAtom
                            item={item.position10 || { value: "position10" }}
                            renderType="text"
                            customClassName={
                              "xl:text-[18px] lg:text-[16px] xs:text-[14px] text-white w-[347px]"
                            }
                          />
                        </BlockDiv>
                      </BlockDiv>
                    </BlockDiv>
                  </BlockDiv>
                </BlockDiv>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
      {/* Arrow button */}
      <BlockDiv customClassName="absolute right-[0] top-[190px] z-10 flex flex-row justify-between  w-[130px] h-[50px]">
        <div
          className="w-[50px] h-[50px] flex items-center justify-center cursor-pointer rounded-full bg-white bg-opacity-25"
          ref={prevElRef}
        >
          <RenderAtom
            item={{ value: "fa-light fa-arrow-left" }}
            renderType="icon"
            customClassName={"text-xl text-white"}
          />
        </div>
        <div
          className="w-[50px] h-[50px] flex items-center justify-center cursor-pointer rounded-full bg-white bg-opacity-25"
          ref={nextElRef}
        >
          <RenderAtom
            item={{ value: "fa-light fa-arrow-right" }}
            renderType="icon"
            customClassName={"text-xl text-white"}
          />
        </div>
      </BlockDiv>
    </BlockDiv>
  );
}
