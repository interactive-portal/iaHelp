import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
// import BlockDiv from "@components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/atom/renderAtom";

export default function CardMasonry() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);

  const gridSpan = [
    "w-[240px] h-[190px]",
    "w-[240px] h-[190px]",
    "w-[240px] h-[400px] row-span-2",
    "w-[500px] h-[190px] col-span-2",
    "w-[500px] h-[190px] col-span-2",
    "w-[240px] h-[190px]",
    "w-[240px] h-[190px]",
    "w-[240px] h-[190px]",
    "w-[500px] h-[190px] col-span-2",
    "w-[500px] h-[190px] col-span-2",
  ];

  return (
    <>
      <div
        className={`w-full h-full`}
      >
        <div
          className="flex flex-col py-2"
        >
          <div className="grid overflow-hidden grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {readyDatasrc
              // .slice(0, settings?.displayView || 9)
              .map((item: any, index: number) => {
                return (
                  <div
                    key={item?.id || index}
                    className={`cursor-pointer relative ${gridSpan[index]} rounded-xl`}
                  >
                    <RenderAtom
                      item={item?.position2}
                      renderType="image"
                      customClassName={
                        "z-0 absolute rounded-xl w-full h-full object-cover object-center top-0"
                      }
                    />
                    <div className="absolute z-5 h-full w-full">
                      <div className="flex flex-col h-1/2 p-5 w-full">
                        <RenderAtom
                          item={item?.position1}
                          renderType="title"
                          customClassName={
                            "text-[28px] text-[#3C3C3C] leading-[28px]"
                          }
                          customProps={{
                            truncateRow: 2,
                          }}
                        />
                        <RenderAtom
                          item={item?.position3}
                          renderType="title"
                          customClassName={
                            "text-[14px] text-[#3C3C3C] font-normal"
                          }
                          customProps={{
                            truncateRow: 3,
                          }}
                        />
                      </div>
                      <div className="w-full flex items-end justify-end p-5 h-1/2  ">
                        <RenderAtom
                          item={item?.position4}
                          renderType="text"
                          customClassName={
                            "text-[28px] text-[#8C8C8C] font-medium"
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
