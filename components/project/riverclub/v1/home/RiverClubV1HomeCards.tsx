import BlockDiv from "@/components/common/Block/BlockDiv";
import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _ from "lodash";
import { useRouter } from "next/router";

const RiverClubV1HomeCards = () => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.id)
    ? query.id.join("")
    : query.id || "mn";

  const [language, setLanguage] = React.useState(currentLanguage);

  React.useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const data = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];

  const staticItem = data[0];
  return (
    <BlockDiv className="mb-[39px] px-[43px]">
      <BlockDiv>
        <Card item={staticItem} />
      </BlockDiv>
    </BlockDiv>
  );
};

const Card = ({ item }: any) => {
  return (
    <BlockDiv className="grid grid-cols-3 gap-x-[43px] h-[600px] mb-36">
      {_.map(item?.card, (item: any, index: number) => {
        return (
          <BlockDiv
            key={item?.id || index}
            className="flex flex-col items-center justify-center bg-white"
          >
            <RenderAtom
              item={item?.mainimage}
              renderType="image"
              className={`w-full h-full mb-[11px]`}
            />
            <RenderAtom
              item={item?.title}
              renderType="title"
              className={`mb-[11px] font-normal text-[20px] text-center uppercase`}
            />
            <RenderAtom
              item={item?.description}
              renderType="text"
              className={`mb-[21px] font-normal text-[20px] text-black text-center px-[8px]`}
            />
            <RenderAtom
              item={item?.button}
              renderType="button"
              className={`font-normal text-black text-[16px] uppercase underline`}
            />
          </BlockDiv>
        );
      })}
    </BlockDiv>
  );
};

export default RiverClubV1HomeCards;
