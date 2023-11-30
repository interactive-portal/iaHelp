import { useContext } from "react";
import React from "react";
import { useRouter } from "next/router";
// import BlockSlider from "@components/common/Block/BlockSlider";
import BlockSlider from "@/components/common/Block/BlockSlider";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import _ from "lodash";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

const RiverClubV1HomeAbout = () => {
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

  console.log("staticitem", staticItem);

  return (
    <BlockDiv>
      <BlockSlider
        type="simple"
        customProps={{
          slickslideRawClass: {
            padding: "0 10px 0 0",
          },
          reactSlickSettings: {
            dots: false,
            infinite: false,
            variableWidth: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: true,
          },
        }}
      >
        {/* {_.map(staticItem?.item, (item: any, index: number) => {
          return (
            <BlockDiv className="flex flex-col items-center justify-center   mb-24 bg-[#CACACA]">
              <RenderAtom
                item={item?.mainimage}
                renderType="image"
                className={`w-full h-full`}
              />
              <BlockDiv className="mt-[26px] flex flex-col items-center justify-center px-[170px]">
                <RenderAtom
                  item={item?.title}
                  renderType="title"
                  className={`font-normal text-[20px] text-black mb-[18px] uppercase`}
                />
                <RenderAtom
                  item={item?.description}
                  renderType="title"
                  className={`font-normal text-[16px] mb-[22px] text-center`}
                />
                <RenderAtom
                  item={item?.button}
                  renderType="button"
                  className={`underline font-normal text-black  text-[16px] mb-[27px]`}
                />
              </BlockDiv>
            </BlockDiv>
          );
        })} */}
      </BlockSlider>
    </BlockDiv>
  );
};

export default RiverClubV1HomeAbout;
