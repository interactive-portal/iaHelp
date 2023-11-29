import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RiverClubV1HomeElevate = () => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.id)
    ? query.id.join("")
    : query.id || "mn";

  const [language, setLanguage] = useState(currentLanguage);

  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const data = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];

  const staticItem = data[0];
  const staticItem2 = data[1];

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  return (
    <BlockDiv className="flex flex-col gap-y-[40px] mx-[105px] my-[40px]">
      <UpperSection item={staticItem} />
      <BottomSection item={staticItem2} />
    </BlockDiv>
  );
};

const UpperSection = ({ item }: any) => {
  return (
    <BlockDiv className="flex gap-x-[50px]">
      <RenderAtom
        item={item?.mainimage}
        renderType="image"
        className={`w-[397px] h-[398px]`}
      />
      <BlockDiv className="flex flex-col mt-[15px]">
        <RenderAtom
          item={item?.title}
          renderType="title"
          className={`font-[400] text-[32px] text-black uppercase mb-[34px]`}
        />
        <RenderAtom
          item={item?.subtitle}
          renderType="text"
          className={`font-[400] text-[16px] mb-[24px]`}
        />
        <RenderAtom
          item={item?.description}
          renderType="text"
          className={`font-[400] text-[16px] mb-[36px]`}
        />
        <RenderAtom
          item={{
            value: item?.button?.title,
            positionnemgoo: {
              url: {
                path: `${item?.button?.link}`,
              },
            },
          }}
          renderType="button"
          className={`text-[16px] font-[400] bg-black w-[220px] py-[14px] px-[18px] uppercase`}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

const BottomSection = ({ item }: any) => {
  return (
    <BlockDiv className="flex gap-x-[50px]">
      <BlockDiv className="flex flex-col mt-[15px]">
        <RenderAtom
          item={item?.title}
          renderType="title"
          className={`font-[400] text-[32px] text-black uppercase mb-[34px]`}
        />
        <RenderAtom
          item={item?.subtitle}
          renderType="text"
          className={`font-[400] text-[16px] mb-[24px]`}
        />
        <RenderAtom
          item={item?.description}
          renderType="text"
          className={`font-[400] text-[16px] mb-[36px]`}
        />
        <RenderAtom
          item={{
            value: item?.button?.title,
            positionnemgoo: {
              url: {
                path: `${item?.button?.link}`,
              },
            },
          }}
          renderType="button"
          className={`text-[16px] font-[400] bg-black w-[220px] py-[14px] px-[18px] uppercase`}
        />
      </BlockDiv>
      <RenderAtom
        item={item?.mainimage}
        renderType="image"
        className={`w-[397px] h-[398px]`}
      />
    </BlockDiv>
  );
};

export default RiverClubV1HomeElevate;
