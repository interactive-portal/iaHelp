import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";

export default function sectionTitle() {
  const {
    config,
    readyDatasrc,
    widgetnemgooReady,
    metaConfig,
    gridJsonConfig,
  } = useContext(WidgetWrapperContext);
  const data = readyDatasrc[0];

  // console.log("data", data);

  return (
    <>
      <div
        className={`${
          widgetnemgooReady.customClassName || "text-center w-full"
        }`}
      >
        <RenderAtom
          item={{ value: data?.name }}
          renderType="title"
          customClassName={
            "text-citizen-title font-medium text-4xl mb-6" ||
            data?.titleClass ||
            "text-lg"
          }
          // customStyle={atomStyle}
        />
        <RenderAtom
          item={{ value: data?.subtitle }}
          renderType="text"
          customClassName={
            "text-citizen-description  text-base " ||
            data?.titleSubClass ||
            "text-sm"
          }
          // customStyle={atomStyle}
        />
      </div>
    </>
  );
}
