import { useContext } from "react";
import WidgetWrapperContext from "@engineBox/Wrapper/WidgetUniversalWrapper";
import { renderPositionType } from "util/helper";
import {
  AtomTitle,
  AtomText,
  AtomButton,
  AtomImage,
} from "@components/common/Atom";
const Banner9 = () => {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  // console.log("Banner9 config", config);
  // sconsole.log("Banner9 readyDatasrc", readyDatasrc);
  // console.log("Banner9 widgetnemgooReady", widgetnemgooReady);
  // console.log("Banner9 positionConfig", positionConfig);
  return (
    readyDatasrc &&
    readyDatasrc.map((item: any, index: number) => {
      return (
        <div className="sm:mx-auto sm:container px-6 xl:px-0">
          <div className="flex items-center justify-between md:flex-row flex-col py-12 space-y-6 md:space-y-0 w-full">
            <div className="hidden md:block">
              <AtomImage
                item={renderPositionType(item, "position2", positionConfig)}
                customClassName="hidden xl:block w-full"
                alt={item.title}
              />
              <AtomImage
                item={item.mobileimage}
                customClassName="xl:hidden w-full"
                alt={item.title + " mobile"}
              />
            </div>
            <div className="flex justify-center items-center flex-col xl:w-2/5 md:px-6 sm:w-3/4 md:w-2/4">
              <div className="">
                <AtomTitle
                  item={renderPositionType(item, "position1", positionConfig)}
                  customClassName="xl:text-4xl text-3xl font-semibold leading-9 text-gray-800"
                />
              </div>
              <div className="mt-4">
                <AtomText
                  item={renderPositionType(item, "position3", positionConfig)}
                  customClassName="xl:text-xl text-base leading-7 text-center text-gray-600"
                />
              </div>
              <div className="mt-8 flex justify-center items-center w-full">
                <AtomButton
                  item={renderPositionType(item, "position54", positionConfig)}
                  customClassName="hover:opacity-75 flex justify-center bg-gray-800 sm:w-32 w-full h-10 py-3 text-base font-medium leading-none text-white"
                  color=""
                />
              </div>
            </div>
            <div className="flex md:w-auto w-full justify-center flex-row space-x-4 md:space-x-0">
              <div className="w-full">
                <AtomImage
                  item={renderPositionType(item, "position52", positionConfig)}
                  customClassName="hidden xl:block w-full"
                  alt={item.title}
                />
                <AtomImage
                  item={item.mobileimage1}
                  customClassName="xl:hidden w-full"
                  alt={item.title + "mobile"}
                />
              </div>
              <div className="md:hidden w-full">
                <AtomImage
                  item={renderPositionType(item, "position2", positionConfig)}
                  customClassName="hidden xl:block w-full"
                  alt={item.title}
                />
                <AtomImage
                  item={item.mobileimage}
                  customClassName="xl:hidden w-full"
                  alt={item.title + " mobile"}
                />
              </div>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default Banner9;
