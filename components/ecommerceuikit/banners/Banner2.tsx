import { useContext } from "react";
import WidgetWrapperContext from "@engineBox/Wrapper/WidgetUniversalWrapper";

import { AtomTitle, AtomText, AtomImage } from "@components/common/Atom";

const Banner2 = () => {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  // console.log("Banner2 config", config);
  //console.log("Banner2 readyDatasrc", readyDatasrc);
  // console.log("Banner2 widgetnemgooReady", widgetnemgooReady);
  // console.log("Banner2 positionConfig", positionConfig);
  return (
    <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
      {readyDatasrc &&
        readyDatasrc.map((item: any, index: number) => {
          return (
            <div className="flex justify-center items-strech flex-col lg:flex-row bg-gray-50 px-3 space-y-4 lg:space-y-0 lg:space-x-4 lg:pr-16">
              <div className="lg:w-1/2 flex flex-col md:flex-row items-strech md:space-x-5 lg:space-x-8">
                <div className="w-1/6">
                  <AtomImage item={item.logo} alt={item.title} />
                </div>
                <div className="lg:w-10/12 flex flex-col justify-end lg:justify-center pt-4">
                  <AtomTitle
                    item={item.title}
                    customClassName={
                      "text-3xl lg:text-4xl font-semibold leading-9 text-gray-800"
                    }
                  />
                  <AtomText
                    item={item.description}
                    customClassName={
                      "text-xl leading-normal text-gray-600 mt-3.5 lg:mt-2 2xl:w-10/12"
                    }
                  />
                </div>
              </div>
              <div className="lg:w-1/2 py-4 w-full">
                <AtomImage
                  item={item.mainimage}
                  alt={item.title}
                  customClassName={"w-full h-full"}
                />{" "}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Banner2;
