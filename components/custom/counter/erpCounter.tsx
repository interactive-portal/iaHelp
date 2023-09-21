import RenderAtom from "@/components/common/atom/renderAtom";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { useTranslation } from "next-i18next";
import React, { useContext, useEffect, useRef, useState } from "react";

export default function ErpCounter() {
  const {
    config,
    readyDatasrc,

    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);
  const [count, setCount] = useState(1155);
  const countNumber = readyDatasrc;
  const ref = useRef(0);
  const accumlator = countNumber / 100;
  const { t } = useTranslation("translate");
  const updateCount = () => {
    if (ref.current < countNumber) {
      const result = Math.ceil(ref.current + accumlator);
      if (result > countNumber) return setCount(countNumber);
      setCount(result);
      ref.current = result;
    }
    setTimeout(updateCount, 50);
  };

  useEffect(() => {
    updateCount();
  }, [countNumber]);

  const options = widgetnemgooReady?.options;

  return (
    <>
      {readyDatasrc
        ?.slice(0, options?.custom?.viewPerCount || "")
        ?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className=" xl:w-72 xs:w-24 w-full h-32 flex justify-center items-center">
              <div className="text-center">
                <p className="xl:text-5xl lg:text-3xl xs:text-3xl font-semibold leading-10 text-[#2C2C51]">
                  {item?.countNumber}+
                </p>
                <p className="xl:text-base lg:text-[14px] xs:text-[12px] font-medium leading-none text-[#7B7B93] mt-4">
                  {/* {item?.title} */}
                  {t(item.title)}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
}
