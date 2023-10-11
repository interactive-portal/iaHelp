import React, { useContext } from "react";
import FaqItem from "./faqItem";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import BlockDiv from "@/components/common/block/blockDiv";
import RenderAtom from "@/components/common/atom/renderAtom";
import HelpFaq from "./helpFaq";

export default function ErpFaq() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const type = widgetnemgooReady?.options?.type;

  switch (type) {
    case "helpFaq":
      return (
        <HelpFaq
          readyDatasrc={readyDatasrc}
          widgetnemgooReady={widgetnemgooReady}
        />
      );
    default:
      return (
        <>
          <div className=" md:w-3/4 mx-auto xs:w-full lg:w-[730px]">
            <BlockDiv
              customClassName={`transition ease-in-out w-3/5 px-6 mx-auto xs:w-full`}
              divNumber="divFaqOuter"
            >
              <RenderAtom
                item={{ value: "Dd" }}
                renderType="title"
                customClassName={
                  "lg:text-3xl xs:text-base font-segoe font-bold"
                }
              />
              <div className="mt-6">
                {readyDatasrc.map((item: any, index: number) => (
                  <FaqItem
                    title={item.title}
                    content={item.description}
                    key={index}
                  />
                ))}
              </div>
            </BlockDiv>
          </div>
        </>
      );
  }
}
