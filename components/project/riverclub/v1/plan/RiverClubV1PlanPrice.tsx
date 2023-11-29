import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _, { set } from "lodash";
import { useState } from "react";
import { useRouter } from "next/router";
import useCallProcess from "@/middleware/dataHook/useCallProcess";
import { listToTree } from "@/util/helper";

const RiverClubV1PlanPrice = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  // console.log("readydata", readyDatasrc);

  const { callProcess, isProcessWorking } = useCallProcess();

  const groupByData = _.chain(readyDatasrc)
    .groupBy("classificationname")
    .map((value, key, wrapped) => {
      return { [key]: value };
    })
    .value();

  const upperData = _.values(groupByData).filter(
    (item, key, index) =>
      _.keys(item)[0] == "Алтан" ||
      _.keys(item)[0] == "Гэр бүл" ||
      _.keys(item)[0] == "Платинум"
  );

  const bottomData = _.values(groupByData).filter(
    (item, key, index) =>
      _.keys(item)[0] !== "Алтан" ||
      _.keys(item)[0] !== "Гэр бүл" ||
      _.keys(item)[0] !== "Платинум"
  );

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
  const staticItem = data?.[0];
  return (
    <BlockDiv className="mx-[20px] flex flex-col mb-[30px]">
      <UpperSection item={upperData} />
      <BottomSection item={bottomData} />
    </BlockDiv>
  );
};

