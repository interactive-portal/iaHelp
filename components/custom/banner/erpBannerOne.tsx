import React, { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { useTranslation } from "next-i18next";
export default function ErpBannerOne() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  // console.log("staticItem :>> ", staticItem);
  const ddd = process.env.IMAGEROOTURL || "https://dev.veritech.mn/";

  let imgSrc = staticItem?.imgurl;
  if (imgSrc?.startsWith("storage/")) {
    imgSrc = `${ddd}${imgSrc}`;
  }
  const { t } = useTranslation("translate");
  return (
    <div
      className="flex w-full py-[80px]"
      style={{
        backgroundImage: `url('${imgSrc}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
      <div className="container w-full col-span-12 mx-auto">
        <div className="flex flex-col items-start md:w-[45%]  xs:w-[90%] gap-10">
          <span
            className="text-white md:text-[80px] xs:text-[40px] font-normal md:leading-[90px] xs:leading-[44px] text-shadow-md"
            style={{ textShadow: "0 4px 4px rgba(0, 0, 0, 0.6" }}>
            {t(staticItem?.title)}
          </span>

          <span className="text-white text-[18x] font-medium leading-7">
            {t(staticItem?.description)}
          </span>

          <button className="text-[#0C529D] bg-white hover:bg-black/20 text-[20px] font-medium px-10 py-[10px] rounded-[30px]">
            {t(staticItem?.button)}
          </button>
        </div>
      </div>
    </div>
  );
}
