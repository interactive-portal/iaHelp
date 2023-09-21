import RenderAtom from "@/components/common/atom/renderAtom";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { useState, useContext } from "react";
import { Progress } from "antd";
import _ from "lodash";
import { useTranslation } from "next-i18next";

export default function InteractiveCompanyStatistic() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const { t } = useTranslation("translate");
  const staticItem1 = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];
  const staticItem3 = readyDatasrc[2];
  const staticItem4 = readyDatasrc[3];

  return (
    <div className="flex flex-col w-full container mx-auto">
      {/* section 1 */}
      <div className="flex flex-col justify-center items-center pb-5 md:pb-10 lg:pb-20 gap-5 md:gap-[48px] ">
        <div className="flex flex-wrap lg:flex-row gap-10 justify-center lg:justify-between lg:w-full">
          <div className="flex flex-col rounded-full  bg-gradient-to-r p-[10px] from-[#FF56AD] to-[#FF986C] w-[220px] h-[220px] items-center justify-center">
            <div className="bg-white w-full h-full rounded-full flex flex-col text-center justify-center items-center">
              <span className="text-[#3C3C3C] text-[40px] font-semibold">
                {staticItem1?.title}
              </span>
              <span className="text-[#67748E] tetx-sm leading-[21px] uppercase ">
                {t(staticItem1?.description)}
              </span>
            </div>
          </div>
          <div className="flex flex-col rounded-full  bg-gradient-to-r p-[10px] from-[#558DFC] to-[#C24FFD] w-[220px] h-[220px] items-center justify-center">
            <div className="bg-white w-full h-full rounded-full flex flex-col text-center justify-center items-center">
              <span className="text-[#3C3C3C] text-[40px] font-semibold">
                {t(staticItem2?.title)}
              </span>
              <span className="text-[#67748E] tetx-sm leading-[21px] uppercase ">
                {t(staticItem2?.description)}
              </span>
            </div>
          </div>
          <div className="flex flex-col rounded-full  bg-gradient-to-r p-[10px] from-[#3BF36C] to-[#39BBE3] w-[220px] h-[220px] items-center justify-center">
            <div className="bg-white w-full h-full rounded-full flex flex-col text-center justify-center items-center">
              <span className="text-[#3C3C3C] text-[40px] font-semibold">
                {t(staticItem3?.title)}
              </span>
              <span className="text-[#67748E] tetx-sm leading-[21px] uppercase ">
                {t(staticItem3?.description)}
              </span>
            </div>
          </div>
          <div className="flex flex-col rounded-full  bg-gradient-to-r p-[10px] from-[#FF8440] to-[#FFD84B] w-[220px] h-[220px] items-center justify-center">
            <div className="bg-white w-full h-full rounded-full flex flex-col text-center justify-center items-center p-[10px]">
              <span className="text-[#3C3C3C] text-[40px] font-semibold">
                {t(staticItem4?.title)}
              </span>
              <span className="text-[#67748E] tetx-sm leading-[21px] uppercase ">
                {t(staticItem4?.description)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}