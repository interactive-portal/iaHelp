import { useContext } from "react";
import WidgetWrapperContext from "@engineBox/Wrapper/WidgetUniversalWrapper";

import RenderAtom from "@components/common/Atom/RenderAtom";
const BannerWeekly = () => {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  // console.log("BannerWeekly config", config);
  // console.log("BannerWeekly readyDatasrc", readyDatasrc);
  // console.log("BannerWeekly widgetnemgooReady", widgetnemgooReady);
  // console.log("BannerWeekly positionConfig", positionConfig);
  return (
    <div className="container mx-auto ">
      {readyDatasrc &&
        readyDatasrc.map((item: any, index: number) => {
          return (
            <div className="w-full">
              <RenderAtom
                item={item?.position2}
                renderType="image"
                customClassName="w-full h-16 rounded-b-lg"
              />
            </div>
          );
        })}
    </div>
  );
};

export default BannerWeekly;
