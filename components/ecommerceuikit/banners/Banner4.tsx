import { useContext } from "react";
import WidgetWrapperContext from "@engineBox/Wrapper/WidgetUniversalWrapper";
import {
  AtomTitle,
  AtomText,
  AtomButton,
  AtomImage,
} from "@components/common/Atom";
const Banner4 = () => {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  // console.log("Banner4 config", config);
  //console.log("Banner4 readyDatasrc", readyDatasrc);
  // console.log("Banner4 widgetnemgooReady", widgetnemgooReady);
  // console.log("Banner4 positionConfig", positionConfig);
  return (
    <>
      {readyDatasrc &&
        readyDatasrc.map((item: any, index: number) => {
          return (
            <div className="flex flex-col md:flex-row justify-between items-strech bg-gradient-to-r from-gray-50 to-gray-200 py-8 lg:py-12 px-4 md:px-10 lg:px-16">
              <div className="flex items-center">
                <div className="w-full">
                  <AtomImage item={item.logo} customClassName="w-auto" />
                  <AtomTitle
                    item={item.title}
                    customClassName="mt-7 md:mt-5 lg:mt-4 text-3xl lg:text-4xl font-semibold leading-9 text-gray-900"
                  />
                  <AtomText
                    item={item.description}
                    customClassName="md:mt-2 text-xl leading-5 text-gray-900"
                  />
                  <AtomButton
                    customClassName="w-full sm:w-auto mt-10 bg-gray-800 py-3 px-5 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700 leading-4"
                    item={item.button}
                    color=""
                  />
                </div>
              </div>
              <div className="mt-6 md:mt-0 mx-auto md:mx-0">
                <AtomImage item={item.mainimage} alt={item.title} />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Banner4;
