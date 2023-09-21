import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";

import { useState } from "react";
import _ from "lodash";

export default function InteractiveNumberIndicater() {
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
  const staticItem3 = _.values(readyDatasrc[2]);

  return (
    <div className={`w-full bg-white py-[100px]`}>
      <div className="container mx-auto flex w-full items-center gap-x-[100px]">
        <div className="flex flex-col gap-y-[20px]">
          <RenderAtom
            item={{ value: staticItem1[0]?.title }}
            renderType="title"
            customClassName={
              "text-[44px] text-[#3C3C3C] w-[367px] leading-[50px]"
            }
          />
          <RenderAtom
            item={{ value: staticItem1[0]?.description }}
            renderType="text"
            customClassName={"text-[18px] text-[#7B7B93] w-[570px]"}
          />
        </div>
        <div className="grid w-full grid-cols-2">
          {staticItem2?.map((item: any, index: number) => {
            return (
              <div className="flex flex-col" key={item?.id || index}>
                <RenderAtom
                  item={{ value: item?.title }}
                  renderType="title"
                  customClassName={"text-[46px] text-[#2C2C51]"}
                />
                <RenderAtom
                  item={{ value: item?.description }}
                  renderType="text"
                  customClassName={"text-[24px] text-[#7B7B93]"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
