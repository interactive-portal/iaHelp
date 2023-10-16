import { useContext } from "react";
import WidgetWrapperContext from "@engineBox/Wrapper/WidgetUniversalWrapper";

import { AtomButton } from "@components/common/Atom";
import RenderAtom from "@components/common/Atom/RenderAtom";

const Banner5Weekly = () => {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  // console.log("Banner5WeeklyLanding config", config);
  // console.log("Banner5WeeklyLanding readyDatasrc", readyDatasrc);
  // console.log("Banner5WeeklyLanding widgetnemgooReady", widgetnemgooReady);
  // console.log("Banner5WeeklyLanding positionConfig", positionConfig);
  return (
    <div className=" container mx-auto">
      {readyDatasrc &&
        readyDatasrc.map((item: any, index: number) => {
          return (
            <div className="flex flex-row  justify-center  items-center bg-blue-800 py-8 md:py-11 lg:py-10 px-4 md:px-8 lg:px-16">
              <div className="  ">
                <div className="w-full">
                  <RenderAtom
                    item={item?.position1}
                    renderType="title"
                    customClassName="text-2xl leading-9 font-medium text-white"
                  />
                  <AtomButton
                    item={item.button}
                    customClassName="w-full ml-48 sm:w-auto mt-10  md:mt-10 bg-black rounded uppercase py-3 px-6 text-base font-medium text-white"
                    color=""
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Banner5Weekly;
