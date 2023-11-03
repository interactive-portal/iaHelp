import { useContext } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

export default function CommunityProfileTopMenu() {
  const { readyDatasrc, defaultValue } = useContext(WidgetWrapperContext);

  return (
    <BlockDiv
      customClassName="container mx-auto w-full"
      divNumber="CommunityProfileTopMenuOuter"
    >
      <BlockDiv
        customClassName="w-full flex flex-row justify-between"
        divNumber="CommunityProfileTopMenuInner"
      >
        <BlockDiv
          customClassName="px-5 flex flex-row items-center gap-1 py-2"
          divNumber="CommunityProfileTopMenuInnerLeftBlock"
        >
          {readyDatasrc.map((item: any, index: number) => {
            const isActive = item?.link === defaultValue?.value;
            return (
              <BlockDiv
                customClassName={`group pb-3 border-b-3 hover:border-[#2F81E5] border-solid ${
                  isActive ? "border-[#2F81E5]" : "border-transparent"
                }`}
                divNumber=""
              >
                <RenderAtom
                  key={item?.id || index}
                  item={item?.position1 || { value: item?.title }}
                  renderType="text"
                  customClassName={`w-auto h-full font-medium text-base leading-5 cursor-pointer px-5 py-2 rounded-lg group-hover:text-[#2F81E5] group-hover:bg-white block ${
                    isActive ? "bg-white text-[#2F81E5]" : "text-gray-400"
                  }`}
                />
              </BlockDiv>
            );
          })}
        </BlockDiv>
        <BlockDiv
          customClassName="px-5 flex flex-row items-center gap-1 py-2"
          divNumber="CommunityProfileTopMenuInnerLeftBlock"
        >
          Дагах, Сум, Товч
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}
