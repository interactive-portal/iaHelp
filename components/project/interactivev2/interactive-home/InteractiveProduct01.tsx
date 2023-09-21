import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import Image from "next/image";

import { useState } from "react";
import _ from "lodash";

export default function InteractiveProduct01() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  let newArr = _.map(readyDatasrc, (o) => _.pick(o, ["categoryname"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "categoryname")));
  const [filterItem, setFilterItem]: any = useState("Бүгд");

  const selectdata = _.filter(readyDatasrc, {
    categoryname: filterItem,
  });

  let dataSrc: any = filterItem !== "Бүгд" ? selectdata : readyDatasrc;

  return (
    <div className={`w-full bg-white pt-20`}>
      <div className="flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll">
        <div
          className={`pr-7 xl:min-w-auto lg:min-w-auto xs:min-w-max  text-center font-medium text-[#67748E] text-[17px] cursor-pointer ${
            filterItem == "Бүгд" && "text-interactive font-bold"
          }`}
          onClick={() => setFilterItem("Бүгд")}
        >
          Бүгд
        </div>
        {!_.isEmpty(grouped) &&
          grouped.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`pr-7 xl:min-w-auto lg:min-w-auto xs:min-w-max text-center font-medium text-[#67748E] text-[16px] cursor-pointer ${
                  filterItem == item && "text-interactive font-bold"
                }`}
                onClick={() => setFilterItem(item)}
              >
                {item}
              </div>
            );
          })}
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-col-3 xs:grid-cols-2 xl:gap-8 lg:gap-10 xs:gap-4 mt-[40px]">
        {dataSrc?.map((item: any, index: number) => {
          const ddd = process.env.IMAGEROOTURL || "https://dev.veritech.mn/";

          let imgSrc = item?.imgurl;
          if (imgSrc?.startsWith("storage/")) {
            imgSrc = `${ddd}${imgSrc}`;
          }

          return (
            <div
              className="flex flex-col items-center border border-transparent hover:border-interactive rounded-lg p-4 cursor-pointer animateCustomer"
              key={index}
              style={{ animationDelay: index * 0.1 + "s" }}
            >
              <div className=" h-32 relative">
                <Image
                  src={imgSrc}
                  alt="hh"
                  // fill
                  height={90}
                  width={190}
                  className="bg-"
                  quality={100}
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <RenderAtom
                item={item?.position1}
                renderType="text"
                customClassName={
                  "text-center text-sm w-full block text-[#585858]  mt-[5px]"
                }
              />
            </div>
          );
        })}
      </div>
      <style>
        {`
            .animateCustomer {
              opacity: 0;
              transform: translateY(-10px);
              animation: up 0.2s forwards;
            }

            @keyframes up {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            `}
      </style>
    </div>
  );
}
