import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";

import _ from "lodash";
import { useTranslation } from "next-i18next";

export default function InteractiveServiceList() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const { t } = useTranslation("translate");

  console.log("rrrrrr ::", readyDatasrc);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
      {readyDatasrc?.map((item: any, index: number) => {
        return (
          <div key={index} className="flex flex-col h-[410px]">
            <div className="flex-none w-full h-[195px]">
              <RenderAtom
                renderType="image"
                item={{ value: item.imgurl }}
                customClassName={"w-full h-[195px] cursor-pointer"}
              />
            </div>
            <div className="flex flex-col gap-2.5 justify-between bg-white w-full p-5 h-full">
              <div className="flex flex-col gap-2.5">
                <RenderAtom
                  renderType="text"
                  item={item?.position1 || { value: t(item?.title) }}
                  customClassName="text-xl font-semibold text-[#3C3C3C] line-clamp-2 leading-[26px]"
                />
                <RenderAtom
                  renderType="text"
                  item={item?.position22 || { value: t(item?.body) }}
                  customClassName="text-base font-normal text-[#67748E] line-clamp-3 leading-[26px]"
                />
              </div>

              <Link
                href={`/service/detail?id=${item?.id}`}
                className="px-0 mx-0 font-semibold text-[16px] flex-row-reverse gap-x-2 text-[#0C529D] hover:underline"
              >
                {/* {item?.buttonname || item?.buttonname} d */}
                {t("WPD_0001")}
                <i className="fa-regular fa-arrow-right -rotate-45 pl-2 mt-2 relative top-1"></i>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
