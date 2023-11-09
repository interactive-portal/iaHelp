import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { hexToRgba } from "@/util/helper";
import { useContext } from "react";
import _ from "lodash";

export default function CommunityProfileAboutSkill() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);

  const editProfile = widgetnemgooReady?.options;

  return (
    <BlockDiv
      customClassName="w-full"
      divNumber="CommunityProfileAboutSkillOuter"
    >
      <BlockDiv
        customClassName="flex flex-col gap-5"
        divNumber="CommunityProfileAboutSkillInner"
      >
        <BlockDiv
          customClassName="w-full flex justify-between items-start"
          divNumber="CommunityProfileAboutSkillInner"
        >
          {editProfile && (
            <BlockDiv customClassName="w-7 h-7 rounded-full flex items-center justify-center shadow-md active:shadow-xl">
              <RenderAtom
                renderType="icon"
                item={{ value: "fa-regular fa-pen" }}
                customClassName="text-[#A0A0A0] active:text-[#0165E0]"
              />
            </BlockDiv>
          )}
        </BlockDiv>
        <BlockDiv customClassName="flex flex-wrap gap-3">
          {readyDatasrc.map((item: any, index: number) => {
            // console.log("XXXXXXXXXXXXXX", item);
            const rgbaColor = hexToRgba(item?.rowcolor, 0.1);

            return (
              <RenderAtom
                item={{
                  value: item?.skilltypename,
                }}
                renderType="text"
                customClassName="bg-[#E6F0FC]/60 text-[#00ADF1] text-[16px] leading-[18px] font-semibold px-5 py-3 rounded-full hover:brightness-90 cursor-pointer"
                customStyle={{
                  color: item?.rowcolor,
                  backgroundColor: rgbaColor,
                }}
              />
            );
          })}
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}
