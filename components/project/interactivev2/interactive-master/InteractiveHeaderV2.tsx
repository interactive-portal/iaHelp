import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import _ from "lodash";

export default function InteractiveHeaderV2() {
  const { config, readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = _.values(readyDatasrc[0]);
  const staticItem2 = _.values(readyDatasrc[1]);

  // const { x, y } = useWindowScroll();

  const headerEffect: string = "";

  return (
    <div
      className={`z-50 h-[90px] w-full transition duration-300 ease-in-out ${headerEffect}`}>
      <div className="flex h-full w-full flex-row items-center justify-between px-[192px]">
        {/* Logo */}
        <div className="">
          <RenderAtom
            item={{ value: staticItem1[0]?.mainimage }}
            renderType="image"
            customClassName={"w-auto h-[40px] object-cover object-center"}
          />
        </div>
        {/* menu */}
        <div className="flex flex-row gap-x-[33px]">
          {readyDatasrc?.map((item: any, index: number) => {
            return (
              <div
                className="flex flex-row items-center gap-x-[8px]"
                key={item?.id || index}>
                <RenderAtom
                  item={{ value: item?.title }}
                  renderType="title"
                  customClassName="text-[18px] text-white flex-row-reverse gap-x-[8px] font-normal cursor-pointer"
                />
                <RenderAtom
                  item={{ value: "fa-light fa-angle-right" }}
                  renderType="icon"
                  customClassName={"font-bold text-white rotate-90"}
                />
              </div>
            );
          })}
          <div className="">
            <RenderAtom
              item={{ value: "fa-light fa-user" }}
              renderType="icon"
              customClassName={"font-medium text-white text-xl"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
