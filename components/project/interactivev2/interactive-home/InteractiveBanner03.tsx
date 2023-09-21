import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";

import { useState } from "react";
import _ from "lodash";

export default function InteractiveBanner03() {
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
    <div className={`relative h-[700px] w-full`}>
      <div
        className="absolute z-10 h-full w-2/3 opacity-50"
        style={{
          background:
            "linear-gradient(90deg, #003857 28.65%, rgba(0, 0, 0, 0) 100%)",
        }}
      ></div>
      <RenderAtom
        item={{ value: staticItem1[0]?.mainimage }}
        renderType="image"
        customClassName={
          "z-0 absolute w-full h-full object-cover object-center"
        }
      />
      <div className="absolute z-10 flex h-full w-full flex-col items-start justify-center gap-y-[35px]">
        <div className="container relative mx-auto flex h-full w-full flex-col justify-center gap-y-[100px] pt-[110px]">
          <RenderAtom
            item={{ value: staticItem1[0]?.title }}
            renderType="title"
            customClassName={
              "text-[50px] text-white w-[600px] leading-[70px] h-[140px] font-medium"
            }
            customStyle={{ textShadow: "0px 2px 5px rgba(0, 0, 0, 0.75)" }}
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
              customClassName={
                "text-[18px] text-white bg-opacity-0 font-medium"
              }
            />
          </div>
          <div className="absolute right-0 top-0 flex h-[210px] w-[260px] items-center rounded-b-xl bg-gradient-to-r from-[#FE805A] to-[#FBAD50] px-[30px] pt-3">
            <RenderAtom
              item={{ value: staticItem1[0]?.more }}
              renderType="text"
              customClassName={
                "text-[40px] text-white font-medium leading-[51px]"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
