import RenderAtom from "@/components/common/atom/renderAtom";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { useState, useContext } from "react";
import { Progress } from "antd";
import _ from "lodash";

export default function ErpTab() {
  return (
    <div className="flex flex-col w-full container mx-auto">
      {/* section 1 */}
      {/* <div className="flex flex-row relative container mx-auto justify-center items-center">
        <img
          src="https://res.cloudinary.com/dzih5nqhg/image/upload/v1686262665/interactive_n3weam.png"
          className="w-full h-auto rounded-xl object-cover"
        />
      </div> */}
      {/* section 2 */}
      <div className="flex flex-col justify-center items-center pt-7 md:pt-14 pb-5 md:pb-10 lg:pb-20 gap-5 md:gap-[48px] ">
        <span className="text-[#0C529D] text-[32px] md:text-[44px] font-bold leading-[52px] text-center">
          Тоогоор Интерактивийг <b className="text-[#3C3C3C]">Танилцуулвал</b>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-between lg:w-full">
          <div className="flex flex-col rounded-full  bg-gradient-to-r p-[10px] from-[#FF56AD] to-[#FF986C] w-[220px] h-[220px] items-center justify-center">
            <div className="bg-white w-full h-full rounded-full flex flex-col text-center justify-center items-center">
              <span className="text-[#3C3C3C] text-[40px] font-semibold">
                27+
              </span>
              <span className="text-[#67748E] tetx-sm leading-[21px] uppercase ">
                Жилийн туршлага
              </span>
            </div>
          </div>
          <div className="flex flex-col rounded-full  bg-gradient-to-r p-[10px] from-[#558DFC] to-[#C24FFD] w-[220px] h-[220px] items-center justify-center">
            <div className="bg-white w-full h-full rounded-full flex flex-col text-center justify-center items-center">
              <span className="text-[#3C3C3C] text-[40px] font-semibold">
                100+
              </span>
              <span className="text-[#67748E] tetx-sm leading-[21px] uppercase ">
                шилдэг мэргэжилтнүүд
              </span>
            </div>
          </div>
          <div className="flex flex-col rounded-full  bg-gradient-to-r p-[10px] from-[#3BF36C] to-[#39BBE3] w-[220px] h-[220px] items-center justify-center">
            <div className="bg-white w-full h-full rounded-full flex flex-col text-center justify-center items-center">
              <span className="text-[#3C3C3C] text-[40px] font-semibold">
                200+
              </span>
              <span className="text-[#67748E] tetx-sm leading-[21px] uppercase ">
                харилцагчид
              </span>
            </div>
          </div>
          <div className="flex flex-col rounded-full  bg-gradient-to-r p-[10px] from-[#FF8440] to-[#FFD84B] w-[220px] h-[220px] items-center justify-center">
            <div className="bg-white w-full h-full rounded-full flex flex-col text-center justify-center items-center p-[10px]">
              <span className="text-[#3C3C3C] text-[40px] font-semibold">
                60+
              </span>
              <span className="text-[#67748E] tetx-sm leading-[21px] uppercase ">
                салбарын шйидлүүд
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
