import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import { useRouter } from "next/router";
// import BlockSlider from "@components/common/Block/BlockSlider";
import BlockSlider from "@/components/common/Block/BlockSlider";
import _ from "lodash";

const RiverClubV1PlanHero = () => {
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
  const staticItem = readyDatasrc?.[0]?.[0];

  return (
    <BlockDiv className="relative w-full h-[300px] flex items-center justify-center mt-24">
      <BlockSlider
        divNumber="RiverHomeSliderBlock"
        customProps={{
          reactSlickSettings: {
            arrows: true,
            dots: false,
            variableWidth: false,
            infinite: false,
            swipeToSlide: true,
          },
          arrowClassName: "bg-transparent",
        }}
      >
        {_.map(staticItem?.mainimage, (item: any, index: number) => {
          return <RiverPlanBanner key={index} item={staticItem} />;
        })}
      </BlockSlider>
    </BlockDiv>
  );
};

export default RiverClubV1PlanHero;

const RiverPlanBanner = ({ item }: any) => {
  return (
    <BlockDiv className="h-max flex items-center justify-center relative bg-gray-200">
      <BlockDiv className="h-full bg-black/30">
        <RenderAtom
          item={item?.mainimage[0]}
          renderType="image"
          customClassName="w-[1080px] h-full absolute inset-0 bg-black/30"
        />
      </BlockDiv>
      <BlockDiv className="z-20 w-full mt-10 flex items-center justify-center flex-col h-max">
        <RenderAtom
          item={item?.title}
          renderType="title"
          className={`text-[52px] font-[700] mb-[50px] text-white text-center font-roboto uppercase leading-[50px]`}
        />
        <RenderAtom
          item={item?.description}
          renderType="text"
          className={`text-white font-[400] text-[26px] text-center mb-[74px]`}
        />
        <RenderAtom
          item={{
            value: item?.button,
            positionnemgoo: {
              url: {
                path: `/bioinput`,
              },
            },
          }}
          renderType="button"
          className={`bg-[#BAD405] rounded-[8px] px-[42px] py-[35px] text-black uppercase text-[16px] font-[700] mb-[30px]`}
        />
        {/* <BlockDiv className="flex gap-[9px]">
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white" />
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white bg-gray-200" />
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white" />
        </BlockDiv> */}
      </BlockDiv>
    </BlockDiv>
  );
};
