import React from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";

const PostTitle = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = readyDatasrc[0];

  return (
    <BlockDiv customClassName="w-full p-[10px] bg-white rounded-[10px] flex justify-between items-center">
      <RenderAtom
        renderType="text"
        item={{ value: staticItem1?.title }}
        customClassName="text-[16px] text-[#A0A0A0] leading-[16px] p-[10px]"
      />
      <BlockDiv customClassName="bg-[#0165E0] w-[38px] h-[38px] flex items-center justify-center text-[16px] font-semibold rounded-[10px] ">
        <RenderAtom
          renderType="icon"
          item={{ value: staticItem1?.icon }}
          customClassName="text-white"
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default PostTitle;
