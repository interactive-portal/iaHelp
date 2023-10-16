import { useContext } from "react";
import WidgetWrapperContext from "@engineBox/Wrapper/WidgetUniversalWrapper";

import BlockDiv from "@components/common/Block/BlockDiv";
import RenderAtom from "@components/common/Atom/RenderAtom";

export default function LandingBanner() {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  // console.log("Banner3 config", config);
  // console.log("Banner3 readyDatasrc", readyDatasrc);
  // console.log("Banner3 widgetnemgooReady", widgetnemgooReady);
  //console.log("Banner3 positionConfig", positionConfig);

  return (
    <>
      {readyDatasrc &&
        readyDatasrc.map((item: any, index: number) => {
          return (
            <BlockDiv
              key={item?.id || index}
              customClassName="relative w-full h-auto object-cover bg-no-repeat bg-cover rounded-[10px]"
              customStyle={{ backgroundImage: `url(${item?.mainimage})` }}
              divNumber={"DivBanner"}
            >
              <BlockDiv customClassName="flex justify-around py-[20px] items-center ">
                <RenderAtom
                  item={{ value: item?.logo }}
                  renderType="image"
                  customClassName={"h-auto lg:w-[366px] xs:w-full h-[60px]"}
                />
                <RenderAtom
                  item={{
                    value:
                      "https://res.cloudinary.com/dzih5nqhg/image/upload/v1657070003/Zoho%20landing/image_44102_ycy6dl.png",
                  }}
                  renderType="image"
                  customClassName={
                    "w-[443px] h-[60px] xs:hidden lg:flex object-contain"
                  }
                />
              </BlockDiv>
            </BlockDiv>
          );
        })}
    </>
  );
}
