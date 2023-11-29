import React, { useState } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, FC } from "react";
import _ from "lodash";
import { useRouter } from "next/router";

type PropsType = {
  data?: any;
  options?: any;
  mutate?: any;
};

const RiverClubV1MasterHeader: FC<PropsType> = ({ data, options, mutate }) => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.id)
    ? query.id.join("")
    : query.id || "mn";

  const [thisLanguage, setThisLanguage] = useState(currentLanguage);
  const staticItem = thisLanguage === "mn" ? data?.mn : data?.en;

  React.useEffect(() => {
    setThisLanguage(currentLanguage);
  }, [currentLanguage]);

  const logo = staticItem?.[0];
  const menu = staticItem?.[1];
  const button = staticItem?.[2];
  const language = staticItem?.[3];

  const { widgetnemgooReady } = options || {};

  // console.log("optios", options);

  return (
    <BlockDiv
      customClassName={`${widgetnemgooReady?.design?.className} z-[99]`}
    >
      <BlockDiv className="bg-[#202020] pl-[11px] w-[1080px] h-max flex flex-col items-end">
        <LanguageSetting item={language} />
        <BlockDiv className="flex bg-[#202020] w-full h-max items-center justify-between">
          <RenderAtom
            item={{
              value: logo?.mainimage,
              positionnemgoo: {
                url: {
                  path: `${logo?.slug}`,
                },
              },
            }}
            renderType="image"
            className={`w-[142px] cursor-pointer h-[36px] my-[10px] mr-[45px]`}
          />
          <Menu item={menu} />
          <MemberButton item={button} />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

const LanguageSetting = ({ item }: any) => {
  const router = useRouter();
  const { query } = router;
  const currentLanguage = Array.isArray(query.id)
    ? query.id.join("")
    : query.id || "mn";

  return (
    <BlockDiv className="flex w-max mr-10">
      <RenderAtom
        item={{
          value: item?.[0]?.title,
          positionnemgoo: {
            url: {
              path: "",
              query: {
                id: "en",
              },
              keepQuery: true,
            },
          },
        }}
        renderType="button"
        className={`${
          currentLanguage === "en"
            ? `text-[${item?.[2]?.buttons?.active}]`
            : `text-${item?.[2]?.buttons?.inActive}`
        } font-[700] text-[17px] w-max -mr-6`}
      />
      <RenderAtom
        item={{
          value: `${item?.[1]?.title}`,
          positionnemgoo: {
            url: {
              path: "",
              query: {
                id: "mn",
              },
              keepQuery: true,
            },
          },
        }}
        renderType="button"
        className={`${
          currentLanguage === "mn"
            ? `text-[${item?.[2]?.buttons?.active}]`
            : `text-${item?.[2]?.buttons?.inActive}`
        } font-[700] text-[17px] w-max -mr-6 `}
      />
    </BlockDiv>
  );
};

const Menu = ({ item }: any) => {
  return (
    <BlockDiv className="flex justify-between w-full mr-[30px]">
      {_.map(item, (item: any, index: number) => {
        return (
          <RenderAtom
            key={item?.id || index}
            item={{
              value: item?.title,
              positionnemgoo: {
                atom: {
                  type: "title",
                  className: "",
                  props: { maxLength: 20 },
                },
                url: {
                  path: `${item?.slug}`,
                },
              },
            }}
            renderType="title"
            className={`font-[400] cursor-pointer text-[18px] uppercase w-max text-white`}
          />
        );
      })}
    </BlockDiv>
  );
};

const MemberButton = ({ item }: any) => {
  return (
    <BlockDiv className="">
      <RenderAtom
        item={{
          value: item?.title,
          positionnemgoo: {
            url: {
              path: `${item?.slug}`,
            },
          },
        }}
        renderType="button"
        className={`text-black text-[16px] font-[700] p-[24px] rounded-[8px] w-max bg-[#BAD405]`}
      />
    </BlockDiv>
  );
};

export default RiverClubV1MasterHeader;
