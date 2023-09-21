import { useContext } from "react";
import _ from "lodash";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";

import BlockDiv from "@/components/common/block/blockDiv";
import RenderAtom from "@/components/common/atom/renderAtom";

export default function InteractivePlatformSecrets() {
  const { config, readyDatasrc, widgetnemgooReady } =
    useContext(WidgetWrapperContext);

  const defautltTitle =
    widgetnemgooReady?.options?.defaultTitle || "Нууцлал, <br>аюулгүй байдал";

  const defautltDescription =
    widgetnemgooReady?.options?.defaultDescription ||
    "E.I.S нь системийн нууцлал, аюулгүй байдлыг хангах олон механизмтай бөгөөд байнга сайжруулалт хийгдэж байдаг. Нууцлал, аюулгүй байдал нь Серверийн, Сүлжээний, Өгөгдлийн сангийн, Програмын гэх мэт олон түвшинд хэрэгждэг.";

  const cardData1 = readyDatasrc[0];
  const cardData2 = readyDatasrc[1];
  const cardData3 = readyDatasrc[2];
  const cardData4 = readyDatasrc[3];

  return (
    <BlockDiv customClassName="flex flex-col-reverse xl:flex-row relative w-full md:gap-10 justify-center lg:justify-start items-center">
      <BlockDiv customClassName="flex flex-col lg:flex-row h-full gap-[40px] py-[30px]">
        <BlockDiv customClassName="flex flex-col sm:flex-row lg:flex-col gap-[40px] max-w-[700px]">
          {/* card 1*/}
          <BlockDiv customClassName="flex flex-col bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[10px] p-[30px] space-y-5 w-full max-w-[330px]">
            <RenderAtom
              renderType="image"
              item={{ value: cardData1?.imgurl }}
              customClassName={"md:w-[76px] xs:w-[50px] h-auto object-cover"}
            />
            <RenderAtom
              renderType="title"
              item={{ value: cardData1?.title }}
              customClassName={
                "text-lg text-[#0C529D] font-bold leading-[35px] lg:text-[30px] sm:text-2xl xs:text-lg"
              }
            />
            <RenderAtom
              renderType="title"
              item={{ value: cardData1?.body }}
              customClassName={
                "text-[#67748E] font-normal text-[18px] leading-[30px] md:text-left xs:text-justify text-lg sm:text-lg xs:text-base"
              }
            />
          </BlockDiv>
          {/* card 2*/}
          <BlockDiv customClassName="flex flex-col bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[10px] p-[30px] space-y-5 w-full max-w-[330px]">
            <RenderAtom
              renderType="image"
              item={{ value: cardData2?.imgurl }}
              customClassName={"md:w-[76px] xs:w-[50px] h-auto object-cover"}
            />
            <RenderAtom
              renderType="title"
              item={{ value: cardData2?.title }}
              customClassName={
                "text-lg text-[#0C529D] font-bold leading-[35px] lg:text-[30px] sm:text-2xl xs:text-lg"
              }
            />
            <RenderAtom
              renderType="title"
              item={{ value: cardData2?.body }}
              customClassName={
                "text-[#67748E] font-normal text-[18px] leading-[30px] md:text-left xs:text-justify text-lg sm:text-lg xs:text-base"
              }
            />
          </BlockDiv>
        </BlockDiv>
        <BlockDiv customClassName="flex flex-col sm:flex-row lg:flex-col gap-[40px] max-w-[700px] lg:mt-[40px]">
          {/* card 3*/}
          <BlockDiv customClassName="flex flex-col bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[10px] p-[30px] space-y-5 w-full max-w-[330px]">
            <RenderAtom
              renderType="image"
              item={{ value: cardData3?.imgurl }}
              customClassName={"md:w-[76px] h-auto xs:w-[50px] object-cover"}
            />
            <RenderAtom
              renderType="title"
              item={{ value: cardData3?.title }}
              customClassName={
                "text-lg text-[#0C529D] font-bold leading-[35px] lg:text-[30px] sm:text-2xl xs:text-lg"
              }
            />
            <RenderAtom
              renderType="title"
              item={{ value: cardData3?.body }}
              customClassName={
                "text-[#67748E] font-normal text-[18px] leading-[30px] md:text-left xs:text-justify text-lg sm:text-lg xs:text-base"
              }
            />
          </BlockDiv>
          {/* card 4*/}
          <BlockDiv customClassName="flex flex-col bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[10px] p-[30px] space-y-5 w-full max-w-[330px]">
            <RenderAtom
              renderType="image"
              item={{ value: cardData4?.imgurl }}
              customClassName={"md:w-[76px] h-auto xs:w-[50px] object-cover"}
            />
            <RenderAtom
              renderType="title"
              item={{ value: cardData4?.title }}
              customClassName={
                "text-lg text-[#0C529D] font-bold leading-[35px] lg:text-[30px] sm:text-2xl xs:text-lg"
              }
            />
            <RenderAtom
              renderType="title"
              item={{ value: cardData4?.body }}
              customClassName={
                "text-[#67748E] font-normal text-[18px] leading-[30px] md:text-left xs:text-justify text-lg sm:text-lg xs:text-base"
              }
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
      <BlockDiv customClassName="flex flex flex-col justify-center my-auto space-y-[25px] p-5">
        <RenderAtom
          renderType="title"
          item={{ value: defautltTitle }}
          customClassName={
            "xs:text-[1.5rem] md:text-[40px] text-center md:text-start font-bold md:leading-none text-[#2C2C51]"
          }
        />
        <RenderAtom
          renderType="title"
          item={{
            value: defautltDescription,
          }}
          customClassName={
            "md:text-[18px] sm:text-lg xs:text-base leading-[30px] text-[#67748E] font-normal max-w-[470px] md:text-left xs:text-justify"
          }
        />
      </BlockDiv>
    </BlockDiv>
  );
}
