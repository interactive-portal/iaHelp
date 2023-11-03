import React from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";

const JobsSidebarTitle = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = readyDatasrc[0];

  return (
    <>
      <BlockDiv
        customClassName={"w-full flex flex-col gap-[10px] rounded-[10px] px-5"}
      >
        <BlockDiv customClassName="h-[48px] flex items-center">
          <RenderAtom
            renderType="text"
            customClassName="text-[#585858] text-[20px] font-medium"
            item={{ value: staticItem1.title }}
          />
        </BlockDiv>
      </BlockDiv>
    </>
  );
};

export default JobsSidebarTitle;
