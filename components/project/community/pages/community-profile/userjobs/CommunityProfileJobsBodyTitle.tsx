import React from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";

const JobsBodyTitle = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = readyDatasrc[0];

  return (
    <>
      <BlockDiv customClassName="h-[48px] flex items-center">
        <RenderAtom
          renderType="text"
          customClassName="text-[#585858] text-[20px] font-medium"
          item={{ value: `Нийт(${staticItem1?.total})` }}
        />
      </BlockDiv>
    </>
  );
};

export default JobsBodyTitle;
