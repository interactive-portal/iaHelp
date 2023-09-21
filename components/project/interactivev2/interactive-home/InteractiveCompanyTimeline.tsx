import { useContext, useState } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import _ from "lodash";
import { useTranslation } from "next-i18next";

export default function InteractiveCompanyTimeline() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const dataSrc = _.orderBy(readyDatasrc, ["year"], ["asc"]);
  const [seeMore, setSeeMore] = useState(true);
  const { t } = useTranslation("translate");
  return (
    <div className="w-full gap-x-5 relative">
      <div className="flex flex-col container mx-auto justify-center gap-5">
        <div className="w-full">
          <div className="relative">
            <div className="absolute w-[2px] h-full transform -translate-x-1/2 bg-gray-400 lg:block left-1/2"></div>
            <div className="space-y-12 lg:space-y-8 h-auto">
              {dataSrc?.map((row: any, index: number) => {
                if (seeMore ? index < 4 : index + 1) {
                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-5 timeline relative group"
                      style={{ animationDelay: index * 0.1 + "s" }}>
                      <div className="flex justify-center z-10 group-hover:scale-110 transition-all duration-500">
                        <span
                          className={`rounded-xl px-14 py-4 text-2xl font-medium leading-5 text-white ${
                            index % 2 == 0 ? "bg-[#8D8BEC]" : "bg-[#8BC9EC]"
                          }`}>
                          {t(row.year)}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex items-center ${
                            index % 2 == 0 ? "justify-start" : "justify-end"
                          } w-full mx-auto`}>
                          <div
                            className={`w-full lg:w-1/2  ${
                              index % 2 == 0 ? "lg:pr-8" : "lg:pl-8"
                            }`}>
                            <div className="flex flex-col bg-white/80 p-5 rounded-[10px] relative shadow-md">
                              <RenderAtom
                                renderType="title"
                                item={{ value: t(row.title) }}
                              />
                              <RenderAtom
                                renderType="text"
                                item={{ value: t(row.description) }}
                              />
                              <span
                                className={`ease absolute left-0 top-0 h-0 w-0 border-t-4 ${
                                  index % 2 == 0
                                    ? "border-[#8D8BEC]"
                                    : "border-[#8BC9EC]"
                                } transition-all duration-500 group-hover:w-full`}
                              />
                              <span
                                className={`ease absolute right-0 top-0 h-0 w-0 border-r-4 ${
                                  index % 2 == 0
                                    ? "border-[#8D8BEC]"
                                    : "border-[#8BC9EC]"
                                } transition-all duration-500 group-hover:h-full`}
                              />
                              <span
                                className={`ease absolute bottom-0 right-0 h-0 w-0 border-b-4 ${
                                  index % 2 == 0
                                    ? "border-[#8D8BEC]"
                                    : "border-[#8BC9EC]"
                                } transition-all duration-500 group-hover:w-full`}
                              />
                              <span
                                className={`ease absolute bottom-0 left-0 h-0 w-0 border-l-4 ${
                                  index % 2 == 0
                                    ? "border-[#8D8BEC]"
                                    : "border-[#8BC9EC]"
                                } transition-all duration-500 group-hover:h-full`}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className={`absolute flex flex-col gap-5 items-center justify-center w-8 h-8 transform -translate-x-1/2 -translate-y-4 left-1/2 sm:translate-y-0 rounded-full border-[6px] border-white group-hover:border-[5px] group-hover:border-interactive ${
                            index % 2 == 0 ? "bg-[#8D8BEC]" : "bg-[#8BC9EC]"
                          }`}
                        />
                      </div>
                    </div>
                  );
                }
              })}
              {seeMore && (
                <div
                  className="flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setSeeMore(!seeMore);
                  }}>
                  <div className="flex justify-center z-10">
                    <span className="rounded-xl px-14 py-4 text-2xl font-medium leading-5 text-white bg-interactive">
                      {t("WPD_0001")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
            .timeline {
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
