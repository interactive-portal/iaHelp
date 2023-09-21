import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import _ from "lodash";

export default function InteractiveBanner01() {
  const {
    config,
    readyDatasrc,
    // positionConfig,
    // metaConfig,
    // gridJsonConfig,
    // pathConfig,
    // widgetnemgooReady,
  } = useContext(WidgetWrapperContext);
  // const readyDatasrc: any = {};
  // console.log("config :", config);
  // console.log("readyDatasrc :", readyDatasrc);
  // console.log("config :", config);

  const staticItem1: any = {}; //_.values(readyDatasrc);
  const staticItem2 = _.values(readyDatasrc[1]);

  return (
    <div className={`relative h-[800px] w-full`}>
      {/* <h1>Helloooooooooooooo</h1> */}
      <RenderAtom
        item={{ value: "logd" }}
        renderType="image"
        customClassName={
          "z-0 absolute w-full h-full object-cover object-center"
        }
      />
      <div className="z-5 absolute flex h-full w-full flex-col items-center justify-center gap-y-[35px] pt-[20px]">
        <RenderAtom
          item={{ value: staticItem1?.title }}
          renderType="title"
          customClassName={
            "text-[50px] text-white w-[700px] leading-[70px] items-center text-center h-[210px] flex  font-medium"
          }
        />
        <div className="flex h-[50px] w-[220px] items-center justify-center rounded-lg border-[2px] border-white bg-opacity-0">
          <RenderAtom
            item={{ value: staticItem1?.button }}
            renderType="button"
            customClassName={"text-[18px] text-white bg-opacity-0 font-bold"}
          />
        </div>
      </div>
    </div>
  );
}