const UpperSection = ({ item }: any) => {
  return (
    <BlockDiv className="bg-black w-full flex flex-col items-center justify-center mb-[28px]">
      <RenderAtom
        item={{ value: "tititittititi" }}
        renderType="text"
        className={`text-white text-start w-full font-normal text-[16px] mt-[7px]`}
      />
      <BlockDiv className="my-[63px] mx-[85px] grid grid-cols-3 items-center gap-x-[88px]">
        {_.values(item)?.map((obj: any, index: number) => {
          return <Card item={obj} />;
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

const Card = ({ item, callProcess, myResult }: any) => {
  const [isPriceActiveMonth, setIsPriceActiveMonth] = useState(false);
  const [isPriceActiveSeason, setIsPriceActiveSeasons] = useState(false);
  const [isPriceActiveHalfYear, setIsPriceActiveHalfYear] = useState(false);
  const [isPriceActivePerClass, setIsPriceActivePerClass] = useState(false);

  // const
  console.log("item", _.values(item));
  console.log("item", _.keys(item));

  return (
    <BlockDiv className="flex flex-col items-start h-[500px]">
      <RenderAtom
        item={{ value: "ЭРЭЛТТЭЙ" }}
        renderType="title"
        className={`font-normal text-[12px] uppercase ${
          item?.dark ? "text-white" : "text-black"
        }`}
      />
      <RenderAtom
        item={{ value: "item?.type" }}
        renderType="title"
        className={`font-[700] text-[28px] uppercase ${
          item?.dark ? "text-white" : "text-black"
        }`}
      />
      {/* price */}
      <BlockDiv className="flex flex-col items-start mt-[10px] h-[120px]">
        {/* price per month */}
        <RenderAtom
          item={`<sup className="text-[16px] font-normal">₮</sup>${item?.priceMonth}k <span className="text-[16px]"> /30 days</span>`}
          renderType="title"
          className={`text-[36px] cursor-pointer font-medium flex h-[60px] ${
            item?.priceSeason && item?.priceHalfYear
              ? "flex"
              : `items-center justify-center`
          } ${
            isPriceActiveMonth
              ? `${item?.dark ? "text-white" : "text-black"}`
              : "text-[#B3B3B3]"
          }`}
          onClick={() => {
            setIsPriceActiveMonth(!isPriceActiveMonth);
            setIsPriceActiveSeasons(false);
            setIsPriceActiveHalfYear(false);
          }}
        />
        {/* price per season */}
        <RenderAtom
          item={`<sup className="text-[16px] font-normal">₮</sup>${item?.priceSeason}k <span className="text-[16px]"> /90 days</span>`}
          renderType="title"
          className={`text-[36px] font-medium cursor-pointer flex items-start h-[30px] leading-[0px] ${
            item?.priceSeason && item?.priceHalfYear
              ? "flex"
              : "flex opacity-0 order-first"
          } ${
            isPriceActiveSeason
              ? `${item?.dark ? "text-white" : "text-black"}`
              : "text-[#B3B3B3]"
          }`}
          onClick={() => {
            setIsPriceActiveSeasons(!isPriceActiveSeason);
            setIsPriceActiveMonth(false);
            setIsPriceActiveHalfYear(false);
            setIsPriceActivePerClass(false);
          }}
        />
        {/*  price per 180 days */}
        <RenderAtom
          item={`<sup className="text-[16px] font-normal">₮</sup>${item?.priceHalfYear}k <span className="text-[16px]"> /180 days</span>`}
          renderType="title"
          className={`cursor-pointer text-[36px] font-medium flex items-start leading-[0px] ${
            item?.priceSeason && item?.priceHalfYear ? "flex" : "flex opacity-0"
          } ${
            isPriceActiveHalfYear
              ? `${item?.dark ? "text-white" : "text-black"}`
              : "text-[#B3B3B3]"
          }`}
          onClick={() => {
            setIsPriceActiveHalfYear(!isPriceActiveHalfYear);
            setIsPriceActiveSeasons(false);
            setIsPriceActiveMonth(false);
            setIsPriceActivePerClass(false);
          }}
        />
        {/* price per class special one */}
        <RenderAtom
          item={`<sup className="text-[16px] font-normal">₮</sup>${item?.pricePerClass}k <span className="text-[16px]"> /+1 class</span>`}
          renderType="title"
          className={`${
            item?.isPricePerClassExist
              ? `text-[36px] cursor-pointer font-medium flex items-start leading-[0px] -mt-3 ${
                  isPriceActivePerClass
                    ? `${item?.dark ? "text-white" : "text-black"}`
                    : "text-[#B3B3B3]"
                }`
              : "hidden"
          }`}
          onClick={() => {
            setIsPriceActivePerClass(!isPriceActivePerClass);
            setIsPriceActiveHalfYear(false);
            setIsPriceActiveSeasons(false);
            setIsPriceActiveMonth(false);
          }}
        />
      </BlockDiv>
      {/* Includes */}
      <BlockDiv className="flex flex-col gap-y-[4px] h-[70px] justify-end mt-[30px] align-text-top">
        {_.map(item?.includes, (innerItem: any, index: number) => {
          return (
            <BlockDiv className="flex items-center" key={index}>
              <RenderAtom
                item={`fa-solid fa-check`}
                renderType="icon"
                className={`w-[18px] h-[18px] mr-[8px] p-[3px] flex items-center justify-center  rounded-full ${
                  item?.dark ? "text-black bg-white" : "bg-[#B3B3B3] text-black"
                }`}
              />
              <RenderAtom
                item={innerItem}
                renderType="text"
                className={`font-medium text-[12px] ${
                  item?.dark ? "text-white" : "text-black"
                }`}
              />
            </BlockDiv>
          );
        })}
      </BlockDiv>
      {/* includes done here */}
      <RenderAtom
        item={{ value: "item?.type" }}
        renderType="text"
        className={`font-medium text-[12px] mt-[36px] h-[70px] ${
          item?.dark ? "text-white" : "text-black"
        }`}
      />
      <RenderAtom
        item={{ value: "item?.type" }}
        renderType="button"
        className={`underline font-[600] text-[12px] text-white mt-[10px] mx-0 px-0 ${
          item?.dark ? "text-white" : "text-black"
        }`}
      />
      <RenderAtom
        item={{
          value: "asdasdasdasdasdasdasd",
          positionnemgoo: {
            url: {
              path: "/product",
              query: {
                id: item?.position0?.value,
              },
            },
          },
        }}
        renderType="button"
        className={`font-[700] text-[16px] text-black py-[23px] px-[54px] bg-[#BAD405] uppercase mt-[16px] rounded-[8px]`}
      />
    </BlockDiv>
  );
};

const BottomSection = ({ item }: any) => {
  return (
    <BlockDiv className="bg-white px-[25px] p-4 mb-36">
      <BlockDiv className="grid grid-cols-4 gap-[4px] items-center">
        {["asda", "ad"].map((item: any, index: number) => {
          return <Card item={item} key={index} />;
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1PlanPrice;
