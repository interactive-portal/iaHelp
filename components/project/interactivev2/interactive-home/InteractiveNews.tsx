import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";

import { useState } from "react";
import _ from "lodash";

export default function InteractiveNews() {
  const {
    config,
    readyDatasrc,
    // positionConfig,
    // metaConfig,
    // gridJsonConfig,
    // pathConfig,
    // widgetnemgooReady,
  } = useContext(WidgetWrapperContext);
  let active = "0";
  const staticItem1 = _.values(readyDatasrc[0]);
  const staticItem2 = _.values(readyDatasrc[1]);
  const staticItem3 = _.values(readyDatasrc[2]);

  // const [active, setActive] = useState(0);

  return (
    <div className={`w-full bg-[#F3F4F6] py-20`}>
      <div className="container mx-auto flex flex-col items-center">
        <RenderAtom
          item={{ value: staticItem1[0]?.bigtitle }}
          renderType="title"
          customClassName={"text-[40px] text-[#3C3C3C] font-medium"}
        />
        <div className="flex w-full items-center justify-between pt-[35px]">
          <div className="flex w-full gap-x-[30px] px-3">
            {staticItem2?.map((item: any, index: number) => {
              return (
                <div
                  className={`cursor-pointer border-b-[2px] `}
                  key={item?.id || index}>
                  <RenderAtom
                    item={{ value: item?.title }}
                    renderType="title"
                    customClassName={`text-[18px] `}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex w-full items-center justify-end">
            <RenderAtom
              item={{ value: staticItem1[0]?.button }}
              renderType="button"
              customClassName={
                "text-[18px] text-[#2C2C51] group transform duration-700 ease-in-out flex-row-reverse gap-x-2 font-medium "
              }
              customProps={{
                type: "icon",
                icon: "fa-light fa-arrow-right transform duration-700 ease-in-out group-hover:translate-x-2",
              }}
            />
          </div>
        </div>
        <div>
          <>
            <div className="grid grid-cols-3 gap-x-[30px] pt-10">
              {staticItem3?.map((item: any, index: number) => {
                return (
                  <div
                    className="h-[425px] w-[406px] rounded-3xl bg-white shadow"
                    key={item?.id || index}>
                    <RenderAtom
                      item={{ value: item?.mainimage }}
                      renderType="image"
                      customClassName={
                        "w-full h-[200px] object-cover object-center rounded-t-3xl"
                      }
                    />
                    <div className="flex flex-col gap-y-[10px] p-5">
                      <RenderAtom
                        item={{ value: item?.date }}
                        renderType="text"
                        customClassName={
                          "text-[16px] text-[#009BDE] font-medium"
                        }
                      />
                      <RenderAtom
                        item={{ value: item?.description }}
                        renderType="text"
                        customClassName={
                          "text-[18px] text-[#2C2C51] leading-[28px] w-full h-[141px]"
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
