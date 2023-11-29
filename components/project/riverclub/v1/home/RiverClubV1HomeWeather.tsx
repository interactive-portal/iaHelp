import BlockDiv from "@/components/common/Block/BlockDiv";
import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import { useRouter } from "next/router";

const RiverClubV1HomeWeather = () => {
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
  const staticItem2 = data[1];
  return (
    <BlockDiv className="h-[38px] flex items-center justify-between bg-[#050505] py-[8px] px-[24px]">
      <BlockDiv className="flex gap-x-[7px] items-center">
        <RenderAtom
          item={staticItem?.day}
          renderType="text"
          className={`text-[#BAD405] text-[16px] font-[400]`}
        />
        <RenderAtom
          item={staticItem?.date}
          renderType="text"
          className={`text-[#BAD405] text-[16px] font-[400]`}
        />
        <RenderAtom
          item={staticItem?.temp}
          renderType="text"
          className={`text-[#BAD405] text-[16px] font-[400]`}
        />
        <RenderAtom
          item={staticItem?.sky}
          renderType="text"
          className={`text-[#BAD405] text-[16px] font-[400]`}
        />
      </BlockDiv>
      <BlockDiv className="flex items-center gap-x-[7px]">
        <RenderAtom
          item={staticItem2?.title}
          renderType="text"
          className={`text-white text-[16px] font-[400]`}
        />
        <RenderAtom
          item={staticItem2?.description}
          renderType="text"
          className={`text-white text-[16px] font-[400]`}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1HomeWeather;
