import { useContext } from "react";
import WidgetWrapperContext from "@engineBox/Wrapper/WidgetUniversalWrapper";

import { AtomButton } from "@components/common/Atom";
import RenderAtom from "@components/common/Atom/RenderAtom";
const WeeklyBanner = () => {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  // console.log("WeeklyBanner config", config);
  //console.log("WeeklyBanner readyDatasrc", readyDatasrc);
  // console.log("WeeklyBanner widgetnemgooReady", widgetnemgooReady);
  // console.log("WeeklyBanner positionConfig", positionConfig);
  return (
    <>
      {readyDatasrc &&
        readyDatasrc.map((item: any, index: number) => {
          return (
            <div className="flex flex-col md:flex-row justify-between items-strech bg-gradient-to-r from-gray-50 to-gray-200 py-8 lg:py-1 px-4 md:px-10 lg:px-16">
              <div className="flex items-center">
                <div className="w-full">
                  <RenderAtom
                    item={item?.position3}
                    renderType="text"
                    customClassName="md:mt-2 text-xl leading-5 text-gray-900"
                  />
                  <AtomButton
                    customClassName="w-full sm:w-auto  mt-6 bg-red-400 rounded-full py-2 px-10 text-xs font-medium text-white uppercase "
                    item={item.button}
                    color=""
                  />
                </div>
              </div>
              <div className="mt-6 md:mt-0 mx-auto md:mx-0">
                <RenderAtom
                  item={item?.position2}
                  renderType="image"
                  customClassName="w-full h-16"
                />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default WeeklyBanner;
