import React, { useState, useContext, useEffect } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useRouter } from "next/router";
import _ from "lodash";
import BlockSlider from "@/components/common/Block/BlockSlider";
import RiverLoginModal from "./RiverLoginModal";

const RiverClubV1HomeWelcome = () => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.id)
    ? query.id.join("")
    : query.id || "mn";
  const [openModal, setOpenModal] = useState(false);

  const [language, setLanguage] = useState(currentLanguage);

  const { readyDatasrc } = useContext(WidgetWrapperContext);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const staticItem = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];

  return (
    <BlockDiv className="arrowCustomStyle">
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
          return (
            <RiverHomeBanner
              item={staticItem}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          );
        })}
      </BlockSlider>
      <RiverLoginModal openModal={openModal} setOpenModal={setOpenModal} />
    </BlockDiv>
  );
};

export default RiverClubV1HomeWelcome;

const RiverHomeBanner = ({ item, openModal, setOpenModal }: any) => {
  return (
    <BlockDiv className="h-[570px] flex items-center justify-center relative bg-gray-200">
      <RenderAtom
        item={item?.mainimage[0]}
        renderType="image"
        customClassName="w-[1080px] h-full absolute top-0 left-0"
      />
      <BlockDiv className="z-20 w-full flex items-center justify-center flex-col h-max">
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
            // positionnemgoo: {
            //   url: {
            //     path: `/bioinput`,
            //   },
            // },
          }}
          renderType="button"
          className={`bg-[#BAD405] rounded-[8px] px-[42px] py-[35px] text-black uppercase text-[16px] font-[700] mb-[30px]`}
          onClick={() => setOpenModal(true)}
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
