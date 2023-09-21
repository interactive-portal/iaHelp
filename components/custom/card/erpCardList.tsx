import React, { useContext } from "react";

import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";

export default function ErpCardList({ pDataSrc }: { pDataSrc: any }) {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const data = readyDatasrc || (pDataSrc && pDataSrc);

  return (
    <div className="flex h-auto w-full xl:w-[360px] flex-col bg-white shadow-[0_2px_14px_rgba(0,0,0,0.06)] w-full] rounded-xl p-5 space-y-5">
      <span className="text-[20px] leading-6 font-semibold text-[#585858]">
        Бусад мэдээ мэдээлэл
      </span>
      <div className="flex flex-col">
        {pDataSrc?.slice(0, 4).map((row: any, index: number) => {
          return (
            <Link
              href={`/news?id=${row.id}`}
              className="flex gap-2.5 border-b py-5 first:pt-0 last:pb-0 last:border-b-0 group"
              key={index}>
              <div className="flex-none">
                <RenderAtom
                  renderType="image"
                  item={{ value: row.imgurl }}
                  customClassName={
                    "rounded-xl w-[100px] h-[70px] object-cover flex-none"
                  }
                />
              </div>
              <div className="flex flex-col justify-between ">
                <RenderAtom
                  renderType="title"
                  item={{ value: row.title }}
                  customClassName={
                    "line-clamp-2 text-sm leading-[16px] font-semibold text-[#585858] group-hover:text-interactive"
                  }
                />
                <RenderAtom
                  renderType="title"
                  item={{ value: row.subtitle }}
                  customClassName={
                    "text-[12px] leading-[14px] font-medium text-[#A0A0A0] group-hover:text-interactive"
                  }
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
