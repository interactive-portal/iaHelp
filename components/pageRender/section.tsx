"use client";
import { FC } from "react";
import _ from "lodash";
import preparePageList from "@/utils/preparePage";
import RenderSections from "./renderSections";
import { jsonParse } from "@/utils/helper";

const Section = (data: any) => {
  // const pageObject: any = preparePageList(data.data);
  // console.log("configList", data.configList);
  const pageObject: any = data.configList;
  const rawMainSection = _.values(pageObject.meta_hdr_bp_layout_section);
  let headerSection: any = [];
  let footer: any = [];
  headerSection.push(_.find(pageObject.layouthdr, ["sectionCode", "header"]));
  footer.push(_.find(pageObject.layouthdr, ["sectionCode", "footer"]));
  let customClassName = "";
  let customStyle = {};

  return (
    <main>
      <section
        className={` ${
          _.isEmpty(customClassName) ? "col-span-12" : customClassName
        }`}
        style={{ ...customStyle }}>
        <RenderSections
          mergedLayout={pageObject.mergedPageNemgoo}
          rawWidgetList={pageObject.meta_bp_layout_section}
        />
      </section>
    </main>
  );
};

export default Section;
