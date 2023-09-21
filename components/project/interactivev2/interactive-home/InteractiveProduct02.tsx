import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";

import { useState } from "react";
import _ from "lodash";

export default function InteractiveProduct02() {
  const {
    config,
    readyDatasrc,
    // positionConfig,
    // metaConfig,
    // gridJsonConfig,
    // pathConfig,
    // widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  const staticItem1 = _.values(readyDatasrc[0]);
  const staticItem2 = _.values(readyDatasrc[1]);

  return (
    <div className={`w-full bg-white pt-20`}>
      <div className="container mx-auto flex flex-row-reverse justify-center gap-x-[100px]">
        {/* col - 1 */}
        <div className="">
          <RenderAtom
            item={{ value: staticItem1[0]?.mainimage }}
            renderType="image"
            customClassName={"w-auto h-auto object-cover object-center"}
          />
        </div>
        {/* col - 2 */}
        <div className="flex flex-col justify-start">
          <RenderAtom
            item={{ value: staticItem1[0]?.title }}
            renderType="title"
            customClassName={"text-[44px] pb-2 text-[#2C2C51]"}
          />
          <div className="flex flex-col gap-y-[25px] pt-[20px]">
            {staticItem2?.map((item: any, index: number) => {
              return (
                <div className="flex flex-col gap-y-2" key={item?.id || index}>
                  <div className="flex flex-row items-center gap-x-2">
                    <RenderAtom
                      item={{ value: item?.icon }}
                      renderType="image"
                      customClassName={
                        "w-auto h-auto object-cover object-center"
                      }
                    />
                    <RenderAtom
                      item={{ value: item?.title }}
                      renderType="title"
                      customClassName={"text-[18px] text-[#2C2C51]"}
                    />
                  </div>
                  <RenderAtom
                    item={{ value: item?.description }}
                    renderType="text"
                    customClassName={"text-[18px] text-[#7B7B93]"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
