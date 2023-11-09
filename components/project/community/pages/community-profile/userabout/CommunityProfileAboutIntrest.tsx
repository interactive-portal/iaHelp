import React from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, useEffect, useState } from "react";

const UserIntrest = () => {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);

  const staticItem1 = readyDatasrc[0];

  const [button, setButton] = useState(
    new Array(staticItem1?.buttons.length).fill(false)
  );
  const [buttonIndex, setButtonIndex] = useState(999);

  const editProfile = widgetnemgooReady?.options;

  useEffect(() => {
    let newArr = new Array(staticItem1?.buttons.length).fill(false);
    newArr[buttonIndex] = true;
    setButton(newArr);
  }, [buttonIndex]);

  return (
    <BlockDiv customClassName="flex flex-col gap-5 p-[20px] bg-white rounded-lg">
      <BlockDiv customClassName="w-full flex justify-between items-start">
        <RenderAtom
          renderType="text"
          customClassName="text-[20px] font-medium text-[#585858] leading-[24px] "
          item={{ value: staticItem1?.header.title }}
        />
        {editProfile && (
          <BlockDiv customClassName="w-7 h-7 rounded-full flex items-center justify-center shadow-md active:shadow-xl">
            <RenderAtom
              renderType="icon"
              item={{ value: staticItem1?.header.icon }}
              customClassName="text-[#A0A0A0] active:text-[#0165E0]"
            />
          </BlockDiv>
        )}
      </BlockDiv>
      <BlockDiv customClassName="flex gap-[10px] items-center">
        {staticItem1?.buttons.map((item: any, index: number) => {
          return (
            <>
              <BlockDiv
                customClassName={`${
                  button[index] ? "bg-[#0165E0]" : "bg-[#F3F4F6]"
                } px-[10px] py-[6px] rounded-[40px]`}
                onClick={() => {
                  setButtonIndex(index);
                }}
              >
                <RenderAtom
                  renderType="text"
                  item={{ value: item }}
                  customClassName={`${
                    button[index] ? "text-white" : "text-[#67748E]"
                  } text-[16px]`}
                />
              </BlockDiv>
            </>
          );
        })}
      </BlockDiv>
      <BlockDiv customClassName="w-full">
        <RenderAtom
          renderType="text"
          item={{ value: staticItem1?.desc }}
          customClassName="tracking-tight text-[#67748E] leading-[21px]"
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default UserIntrest;
