import React from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, useEffect, useState } from "react";

const UserFriendsTitle = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];

  const [button, setButton] = useState(
    new Array(staticItem2?.titles.length).fill(false)
  );
  const [buttonIndex, setButtonIndex] = useState(999);

  useEffect(() => {
    let newArr = new Array(staticItem2?.titles.length).fill(false);
    newArr[buttonIndex] = true;
    setButton(newArr);
  }, [buttonIndex]);

  return (
    <BlockDiv customClassName="w-full flex flex-col gap-5">
      <BlockDiv customClassName="flex items-center justify-between">
        <RenderAtom
          renderType="text"
          item={{ value: staticItem1?.title }}
          customClassName="text-[20xl] font-medium text-[#585858] leading-[24px]"
        />
        <BlockDiv customClassName="w-[320px] p-[10px] bg-[#F3F4F6] rounded-[8px] flex items-center justify-between">
          <RenderAtom
            renderType="input"
            customClassName="w-[280px] bg-transparent focus:ring-0 text-[#67748E] border-0 p-0"
            customProps={{
              placeholder: staticItem1?.input.placeholder,
            }}
          />
          <RenderAtom
            renderType="icon"
            item={{ value: staticItem1?.input.icon }}
            customClassName="text-[#67748E] text-[16px] cursor-pointer"
          />
        </BlockDiv>
      </BlockDiv>
      <BlockDiv customClassName="flex">
        {staticItem2?.titles.map((item: any, index: number) => {
          return (
            <>
              <BlockDiv
                customClassName={`${
                  button[index] ? "border-[#0165E0]" : "border-transparent"
                } p-[10px] pt-0 border-b-[3px] cursor-pointer`}
                onClick={() => {
                  setButtonIndex(index);
                }}
              >
                <RenderAtom
                  renderType="text"
                  item={{ value: item }}
                  customClassName={`${
                    button[index] ? "text-[#0165E0]" : "text-[#A0A0A0]"
                  } leading-[16px] font-bold`}
                />
              </BlockDiv>
            </>
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

export default UserFriendsTitle;
