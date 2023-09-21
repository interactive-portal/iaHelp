import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";

import { useState } from "react";
import _ from "lodash";

export default function InteractiveBanner02() {
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

  return (
    <div className={`relative h-[650px] w-full`}>
      <div
        className="absolute z-10 h-full w-2/3"
        style={{
          background:
            "linear-gradient(90deg, #F5F5F5 43.75%, rgba(255, 255, 255, 0.05) 100%)",
        }}
      ></div>
      <RenderAtom
        item={{ value: staticItem1[0]?.mainimage }}
        renderType="image"
        customClassName={
          "z-0 absolute w-full h-full object-cover object-center"
        }
      />
      <div className="absolute left-[15%] z-10 flex h-full w-full flex-col items-start justify-center gap-y-[35px] pt-[20px]">
        <RenderAtom
          item={{ value: staticItem1[0]?.title }}
          renderType="title"
          customClassName={
            "text-[80px] text-[#011F3D] w-[560px] leading-[93.75px] h-[282px] flex  font-normal"
          }
        />
        <RenderAtom
          item={{ value: staticItem1[0]?.description }}
          renderType="text"
          customClassName={
            "text-[18px] text-[#011F3D] w-[570px] leading-[30px] h-[60px] flex font-normal"
          }
        />
        <div className="curson-pointer flex h-[50px] w-[200px] items-center justify-center rounded-lg bg-[#0C529D]">
          <RenderAtom
            item={{ value: staticItem1[0]?.button }}
            renderType="button"
            customClassName={"text-[18px] text-white bg-opacity-0 font-medium"}
          />
        </div>
      </div>
    </div>
  );
}
