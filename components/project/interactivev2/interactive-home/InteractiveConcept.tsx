import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";

import { useState } from "react";
import _ from "lodash";

export default function InteractiveConcept() {
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
    <div className={`relative w-full bg-white py-20`}>
      <div className="z-5 container mx-auto flex w-full flex-col items-center">
        <RenderAtom
          item={{ value: staticItem1[0]?.title }}
          renderType="title"
          customClassName={"text-[44px] text-[#3C3C3C] text-center w-5/6"}
        />
        <div className="grid w-full grid-cols-3 gap-x-10 gap-y-20 pt-[100px]">
          {staticItem2?.map((item: any, index: number) => {
            return (
              <div
                className="flex w-[345px] flex-col gap-y-[20px]"
                key={item?.id || index}>
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-lg bg-[#dbedfe]">
                  <RenderAtom
                    item={{ value: item?.logo }}
                    renderType="image"
                    customClassName={
                      "w-auto h-[40px] object-cover object-center"
                    }
                  />
                </div>
                <RenderAtom
                  item={{ value: item?.title }}
                  renderType="title"
                  customClassName={"text-[20px] text-[#2C2C51]"}
                />
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
      <RenderAtom
        item={{ value: staticItem1[0]?.mainimage }}
        renderType="image"
        customClassName={
          "w-[650px] h-[650px] absolute z-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        }
      />
    </div>
  );
}
