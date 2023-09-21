"use client";
import { FC } from "react";
import _ from "lodash";
import preparePageList from "@/utils/preparePage";
import RenderSections from "./renderSections";
import { jsonParse } from "@/utils/helper";
import Skeleton from "../common/skeleton/Skeleton";

const Section = (data: any) => {
  
  const pageObject: any = data.configList;
  let headerSection: any = [];
  let footer: any = [];
  headerSection.push(_.find(pageObject.layouthdr, ["sectionCode", "header"]));
  footer.push(_.find(pageObject.layouthdr, ["sectionCode", "footer"]));
  let customClassName = "";
  let customStyle = {};

  if(!pageObject)return <><Skeleton type="card" /></>

  return (
    <main className="min-h-[520px] mt-[70px]">
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
