import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _ from "lodash";
import { useRouter } from "next/router";

const RiverClubV1WorkoutsSchedule = () => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.id)
    ? query.id.join("")
    : query.id || "mn";

  const [language, setLanguage] = React.useState(currentLanguage);

  React.useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);
  const { nemgooDatasrc } = useContext(WidgetWrapperContext);
  const data = language === "mn" ? nemgooDatasrc[1] : nemgooDatasrc[0];

  return (
    <BlockDiv className="mx-[25px] mb-[35px]">
      <BlockDiv className="even:bg-[#CACACA]">
        <Card item={data} />
      </BlockDiv>
    </BlockDiv>
  );
};

const Card = ({ item }: any) => {
  return (
    <BlockDiv className="w-full">
      <BlockDiv className="flex flex-col gap-y-[4px]">
        {_.map(item, (item: any, index: number) => {
          return (
            <BlockDiv
              className="grid grid-cols-12 odd:bg-[#DDDDDD] even:bg-[#CACACA] w-full items-center"
              key={index}
            >
              <RenderAtom
                item={item?.mainimage}
                renderType="image"
                className={`w-[289px] h-[289px] col-span-4`}
              />
              <MiddleText item={item} />
              <ScheduleTable item={item} />
            </BlockDiv>
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

const MiddleText = ({ item, language }: any) => {
  return (
    <BlockDiv className="w-max col-span-6 -ml-10">
      <BlockDiv className="flex flex-col">
        <RenderAtom
          item={item?.title}
          renderType="title"
          className={`font-[400] text-[32px] mb-[10px] uppercase`}
        />
        <RenderAtom
          item={item?.description}
          renderType="text"
          className={`text-[18px] font-normal uppercase w-[484px] text-justify mb-[19px]`}
        />
        <RenderAtom
          item={item?.subtitle}
          renderType="text"
          className={`text-[15px] font-[400] uppercase mb-[11px]`}
        />
        <RenderAtom
          item={`${language === "mn" ? "EXERCISE TYPE" : "ДАСГАЛЫН ТӨРӨЛ"}`}
          renderType="title"
          className={`text-[#414141] font-[700] text-[14px]`}
        />
        <BlockDiv className="flex items-center justify-between -mt-5 w-full">
          {_.map(item?.exerciseType, (item: any, index: number) => {
            return (
              <RenderAtom
                key={index}
                item={item}
                renderType="text"
                className={`text-[#414141] font-[400] mr-2 text-[18px] lowercase w-max`}
              />
            );
          })}
          <RenderAtom
            item={item?.button}
            renderType="button"
            className={`bg-[#BBD540] text-black text-[12px] font-[700] text-center py-[17px] px-[42px] ml-6 rounded-[6px] uppercase`}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

const ScheduleTable = ({ item }: any) => {
  return (
    <BlockDiv className="col-span-2 w-full items-center -ml-14">
      <BlockDiv className="flex w-[240px] mb-2 items-center justify-end -ml-4 text-end">
        {_.map(item?.classSchedule, (item: any, index: number) => {
          return (
            <RenderAtom
              key={index}
              item={item?.classTitle}
              renderType="title"
              className={`${item?.className} float-right right-0 left-auto w-max rounded-[4px] text-[10px] font-[700] text-black px-[7px] py-[5px]`}
            />
          );
        })}
      </BlockDiv>
      {_.map(item?.classSchedule, (innerItem: any, index: number) => {
        return (
          <BlockDiv className="flex flex-col">
            {/* 7 honogiin tsaguudiig harulsn husnegtiig timetable gej zadlav */}
            {_.map(innerItem?.schedule, (timetable: any, index: number) => {
              return (
                <BlockDiv className="flex w-[200px] items-center justify-between mb-[2px] gap-x-[30px]">
                  <RenderAtom
                    item={timetable?.day}
                    renderType="text"
                    className={`uppercase font-normal text-[14px] text-black`}
                  />
                  <RenderAtom
                    item={timetable?.time}
                    renderType="text"
                    className={`uppercase font-normal text-[14px] text-black`}
                  />
                </BlockDiv>
              );
            })}
          </BlockDiv>
        );
      })}
      {/* view more button */}
      <BlockDiv className="w-[200px] flex items-end justify-end mt-6">
        {_.map(item?.classSchedule, (item: any, index: number) => {
          return (
            <RenderAtom
              item={item?.button}
              renderType="text"
              className={`text-[14px] w-max cursor-pointer font-normal text-[#414141] underline`}
            />
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1WorkoutsSchedule;
