import BlockDiv from "@/components/common/Block/BlockDiv";
import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, FC } from "react";
import { useRouter } from "next/router";

type PropsType = {
  data?: any;
  options?: any;
  mutate?: any;
};

const RiverClubV1MasterFooter: FC<PropsType> = ({ data, options, mutate }) => {
  // const { readyDatasrc } = useContext(WidgetWrapperContext);
  const router = useRouter();

  const { widgetnemgooReady } = options || {};

  const staticItem = data?.[0];
  const staticItem2 = data?.[1];
  const staticItem3 = data?.[2];
  return (
    <BlockDiv customClassName={`${widgetnemgooReady?.design?.className}`}>
      <BlockDiv className="w-[1080px] bg-[#202020]">
        <BlockDiv className="flex items-center justify-between gap-x-[18px] mx-[20px]">
          <BlockDiv className="flex bg-[#BBD540] px-[30px] py-[14px] rounded-[11px] items-center justify-between my-[23px]">
            <RenderAtom
              item={staticItem?.icon}
              renderType="icon"
              className={`text-black text-2xl`}
            />
            <RenderAtom
              item={staticItem?.button}
              renderType="button"
              className={`font-[700] text-[24px] text-black w-max`}
              onClick={() => {
                router.back();
              }}
            />
            {/* Justify-between ashiglaj align hiihin tuld enche hoosn div hiiv */}
            <BlockDiv />
          </BlockDiv>
          <RenderAtom
            item={staticItem3?.mainimage}
            renderType="image"
            className={``}
          />
          <BlockDiv className="flex bg-[#BBD540] px-[30px] py-[14px] rounded-[11px] items-center justify-between my-[23px]">
            {/* Justify-between ashiglaj align hiihin tuld enche hoosn div hiiv */}
            <BlockDiv />
            <RenderAtom
              item={staticItem2?.button}
              renderType="button"
              className={`font-[700] text-[24px] text-black w-max`}
            />
            <RenderAtom
              item={staticItem2?.icon}
              renderType="icon"
              className={`text-black text-2xl`}
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1MasterFooter;
