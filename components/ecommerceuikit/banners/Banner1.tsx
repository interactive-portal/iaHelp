import { useContext } from "react";
import WidgetWrapperContext from "@engineBox/Wrapper/WidgetUniversalWrapper";

import { AtomTitle, AtomText, AtomImage } from "@components/common/Atom";
const Banner1 = () => {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
    renderPositionType,
  } = useContext(WidgetWrapperContext);

  //console.log("Banner1 config", config);
  //console.log("Banner1 readyDatasrc", readyDatasrc);
  //console.log("Banner1 widgetnemgooReady", widgetnemgooReady);
  //console.log("Banner1 positionConfig", positionConfig);
  return (
    <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
      {readyDatasrc.map((item: any, index: number) => {
        return (
          <div
            key={item?.id || index}
            className="bg-gray-800 py-8 md:py-20 px-5 md:px-24"
          >
            <div className="w-full md:border-8 md:border-white md:pt-11 lg:pt-12 md:pl-7 lg:pl-12">
              <AtomTitle
                item={renderPositionType(item, "position1", positionConfig)}
                customClassName="text-3xl lg:text-4xl font-semibold leading-9 text-white uppercase"
              />
              <AtomText
                item={renderPositionType(item, "position3", positionConfig)}
                customClassName="mt-4 md:mt-2 text-2xl font-medium leading-normal text-white"
              />

              <div className="flex justify-center md:justify-end mt-10 md:mt-9 md:-mr-11 lg:-mr-14 xl:-mr-20 2xl:-mr-24 md:-mb-12 lg:-mb-14 xl:-mb-16 2xl:-mb-24">
                <AtomImage
                  item={renderPositionType(item, "position2", positionConfig)}
                  customClassName="w-full md:w-10/12 lg:w-8/12 2xl:w-9/12"
                  alt={item.title}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Banner1;
