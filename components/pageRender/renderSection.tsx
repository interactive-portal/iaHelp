"use client";
import { FC, use } from "react";
import _ from "lodash";
import { jsonParse, toBoolean } from "@/utils/helper";
import SectionWidgetChoose from "./sectionWidgetChoose";
import Image from "next/image";

type PropsType = {
  sectionnemgoo: any;
  sectionCode?: string;
  sectionList?: any;
  processSection?: any;
};

const renderSection: FC<PropsType> = ({
  sectionnemgoo,
  sectionCode,
  sectionList = [],
  processSection,
}) => {
  if (_.isEmpty(sectionList)) return null;

  const dataAttrs = {
    "data-sectioncode": sectionCode,
    sectioncode: sectionCode,
    widgetname: _.isEmpty(sectionList)
      ? "Process render section"
      : sectionList[0]["widgetcode"],
  };
  const gridClass = sectionnemgoo?.gridClass || "";

  const temp = sectionList.length > 1 && {
    gridGap: gridClass ? "none" : "none",
  };
  const itemClassName = sectionnemgoo?.className || "";
  const itemBgUrl = sectionList[0]?.widgetnemgooReady?.sectionBg || "";
  const bgHide =
    sectionList[0]?.widgetnemgooReady?.sectionBg?.sectionBgHide || false;

  return (
    <section
      {...dataAttrs}
      className={` ${itemBgUrl ? "relative" : ""}  ${
        _.isEmpty(itemClassName) ? "h-full w-full" : itemClassName
      }`}
      style={{ ...sectionnemgoo?.style }}
    >
      {itemBgUrl?.url && (
        <Image
          src={itemBgUrl?.url}
          fill={itemBgUrl?.fill}
          style={{
            objectFit: itemBgUrl?.objectFit || "cover",
            objectPosition: itemBgUrl?.objectPosition || "center",
          }}
          className={`${!bgHide && "sectionBg"}`}
          alt="section bg"
        />
      )}

      <div
        className={`w-full ${
          sectionList.length > 1 ? gridClass || "grid grid-cols-12" : ""
        } ${sectionnemgoo?.SectionInside?.className} `}
        style={{
          ...temp,
          ...sectionnemgoo?.SectionInside?.style,
        }}
      >
        {sectionList?.map((sectionItem: any, index: number) => {
          return (
            <SectionWidgetChoose
              listConfig={sectionItem}
              key={sectionItem?.id || index}
            />
          );
        })}
      </div>
    </section>
  );
};

export default renderSection;
