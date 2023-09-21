"use client";
import { FC } from "react";
import _ from "lodash";
import RenderSection from "./renderSection";
import { motion } from "framer-motion";

type PropsType = {
  mergedLayout: [];
  rawWidgetList?: any;
  customClassName?: string;
  customStyle?: any;
  processSection?: any;
  sectionNemgoo?: any;
};

const RenderSections: FC<PropsType> = ({
  mergedLayout = [],
  rawWidgetList,
  customClassName = "",
  customStyle,
  processSection,
  sectionNemgoo,
}) => {
  return (
    <motion.div layout
    // animate={{ opacity: 0.5 }}
    transition={{
      opacity: { ease: "linear" },
      layout: { duration: 0.2 }
    }}
      className={`${_.isEmpty(customClassName) ? "" : customClassName} `}
      style={{ ...customStyle }}>
      <RenderSectionList
        mergedLayout={mergedLayout}
        rawWidgetList={rawWidgetList}
        processSection={processSection}
      />
    </motion.div>
  );
};

export default RenderSections;

type PropsTypeSection = {
  mergedLayout: [];
  rawWidgetList?: any;
  customClassName?: string;
  customStyle?: any;
  processSection?: any;
  sectionNemgoo?: any;
};

const RenderSectionList: FC<PropsTypeSection> = ({
  mergedLayout,
  rawWidgetList,
  customClassName = "",
  customStyle,
  processSection,
  sectionNemgoo,
}) => {
  return (
    <>
      {mergedLayout?.map((item: any, index: number) => {
        const sectionCode = _.split(item?.sectionCode, "section")[1];
        const sectionList = _.filter(rawWidgetList, {
          code: sectionCode,
        });
        if (item?.children) {
          return (
            <div className="main" key={index} data-index={index}>
              <RenderSections
                key={item?.id || index}
                mergedLayout={item?.children}
                customClassName={item?.className}
                customStyle={item?.style}
                rawWidgetList={rawWidgetList}
                processSection={processSection}
                sectionNemgoo={item}
              />
            </div>
          );
        } else {
          return (
            <RenderSection
              key={item?.id || index}
              sectionnemgoo={item}
              sectionCode={sectionCode}
              sectionList={sectionList}
              processSection={processSection}
            />
          );
        }
      })}
    </>
  );
};
