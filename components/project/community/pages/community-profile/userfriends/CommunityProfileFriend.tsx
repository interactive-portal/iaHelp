import React from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import _ from "lodash";

const UserFriend = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = _.values(readyDatasrc[0]);

  return (
    <BlockDiv customClassName="w-full grid grid-cols-5">
      {staticItem1?.slice(0, 15).map((item: any, index: number) => {
        return (
          <>
            <BlockDiv customClassName="relative group hover:bg-[#F3F4F6] w-full py-5 rounded-[10px] flex flex-col items-center gap-[10px]">
              <BlockDiv customClassName="border border-dashed border-transparent group-hover:border-[#FFAE00] rounded-full">
                <BlockDiv customClassName="m-2 w-[100px] h-[100px] rounded-full border-4 border-transparent group-hover:border-[#FFAE00] overflow-hidden">
                  <RenderAtom
                    renderType="image"
                    item={{ value: item?.profileImg }}
                    customClassName="w-full h-full object-cover"
                  />
                </BlockDiv>
              </BlockDiv>
              <BlockDiv customClassName="flex flex-col item-center gap-1">
                <RenderAtom
                  renderType="text"
                  customClassName="text-center text-[#585858] font-medium leading-[18px]"
                  item={{ value: item?.name }}
                />
                <RenderAtom
                  renderType="text"
                  customClassName="text-center text-[#A0A0A0] leading-[16px]"
                  item={{ value: `${item?.sameFriends} Ижил найзтай ` }}
                />
              </BlockDiv>
              <BlockDiv customClassName="absolute top-[10px] right-[10px] bg-white active:bg-[#F3F4F6] w-6 h-6 rounded-full hidden group-hover:flex items-center justify-center gap-[3px] cursor-pointer">
                <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] active:bg-[#0165E0]"></BlockDiv>
                <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] active:bg-[#0165E0]"></BlockDiv>
                <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] active:bg-[#0165E0]"></BlockDiv>
              </BlockDiv>
            </BlockDiv>
            {/* <BlockDiv customClassName="relative group/item w-full py-5 rounded-[10px] hover:bg-[#F3F4F6] flex flex-col items-center gap-[10px]">
              <BlockDiv customClassName="border border-dashed border-transparent group-hover/item:border-[#FFAE00] rounded-full">
                <BlockDiv customClassName="m-2 w-[100px] h-[100px] rounded-full border-4 border-transparent group-hover/item:border-[#FFAE00] overflow-hidden">
                  <RenderAtom
                    renderType="image"
                    item={{ value: item?.profileImg }}
                    customClassName="w-full h-full object-cover"
                  />
                </BlockDiv>
              </BlockDiv>
              <BlockDiv customClassName="flex flex-col item-center gap-1">
                <RenderAtom
                  renderType="text"
                  customClassName="text-center text-[#585858] font-medium leading-[18px]"
                  item={{ value: item?.name }}
                />
                <RenderAtom
                  renderType="text"
                  customClassName="text-center text-[#A0A0A0] leading-[16px]"
                  item={{ value: `${item?.sameFriends} Ижил найзтай ` }}
                />
              </BlockDiv>
              <BlockDiv customClassName="absolute top-[10px] right-[10px] group/edit bg-white active:bg-[#F3F4F6] w-6 h-6 rounded-full hidden group-hover/item:flex items-center justify-center gap-[3px] cursor-pointer">
                <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] group-active/edit:bg-[#0165E0] "></BlockDiv>
                <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] group-active/edit:bg-[#0165E0] "></BlockDiv>
                <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] group-active/edit:bg-[#0165E0] "></BlockDiv>
              </BlockDiv>
            </BlockDiv> */}
          </>
        );
      })}
    </BlockDiv>
  );
};

export default UserFriend;
