import { useContext, useState } from "react";
import _ from "lodash";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";

export default function CommunityHomeSection05() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const imgUrl = _.toString(readyDatasrc[0]?.imgUrl);
  const description = _.toString(readyDatasrc[0]?.description);
  const title = _.toString(readyDatasrc[0]?.title);
  const showButton = readyDatasrc[0]?.button;
  const url = _.toString(readyDatasrc[0]?.url);

  return (
    <BlockDiv
      divNumber="ProlianceHero03Outer"
      customClassName="flex w-full h-[190px] md:h-[300px] 2xl:h-[400px]"
      customStyle={{
        backgroundImage: `url('${imgUrl}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BlockDiv customClassName="flex flex-col md:py-10 mx-5 md:mx-auto container md:py-5 items-left">
        <BlockDiv customClassName="grid grid-cols-3 md:grid-cols-2">
          <BlockDiv customClassName="col-span-2 md:col-span-1">
            <BlockDiv customClassName="flex flex-col gap-[10px] md:gap-[30px]">
              <RenderAtom
                renderType="text"
                item={{ value: title }}
                customClassName="text-[24px] md:text-[32px] 2xl:text-[46px] text-white font-semibold leading-[32px] 2xl:leading-[56px]"
              />
              <RenderAtom
                renderType="text"
                item={{ value: description }}
                customClassName="text-[16px] text-white hidden md:block"
              />
              {showButton && (
                <BlockDiv customClassName="flex py-2 px-4 border border-white rounded-[10px] w-[175px] space-x-3 group hover:bg-white cursor-pointer">
                  <RenderAtom
                    item={{ value: "Бүгдийг харах" }}
                    renderType="text"
                    customClassName={
                      "text-white lg:text-[16px] text-[12px] font-medium group-hover:text-[#585858]"
                    }
                  />
                  <RenderAtom
                    item={{ value: "fa-regular fa-arrow-right" }}
                    renderType="icon"
                    customClassName={
                      "flex text-white lg:text-[16px] text-[12px] font-medium group-hover:text-[#585858]"
                    }
                  />
                </BlockDiv>
              )}
            </BlockDiv>
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}
