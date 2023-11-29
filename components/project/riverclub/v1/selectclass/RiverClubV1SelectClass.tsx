import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";

const RiverClubV1SelectClass = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];
  const staticItem3 = readyDatasrc[2];

  return (
    <BlockDiv className="mx-[20px] my-[26px] p-[35px] bg-white flex flex-row gap-[24px] items-center justify-between">
      <BlockDiv
        className={`${
          staticItem?.isActive
            ? "bg-[linear-gradient(180deg,_#00B0AB_0%,_#BAD405_100%)] w-full rounded-[12px] px-[14px] py-[12px]"
            : "hidden"
        }`}
      >
        <RenderAtom
          item={staticItem?.pin}
          renderType="text"
          className={`${
            staticItem?.pin ? "text-[12px] font-normal text-black" : "hidden"
          }`}
        />
        <RenderAtom
          item={staticItem?.title}
          renderType="title"
          className={`font-bold text-[30px] leading-6`}
        />
        <RenderAtom
          item={`<sup className="text-[16px] font-normal">₮</sup>${staticItem?.price}k <span className="text-[16px]"> /${staticItem?.payTime}</span>`}
          renderType="title"
          className={`${
            staticItem?.price ? "text-[28px] font-bold w-max" : "hidden"
          }`}
        />
        <RenderAtom
          item={staticItem?.subtitle}
          renderType="text"
          className={`${staticItem?.subtitle ? "text-end" : "hidden"}`}
        />
      </BlockDiv>
      {/* paragraph */}
      <BlockDiv className="flex flex-col items-start h-full justify-between w-[3000px]">
        <RenderAtom
          item={staticItem2?.title}
          renderType="title"
          className={`font-[400] text-[20px] text-black`}
        />
        <RenderAtom
          item={staticItem2?.description}
          renderType="text"
          className={`font-normal text-[16px]`}
        />
      </BlockDiv>
      <BlockDiv
        className={`${
          staticItem3?.isActive
            ? "rounded-[12px] bg-[linear-gradient(180deg,_#00B0AB_0%,_#BAD405_100%)] leading-[0px] w-[400px] h-[108px] flex flex-col items-start"
            : "hidden"
        }`}
      >
        <RenderAtom
          item={staticItem3?.pin}
          renderType="text"
          className={`text-black font-[400] text-[12px] leading-[0px] mt-5 mb-0 pb-0`}
        />
        <RenderAtom
          item={staticItem3?.title}
          renderType="button"
          className={`font-[700] text-[28px] capitalize text-black w-max`}
        />
        <BlockDiv className="flex items-end gap-x-1">
          <RenderAtom
            item={`Off`}
            renderType="text"
            className={`font-[400] text-[16px] h-max`}
          />
          <RenderAtom
            item={`${staticItem3?.off}%`}
            renderType="text"
            className={`text-[36px] font-[700]`}
          />
          <RenderAtom
            item={`${staticItem3?.payTime}`}
            renderType="text"
            className={`font-[400] text-[16px] w-max h-max`}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1SelectClass;
