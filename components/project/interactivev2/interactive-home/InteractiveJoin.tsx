"use client";
import RenderAtom from "@/components/common/atom/renderAtom";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { useState, useContext } from "react";
import _ from "lodash";

export default function InteractiveJoin() {
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
    <div className={`flex w-full flex-col items-center bg-white py-20`}>
      <RenderAtom
        item={{ value: staticItem1[0]?.title }}
        renderType="title"
        customClassName={"text-[44px] text-[#3C3C3C]"}
      />
      <RenderAtom
        item={{ value: staticItem1[0]?.description }}
        renderType="text"
        customClassName={
          "text-[18px] text-[#7B7B93] leading-[28px] text-center w-[920px]"
        }
      />
      <div className="relative flex flex-row py-20">
        <input
          className="border-#E1E1E1 h-[60px] w-[850px] rounded-lg border pl-5 text-[18px] text-[#90A0B7]"
          placeholder="Таны и-мэйл хаяг"></input>
        <RenderAtom
          item={{ value: staticItem1[0]?.button }}
          renderType="button"
          customClassName={
            "absolute right-0 w-[180px] h-[60px] bg-[#0C529D] hover:text-white text-[18px] flex-row-reverse text-white font-medium rounded-r-lg"
          }
          customProps={{
            type: "icon",
            icon: "fa-regular fa-heart ml-2",
          }}
        />
      </div>
    </div>
  );
}
