import _ from "lodash";
import { FC } from "react";

import { twMerge } from "tailwind-merge";
import { jsonParse } from "@/util/helper";
import SectionWidgetChoose from "./sectionWidgetChoose";

// import Jaak from "@/components//cloud/Project/Cozy/jaak";

type PropsType = {
  sectionnemgoo: any;
  sectionCode?: string;
  sectionList?: any;
  processSection?: any;
};

const RenderSection: FC<PropsType> = ({
  sectionnemgoo,
  sectionCode,
  sectionList = [],
  processSection,
}) => {
  if (_.isEmpty(sectionList)) return null;

  const temp = sectionList.length > 1 && { gridGap: "2%" };
  const itemClassName = sectionnemgoo?.className || "";
  console.log("sectionnemgoo :>> ", sectionList);

  return (
    <div
      data-type="section"
      data-code={sectionCode}
      // {...dataAttrs}
      data-widgetName={sectionList[0]?.widgetcode}
      className={twMerge(
        `w-full ${sectionList.length > 1 ? "grid grid-cols-12" : ""} ${
          sectionnemgoo?.SectionInside?.className
        }`
      )}
      style={{ ...sectionnemgoo?.style }}
    >
      {sectionList.map((sectionItem: any, index: number) => {
        return (
          <SectionWidgetChoose
            listConfig={sectionItem}
            key={sectionItem?.id || index}
          />
          // <span key={index} className="bg-red-400 my-6 mx-auto">
          //   widgetcode :{sectionItem.widgetcode}
          // </span>
        );
      })}
    </div>
  );
};

export default RenderSection;
