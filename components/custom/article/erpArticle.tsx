import RenderAtom from "@/components/common/atom/renderAtom";
import BlockDiv from "@/components/common/block/blockDiv";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import React, { useContext } from "react";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import _ from "lodash";

export default function ErpArticle({
  pDataSrc,
  pOptions,
}: {
  pDataSrc: any;
  pOptions: any;
}) {
  const { config, readyDatasrc, positionConfig, widgetnemgooReady } =
    useContext(WidgetWrapperContext);
  let staticData = readyDatasrc[0] || (pDataSrc && pDataSrc[0]);
  const options = widgetnemgooReady?.options || (pOptions && pOptions);
  const { t } = useTranslation("translate");
  const { width } = useWindowSize();
  // document.addEventListener("DOMContentLoaded", () => {
  //   const title = document.querySelector(".animetad") as HTMLElement;
  //   title.classList.add("emerged");
  // });
  // console.log("staticData :>> ", staticData);
  if (_.isEmpty(widgetnemgooReady)) {
    return;
  }

  const renderContent = () => {
    switch (options?.type) {
      case "row":
        return (
          <div
            className={`emerging-title flex flex-col md:flex-row justify-between md:items-center mx-auto ${widgetnemgooReady?.widgetClassName} gap-x-20 gap-y-5 animate-fade-out-up `}
          >
            <div className="flex md:w-1/3 ">
              <RenderAtom
                item={{ value: t(staticData?.title) }}
                renderType="text"
                customClassName={`animetad ${options?.classNameTitle} sm:text-[40px] xs:text-[20px] sm:leading-[46px]  xs:text-2xl xs:leading-[22px] font-bold`}
              />
            </div>
            <div className="flex md:w-2/3">
              {staticData?.description && (
                <RenderAtom
                  item={{ value: t(staticData?.description) }}
                  renderType="text"
                  customClassName={`animetad ${
                    options?.classNameDesc || " text-left"
                  }  inline-block text-left`}
                />
              )}
            </div>
            <style>
              {`
          .emerging-title {
            opacity: 0;
            transform: translateY(-10px);
            animation: emerge 1s forwards;
          }

          @keyframes emerge {
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
      default:
        return (
          <motion.div
            // initial={{ opacity: 0, y: -10 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 1 }}
            className={`emerging-title flex flex-col mx-auto ${widgetnemgooReady?.widgetClassName} gap-y-2 animate-fade-out-up md:w-full lg:w-[1020px] md:px-0 xs:px-3`}
          >
            {/* {t(staticData?.title)} */}
            <RenderAtom
              item={{ value: t(staticData?.title) }}
              renderType="text"
              customClassName={`animetad sm:text-[40px] xs:text-[20px] sm:leading-[46px]  xs:text-2xl xs:leading-[22px] font-bold ${
                options?.classNameTitle && options?.classNameTitle
              }`}
            />
            {staticData?.description && (
              <RenderAtom
                item={{ value: t(staticData?.description) }}
                renderType="text"
                customClassName={`animetad ${
                  options?.classNameDesc || " text-center"
                }  text-[16px]  text-[#67748E] leading-[26px] inline-block xs:w-full`}
              />
            )}
            <style>
              {`
            .emerging-title {
              opacity: 0;
              transform: translateY(-10px);
              animation: emerge 1s forwards;
            }

            @keyframes emerge {
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
          </motion.div>
        );
    }
  };
  return <>{renderContent()}</>;
}
