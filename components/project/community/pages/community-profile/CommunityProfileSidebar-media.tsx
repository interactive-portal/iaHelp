import React from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import _ from "lodash";

const SidebarMedia = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = readyDatasrc[0];
  const staticItem2 = _.values(readyDatasrc[1]);
  const staticItem3 = readyDatasrc[2];

  return (
    <BlockDiv customClassName="p-5 bg-white rounded-[10px] flex flex-col">
      <RenderAtom
        renderType="text"
        item={{ value: staticItem1?.title }}
        customClassName="leading-[24px] text-[20px] font-medium text-[#585858] pb-[30px]"
      />
      <BlockDiv customClassName="grid grid-cols-2 gap-x-[10px] gap-y-[10px] pb-5">
        {staticItem2.slice(0, 4).map((item: any, index: number) => {
          return (
            <>
              <RenderAtom
                key={index}
                renderType="image"
                item={{ value: item?.img }}
                customClassName="w-full h-[155px] object-cover rounded-[10px]"
              />
            </>
          );
        })}
      </BlockDiv>
      <BlockDiv customClassName="flex justify-center py-[10px] w-full rounded-[10px] bg-[#E6F0FC] group cursor-pointer hover:bg-[#E3F9CJ]">
        <RenderAtom
          renderType="text"
          customClassName="text-[#0165E0] font-bold leading-[16px] "
          item={{ value: staticItem3?.button }}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default SidebarMedia;
