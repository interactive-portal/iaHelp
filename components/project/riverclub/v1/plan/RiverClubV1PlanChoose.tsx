import React from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useRouter } from "next/router";

const RiverClubV1PlanChoose = ({ planItems }: { planItems: any }) => {
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
  const staticItem3 = data[2];

  return (
    <BlockDiv className="mx-[20px] my-[26px] p-[35px] bg-white flex flex-row gap-[24px] items-center justify-between">
      {/* select plan button */}
      <BlockDiv
        className={`bg-[linear-gradient(180deg,_#00B0AB_0%,_#BAD405_100%)] w-full rounded-[12px] ${
          staticItem?.isActive ? "" : "hidden"
        }`}
      >
        <RenderAtom
          item={staticItem?.button || planItems?.[0]?.button}
          renderType="button"
          className={`font-[700] text-[30px] text-start text-black uppercase`}
        />
        <RenderAtom
          item={staticItem?.description || planItems?.[0]?.description}
          renderType="text"
          className={`font-normal w-max text-[15px] text-end`}
        />
      </BlockDiv>
      {/* paragraph middle */}
      <BlockDiv
        className={`flex flex-col items-start w-[3000px] ${
          staticItem2?.isActive ? "" : "hidden"
        }`}
      >
        <RenderAtom
          item={staticItem2?.title || planItems?.[1]?.title}
          renderType="title"
          className={`font-[400] text-[20px] text-black`}
        />
        <RenderAtom
          item={staticItem2?.description || planItems?.[1]?.description}
          renderType="text"
          className={`font-normal text-[16px]`}
        />
      </BlockDiv>
      {/* see workouts button */}
      <BlockDiv
        className={`bg-[#BAD405] w-max rounded-[12px] ${
          staticItem3?.isActive ? "" : "hidden"
        }`}
      >
        <RenderAtom
          item={{
            value: staticItem3?.button || planItems?.[2]?.button,
            positionnemgoo: {
              url: {
                path: `/workouts`,
                query: {
                  id: "mn",
                },
              },
            },
          }}
          renderType="button"
          className={`font-[700] text-black text-[30px] text-start uppercase`}
        />
        <RenderAtom
          item={staticItem3?.description || planItems?.[2]?.description}
          renderType="text"
          className={`text-end text-black w-max font-normal text-[16px]`}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1PlanChoose;
